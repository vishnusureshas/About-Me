"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { BookOpen, Bot, Globe, ShoppingCart, ArrowUpRight, ArrowRight, ArrowLeft, Box, DatabaseZap } from "lucide-react"
import { miniProjects, mainProject } from "@/lib/data"
import DottedWaves from "@/components/DottedWaves"

const iconMap: Record<string, React.ElementType> = { BookOpen, Bot, ShoppingCart, Globe }

const inferredTags: Record<string, string[]> = {
  "LMS Platform": ["React", "Node.js", "MongoDB"],
  "AI Chat Application": ["Socket.io", "AI", "React"],
  "E-Commerce Store": ["React", "PostgreSQL", "Stripe"],
  "Portfolio Website": ["Next.js", "Tailwind", "Framer"],
}

type Card = {
  title: string
  description: string
  icon: React.ElementType
  color: string
  tags: string[]
  featured?: boolean
}

const cards: Card[] = [
  {
    title: `${mainProject.title} — ${mainProject.subtitle}`,
    description: mainProject.description,
    icon: DatabaseZap,
    color: "from-cyan-500 to-violet-600",
    tags: mainProject.techStack.slice(0, 5),
    featured: true,
  },
  ...miniProjects.map((p) => ({
    title: p.title,
    description: p.description,
    icon: iconMap[p.icon] || Globe,
    color: p.color,
    tags: inferredTags[p.title] || ["Full Stack", "UI/UX"],
  })),
]

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-card]")
    const w = card ? card.offsetWidth + 20 : 340
    el.scrollBy({ left: dir * w * 1.2, behavior: "smooth" })
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="projects">
      <DottedWaves className="opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#070b18]/70 to-background pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground premium-ring">
            <Box className="w-3 h-3 text-cyan-300" /> Featured work
          </span>
          <h2 className="mt-4 font-space font-bold tracking-[-0.032em] text-3xl sm:text-4xl md:text-[42px] leading-none text-white">
            Featured <span className="gradient-text">projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Enterprise builds + small focused crafts — swipe through the showcase.</p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center justify-end gap-2 mb-5">
            <button
              onClick={() => scrollByCards(-1)}
              aria-label="Scroll projects left"
              className="illum-tile w-11 h-11 rounded-full grid place-items-center focus-ring"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              aria-label="Scroll projects right"
              className="neon-btn w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 grid place-items-center text-white focus-ring"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={trackRef}
            className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
          >
            {cards.map((project, index) => {
              const Icon = project.icon
              return (
                <motion.article
                  key={project.title}
                  data-card
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(index * 0.06, 0.3) }}
                  whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5 }}
                  className="group relative rounded-[26px] opaque-glass protrude overflow-hidden flex flex-col min-w-[300px] sm:min-w-[350px] max-w-[360px] snap-start"
                >
                  <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent z-10" />
                  {/* screenshot */}
                  <div className="relative m-3 mb-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0e1a]">
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.07] bg-white/[0.02]">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                      <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                      <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                      <span className="ml-2 text-[10px] font-jetbrains text-muted-foreground truncate">
                        {project.title.toLowerCase().replace(/\s+/g, "-")}.app
                      </span>
                      {project.featured && (
                        <span className="ml-auto text-[10px] font-jetbrains px-2 py-0.5 rounded-full bg-cyan-400/15 text-cyan-200 border border-cyan-400/25">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <div className={`relative h-44 grid place-items-center overflow-hidden bg-gradient-to-br ${project.color}`}>
                      <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:28px_28px]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                      <span className="relative w-16 h-16 rounded-2xl bg-black/35 backdrop-blur border border-white/25 grid place-items-center shadow-[0_0_30px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="font-space font-semibold text-[17px] leading-tight text-white group-hover:text-cyan-200 transition-colors line-clamp-2">
                      {project.title}
                    </h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-medium text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-white/[0.07] flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-white transition-colors">
                        Explore <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                      <span className={`w-9 h-9 rounded-full bg-gradient-to-br ${project.color} grid place-items-center shadow-lg`}>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
          <p className="mt-3 text-center text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground/70">
            Scroll horizontally • use arrow button to navigate
          </p>
        </div>
      </div>
    </section>
  )
}
