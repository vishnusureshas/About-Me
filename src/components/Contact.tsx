"use client"

import { useState, useEffect, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, Code2, Send, Loader2, CheckCircle2, AlertCircle, MessageCircle, X, Clock3, ShieldCheck } from "lucide-react"
import { personalInfo } from "@/lib/data"
import SectionHeading from "@/components/SectionHeading"

const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"
const API_URL = RAW_API_URL.replace(/\/+$/, "")
type FormStatus = "idle" | "loading" | "success" | "error"

const inputCls =
  "w-full px-4 py-3.5 rounded-2xl bg-[#0a0f1e]/80 border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-400/20 focus:bg-[#0b1226] transition-all text-sm shadow-inner"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [error, setError] = useState("")

  useEffect(() => {
    if (status !== "success" && status !== "error") return
    const timer = setTimeout(() => {
      setStatus("idle")
      setError("")
    }, status === "success" ? 6000 : 8000)
    return () => clearTimeout(timer)
  }, [status])

  const dismissAlert = () => {
    setStatus("idle")
    setError("")
  }

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
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        const serverMsg = (data as { error?: string })?.error
        throw new Error(serverMsg || "Failed to send your message. Please try again.")
      }
      setStatus("success")
      setName(""); setEmail(""); setSubject(""); setMessage("")
    } catch (err) {
      setStatus("error")
      const msg = err instanceof Error ? err.message : "Something went wrong. Please check your connection and try again."
      if (msg === "Failed to fetch" || msg.includes("fetch")) {
        setError("Cannot reach server. Ensure backend is running on " + API_URL)
      } else {
        setError(msg)
      }
    }
  }

  return (
    <section className="relative py-20 sm:py-28 bg-[#05070f] overflow-hidden" id="contact">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[300px] bg-gradient-to-r from-cyan-500/10 via-violet-600/10 to-pink-500/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 animated-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <SectionHeading
          pill="Get in touch"
          icon={<MessageCircle className="w-3.5 h-3.5" />}
          title="Let's build something"
          highlight="exceptional"
          sub="Have an idea, a role, or just want to say hi? I'll get back within 24 hours."
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 max-w-6xl mx-auto items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="opaque-glass protrude relative rounded-[30px] overflow-hidden p-7 sm:p-9 flex flex-col"
          >
            <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 opacity-80" />
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/12 blur-[70px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-violet-600/12 blur-[70px] rounded-full pointer-events-none" />

            <div className="relative flex items-center gap-3">
              <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 grid place-items-center border border-white/20 shadow-[0_10px_28px_rgba(0,212,255,0.3)]">
                <Mail className="w-5 h-5 text-white" />
              </span>
              <div>
                <h3 className="font-space font-bold text-xl tracking-tight text-white">Contact information</h3>
                <p className="text-sm text-muted-foreground">Responsive • Remote-friendly • Open to work</p>
              </div>
            </div>

            <div className="relative mt-7 space-y-3.5">
              <a href={`mailto:${personalInfo.email}`} className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-cyan-300/30 hover:shadow-[0_0_28px_rgba(0,212,255,0.18)] transition-all focus-ring">
                <span className="w-12 h-12 rounded-xl bg-cyan-400/15 border border-cyan-300/20 grid place-items-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-cyan-200" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground">Email me at</span>
                  <span className="block text-[14px] font-semibold text-white break-all">{personalInfo.email}</span>
                </span>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-400/20 grid place-items-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-violet-200" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground">Based in</span>
                  <span className="block text-[14px] font-semibold text-white">{personalInfo.location}</span>
                </span>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[11px] font-jetbrains px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-300/20 text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" /> IST
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
                  <Clock3 className="w-4 h-4 mx-auto text-cyan-300" />
                  <p className="mt-1.5 text-xs font-semibold text-white">24h reply</p>
                  <p className="text-[11px] text-muted-foreground">Fast response</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
                  <ShieldCheck className="w-4 h-4 mx-auto text-emerald-300" />
                  <p className="mt-1.5 text-xs font-semibold text-white">No spam</p>
                  <p className="text-[11px] text-muted-foreground">Respect inbox</p>
                </div>
              </div>
            </div>

            <div className="relative mt-7 pt-6 border-t border-white/[0.08]">
              <p className="text-[11px] font-jetbrains tracking-[0.2em] uppercase text-muted-foreground mb-3">Connect elsewhere</p>
              <div className="flex gap-2.5">
                {[
                  { icon: Github, link: personalInfo.social.github, label: "GitHub" },
                  { icon: Linkedin, link: personalInfo.social.linkedin, label: "LinkedIn" },
                  { icon: Code2, link: personalInfo.social.leetcode, label: "LeetCode" },
                ].map(({ icon: Icon, link, label }) => (
                  <a key={label} href={link} target="_blank" rel="noopener noreferrer" aria-label={label} className="illum-tile w-12 h-12 rounded-2xl grid place-items-center focus-ring">
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="opaque-glass protrude rounded-[30px] p-6 sm:p-9 relative overflow-hidden"
          >
            <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 opacity-80" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-fuchsia-600/10 blur-[70px] rounded-full pointer-events-none" />
            <div className="relative flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-space font-bold text-xl tracking-tight text-white">Send a message</h3>
                <p className="text-sm text-muted-foreground mt-1">Tell me about your project, timeline and goals.</p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-300/20 text-xs font-jetbrains text-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" /> Secure
              </span>
            </div>

            <form className="space-y-4 relative" onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-[11px] font-jetbrains tracking-[0.14em] uppercase text-muted-foreground mb-2">Your name *</span>
                  <input placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} autoComplete="name" />
                </label>
                <label className="block">
                  <span className="block text-[11px] font-jetbrains tracking-[0.14em] uppercase text-muted-foreground mb-2">Email *</span>
                  <input type="email" placeholder="jane@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoComplete="email" />
                </label>
              </div>
              <label className="block">
                <span className="block text-[11px] font-jetbrains tracking-[0.14em] uppercase text-muted-foreground mb-2">Subject</span>
                <input placeholder="Project inquiry, collaboration, hiring..." value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls} />
              </label>
              <label className="block">
                <span className="block text-[11px] font-jetbrains tracking-[0.14em] uppercase text-muted-foreground mb-2">Message *</span>
                <textarea placeholder="Share timeline, budget range, and what success looks like..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputCls} resize-none leading-relaxed`} />
              </label>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div key="success" role="status" aria-live="polite" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 text-emerald-200 text-sm shadow-[0_0_24px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1"><span className="font-semibold">Message sent!</span> I&apos;ll reply within 24 hours.</span>
                    <button type="button" onClick={dismissAlert} aria-label="Dismiss notification" className="ml-2 p-1 rounded-lg hover:bg-emerald-500/15 transition-colors focus-ring">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div key="error" role="alert" aria-live="assertive" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-start gap-2 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-400/25 text-red-200 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="flex-1">{error}</span>
                    <button type="button" onClick={dismissAlert} aria-label="Dismiss notification" className="ml-2 p-1 rounded-lg hover:bg-red-500/15 transition-colors focus-ring">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={status === "loading" ? undefined : { scale: 1.01 }}
                whileTap={status === "loading" ? undefined : { scale: 0.99 }}
                className="neon-btn shimmer w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 text-white font-semibold shadow-[0_12px_40px_rgba(123,47,247,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-ring"
              >
                {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending securely...</> : <><Send className="w-4 h-4" /> Send message</>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
