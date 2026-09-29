"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { personalInfo } from "@/lib/data"

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
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
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500"
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#080b14]/85 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(0,212,255,0.06)]"
            : "bg-gradient-to-b from-[#080b14]/70 to-transparent border-b border-transparent"
        }`}
      >
        {/* neon hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 via-violet-500/30 to-transparent" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-[68px] flex items-center justify-between gap-4">
          {/* Minimalist logo left */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group focus-ring rounded-lg" aria-label="Go to home">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 grid place-items-center font-space font-bold text-white text-sm shadow-[0_0_20px_rgba(0,212,255,0.45)] border border-white/20">
              V
            </span>
            <span className="text-left leading-none">
              <span className="block font-space font-semibold tracking-tight text-[15px] text-white">
                {personalInfo.name.split(" ")[0]} <span className="gradient-text">{personalInfo.name.split(" ").slice(1).join(" ")}</span>
              </span>
              <span className="block text-[10px] font-jetbrains tracking-[0.2em] uppercase text-muted-foreground mt-0.5">
                Full Stack Dev
              </span>
            </span>
          </button>

          {/* Horizontal nav right */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              const isActive = active === id
              return (
                <button
                  key={link.name}
                  onClick={() => scrollTo(id)}
                  data-active={isActive}
                  className={`nav-neon text-[13.5px] font-medium tracking-wide pb-1 transition-colors focus-ring rounded ${
                    isActive ? "text-white" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {link.name}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollTo("contact")
              }}
              className="neon-btn hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-violet-500/15 text-white text-[13px] font-medium hover:from-cyan-500/25 hover:to-violet-500/25 transition-all focus-ring"
            >
              Let&apos;s talk <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] grid place-items-center text-foreground hover:bg-white/[0.1] transition-colors focus-ring"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-background/60 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ y: -12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="absolute top-[80px] left-4 right-4 rounded-[24px] glass-strong p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden"
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
                  className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium shadow-[0_8px_24px_rgba(0,212,255,0.25)] text-sm"
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
