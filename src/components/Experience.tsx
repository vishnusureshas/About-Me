"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, ArrowUpRight, Sparkles } from "lucide-react"
import { experiences } from "@/lib/data"

export default function Experience() {
  return (
    <section className="relative py-20 sm:py-28" id="experience">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      <div className="absolute inset-0 animated-grid opacity-[0.6] pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground">
            <Sparkles className="w-3 h-3 text-primary" /> Experience
          </span>
          <h2 className="mt-4 font-space font-bold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[42px] leading-none text-foreground">
            Crafting impact at <span className="gradient-text">scale</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Building scalable full-stack applications and delivering production-ready solutions across AI, ERP and consumer products.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden sm:block md:-translate-x-px" />
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-secondary/0 blur-[1px] hidden sm:block md:-translate-x-px opacity-60" />

          <div className="space-y-8 sm:space-y-10">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className={`relative sm:flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-8 items-stretch`}
                >
                  <span className="hidden md:grid absolute left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-[0_0_12px_rgba(0,212,255,0.6)] place-items-center z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </span>
                  <span className="hidden sm:grid md:hidden absolute left-4 top-8 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-[0_0_12px_rgba(0,212,255,0.6)] place-items-center z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </span>

                  <div className={`hidden md:flex flex-1 ${isEven ? "justify-end" : "justify-start"} pt-2`}>
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium ${isEven ? "" : "md:order-2"}`}>
                      <Calendar className="w-3.5 h-3.5 text-primary" /> {exp.period}
                    </span>
                  </div>

                  <div className="flex-1 sm:pl-10 md:pl-0">
                    <div className="group relative rounded-[24px] glass-strong p-6 sm:p-7 card-glow overflow-hidden hover:border-white/15 transition-colors">
                      <div className="absolute -top-20 -right-20 w-56 h-56 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-start gap-4">
                        <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center flex-shrink-0 shadow-[0_8px_20px_rgba(0,212,255,0.25)]">
                          <Briefcase className="w-5 h-5 text-white" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-space font-semibold text-[18px] sm:text-xl leading-tight text-foreground">{exp.role}</h3>
                          <p className="text-sm font-medium gradient-text mt-0.5">{exp.company}</p>
                          <span className="inline-flex md:hidden mt-2 items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" /> {exp.period}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all hidden sm:block" />
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>

                      <div className="mt-6">
                        <p className="text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground mb-3">Key Responsibilities</p>
                        <ul className="space-y-2.5">
                          {exp.responsibilities.map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.techStack && (
                        <div className="mt-6 flex flex-wrap gap-1.5">
                          {exp.techStack.map((tech) => (
                            <span key={tech} className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/20 transition-colors">
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
