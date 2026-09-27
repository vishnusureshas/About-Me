"use client"

import { motion } from "framer-motion"

export default function SectionHeading({
  pill,
  icon,
  title,
  highlight,
  sub,
}: {
  pill: string
  icon: React.ReactNode
  title: string
  highlight: string
  sub: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 relative"
    >
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur text-[11px] font-jetbrains tracking-[0.2em] uppercase text-muted-foreground shadow-[0_0_24px_rgba(0,212,255,0.12)]">
        <span className="text-cyan-300">{icon}</span> {pill}
      </span>
      <h2 className="mt-5 font-space font-bold tracking-[-0.035em] text-4xl sm:text-5xl md:text-[46px] leading-[1.02] text-white text-balance">
        {title} <span className="gradient-text drop-shadow-[0_0_24px_rgba(123,47,247,0.35)]">{highlight}</span>
      </h2>
      <p className="mt-4 text-muted-foreground leading-relaxed text-balance max-w-xl mx-auto">{sub}</p>
      <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,212,255,0.9)]" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500/60" />
      </div>
    </motion.div>
  )
}
