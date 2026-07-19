"use client"

import { useEffect, useRef, useState } from "react"
import { skills } from "@/lib/data"

export default function Skills() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <p className="text-primary font-orbitron text-sm tracking-[0.3em] uppercase mb-4">
            Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="glass rounded-xl p-5 transition-all duration-500 hover:border-primary/30"
              style={{
                transitionDelay: `${i * 80}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-orbitron text-sm font-bold text-white">{skill.name}</span>
                <span className="font-orbitron text-xs text-primary">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-bar-fill"
                  style={{ width: visible ? `${skill.level}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
