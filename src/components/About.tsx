"use client"

import { motion } from "framer-motion"
import { Code2, Zap, HeartHandshake, MapPin, BadgeCheck } from "lucide-react"
import { personalInfo } from "@/lib/data"
import DottedWaves from "@/components/DottedWaves"
import SectionHeading from "@/components/SectionHeading"

const traits = [
  { icon: Code2, title: "Clean Architecture", desc: "Scalable • Maintainable", bar: "from-cyan-400 to-sky-500", glow: "group-hover:shadow-[0_0_36px_rgba(0,212,255,0.35)]" },
  { icon: Zap, title: "Performance", desc: "Fast • Optimized", bar: "from-violet-500 to-fuchsia-500", glow: "group-hover:shadow-[0_0_36px_rgba(123,47,247,0.40)]" },
  { icon: HeartHandshake, title: "User Centric", desc: "Intuitive • Delightful", bar: "from-pink-500 to-rose-400", glow: "group-hover:shadow-[0_0_36px_rgba(255,74,149,0.35)]" },
]

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden bg-[#05070f]">
      <DottedWaves className="opacity-50" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[320px] bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-pink-500/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <SectionHeading
          pill="About me"
          icon={<BadgeCheck className="w-3.5 h-3.5" />}
          title="Driven by craft,"
          highlight="defined by impact"
          sub={`${personalInfo.title} crafting scalable web & mobile experiences with clean code and thoughtful UX.`}
        />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.55fr_0.85fr] gap-5 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            whileHover={{ y: -4 }}
            className="opaque-glass protrude relative rounded-[30px] p-7 sm:p-10 overflow-hidden"
          >
            <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-80" />
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 blur-[70px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-28 -right-20 w-80 h-80 bg-violet-600/10 blur-[70px] rounded-full pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                <div className="absolute -inset-2 rounded-[1.6rem] bg-gradient-to-br from-cyan-400/40 via-violet-500/30 to-pink-500/30 blur-lg opacity-60" />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[1.4rem] overflow-hidden border border-white/20">
                  <img src="/profile.jpeg" alt={personalInfo.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <span className="absolute -bottom-1.5 -right-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950 text-[10px] font-bold border-2 border-[#12131a] shadow-[0_0_16px_rgba(16,185,129,0.9)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-950 animate-pulse" /> OPEN
                </span>
              </div>
              <div className="text-center sm:text-left min-w-0">
                <p className="font-jetbrains text-[11px] tracking-[0.24em] uppercase text-cyan-300">Hello, I&apos;m</p>
                <p className="font-space font-bold text-2xl sm:text-[28px] tracking-tight text-white mt-1">{personalInfo.name}</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">{personalInfo.tagline}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-pink-300" /> {personalInfo.location}
                </p>
              </div>
            </div>

            <div className="relative mt-7 rounded-2xl border-l-2 border-cyan-400/60 bg-white/[0.02] p-5 text-[15px] leading-relaxed text-foreground/90">
              <p>{personalInfo.bio}</p>
            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-3">
              {[
                { k: "3+", v: "Years exp" },
                { k: "15+", v: "Projects" },
                { k: "Web + Mobile", v: "Full stack" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 px-3 py-3.5 text-center">
                  <p className="font-space font-bold text-white text-sm sm:text-base">{s.k}</p>
                  <p className="text-[10px] font-jetbrains tracking-[0.14em] uppercase text-muted-foreground mt-1">{s.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {traits.map(({ icon: Icon, title, desc, bar, glow }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.015 }}
                className={`group relative rounded-[24px] opaque-glass protrude p-6 overflow-hidden text-center transition-shadow ${glow}`}
              >
                <div className={`absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent bg-gradient-to-r ${bar} opacity-70`} />
                <span className={`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br ${bar} grid place-items-center shadow-[0_10px_28px_rgba(0,0,0,0.4)] border border-white/20`}>
                  <Icon className="w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
                </span>
                <p className="mt-4 font-space font-semibold text-white">{title}</p>
                <p className="mt-1 text-[11px] font-jetbrains tracking-[0.12em] uppercase text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
