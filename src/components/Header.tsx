"use client"

import { useState, useEffect } from "react"
import { personalInfo } from "@/lib/data"

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },

  { label: "Contact", href: "#contact" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setActive(id)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg shadow-primary/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-end md:justify-center">
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href.slice(1))}
              className={`text-sm font-inter tracking-wider uppercase transition-colors duration-300 hover:text-primary ${
                active === link.href.slice(1) ? "text-primary" : "text-gray-400"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Open menu"
        >
          <span className="block w-6 h-0.5 bg-primary rounded-full transition-all" />
          <span className="block w-6 h-0.5 bg-primary rounded-full transition-all" />
          <span className="block w-6 h-0.5 bg-primary rounded-full transition-all" />
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 glass border-l border-white/10 transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-6 mt-4">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href.slice(1))}
              className={`text-left w-full px-4 py-3 rounded-lg text-sm font-orbitron tracking-wider uppercase transition-all duration-300 ${
                active === link.href.slice(1)
                  ? "text-primary bg-primary/10 border border-primary/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
