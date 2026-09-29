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
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 backdrop-blur text-[11px] font-jetbrains tracking-[0.2em] uppercase text-muted-foreground shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
        <span className="text-cyan-600">{icon}</span> {pill}
      </span>
      <h2 className="mt-5 font-space font-bold tracking-[-0.035em] text-4xl sm:text-5xl md:text-[46px] leading-[1.02] text-slate-900 text-balance">
        {title} <span className="gradient-text">{highlight}</span>
      </h2>
      <p className="mt-4 text-muted-foreground leading-relaxed text-balance max-w-xl mx-auto">{sub}</p>
      <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,214,0.6)]" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500/60" />
      </div>
    </motion.div>
  )
}
