import express from "express"
import Contact from "../models/Contact.js"

const router = express.Router()

router.post("/contacts", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" })
    }

    const contact = await Contact.create({ name, email, subject, message })
    res.status(201).json({ message: "Message sent successfully", contact })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
