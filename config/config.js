import dotenv from "dotenv";

dotenv.config(); // Load .env variables


console.log(process.env)
const config = {
    ENV:process.env.ENV,
    PORT: process.env.PORT || 3000,
    TOKEN: {
        JWT : {
            JWT_SECRET : process.env.JWT_SECRET 
        }
    },
    RATE_LIMIT: {
        MAX_REQUESTS: parseInt(process.env.MAX_REQUESTS) || 100,
        WINDOW_SIZE_IN_MINUTES: parseInt(process.env.WINDOW_SIZE_IN_MINUTES) || 15,
        BLACK_LIST:{
            ENABLED: process.env.BLACKLIST_ENABLED === 'true',
            STRIKE_THRESHOLD: parseInt(process.env.BLACKLIST_STRIKE_THRESHOLD || '3'),
            STRIKE_WINDOW_SECONDS: parseInt(process.env.BLACKLIST_STRIKE_WINDOW_SECONDS || '600'),
            BLOCK_DURATION_SECONDS: parseInt(process.env.BLACKLIST_BLOCK_DURATION_SECONDS || '3600'),
            BURST_LIMIT: parseInt(process.env.BLACKLIST_BURST_LIMIT || '10'),
            BURST_WINDOW_SECONDS: parseInt(process.env.BLACKLIST_BURST_WINDOW_SECONDS || '30')
        }
    },
    REDIS: {
        HOST: process.env.REDIS_HOST || "127.0.0.1",
        PORT: process.env.REDIS_PORT || 6379,
        PASSWORD: process.env.REDIS_PASSWORD || undefined,
        DB: parseInt(process.env.REDIS_DB, 10) || 0,
    },
    QUEUES: {
        PROVIDER : process.env.QUEUE_PROVIDER || 'kafka'
    },
    ALERTS: {
        ENABLED: process.env.ALERTS_ENABLED === "true", // string comparison
        SEVERITY: process.env.ALERTS_SEVERITY || "high",
        SERVICE_NAME: process.env.ALERTS_SERVICE_NAME || "rate-limiter",
    },
    KAFKA: {
        CLIENT_ID: process.env.KAFKA_CLIENT_ID || "consumer-service",
        BROKERS: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
        GROUP_ID: process.env.KAFKA_GROUP_ID || "rate-limiter-group",
        TOPICS: {
            RATE_LIMIT_EXCEEDED: process.env.KAFKA_TOPIC_RATE_LIMIT_EXCEEDED || "rate-limit-exceeded",
            SYSTEM_ALERTS: process.env.KAFKA_TOPIC_SYSTEM_ALERTS || "system-alerts",
            BLACKLISTED: process.env.KAFKA_BLACKLISTED_TOPIC || 'blacklisted-events',
        }
    }
};
console.log("Connecting to Redis at:", config.REDIS.HOST, config.REDIS.PORT);

export default config;
