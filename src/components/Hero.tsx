"use client"

import { personalInfo } from "@/lib/data"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="animated-grid absolute inset-0" />

      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="floating-particle"
          style={{
            left: `${15 + i * 18}%`,
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            animationDelay: `${i * 3}s`,
            animationDuration: `${18 + i * 4}s`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
        <p className="text-primary font-orbitron text-sm md:text-base tracking-[0.3em] uppercase mb-6">
          Welcome to my portfolio
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-orbitron font-bold leading-tight mb-6">
          Hi, I&apos;m{" "}
          <span className="gradient-text">{personalInfo.name}</span>
        </h1>
        <p className="text-lg sm:text-xl text-secondary font-orbitron mb-2">
          {personalInfo.title}
        </p>
        <p className="text-xl sm:text-2xl text-gray-300 font-inter mb-4">
          {personalInfo.tagline}
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
          {personalInfo.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`#contact`}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary font-orbitron text-sm font-bold text-white tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-105"
          >
            Get in Touch
          </a>
          <a
            href={`#experience`}
            className="px-8 py-3 rounded-full glass font-orbitron text-sm font-bold text-primary tracking-wider uppercase transition-all duration-300 hover:bg-primary/10 hover:scale-105"
          >
            My Experience
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
