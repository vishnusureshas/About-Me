"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Loader2, FastForward } from "lucide-react"
import DottedWaves from "@/components/DottedWaves"

const STEPS = [
  { label: "Loading assets", at: 28 },
  { label: "Composing interface", at: 62 },
  { label: "Igniting visuals", at: 92 },
]

function statusFor(progress: number) {
  if (progress >= 100) return "System ready"
  if (progress >= 62) return "Calibrating visuals"
  if (progress >= 28) return "Loading modules"
  return "Initializing interface"
}

const RING = 70
const CIRC = 2 * Math.PI * RING

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const finished = useRef(false)

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    setProgress(100)
    setVisible(false)
    document.body.style.overflow = ""
    ;(window as unknown as { __portfolioReady?: boolean }).__portfolioReady = true
    window.dispatchEvent(new Event("preloader:done"))
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (reduced) {
      const t = window.setTimeout(finish, 200)
      return () => clearTimeout(t)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    let value = 0
    const tick = window.setInterval(() => {
      // fast start, gentle finish — feels alive, never stalls
      value += Math.max(1.6, (100 - value) * 0.08) + Math.random() * 2.4
      if (value >= 100) {
        window.clearInterval(tick)
        window.setTimeout(finish, 420)
      } else {
        setProgress(Math.floor(value))
      }
    }, 90)
    // hard cap: never trap the visitor (best practice)
    const cap = window.setTimeout(finish, 6000)
    return () => {
      window.clearInterval(tick)
      window.clearTimeout(cap)
      document.body.style.overflow = prevOverflow
    }
  }, [finish])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#05070f]"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <DottedWaves className="opacity-50" />
          <div className="absolute left-1/2 top-[-12%] h-[300px] w-[680px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/15 via-violet-600/15 to-pink-500/15 blur-[80px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-[#05070f]/70" />

          {/* HUD corner brackets */}
          <div className="pointer-events-none absolute inset-5 hidden sm:block" aria-hidden="true">
            <span className="absolute left-0 top-0 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-cyan-400/40" />
            <span className="absolute right-0 top-0 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-violet-400/40" />
            <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-violet-400/40" />
            <span className="absolute bottom-0 right-0 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-pink-400/40" />
          </div>

          <div className="relative flex flex-col items-center px-6 text-center">
            {/* Quantum core: tick ring + energy ring + progress arc + pulsing core */}
            <div className="relative h-44 w-44">
              {/* static tick dial */}
              <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                <circle cx="80" cy="80" r="76" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
              </svg>
              {/* rotating energy sweep */}
              <div className="absolute -inset-1 overflow-hidden rounded-full opacity-90" aria-hidden="true">
                <div className="absolute inset-[-45%] animate-[border-spin_3.2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,212,255,0.85)_70deg,transparent_140deg,transparent_200deg,rgba(255,74,149,0.7)_260deg,transparent_320deg)]" />
              </div>
              {/* glass core */}
              <div className="absolute inset-3 grid place-items-center rounded-full border border-white/10 bg-[#0a0f1e]/95 shadow-[0_0_60px_rgba(0,212,255,0.18),inset_0_0_30px_rgba(123,47,247,0.12)]">
                <motion.span
                  className="absolute h-16 w-16 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(0,212,255,0.9),rgba(123,47,247,0.75)_55%,rgba(255,74,149,0.5))]"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <span className="relative font-space text-4xl font-bold tabular-nums text-white drop-shadow-[0_0_18px_rgba(0,212,255,0.45)]">
                  {progress}
                </span>
                <span className="relative -mt-1 font-jetbrains text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">
                  {progress < 100 ? "Loading" : "Ready"}
                </span>
              </div>
              {/* progress arc */}
              <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                <defs>
                  <linearGradient id="loader-arc" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="55%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <circle cx="80" cy="80" r={RING} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                <circle
                  cx="80"
                  cy="80"
                  r={RING}
                  fill="none"
                  stroke="url(#loader-arc)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - progress / 100)}
                  style={{ filter: "drop-shadow(0 0 6px rgba(0,212,255,0.8))", transition: "stroke-dashoffset 0.15s ease-out" }}
                />
              </svg>
              {/* orbiting satellites */}
              <motion.span
                className="absolute -inset-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,212,255,1)]" />
              </motion.span>
              <motion.span
                className="absolute -inset-4"
                animate={{ rotate: -360 }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-pink-400 shadow-[0_0_10px_rgba(255,74,149,1)]" />
              </motion.span>
            </div>

            {/* status line */}
            <p className="mt-7 font-jetbrains text-[11px] uppercase tracking-[0.32em] text-muted-foreground" aria-live="polite">
              {statusFor(progress)}
              <span className="ml-1 inline-block animate-pulse text-cyan-300">▮</span>
            </p>

            {/* linear bar + boot checklist */}
            <div className="mt-5 w-64 sm:w-80">
              <div className="relative h-[6px] overflow-hidden rounded-full border border-white/10 bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_16px_rgba(0,212,255,0.7)] transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <ul className="mt-5 space-y-2 text-left">
                {STEPS.map(({ label, at }) => {
                  const done = progress >= at
                  const active = !done && progress >= at - 28
                  return (
                    <li key={label} className="flex items-center gap-2.5 text-[12px]">
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full border transition-all duration-300 ${
                          done
                            ? "border-emerald-300/50 bg-emerald-400/15 text-emerald-300"
                            : "border-white/15 bg-white/[0.03] text-transparent"
                        }`}
                      >
                        {done ? <Check className="h-3 w-3" /> : active ? <Loader2 className="h-3 w-3 animate-spin text-cyan-300" /> : null}
                      </span>
                      <span className={done ? "text-white/85" : active ? "text-white/60" : "text-muted-foreground/50"}>
                        {label}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <button
              onClick={finish}
              className="mt-7 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-jetbrains text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-cyan-300/30 hover:text-white focus-ring"
            >
              <FastForward className="h-3.5 w-3.5" /> Skip intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
