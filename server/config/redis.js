import Redis from "ioredis"

let client = null
let isReady = false
const fallbackStore = new Map() // in-memory fallback when REDIS_URL not set or Redis down

// TTL helper for fallback
const fallbackExpiry = new Map()

function getFallback(key) {
  const exp = fallbackExpiry.get(key)
  if (exp && Date.now() > exp) {
    fallbackStore.delete(key)
    fallbackExpiry.delete(key)
    return null
  }
  return fallbackStore.get(key) ?? null
}

function initRedis() {
  const url = process.env.REDIS_URL?.trim()

  if (!url) {
    console.warn("Redis: REDIS_URL not set — using in-memory fallback (no external Redis). Set REDIS_URL for production (e.g. redis://localhost:6379 or Upstash/Redis Cloud URL).")
    return null
  }

  try {
    client = new Redis(url, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      retryStrategy: (times) => {
        if (times > 3) {
          console.warn("Redis: retry limit reached — falling back to memory")
          return null
        }
        return Math.min(times * 200, 1000)
      },
      lazyConnect: false,
    })

    client.on("connect", () => console.log("Redis: connecting..."))
    client.on("ready", () => {
      isReady = true
      console.log("Redis: connected and ready")
    })
    client.on("error", (err) => {
      console.error("Redis error:", err.message)
      isReady = false
    })
    client.on("close", () => {
      isReady = false
      console.log("Redis: connection closed — using fallback")
    })

    return client
  } catch (err) {
    console.error("Redis init failed:", err.message)
    return null
  }
}

const redisClient = initRedis()

export function isRedisReady() {
  return isReady && client?.status === "ready"
}

export async function redisGet(key) {
  if (isRedisReady()) {
    try {
      const val = await client.get(key)
      return val
    } catch (e) {
      console.warn("Redis GET fallback:", e.message)
      return getFallback(key)
    }
  }
  return getFallback(key)
}

export async function redisSet(key, value, ttlSeconds = 60) {
  const str = typeof value === "string" ? value : JSON.stringify(value)
  if (isRedisReady()) {
    try {
      if (ttlSeconds) return await client.set(key, str, "EX", ttlSeconds)
      return await client.set(key, str)
    } catch (e) {
      console.warn("Redis SET fallback:", e.message)
    }
  }
  // fallback
  fallbackStore.set(key, str)
  if (ttlSeconds) fallbackExpiry.set(key, Date.now() + ttlSeconds * 1000)
  return "OK"
}

export async function redisDel(key) {
  if (isRedisReady()) {
    try {
      return await client.del(key)
    } catch (e) {
      console.warn("Redis DEL fallback:", e.message)
    }
  }
  fallbackStore.delete(key)
  fallbackExpiry.delete(key)
  return 1
}

export async function redisIncrWithExpiry(key, windowSeconds) {
  if (isRedisReady()) {
    try {
      const count = await client.incr(key)
      if (count === 1) await client.expire(key, windowSeconds)
      return count
    } catch (e) {
      console.warn("Redis INCR fallback:", e.message)
    }
  }
  // fallback: simple counter
  const curr = parseInt(getFallback(key) || "0", 10) + 1
  fallbackStore.set(key, String(curr))
  if (curr === 1 && windowSeconds) fallbackExpiry.set(key, Date.now() + windowSeconds * 1000)
  return curr
}

export async function redisPing() {
  if (isRedisReady()) {
    try {
      const pong = await client.ping()
      return pong === "PONG"
    } catch {
      return false
    }
  }
  return false // fallback considered not "real" redis
}

export default redisClient
