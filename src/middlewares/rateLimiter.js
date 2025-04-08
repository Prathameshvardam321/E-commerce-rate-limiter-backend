import httpStatus from 'http-status'
import { v4 as uuidv4 } from 'uuid'; 
import config from "../config/config.js";
import redisClient from '../redis/redis.js';
import { sendToQueue } from '../queues/consumer.js';
import { EVENT_IDS } from '../utils/Constant.js';

const localRateCache = new Map();
const expiryTime = config.RATE_LIMIT.WINDOW_SIZE_IN_MINUTES*60
export const rateLimiter = async (req, res, next) => {
    try {
        const userKey = req.user
            ? `rate_user_${req.user.id}` // Token-authenticated user
            : `rate_ip_${req.ip}`;       // Guest user by IP
      
        // Step 1: Check if this user/IP is already blacklisted.
        const isBlacklisted = config.RATE_LIMIT.BLACK_LIST.ENABLED
        ? await redisClient.get(`blacklist:${userKey}`)
        : null;

        if (isBlacklisted) {
            return res.status(httpStatus.FORBIDDEN).json({
            message: "Access temporarily blocked due to abuse.",
            });
        }    
        const currentRequests = await redisClient.incr(userKey);
       
        if (currentRequests === 1) {
            // First request in this time window — start the countdown
            await redisClient.expire(userKey, expiryTime);
        }
        
        
        if (currentRequests > config.RATE_LIMIT.MAX_REQUESTS) {
             sendToQueue(config.KAFKA.TOPICS.RATE_LIMIT_EXCEEDED, {
                ip: req.ip,
                userId: req.user?.id || null,
                route: req.originalUrl,
                timestamp: Date.now(),
                requestCount: currentRequests,
                eventId: EVENT_IDS.RATE_LIMIT_EXCEEDED.eventId,
                message: EVENT_IDS.RATE_LIMIT_EXCEEDED.message,
                redisFallback: false,
                userKey,
                contextId: req.contextId,
            });

            // Step 4: If strikes exceed the threshold, block the user for a specific period.
            if (currentRequests >= config.RATE_LIMIT.BLACK_LIST.BURST_LIMIT && config.RATE_LIMIT.BLACK_LIST.ENABLED) {
                // Block the user/IP by setting a blacklist key with an expiration.
                await redisClient.set(
                `blacklist:${userKey}`,
                1,
                'EX',
                config.RATE_LIMIT.BLACK_LIST.BLOCK_DURATION_SECONDS
                );

                 sendToQueue(config.KAFKA.TOPICS.BLACKLISTED, {
                    userKey,
                    eventId: EVENT_IDS.BLOCK_LISTED.eventId,
                    message: EVENT_IDS.BLOCK_LISTED.message,
                    ip: req.ip,
                    userId: req.user?.id || null,
                    route: req.originalUrl,
                    requestCount: currentRequests,
                    blockDuration: config.RATE_LIMIT.BLACK_LIST.BLOCK_DURATION_SECONDS,
                    timestamp: Date.now(),
                    contextId: req.contextId,
                });
            }


            return res.status(httpStatus.TOO_MANY_REQUESTS).json({
                message: "Too many requests. Please try again later.",
            });
        }
        

        next(); 

    } catch (err) {
        console.error("Rate Limiter Error:", err);
        
        console.error("Redis error in rate limiter:", err.message);

        const userKey = req.user
        ? `rate_user_${req.user.id}` // Token-authenticated user
        : `rate_ip_${req.ip}`;       // Guest user by IP

        // 🚨 Send alert if enabled
        if (config.ALERTS.ENABLED) {
             sendToQueue(config.KAFKA.TOPICS.SYSTEM_ALERTS, {
                userKey,
                service: config.ALERTS.SERVICE_NAME,
                type: "redis_down",
                severity: config.ALERTS.SEVERITY,
                timestamp: Date.now(),
                eventId: EVENT_IDS.REDIS_DOWN.eventId,
                message: EVENT_IDS.REDIS_DOWN.message,
                route: req.originalUrl,
                ip: req.ip,
                userId: req.user?.id || null,
                error: err.message,
                contextId: req.contextId,
            });
        }

       
        const now = Date.now();
        const existing = localRateCache.get(userKey);

        const resetAt = existing?.resetAt || (now + config.RATE_LIMIT.WINDOW_SIZE_IN_MINUTES* 60 * 1000);
        const count = (existing?.count || 0) + 1;

        if (now > resetAt) {
            localRateCache.set(userKey, { count: 1, resetAt: now + config.RATE_LIMIT.WINDOW_SIZE_IN_MINUTES * 1000 });
        } else {
            localRateCache.set(userKey, { count, resetAt });

            if (count > config.RATE_LIMIT.MAX_REQUESTS) {
                await sendToQueue(config.KAFKA.TOPICS.RATE_LIMIT_EXCEEDED, {
                    ip: req.ip,
                    userId: req.user?.id || null,
                    route: req.originalUrl,
                    timestamp: Date.now(),
                    requestCount: count,
                    eventId: EVENT_IDS.RATE_LIMIT_EXCEEDED.eventId,
                    message: EVENT_IDS.RATE_LIMIT_EXCEEDED.message,
                    redisFallback: false,
                    userKey,
                    contextId: req.contextId,
                });

                return res.status(httpStatus.TOO_MANY_REQUESTS).json({
                    message: "Too many requests (fallback mode). Please try again later.",
                });
            }
        }

        return next();
    }
};
