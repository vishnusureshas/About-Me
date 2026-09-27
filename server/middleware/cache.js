import { redisGet, redisSet } from "../config/redis.js"

/**
 * Cache GET responses in Redis (or in-memory fallback).
 * @param {string} keyPrefix - e.g. "contacts:list"
 * @param {number} ttl - seconds
 */
export function cacheMiddleware(keyPrefix, ttl = 60) {
  return async (req, res, next) => {
    if (req.method !== "GET") return next()
    const key = `cache:${keyPrefix}`
    try {
      const cached = await redisGet(key)
      if (cached) {
        res.setHeader("X-Cache", "HIT")
        res.setHeader("Content-Type", "application/json")
        return res.send(cached)
      }
    } catch (e) {
      console.warn("Cache read error:", e.message)
    }

    // Intercept res.json to cache
    const originalJson = res.json.bind(res)
    res.json = async (body) => {
      try {
        const str = JSON.stringify(body)
        await redisSet(key, str, ttl)
        res.setHeader("X-Cache", "MISS")
      } catch (e) {
        console.warn("Cache write error:", e.message)
      }
      return originalJson(body)
    }
    next()
  }
}

export async function invalidateCache(keyPrefix) {
  const { redisDel } = await import("../config/redis.js")
  await redisDel(`cache:${keyPrefix}`)
}
