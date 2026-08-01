"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, Code, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { personalInfo } from "@/lib/data"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"

type FormStatus = "idle" | "loading" | "success" | "error"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.")
      setStatus("error")
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.")
      setStatus("error")
      return
    }

    setStatus("loading")
    setError("")

    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to send your message. Please try again.")
      }

      setStatus("success")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch {
      setStatus("error")
      setError("Something went wrong. Please check your connection and try again.")
    }
  }

  return (
    <section className="py-16 sm:py-20 bg-muted/30" id="contact">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you have a question or just want to say hi, I&apos;ll get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>

            <div className="space-y-6 mb-8">
                <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground text-sm sm:text-base break-all">{personalInfo.email}</p>
                </div>
              </motion.a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground text-sm sm:text-base">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[
                { icon: Github, link: personalInfo.social.github },
                { icon: Linkedin, link: personalInfo.social.linkedin },
                { icon: Code, link: personalInfo.social.leetcode },
              ].map(({ icon: Icon, link }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-card border border-border hover:bg-primary/5"
                >
                  <Icon className="w-5 h-5 text-foreground" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              <input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              <textarea
                placeholder="Your message..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-sm"
              />

              {status === "success" && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={status === "loading" ? undefined : { scale: 1.02 }}
                whileTap={status === "loading" ? undefined : { scale: 0.98 }}
                className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
