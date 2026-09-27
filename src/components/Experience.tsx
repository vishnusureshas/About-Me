"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, ArrowUpRight, Rocket, Building2 } from "lucide-react"
import { experiences } from "@/lib/data"
import SectionHeading from "@/components/SectionHeading"

export default function Experience() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#05070f] overflow-hidden" id="experience">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-600/[0.08] blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 animated-grid opacity-20 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <SectionHeading
          pill="Experience"
          icon={<Building2 className="w-3.5 h-3.5" />}
          title="Crafting impact"
          highlight="at scale"
          sub="Building scalable full-stack applications and delivering production-ready solutions across AI, ERP and consumer products."
        />

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/[0.06] hidden sm:block md:-translate-x-px rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-violet-500 to-pink-500 opacity-70" />
          </div>

          <div className="space-y-7 sm:space-y-9">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className={`relative sm:flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-10 items-stretch`}
                >
                  <span className="hidden md:grid absolute left-1/2 top-9 -translate-x-1/2 w-5 h-5 rounded-full bg-[#0a0e1a] border-2 border-cyan-300 place-items-center z-10 shadow-[0_0_20px_rgba(0,212,255,0.8)]">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-300 to-violet-500 animate-pulse" />
                  </span>

                  <div className={`hidden md:flex flex-1 ${isEven ? "justify-end" : "justify-start"} pt-7`}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur text-xs font-jetbrains tracking-wide text-white/90 shadow-[0_0_20px_rgba(0,212,255,0.12)] h-fit">
                      <Calendar className="w-3.5 h-3.5 text-cyan-300" /> {exp.period}
                    </span>
                  </div>

                  <div className="flex-1 sm:pl-12 md:pl-0">
                    <div className="group relative rounded-[26px] opaque-glass protrude p-6 sm:p-8 overflow-hidden hover:border-cyan-300/25 transition-all hover:-translate-y-1 duration-300">
                      <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 opacity-70" />
                      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-cyan-500/15 to-violet-600/15 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex items-start gap-4">
                        <span className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 grid place-items-center flex-shrink-0 shadow-[0_12px_30px_rgba(123,47,247,0.35)] border border-white/20 p-3.5 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                          {index === 0 ? <Rocket className="w-6 h-6 text-white" /> : <Briefcase className="w-6 h-6 text-white" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-space font-bold text-[19px] sm:text-[22px] leading-tight text-white tracking-tight">{exp.role}</h3>
                          <p className="text-sm font-semibold gradient-text mt-1">{exp.company}</p>
                          <span className="inline-flex md:hidden mt-2.5 items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" /> {exp.period}
                          </span>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all hidden sm:block" />
                      </div>

                      <p className="relative mt-4 text-[14.5px] leading-relaxed text-muted-foreground">{exp.description}</p>

                      <div className="relative mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] p-5">
                        <p className="text-[11px] font-jetbrains tracking-[0.2em] uppercase text-cyan-200/80 mb-3">Key Responsibilities</p>
                        <ul className="space-y-3">
                          {exp.responsibilities.map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                              <span className="mt-[7px] w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-cyan-300/20 grid place-items-center flex-shrink-0 text-[10px] font-bold text-cyan-200">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.techStack && (
                        <div className="relative mt-5 flex flex-wrap gap-2">
                          {exp.techStack.map((tech) => (
                            <span key={tech} className="px-3 py-1.5 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-white/10 text-xs font-medium text-white/80 hover:text-white hover:border-cyan-300/30 hover:shadow-[0_0_16px_rgba(0,212,255,0.25)] transition-all cursor-default">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
