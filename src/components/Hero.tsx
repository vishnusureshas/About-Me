"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, Code2, ArrowRight, Sparkles, Copy, Check, Download } from "lucide-react"
import { personalInfo } from "@/lib/data"
import { useEffect, useState } from "react"
import DottedWaves from "@/components/DottedWaves"

const GREETING = "Hello, I'm"
const FULL_NAME = personalInfo.name
const FULL_ROLE = personalInfo.title

function useTypewriter() {
  // stage: 0 waiting → 1 greeting → 2 name → 3 role → 4 complete
  const [live, setLive] = useState(false)
  const [stage, setStage] = useState(0)
  const [chars, setChars] = useState(0)
  const [instant, setInstant] = useState(false)

  // Start trigger: loader event, already-ready flag, or timed fallback
  useEffect(() => {
    let cancelled = false
    const timers: number[] = []
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (reduced) {
      setInstant(true)
      setLive(true)
      setStage(4)
      return
    }
    const go = () => {
      if (!cancelled) setLive(true)
    }
    if ((window as unknown as { __portfolioReady?: boolean }).__portfolioReady) {
      timers.push(window.setTimeout(go, 350))
    } else {
      const onReady = () => {
        timers.push(window.setTimeout(go, 250))
      }
      window.addEventListener("preloader:done", onReady)
      timers.push(window.setTimeout(go, 3800))
      return () => {
        cancelled = true
        window.removeEventListener("preloader:done", onReady)
        timers.forEach(clearTimeout)
      }
    }
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [])

  // Single-timeout typing machine — one timer at a time, always cleaned up
  useEffect(() => {
    if (!live || instant || stage >= 4) return
    if (stage === 0) {
      const t = window.setTimeout(() => {
        setStage(1)
        setChars(0)
      }, 150)
      return () => clearTimeout(t)
    }
    const texts = [GREETING, FULL_NAME, FULL_ROLE]
    const speeds = [55, 95, 42]
    const text = texts[stage - 1]
    if (chars < text.length) {
      const t = window.setTimeout(() => setChars((c) => c + 1), speeds[stage - 1] + Math.random() * 35)
      return () => clearTimeout(t)
    }
    const t = window.setTimeout(() => {
      setStage((s) => s + 1)
      setChars(0)
    }, 340)
    return () => clearTimeout(t)
  }, [live, stage, chars, instant])

  const greet = instant ? GREETING : stage > 1 ? GREETING : stage === 1 ? GREETING.slice(0, chars) : ""
  const name = instant ? FULL_NAME : stage > 2 ? FULL_NAME : stage === 2 ? FULL_NAME.slice(0, chars) : ""
  const role = instant ? FULL_ROLE : stage > 3 ? FULL_ROLE : stage === 3 ? FULL_ROLE.slice(0, chars) : ""
  return { greet, name, role, started: live, done: live && (instant || stage >= 4) }
}

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const { greet, name, role, started, done } = useTypewriter()
  const copyEmail = async () => {
    await navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const downloadCV = () => {
    // Serves the byte-identical copy of the original `src/cv/Vishnu AS.pdf`
    // (Next.js can only serve files from `public/`), saved under the original name.
    const a = document.createElement("a")
    a.href = "/cv/Vishnu-AS-CV.pdf"
    a.download = "Vishnu AS.pdf"
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden bg-transparent section-light">
      {/* light depth + dotted wavy lines */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/20 to-transparent" />
        <DottedWaves className="opacity-70" />
        <div className="aurora aurora-cyan top-[-14%] left-[-12%]" style={{ animation: "aurora 16s ease-in-out infinite" }} />
        <div className="aurora aurora-violet top-[8%] right-[-16%]" style={{ animation: "aurora 18s ease-in-out infinite reverse" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 vignette pointer-events-none" />
      </div>

      {/* futuristic light frame hint */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-7xl h-[86%] rounded-[2.5rem] border border-slate-900/[0.06] bg-white/40 shadow-[0_0_100px_rgba(6,182,214,0.10),inset_0_0_70px_rgba(124,58,237,0.05)] pointer-events-none hidden md:block" />

      <div className="container mx-auto px-6 pt-28 pb-14 md:pt-36 md:pb-20 relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center max-w-7xl mx-auto">
          {/* Rounded rectangular photo - left to match prompt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1"
          >
            <div className="relative mx-auto w-full max-w-[440px]">
              <div className="absolute -inset-5 bg-gradient-to-br from-cyan-400/25 via-violet-400/20 to-pink-400/20 rounded-[2.4rem] blur-2xl -z-10" />
              <div className="absolute -inset-[1.5px] rounded-[1.8rem] -z-10 overflow-hidden opacity-70">
                <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent,rgba(6,182,214,0.55),transparent,rgba(236,72,153,0.45),transparent)] animate-[border-spin_6s_linear_infinite]" />
              </div>

              <div className="relative rounded-[1.8rem] opaque-glass protrude overflow-hidden p-3">
                <div className="relative rounded-[1.2rem] overflow-hidden bg-gradient-to-br from-slate-100 to-white border border-slate-200">
                  <div className="relative aspect-[4/4.4]">
                    <img src="/profile.jpeg" alt={personalInfo.name} className="w-full h-full object-cover" loading="eager" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/15 to-cyan-500/10" />
                    <div className="absolute inset-x-0 bottom-0 p-4 pt-10">
                      <p className="font-space text-lg font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">{personalInfo.name}</p>
                      <p className="mt-0.5 text-[13px] font-semibold text-cyan-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{personalInfo.title}</p>
                      <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-slate-900/55 px-2.5 py-1 font-jetbrains text-[11px] text-white/85 backdrop-blur-md">
                        <MapPin className="h-3 w-3 text-pink-200" /> Calicut, Kerala
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-slate-200 text-xs whitespace-nowrap shadow-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span className="font-jetbrains text-muted-foreground">React • Node • Postgres • AWS</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Headline right */}
          <div className="text-center lg:text-left order-2">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[12px] font-medium tracking-wide mb-6 premium-ring"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </span>
              <span className="text-foreground/90 font-jetbrains text-[11px] tracking-[0.12em] uppercase">Available for new opportunities</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="font-jetbrains text-[13px] tracking-[0.22em] uppercase text-cyan-700 min-h-[20px]"
              aria-label={GREETING}
            >
              <span aria-hidden="true">
                {greet}
                {started && !name && (
                  <span className="ml-0.5 inline-block w-[2px] h-[14px] translate-y-[2px] bg-cyan-300 animate-pulse shadow-[0_0_10px_rgba(0,212,255,0.9)]" />
                )}
              </span>
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="font-space font-bold tracking-[-0.032em] leading-[0.95] text-balance mt-2"
              aria-label={`${GREETING} ${FULL_NAME}, ${FULL_ROLE}`}
            >
              <span aria-hidden="true" className="block text-5xl sm:text-6xl md:text-[4.6rem] drop-shadow-[0_8px_28px_rgba(6,182,214,0.18)] min-h-[1.1em]">
                {(() => {
                  const cut = name.indexOf(" ")
                  const first = cut === -1 ? name : name.slice(0, cut)
                  const rest = cut === -1 ? "" : name.slice(cut + 1)
                  const typingName = name.length > 0 && name.length < FULL_NAME.length
                  return (
                    <>
                      <span className="text-slate-900">{first}</span>
                      {rest ? <span className="gradient-text"> {rest}</span> : name ? " " : null}
                      {typingName && (
                        <span className="ml-1 inline-block w-[3px] h-[0.9em] translate-y-[0.08em] bg-gradient-to-b from-cyan-500 to-violet-500 animate-pulse shadow-[0_0_14px_rgba(6,182,214,0.6)]" />
                      )}
                    </>
                  )
                })()}
              </span>
              <span aria-hidden="true" className="block mt-3 text-xl sm:text-2xl font-medium tracking-tight text-slate-700 min-h-[1.6em]">
                {role}
                {!done && name.length === FULL_NAME.length && (
                  <span className="ml-1 inline-block w-[2px] h-[1.1em] translate-y-[3px] bg-white/80 animate-pulse" />
                )}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mt-5 text-[16px] md:text-[18px] leading-relaxed text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-balance font-light"
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) }}
                className="neon-btn group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium focus-ring"
              >
                View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <button
                onClick={downloadCV}
                className="neon-btn neon-btn-secondary inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white backdrop-blur text-slate-900 font-medium focus-ring"
              >
                <Download className="w-4 h-4" /> Download CV
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={copyEmail}
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl glass hover:border-cyan-400/25 transition-colors text-left flex-1 sm:flex-initial focus-ring premium-ring"
                aria-label="Copy email"
              >
                <span className="w-9 h-9 rounded-xl bg-cyan-500/12 grid place-items-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-cyan-700" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-jetbrains tracking-[0.14em] uppercase text-muted-foreground">Email</span>
                  <span className="block text-sm font-medium text-foreground truncate">{personalInfo.email}</span>
                </span>
                <span className="ml-auto w-7 h-7 rounded-full bg-slate-900 text-white grid place-items-center flex-shrink-0">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </span>
              </button>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl glass flex-1 sm:flex-initial premium-ring">
                <span className="w-9 h-9 rounded-xl bg-violet-500/12 grid place-items-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-violet-700" />
                </span>
                <span>
                  <span className="block text-[10px] font-jetbrains tracking-[0.14em] uppercase text-muted-foreground">Based in</span>
                  <span className="block text-sm font-medium text-foreground">{personalInfo.location}</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mt-6 flex items-center justify-center lg:justify-start gap-3"
            >
              <span className="text-xs font-jetbrains tracking-wide text-muted-foreground hidden sm:block">Find me on</span>
              <div className="flex gap-2.5">
                {[
                  { icon: Github, href: personalInfo.social.github, label: "GitHub" },
                  { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
                  { icon: Code2, href: personalInfo.social.leetcode, label: "LeetCode" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="illum-tile w-11 h-11 rounded-xl grid place-items-center focus-ring"
                  >
                    <Icon className="w-[18px] h-[18px] text-foreground" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
