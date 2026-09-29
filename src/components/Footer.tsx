"use client"

import { Github, Linkedin, Code2, ArrowUpRight, Heart, Sparkles } from "lucide-react"
import { personalInfo } from "@/lib/data"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-white border-t border-slate-200">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 via-violet-500 to-transparent opacity-70" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[280px] bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-pink-400/18 blur-[70px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="mt-10 rounded-[28px] opaque-glass protrude p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center gap-7 overflow-hidden">
          <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 opacity-70" />
          <div className="flex items-start gap-4 flex-1">
            <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-violet-500 to-fuchsia-500 grid place-items-center border border-white/40 shadow-[0_10px_24px_rgba(6,182,214,0.28)] flex-shrink-0">
              <Code2 className="w-5 h-5 text-white" />
            </span>
            <div>
              <p className="inline-flex items-center gap-1.5 text-[11px] font-jetbrains tracking-[0.2em] uppercase text-cyan-700">
                <Sparkles className="w-3.5 h-3.5" /> Have an idea in mind?
              </p>
              <p className="mt-1 font-space font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Let&apos;s turn it into <span className="gradient-text">something great</span>
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground max-w-lg">
                {personalInfo.title} — {personalInfo.tagline}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3">
            <div className="flex gap-2 justify-center">
              {[
                { href: personalInfo.social.github, icon: Github, label: "GitHub" },
                { href: personalInfo.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: personalInfo.social.leetcode, icon: Code2, label: "LeetCode" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="illum-tile w-11 h-11 rounded-2xl grid place-items-center focus-ring">
                  <Icon className="w-[18px] h-[18px] text-slate-800" />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) }}
              className="neon-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold focus-ring whitespace-nowrap"
            >
              Start a project <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="py-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-muted-foreground text-center sm:text-left inline-flex items-center gap-1.5 flex-wrap justify-center">
            © {year} Crafted with <Heart className="w-3 h-3 text-pink-400 fill-pink-400 drop-shadow-[0_0_8px_rgba(255,74,149,0.8)]" /> by {personalInfo.name}
            <span className="hidden sm:inline text-muted-foreground/50">•</span>
            <span className="font-jetbrains text-muted-foreground/70">{personalInfo.email}</span>
          </p>
          <div className="flex items-center gap-4 font-jetbrains tracking-wide text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Operational
            </span>
            <span>Calicut, IN</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
