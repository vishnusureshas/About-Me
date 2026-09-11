"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Code2, ArrowUpRight, Heart } from "lucide-react"
import { personalInfo } from "@/lib/data"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 animated-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[240px] bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-[50px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="py-10 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <a href="#hero" onClick={(e) => { e.preventDefault(); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }) }} className="inline-flex items-center gap-2.5 focus-ring rounded-full">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center shadow-[0_8px_20px_rgba(0,212,255,0.25)]">
                <Code2 className="w-4 h-4 text-white" />
              </span>
              <span className="font-space font-bold tracking-tight text-foreground text-lg">
                {personalInfo.name.split(" ")[0]} <span className="gradient-text">{personalInfo.name.split(" ").slice(1).join(" ")}</span>
              </span>
            </a>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              {personalInfo.title} — {personalInfo.tagline}
            </p>
            <p className="mt-1 text-xs font-jetbrains text-muted-foreground/70">{personalInfo.location} • {personalInfo.email}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
            <div className="flex gap-2">
              {[
                { href: personalInfo.social.github, icon: Github, label: "GitHub" },
                { href: personalInfo.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: personalInfo.social.leetcode, icon: Code2, label: "LeetCode" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass grid place-items-center hover:scale-105 hover:border-primary/20 transition-all focus-ring"
                >
                  <Icon className="w-4 h-4 text-foreground" />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors focus-ring w-fit"
            >
              Start a project <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-muted-foreground text-center sm:text-left inline-flex items-center gap-1.5 flex-wrap justify-center">
            © {year} Crafted with <Heart className="w-3 h-3 text-accent fill-accent" /> by {personalInfo.name}
          </p>
          <div className="flex items-center gap-4 font-jetbrains tracking-wide text-muted-foreground">
            <span className="hidden sm:inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> All systems operational</span>
            <span>Calicut, IN</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
