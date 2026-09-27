import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import contactRoutes from "./routes/contacts.js"
import { buildSessionMiddleware } from "./middleware/session.js"
import { redisPing, isRedisReady } from "./config/redis.js"

const app = express()
const PORT = process.env.PORT || 5000

// --- Validate required env ---
if (!process.env.MONGODB_URI) {
  console.error("FATAL: MONGODB_URI is not defined in server/.env")
  process.exit(1)
}

// --- CORS: restrict to frontend origin(s) ---
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser requests (curl, health checks) with no origin
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error(`CORS blocked: ${origin} not allowed`), false)
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // needed for session cookies
  })
)
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true, limit: "10kb" }))

// Session (Redis-backed, Memory fallback) — must be before routes that use req.session
app.set("trust proxy", 1)
app.use(buildSessionMiddleware())

// --- Health checks (no DB required) ---
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "My-Profile API is running" })
})
app.get("/api/health", async (_req, res) => {
  const dbState = mongoose.connection.readyState // 0=disconnected 1=connected 2=connecting 3=disconnecting
  const states = ["disconnected", "connected", "connecting", "disconnecting"]
  const redisOk = await redisPing()
  const redisStatus = isRedisReady() ? "connected" : redisOk ? "connected" : process.env.REDIS_URL ? "disconnected" : "fallback-memory"
  res.json({
    status: "ok",
    db: states[dbState] ?? dbState,
    redis: redisStatus,
    session: "enabled",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})
// Session debug (dev) — shows Redis session is working
app.get("/api/session", (req, res) => {
  if (!req.session.views) req.session.views = 0
  req.session.views += 1
  res.json({ sessionId: req.sessionID, views: req.session.views, cookie: req.session.cookie })
})

app.use("/api", contactRoutes)

// 404 for unknown API routes
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API route not found" })
})

// Global error handler (e.g. CORS, body-parser)
app.use((err, _req, res, _next) => {
  if (err.message?.startsWith("CORS blocked")) {
    return res.status(403).json({ error: err.message })
  }
  // Built-in middleware errors: JSON parse & payload too large
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON payload" })
  }
  if (err.type === "entity.too.large" || err.status === 413) {
    return res.status(413).json({ error: "Payload too large. Max 10kb" })
  }
  console.error("Unhandled error:", err)
  res.status(500).json({ error: "Internal server error" })
})

// Start server immediately so /api/health and CORS can be tested even if DB is down
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`)
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas")
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message)
    console.error(
      "Hint: Atlas IP whitelist — add 0.0.0.0/0 or your current IP in Atlas > Network Access. " +
        "Also verify MONGODB_URI in server/.env is correct and cluster is not paused/deleted."
    )
    console.error("Server is running but DB writes will fail until connection succeeds. Retrying in 10s...")
    // Optional: retry once after 10s
    setTimeout(() => {
      mongoose.connect(process.env.MONGODB_URI).catch((e) => console.error("Retry failed:", e.message))
    }, 10000)
  })
