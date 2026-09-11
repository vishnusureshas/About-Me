"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Menu, X, ArrowUpRight, Command } from "lucide-react"
import { personalInfo } from "@/lib/data"

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [active, setActive] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    )
    navLinks.forEach((l) => {
      const el = document.getElementById(l.href.slice(1))
      if (el) observer.observe(el)
    })
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-primary via-secondary to-accent"
      />

      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 md:pt-6">
          <div
            className={`pointer-events-auto mx-auto flex items-center justify-between gap-4 rounded-full border px-3 py-2 sm:px-5 sm:py-2.5 transition-all duration-500 ${
              isScrolled
                ? "glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06),0_0_40px_rgba(0,212,255,0.08)]"
                : "bg-transparent border-transparent md:glass-strong md:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
            }`}
          >
            <button
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2.5 group focus-ring rounded-full"
              aria-label="Go to top"
            >
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.35)] flex-shrink-0">
                <Command className="w-4 h-4 text-white" />
              </span>
              <span className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-[11px] font-jetbrains tracking-[0.18em] text-muted-foreground uppercase">Portfolio • 2026</span>
                <span className="text-[15px] font-space font-semibold tracking-tight text-foreground -mt-0.5">
                  {personalInfo.name.split(" ")[0]} <span className="gradient-text">{personalInfo.name.split(" ").slice(1).join(" ")}</span>
                </span>
              </span>
              <span className="sm:hidden font-space font-bold text-sm tracking-tight">
                {personalInfo.name.split(" ")[0]}<span className="text-primary">.</span>
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
              {navLinks.map((link) => {
                const id = link.href.slice(1)
                const isActive = active === id
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(id)}
                    className={`relative px-4 py-2 rounded-full text-[13px] font-medium transition-colors focus-ring ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white text-background rounded-full shadow-sm"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={`relative ${isActive ? "text-background" : ""}`}>{link.name}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo("contact")
                }}
                className="hidden md:inline-flex items-center gap-1.5 pl-4 pr-1.5 py-1.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors focus-ring"
              >
                Let&apos;s talk <span className="w-7 h-7 rounded-full bg-background text-foreground grid place-items-center"><ArrowUpRight className="w-3.5 h-3.5" /></span>
              </a>

              <button
                type="button"
                className="lg:hidden w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] grid place-items-center text-foreground hover:bg-white/[0.1] transition-colors focus-ring"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/60 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ y: -12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="absolute top-[84px] left-4 right-4 rounded-[24px] glass-strong p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-[50px] pointer-events-none" />
              <div className="flex flex-col gap-1 relative">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollTo(link.href.slice(1))}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`text-left px-4 py-3 rounded-xl text-[15px] font-medium flex items-center justify-between group focus-ring ${
                      active === link.href.slice(1) ? "bg-foreground text-background" : "hover:bg-white/[0.06] text-foreground"
                    }`}
                  >
                    {link.name}
                    <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </motion.button>
                ))}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-[0_8px_24px_rgba(0,212,255,0.25)] text-sm"
                >
                  {personalInfo.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
