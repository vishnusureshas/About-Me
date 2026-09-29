"use client"

import { motion } from "framer-motion"
import { BookOpen, Bot, Globe, ShoppingCart, ArrowUpRight, Box, DatabaseZap, Sparkles, CheckCircle2 } from "lucide-react"
import { miniProjects, mainProject } from "@/lib/data"
import DottedWaves from "@/components/DottedWaves"
import SectionHeading from "@/components/SectionHeading"

const iconMap: Record<string, React.ElementType> = { BookOpen, Bot, ShoppingCart, Globe }

export default function Projects() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#05070f]" id="projects">
      <DottedWaves className="opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#070b18]/60 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <SectionHeading
          pill="Selected work"
          icon={<Box className="w-3.5 h-3.5" />}
          title="Featured"
          highlight="projects"
          sub="Enterprise flagship plus small focused builds — crafted with modern stacks and clean UX."
        />

        <div className="max-w-5xl mx-auto">
          {/* Featured ERP — full width */}
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="group relative rounded-[28px] opaque-glass protrude overflow-hidden p-7 sm:p-9"
          >
            <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 opacity-80" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-cyan-500/12 to-violet-600/12 blur-3xl rounded-full pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-start gap-5">
              <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-600 grid place-items-center shadow-[0_12px_32px_rgba(0,212,255,0.3)] border border-white/20 flex-shrink-0 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                <DatabaseZap className="w-6 h-6 text-white" />
              </span>
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-jetbrains font-bold px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400/15 to-violet-500/15 border border-cyan-300/25 text-cyan-100">
                  <Sparkles className="w-3 h-3" /> FEATURED • ENTERPRISE
                </span>
                <h3 className="mt-3 font-space font-bold text-2xl sm:text-[28px] tracking-tight text-white leading-tight">
                  {mainProject.title}
                </h3>
                <p className="text-sm font-medium text-violet-300/90 mt-1">{mainProject.subtitle}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{mainProject.description}</p>
              </div>
            </div>

            <ul className="relative mt-6 grid sm:grid-cols-2 gap-3">
              {mainProject.features.map((f) => (
                <li key={f} className="flex gap-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.07] p-3.5 text-[13px] leading-relaxed text-foreground/85">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-300" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-5 flex flex-wrap gap-2">
              {mainProject.techStack.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-white/75 hover:text-white hover:border-cyan-300/30 transition-colors cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Previous-style grid */}
          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            {miniProjects.map((project, index) => {
              const Icon = iconMap[project.icon] || Globe
              return (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 2) * 0.08, duration: 0.55 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-[26px] opaque-glass protrude p-7 overflow-hidden flex flex-col min-h-[210px] hover:border-cyan-300/20 transition-colors"
                >
                  <div className={`absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r ${project.color} opacity-70`} />
                  <div className={`absolute -top-20 -right-20 w-44 h-44 bg-gradient-to-br ${project.color} opacity-[0.14] blur-3xl rounded-full pointer-events-none group-hover:opacity-[0.24] transition-opacity`} />

                  <div className="relative flex-1">
                    <div className={`w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br ${project.color} grid place-items-center shadow-[0_10px_28px_rgba(0,0,0,0.4)] border border-white/20 mb-4 w-fit group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-space font-bold text-[18px] leading-tight text-white group-hover:text-cyan-100 transition-colors">
                      {project.title}
                    </h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="relative mt-6 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold tracking-wide text-white/70 group-hover:bg-white group-hover:text-zinc-900 group-hover:border-white transition-all">
                      Explore <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                    <span className="ml-auto text-[11px] font-jetbrains text-muted-foreground/60">0{index + 1}</span>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
