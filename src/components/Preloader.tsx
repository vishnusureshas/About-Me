"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DottedWaves from "@/components/DottedWaves"

const STATUS = [
  "Initializing portfolio…",
  "Loading neon modules…",
  "Compiling experience…",
  "Polishing pixels…",
]

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setProgress(100)
      const t = setTimeout(finish, 250)
      return () => clearTimeout(t)
    }
    document.body.style.overflow = "hidden"
    let value = 0
    const tick = window.setInterval(() => {
      // eased increments: fast start, slow finish
      value += Math.max(1.5, (100 - value) * 0.075) + Math.random() * 2.5
      if (value >= 100) {
        value = 100
        window.clearInterval(tick)
        setProgress(100)
        setTimeout(finish, 380)
      } else {
        setProgress(Math.floor(value))
      }
    }, 90)
    return () => window.clearInterval(tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const finish = () => {
    setVisible(false)
    document.body.style.overflow = ""
    ;(window as unknown as { __portfolioReady?: boolean }).__portfolioReady = true
    window.dispatchEvent(new Event("preloader:done"))
  }

  const status = STATUS[Math.min(STATUS.length - 1, Math.floor((progress / 100) * STATUS.length))]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070f] overflow-hidden"
          exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Loading portfolio"
          role="status"
        >
          <DottedWaves className="opacity-50" />
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[640px] h-[300px] bg-gradient-to-r from-cyan-500/15 via-violet-600/15 to-pink-500/15 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-[#05070f]/60 pointer-events-none" />

          <div className="relative flex flex-col items-center px-6 text-center">
            {/* monogram with rotating neon ring */}
            <div className="relative w-24 h-24">
              <div className="absolute -inset-[3px] rounded-[1.7rem] overflow-hidden">
                <div className="absolute inset-[-60%] bg-[conic-gradient(from_0deg,transparent,rgba(0,212,255,0.9),transparent,rgba(255,74,149,0.8),transparent)] animate-[border-spin_1.6s_linear_infinite]" />
              </div>
              <div className="absolute inset-0 rounded-[1.55rem] bg-[#0a0f1e] border border-white/10 grid place-items-center">
                <motion.span
                  className="font-space font-bold text-3xl text-white"
                  animate={{ opacity: [1, 0.65, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  V<span className="gradient-text">.</span>
                </motion.span>
              </div>
              <motion.span
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 text-[10px] font-bold whitespace-nowrap shadow-[0_0_16px_rgba(16,185,129,0.9)]"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                {progress}%
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-7 font-space font-bold tracking-[0.28em] text-white text-sm sm:text-base"
            >
              VISHNU&nbsp;A.S
            </motion.p>
            <p className="mt-1.5 font-jetbrains text-[11px] tracking-[0.3em] uppercase text-cyan-300/80">
              Full Stack Developer
            </p>

            {/* progress bar */}
            <div className="mt-6 w-64 sm:w-72">
              <div className="h-[5px] rounded-full bg-white/[0.07] border border-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_16px_rgba(0,212,255,0.7)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
                <div className="shimmer absolute inset-0 pointer-events-none" />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] font-jetbrains text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                  {status}
                </span>
                <span className="tabular-nums">{progress}/100</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
