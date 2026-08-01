import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import contactRoutes from "./routes/contacts.js"

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use("/api", contactRoutes)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas")
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  })
