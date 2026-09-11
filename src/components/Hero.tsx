"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, Code2, ArrowRight, Sparkles, Copy, Check } from "lucide-react"
import { personalInfo } from "@/lib/data"
import { useState } from "react"

const stats = [
  { value: "3+", label: "Years Exp." },
  { value: "12+", label: "Projects Shipped" },
  { value: "99%", label: "Client Satisfaction" },
]

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    await navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        <div className="animated-grid absolute inset-0" />
        <div className="aurora aurora-cyan top-[-10%] left-[-10%]" style={{ animation: "aurora 14s ease-in-out infinite" }} />
        <div className="aurora aurora-violet top-[10%] right-[-15%]" style={{ animation: "aurora 16s ease-in-out infinite reverse" }} />
        <div className="aurora aurora-pink bottom-[-10%] left-[25%]" style={{ width: "50%", height: "48%", opacity: 0.35 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <motion.div
        className="absolute top-[18%] right-[8%] w-[520px] h-[520px] rounded-full blur-[80px] pointer-events-none hidden lg:block"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.09), transparent 70%)" }}
        animate={{ scale: [1, 1.08, 1], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 pt-28 pb-14 md:pt-36 md:pb-20 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-8 items-center max-w-7xl mx-auto">
          {/* Left */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[12px] font-medium tracking-wide mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-foreground/90 font-jetbrains text-[11px] tracking-[0.12em] uppercase">Available for new opportunities</span>
              <Sparkles className="w-3.5 h-3.5 text-primary hidden sm:block" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="font-space font-bold tracking-[-0.03em] leading-[0.9] text-balance"
            >
              <span className="block text-[13px] sm:text-sm font-jetbrains font-normal tracking-[0.2em] text-muted-foreground uppercase mb-3">{personalInfo.title}</span>
              <span className="block text-5xl sm:text-6xl md:text-[5rem] lg:text-[4.6rem] xl:text-[5.2rem]">
                <span className="text-foreground">{personalInfo.name.split(" ")[0]}</span>{" "}
                <span className="gradient-text">{personalInfo.name.split(" ").slice(1).join(" ")}</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-5 text-[17px] md:text-[19px] leading-relaxed text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-balance font-light"
            >
              {personalInfo.tagline} — <span className="text-foreground/80">{personalInfo.bio.slice(0, 124)}…</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="hidden md:block mt-4 text-sm leading-relaxed text-muted-foreground/80 max-w-2xl mx-auto lg:mx-0 line-clamp-2"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors focus-ring shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              >
                View selected work <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass font-medium hover:bg-white/[0.08] transition-colors focus-ring"
              >
                <Mail className="w-4 h-4" /> Contact me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={copyEmail}
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl glass hover:border-primary/20 transition-colors text-left flex-1 sm:flex-initial focus-ring"
                aria-label="Copy email"
              >
                <span className="w-9 h-9 rounded-xl bg-primary/15 grid place-items-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-jetbrains tracking-[0.14em] uppercase text-muted-foreground">Email</span>
                  <span className="block text-sm font-medium text-foreground truncate">{personalInfo.email}</span>
                </span>
                <span className="ml-auto w-7 h-7 rounded-full bg-foreground text-background grid place-items-center flex-shrink-0">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </span>
              </button>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl glass flex-1 sm:flex-initial">
                <span className="w-9 h-9 rounded-xl bg-secondary/15 grid place-items-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-secondary" />
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
              transition={{ duration: 0.6, delay: 0.56 }}
              className="mt-7 flex items-center justify-center lg:justify-start gap-3"
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
                    className="w-11 h-11 rounded-full glass grid place-items-center hover:scale-105 hover:border-primary/30 transition-all focus-ring"
                  >
                    <Icon className="w-[18px] h-[18px] text-foreground" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:pl-6"
          >
            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 rounded-[2.2rem] blur-2xl -z-10" />
              <div className="relative rounded-[2rem] glass-strong overflow-hidden p-3 sm:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="relative rounded-[1.4rem] overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-secondary/[0.07] pointer-events-none" />
                  <div className="relative aspect-[4/4.35] sm:aspect-[4/4.1]">
                    <img
                      src="/profile.jpeg"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/90 text-zinc-900 grid place-items-center font-bold text-sm">VS</div>
                        <div>
                          <p className="text-white text-sm font-semibold leading-none">{personalInfo.name} — {personalInfo.title}</p>
                          <p className="text-white/60 text-xs font-jetbrains mt-1">Calicut, Kerala • Open to remote</p>
                        </div>
                        <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Available
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-black/45 backdrop-blur text-white/80 text-[11px] font-jetbrains border border-white/10">● portfolio / vishnu-as</span>
                      <span className="w-8 h-8 rounded-full bg-white/90 grid place-items-center shadow">
                        <Sparkles className="w-4 h-4 text-zinc-900" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3 text-center">
                      <div className="text-[18px] sm:text-xl font-bold tracking-tight text-foreground">{s.value}</div>
                      <div className="text-[10px] font-jetbrains tracking-[0.12em] uppercase text-muted-foreground mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="absolute -top-2 -right-2 w-12 h-12 rounded-2xl bg-foreground text-background grid place-items-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] hidden sm:grid"
                animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="absolute top-[42%] -right-3 sm:-right-5 w-11 h-11 rounded-full bg-secondary text-white grid place-items-center shadow-[0_10px_30px_rgba(123,47,247,0.35)] hidden sm:grid"
                animate={{ y: [0, 8, 0], rotate: [0, -6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-[10px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground">Scroll</span>
          <div className="w-[26px] h-[42px] rounded-full border border-white/15 bg-white/[0.03] backdrop-blur grid place-items-start justify-center pt-2">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-primary block" animate={{ y: [0, 14, 0], opacity: [1, 0.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
