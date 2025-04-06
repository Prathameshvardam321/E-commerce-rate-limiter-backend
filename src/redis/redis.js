// utils/redis.js
import Redis from "ioredis";
import config from "../config/config.js";

const redisClient = new Redis({
  host: config.REDIS.HOST,
  port: config.REDIS.PORT,
  password: config.REDIS.PASSWORD,
  db: config.REDIS.DB,
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redisClient;
