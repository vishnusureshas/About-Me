import session from "express-session"
import { RedisStore } from "connect-redis"
import redisClient, { isRedisReady } from "../config/redis.js"

export function buildSessionMiddleware() {
  const secret = process.env.SESSION_SECRET || "dev-secret-change-in-prod"
  if (!process.env.SESSION_SECRET) {
    console.warn("Session: SESSION_SECRET not set — using dev default. Set a strong random string in server/.env for production.")
  }

  const base = {
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true if HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 24h
    },
    name: "myprofile.sid",
  }

  if (isRedisReady() && redisClient) {
    console.log("Session: using RedisStore")
    return session({
      ...base,
      store: new RedisStore({ client: redisClient, prefix: "sess:" }),
    })
  }

  // Fallback: MemoryStore (single-instance, not for multi-server prod)
  console.warn("Session: Redis not ready — using MemoryStore fallback (use REDIS_URL for production sessions)")
  return session(base)
}
