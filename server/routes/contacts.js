import express from "express"
import Contact from "../models/Contact.js"
import { cacheMiddleware, invalidateCache } from "../middleware/cache.js"
import { rateLimiter } from "../middleware/rateLimitRedis.js"
import { sendContactNotification } from "../config/mailer.js"

const router = express.Router()

const EMAIL_REGEX = /^\S+@\S+\.\S+$/

function validateContactInput({ name, email, subject, message }) {
  const errors = []
  const trimmedName = typeof name === "string" ? name.trim() : ""
  const trimmedEmail = typeof email === "string" ? email.trim() : ""
  const trimmedSubject = typeof subject === "string" ? subject.trim() : ""
  const trimmedMessage = typeof message === "string" ? message.trim() : ""

  if (!trimmedName) errors.push("Name is required")
  else if (trimmedName.length < 2) errors.push("Name must be at least 2 characters")
  else if (trimmedName.length > 100) errors.push("Name must be at most 100 characters")

  if (!trimmedEmail) errors.push("Email is required")
  else if (!EMAIL_REGEX.test(trimmedEmail)) errors.push("Please provide a valid email address")
  else if (trimmedEmail.length > 254) errors.push("Email too long")

  if (trimmedSubject.length > 200) errors.push("Subject must be at most 200 characters")

  if (!trimmedMessage) errors.push("Message is required")
  else if (trimmedMessage.length < 10) errors.push("Message must be at least 10 characters")
  else if (trimmedMessage.length > 2000) errors.push("Message must be at most 2000 characters")

  return {
    errors,
    sanitized: {
      name: trimmedName,
      email: trimmedEmail.toLowerCase(),
      subject: trimmedSubject,
      message: trimmedMessage,
    },
  }
}

// Health for this router (also available at /api/health via server.js)
router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "contacts" })
})

// List recent contacts — cached 60s in Redis (or memory fallback), invalidated on POST
router.get("/contacts", cacheMiddleware("contacts:list", 60), async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(20).lean()
    res.json({ count: contacts.length, contacts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Rate limit: 5 messages per IP per 15 min (Redis-backed, falls back to memory)
router.post("/contacts", rateLimiter({ windowSeconds: 900, max: 5, keyPrefix: "rl:contacts" }), async (req, res) => {
  try {
    const { errors, sanitized } = validateContactInput(req.body)
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join("; ") })
    }

    const contact = await Contact.create(sanitized)
    // Invalidate contacts list cache
    await invalidateCache("contacts:list")
    // Realtime Gmail notification to owner (fire-and-forget, never blocks response)
    sendContactNotification(sanitized)
    // Touch session (creates session for anonymous user)
    if (req.session) {
      req.session.lastContactAt = new Date().toISOString()
    }
    res.status(201).json({ message: "Message sent successfully", contact })
  } catch (error) {
    // Mongoose validation error
    if (error.name === "ValidationError") {
      const msg = Object.values(error.errors)
        .map((e) => e.message)
        .join("; ")
      return res.status(400).json({ error: msg })
    }
    console.error("POST /contacts error:", error)
    res.status(500).json({ error: "Failed to save message. Please try again later." })
  }
})

export default router
