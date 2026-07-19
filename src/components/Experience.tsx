"use client"

import { useEffect, useRef, useState } from "react"
import { experiences } from "@/lib/data"

function TimelineItem({
  exp,
  index,
  visible,
}: {
  exp: (typeof experiences)[0]
  index: number
  visible: boolean
}) {
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex items-start gap-8 mb-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      <div
        className={`hidden md:block flex-1 ${isLeft ? "text-right" : "text-left"}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : `translateX(${isLeft ? "-40px" : "40px"})`,
          transition: "all 0.6s ease-out",
          transitionDelay: `${index * 200}ms`,
        }}
      >
        {visible && (
          <div className="glass rounded-xl p-6 inline-block max-w-md">
            <span className="text-xs font-orbitron text-primary tracking-wider uppercase">{exp.period}</span>
            <h3 className="text-lg font-orbitron font-bold text-white mt-2">{exp.title}</h3>
            <p className="text-sm text-secondary font-orbitron mt-1">{exp.company}</p>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">{exp.description}</p>
          </div>
        )}
      </div>

      <div className="relative flex-shrink-0 z-10" style={{ marginTop: visible ? 0 : 20 }}>
        <div
          className="timeline-dot transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0)",
            transitionDelay: `${index * 200 + 100}ms`,
          }}
        />
      </div>

      <div className="hidden md:block flex-1" />

      <div
        className="md:hidden w-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.6s ease-out",
          transitionDelay: `${index * 200}ms`,
        }}
      >
        {visible && (
          <div className="glass rounded-xl p-6 ml-10">
            <span className="text-xs font-orbitron text-primary tracking-wider uppercase">{exp.period}</span>
            <h3 className="text-lg font-orbitron font-bold text-white mt-2">{exp.title}</h3>
            <p className="text-sm text-secondary font-orbitron mt-1">{exp.company}</p>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">{exp.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={ref} className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-orbitron text-sm tracking-[0.3em] uppercase mb-4">
            Career
          </p>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>

        <div className="relative">
          <div className="timeline-line" />
          {experiences.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
