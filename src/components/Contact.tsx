"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, Code2, Send, Loader2, CheckCircle2, AlertCircle, Sparkles, MessageCircle } from "lucide-react"
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
      if (!response.ok) throw new Error("Failed to send your message. Please try again.")
      setStatus("success")
      setName(""); setEmail(""); setSubject(""); setMessage("")
    } catch {
      setStatus("error")
      setError("Something went wrong. Please check your connection and try again.")
    }
  }

  return (
    <section className="relative py-20 sm:py-28" id="contact">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background pointer-events-none" />
      <div className="absolute inset-0 animated-grid opacity-40 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground premium-ring">
            <MessageCircle className="w-3 h-3 text-primary" /> Get in touch
          </span>
          <h2 className="mt-4 font-space font-bold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[42px] leading-none text-foreground">
            Let&apos;s build something <span className="gradient-text">exceptional</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Have an idea, a role, or just want to say hi? I&apos;ll get back within 24 hours.</p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.95fr_1.15fr] gap-6 sm:gap-8 max-w-6xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="rounded-[28px] glass-strong premium-ring overflow-hidden p-7 sm:p-8 relative">
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <h3 className="font-space font-semibold text-xl tracking-tight text-foreground">Contact information</h3>
              <p className="text-sm text-muted-foreground mt-2">Prefer email or a quick call — I&apos;m responsive and open to remote.</p>

              <div className="mt-7 space-y-3">
                <a href={`mailto:${personalInfo.email}`} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-primary/20 hover:bg-white/[0.06] transition-colors focus-ring">
                  <span className="w-11 h-11 rounded-xl bg-primary/15 grid place-items-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-jetbrains tracking-[0.14em] uppercase text-muted-foreground">Email</span>
                    <span className="block text-sm font-medium text-foreground break-all">{personalInfo.email}</span>
                  </span>
                  <Sparkles className="w-4 h-4 text-muted-foreground ml-auto hidden sm:block group-hover:text-primary transition-colors" />
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <span className="w-11 h-11 rounded-xl bg-secondary/15 grid place-items-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-jetbrains tracking-[0.14em] uppercase text-muted-foreground">Location</span>
                    <span className="block text-sm font-medium text-foreground">{personalInfo.location}</span>
                    <span className="block text-xs text-muted-foreground">Open to remote • IST (UTC+5:30)</span>
                  </span>
                </div>
              </div>

              <div className="mt-7">
                <p className="text-xs font-jetbrains tracking-[0.14em] uppercase text-muted-foreground mb-3">Connect</p>
                <div className="flex gap-2.5">
                  {[
                    { icon: Github, link: personalInfo.social.github, label: "GitHub" },
                    { icon: Linkedin, link: personalInfo.social.linkedin, label: "LinkedIn" },
                    { icon: Code2, link: personalInfo.social.leetcode, label: "LeetCode" },
                  ].map(({ icon: Icon, link, label }) => (
                    <a
                      key={label}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 rounded-xl glass grid place-items-center hover:scale-105 hover:border-primary/20 transition-all focus-ring"
                    >
                      <Icon className="w-5 h-5 text-foreground" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 border border-white/10 p-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <p className="text-sm text-foreground/90"><span className="font-semibold">Avg. response time:</span> ~3 hours during IST work hours.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[28px] glass-strong premium-ring p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-start justify-between gap-4 mb-6 relative">
              <div>
                <h3 className="font-space font-semibold text-xl tracking-tight text-foreground">Send a message</h3>
                <p className="text-sm text-muted-foreground mt-1">Tell me a bit about your project or opportunity.</p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-jetbrains text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Secure form
              </span>
            </div>

            <form className="space-y-4 relative" onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="group relative block">
                  <span className="block text-[11px] font-jetbrains tracking-[0.12em] uppercase text-muted-foreground mb-1.5">Your name *</span>
                  <input
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-colors text-sm"
                    autoComplete="name"
                  />
                </label>
                <label className="group relative block">
                  <span className="block text-[11px] font-jetbrains tracking-[0.12em] uppercase text-muted-foreground mb-1.5">Email *</span>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-colors text-sm"
                    autoComplete="email"
                  />
                </label>
              </div>
              <label className="block">
                <span className="block text-[11px] font-jetbrains tracking-[0.12em] uppercase text-muted-foreground mb-1.5">Subject</span>
                <input
                  placeholder="Project inquiry, collaboration, hiring..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-colors text-sm"
                />
              </label>
              <label className="block">
                <span className="block text-[11px] font-jetbrains tracking-[0.12em] uppercase text-muted-foreground mb-1.5">Message *</span>
                <textarea
                  placeholder="Share a bit about what you’re building..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-colors resize-none text-sm leading-relaxed"
                />
              </label>

              {status === "success" && (
                <motion.div role="status" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> Message sent successfully! I&apos;ll get back to you within 24 hours.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> <span>{error}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={status === "loading" ? undefined : { scale: 1.01 }}
                whileTap={status === "loading" ? undefined : { scale: 0.99 }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-[0_10px_30px_rgba(0,212,255,0.25)] hover:shadow-[0_12px_36px_rgba(0,212,255,0.32)] transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-ring"
              >
                {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send message</>}
              </motion.button>
              <p className="text-center text-xs text-muted-foreground">No spam — I respect your inbox.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
