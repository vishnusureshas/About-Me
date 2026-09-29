"use client"

import { useState, useEffect, useCallback, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, Code2, Send, Loader2, Check, AlertCircle, MessageCircle, X, Clock3, ShieldCheck, Sparkles, PartyPopper } from "lucide-react"
import { personalInfo } from "@/lib/data"
import SectionHeading from "@/components/SectionHeading"

const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"
const API_URL = RAW_API_URL.replace(/\/+$/, "")
type FormStatus = "idle" | "loading" | "success" | "error"

const inputCls =
  "w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-muted-foreground/60 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/15 focus:bg-white transition-all text-sm shadow-sm"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [error, setError] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [sentName, setSentName] = useState("")

  useEffect(() => {
    if (status !== "error") return
    const timer = setTimeout(() => {
      setStatus("idle")
      setError("")
    }, 8000)
    return () => clearTimeout(timer)
  }, [status])

  const dismissAlert = () => {
    setStatus("idle")
    setError("")
  }

  const closeSuccessModal = useCallback(() => {
    setShowSuccessModal(false)
    setStatus("idle")
  }, [])

  // Lock body scroll + close on Escape while the success modal is open
  useEffect(() => {
    if (!showSuccessModal) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSuccessModal()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [showSuccessModal, closeSuccessModal])

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
      setSentName(name.trim())
      setStatus("success")
      setShowSuccessModal(true)
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
    <section className="relative py-20 sm:py-28 bg-transparent section-light overflow-hidden" id="contact">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[300px] bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-pink-400/18 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 animated-grid opacity-60 pointer-events-none" />

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
            <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 opacity-80" />
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-400/20 blur-[70px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-violet-400/20 blur-[70px] rounded-full pointer-events-none" />

            <div className="relative flex items-center gap-3">
              <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 grid place-items-center border border-white/40 shadow-[0_10px_24px_rgba(6,182,214,0.28)]">
                <Mail className="w-5 h-5 text-white" />
              </span>
              <div>
                <h3 className="font-space font-bold text-xl tracking-tight text-slate-900">Contact information</h3>
                <p className="text-sm text-muted-foreground">Responsive • Remote-friendly • Open to work</p>
              </div>
            </div>

            <div className="relative mt-7 space-y-3.5">
              <a href={`mailto:${personalInfo.email}`} className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-cyan-500/30 hover:shadow-[0_8px_28px_rgba(6,182,214,0.16)] transition-all focus-ring shadow-sm">
                <span className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 grid place-items-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-cyan-700" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground">Email me at</span>
                  <span className="block text-[14px] font-semibold text-slate-900 break-all">{personalInfo.email}</span>
                </span>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 grid place-items-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-violet-700" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground">Based in</span>
                  <span className="block text-[14px] font-semibold text-slate-900">{personalInfo.location}</span>
                </span>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[11px] font-jetbrains px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> IST
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <Clock3 className="w-4 h-4 mx-auto text-cyan-600" />
                  <p className="mt-1.5 text-xs font-semibold text-slate-900">24h reply</p>
                  <p className="text-[11px] text-muted-foreground">Fast response</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <ShieldCheck className="w-4 h-4 mx-auto text-emerald-600" />
                  <p className="mt-1.5 text-xs font-semibold text-slate-900">No spam</p>
                  <p className="text-[11px] text-muted-foreground">Respect inbox</p>
                </div>
              </div>
            </div>

            <div className="relative mt-7 pt-6 border-t border-slate-200">
              <p className="text-[11px] font-jetbrains tracking-[0.2em] uppercase text-muted-foreground mb-3">Connect elsewhere</p>
              <div className="flex gap-2.5">
                {[
                  { icon: Github, link: personalInfo.social.github, label: "GitHub" },
                  { icon: Linkedin, link: personalInfo.social.linkedin, label: "LinkedIn" },
                  { icon: Code2, link: personalInfo.social.leetcode, label: "LeetCode" },
                ].map(({ icon: Icon, link, label }) => (
                  <a key={label} href={link} target="_blank" rel="noopener noreferrer" aria-label={label} className="illum-tile w-12 h-12 rounded-2xl grid place-items-center focus-ring">
                    <Icon className="w-5 h-5 text-slate-800" />
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
            <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 opacity-80" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-fuchsia-400/20 blur-[70px] rounded-full pointer-events-none" />
            <div className="relative flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-space font-bold text-xl tracking-tight text-slate-900">Send a message</h3>
                <p className="text-sm text-muted-foreground mt-1">Tell me about your project, timeline and goals.</p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-jetbrains text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Secure
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

      {/* ── Beautiful success modal ─────────────────────────────────── */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            key="contact-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            aria-describedby="contact-success-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close success message"
              onClick={closeSuccessModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md cursor-default"
            />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[380px] bg-gradient-to-r from-cyan-400/25 via-violet-400/25 to-pink-400/25 blur-[90px] rounded-full" />
            </div>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200 bg-white/95 shadow-[0_32px_80px_rgba(15,23,42,0.20),0_0_50px_rgba(6,182,214,0.12)] backdrop-blur-xl"
            >
              <div className="absolute inset-x-10 top-0 h-[3px] rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />
              <div className="absolute -top-20 -left-20 w-56 h-56 bg-cyan-500/15 blur-[60px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-fuchsia-600/15 blur-[60px] rounded-full pointer-events-none" />

              {/* Confetti sparkles */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {[
                  { left: "12%", top: "18%", delay: 0, size: 14, color: "text-cyan-300" },
                  { left: "84%", top: "22%", delay: 0.15, size: 12, color: "text-pink-300" },
                  { left: "20%", top: "68%", delay: 0.3, size: 10, color: "text-violet-300" },
                  { left: "78%", top: "70%", delay: 0.45, size: 14, color: "text-emerald-300" },
                  { left: "50%", top: "10%", delay: 0.2, size: 10, color: "text-amber-200" },
                  { left: "66%", top: "38%", delay: 0.35, size: 9, color: "text-cyan-200" },
                ].map((p, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -30, y: 8 }}
                    animate={{ opacity: [0, 1, 1, 0.9], scale: [0, 1.2, 1, 1], rotate: 20, y: [8, -6, 0] }}
                    transition={{ delay: 0.25 + p.delay, duration: 1.4, repeat: Infinity, repeatDelay: 2.2 }}
                    style={{ left: p.left, top: p.top }}
                    className={`absolute ${p.color}`}
                  >
                    <Sparkles style={{ width: p.size, height: p.size }} />
                  </motion.span>
                ))}
              </div>

              <button
                type="button"
                onClick={closeSuccessModal}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-100 border border-slate-200 text-muted-foreground hover:text-slate-900 hover:bg-slate-200 transition-all focus-ring"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative px-7 sm:px-9 pt-10 pb-7 text-center">
                {/* Animated check */}
                <div className="relative mx-auto w-fit">
                  <motion.div
                    animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-3 rounded-full bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-violet-500/30 blur-xl"
                    aria-hidden="true"
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                    className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 grid place-items-center border border-white/30 shadow-[0_16px_50px_rgba(16,185,129,0.45)]"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
                    >
                      <Check className="w-10 h-10 text-white" strokeWidth={3} />
                    </motion.span>
                  </motion.div>
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.45, type: "spring", stiffness: 300, damping: 14 }}
                    className="absolute -top-1 -right-2 w-8 h-8 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 grid place-items-center border border-white/25 shadow-lg"
                  >
                    <PartyPopper className="w-4 h-4 text-white" />
                  </motion.span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.45 }}
                >
                  <p className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-jetbrains tracking-[0.18em] uppercase text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Delivered successfully
                  </p>
                  <h3 id="contact-success-title" className="mt-4 font-space font-bold text-2xl sm:text-[26px] tracking-tight text-slate-900 leading-tight">
                    Thank you{sentName ? `, ${sentName}` : ""}!{" "}
                    <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                      Message sent.
                    </span>
                  </h3>
                  <p id="contact-success-desc" className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    Your message has landed safely in my inbox. I&apos;ll read it carefully
                    and reply within <span className="text-slate-900 font-semibold">24 hours</span>.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.4 }}
                  className="mt-5 grid grid-cols-2 gap-2.5 text-left"
                >
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 grid place-items-center flex-shrink-0">
                      <Clock3 className="w-4 h-4 text-cyan-700" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold text-slate-900">24h reply</span>
                      <span className="block text-[11px] text-muted-foreground">Fast response</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 grid place-items-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold text-slate-900">Private</span>
                      <span className="block text-[11px] text-muted-foreground">No spam, ever</span>
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mt-6 flex flex-col sm:flex-row gap-2.5"
                >
                  <button
                    type="button"
                    onClick={closeSuccessModal}
                    className="neon-btn shimmer flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 text-white text-sm font-semibold shadow-[0_12px_40px_rgba(123,47,247,0.35)] hover:brightness-110 transition-all focus-ring"
                  >
                    <Send className="w-4 h-4" />
                    Send another message
                  </button>
                  <button
                    type="button"
                    onClick={closeSuccessModal}
                    className="px-6 py-3.5 rounded-full text-sm font-semibold text-muted-foreground hover:text-slate-900 bg-slate-100 border border-slate-200 hover:border-slate-300 hover:bg-slate-200 transition-all focus-ring"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
