import { redisIncrWithExpiry } from "../config/redis.js"

/**
 * Simple Redis-backed rate limiter per IP.
 * @param {object} opts { windowSeconds, max, keyPrefix }
 */
export function rateLimiter({ windowSeconds = 900, max = 5, keyPrefix = "rl:contacts" } = {}) {
  return async (req, res, next) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown"
    const key = `${keyPrefix}:${ip}`
    try {
      const count = await redisIncrWithExpiry(key, windowSeconds)
      res.setHeader("X-RateLimit-Limit", String(max))
      res.setHeader("X-RateLimit-Remaining", String(Math.max(0, max - count)))
      if (count > max) {
        return res.status(429).json({ error: `Too many requests. Try again in ${windowSeconds / 60} minutes.` })
      }
      next()
    } catch (e) {
      console.warn("Rate limiter fallback pass:", e.message)
      next()
    }
  }
}
