"use client"

import { motion } from "framer-motion"
import { Code2, Zap, HeartHandshake, User } from "lucide-react"
import { personalInfo } from "@/lib/data"
import DottedWaves from "@/components/DottedWaves"

const traits = [
  { icon: Code2, title: "Clean Architecture", desc: "Maintainable", glow: "shadow-[0_0_24px_rgba(0,212,255,0.35)] border-cyan-400/30" },
  { icon: Zap, title: "Performance", desc: "Optimized", glow: "shadow-[0_0_24px_rgba(123,47,247,0.40)] border-violet-400/30" },
  { icon: HeartHandshake, title: "User Centric", desc: "Intuitive UX", glow: "shadow-[0_0_24px_rgba(255,74,149,0.35)] border-pink-400/30" },
]

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden">
      <DottedWaves className="opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground premium-ring">
            <User className="w-3 h-3 text-primary" /> About me
          </span>
          <h2 className="mt-4 font-space font-bold tracking-[-0.032em] text-3xl sm:text-4xl md:text-[42px] leading-none">
            Hello, I&apos;m <span className="gradient-text">{personalInfo.name}</span>
          </h2>
          <p className="mt-3 text-sm font-jetbrains tracking-[0.18em] uppercase text-primary">{personalInfo.title}</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.5fr_0.7fr] gap-5 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="opaque-glass protrude relative rounded-[28px] p-7 sm:p-9 overflow-hidden"
          >
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <div className="flex items-start gap-5">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_30px_rgba(0,212,255,0.25)]">
                  <img src="/profile.jpeg" alt={personalInfo.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#141519] shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
              </div>
              <div className="min-w-0">
                <p className="font-space font-semibold text-lg text-foreground">{personalInfo.name}</p>
                <p className="text-sm text-muted-foreground">{personalInfo.tagline}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85">
              <p>{personalInfo.bio}</p>
              <p className="text-muted-foreground text-sm">
                Based in {personalInfo.location} — open to remote roles, freelance builds, and AI-driven product engineering.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-jetbrains text-muted-foreground">
              <span className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10">3 years experience</span>
              <span className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10">Web + Mobile</span>
              <span className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10">Cloud & AI</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
            {traits.map(({ icon: Icon, title, desc, glow }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`glass protrude rounded-3xl p-5 flex flex-col items-center justify-center text-center gap-2 border ${glow}`}
              >
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/25 border border-white/12 grid place-items-center shadow-inner">
                  <Icon className="w-5 h-5 text-white drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                </span>
                <p className="font-space font-semibold text-sm leading-tight text-foreground">{title}</p>
                <p className="text-[11px] font-jetbrains tracking-wide text-muted-foreground uppercase">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
