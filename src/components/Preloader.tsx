"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Loader2, FastForward } from "lucide-react"
import DottedWaves from "@/components/DottedWaves"

const NAME = "VISHNU A.S"
const ROLE = "Full Stack Developer"

const STEPS = [
  { label: "Loading assets", at: 28 },
  { label: "Composing sections", at: 62 },
  { label: "Igniting neon engine", at: 92 },
]

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
          aria-label="Loading portfolio"
        >
          <DottedWaves className="opacity-60" />
          <div className="absolute left-1/2 top-[-12%] h-[300px] w-[680px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/15 via-violet-600/15 to-pink-500/15 blur-[80px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-[#05070f]/70" />

          <div className="relative flex flex-col items-center px-6 text-center">
            {/* monogram */}
            <div className="relative h-24 w-24">
              <div className="absolute -inset-[3px] overflow-hidden rounded-[1.7rem]">
                <div className="absolute inset-[-60%] animate-[border-spin_1.6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,rgba(0,212,255,0.9),transparent,rgba(255,74,149,0.8),transparent)]" />
              </div>
              <div className="absolute inset-0 grid place-items-center rounded-[1.55rem] border border-white/10 bg-[#0a0f1e] shadow-[0_0_50px_rgba(0,212,255,0.15)]">
                <motion.span
                  className="font-space text-3xl font-bold text-white"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  V<span className="gradient-text">.</span>
                </motion.span>
              </div>
              {/* orbiting dot */}
              <motion.span
                className="absolute -inset-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,212,255,1)]" />
              </motion.span>
            </div>

            {/* staggered name */}
            <div className="mt-7 flex overflow-hidden font-space text-sm font-bold tracking-[0.3em] text-white sm:text-base" aria-label={NAME}>
              {NAME.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.035, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-2 font-jetbrains text-[11px] uppercase tracking-[0.32em] text-cyan-300/80"
            >
              {ROLE}
            </motion.p>

            {/* progress */}
            <div className="mt-7 w-64 sm:w-80">
              <div className="flex items-end justify-between">
                <span className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {progress < 100 ? "Preparing experience" : "Ready"}
                </span>
                <span className="font-space text-2xl font-bold tabular-nums text-white">
                  {progress}
                  <span className="text-sm text-muted-foreground">%</span>
                </span>
              </div>
              <div className="relative mt-2 h-[6px] overflow-hidden rounded-full border border-white/10 bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_16px_rgba(0,212,255,0.7)] transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
                <div className="shimmer pointer-events-none absolute inset-0" />
              </div>

              {/* boot checklist */}
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
