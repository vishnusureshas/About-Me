"use client"

import { personalInfo } from "@/lib/data"

const links = [
  { label: "GitHub", href: personalInfo.social.github, icon: "GH" },
  { label: "LinkedIn", href: personalInfo.social.linkedin, icon: "LI" },
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: "@" },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-primary font-orbitron text-sm tracking-[0.3em] uppercase mb-4">
          Connect
        </p>
        <h2 className="text-3xl sm:text-4xl font-orbitron font-bold mb-6">
          Let&apos;s Work <span className="gradient-text">Together</span>
        </h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Have a project in mind or just want to say hello? Feel free to reach out.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl px-6 py-3 font-orbitron text-sm text-white tracking-wider uppercase transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:scale-105"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-gray-400 text-sm mb-2">Email me at</p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-lg font-orbitron gradient-text hover:opacity-80 transition-opacity"
          >
            {personalInfo.email}
          </a>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-gray-500 text-xs">{personalInfo.location}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
