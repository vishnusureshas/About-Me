"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, Bot, Globe, ShoppingCart, ArrowUpRight, ArrowRight, ArrowLeft, DatabaseZap, Sparkles } from "lucide-react"
import { miniProjects, mainProject } from "@/lib/data"
import DottedWaves from "@/components/DottedWaves"
import SectionHeading from "@/components/SectionHeading"

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
    title: `${mainProject.title}`,
    description: mainProject.description,
    icon: DatabaseZap,
    color: "from-cyan-500 via-sky-500 to-violet-600",
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

function MockBrowser({ title, icon: Icon, color, featured }: { title: string; icon: React.ElementType; color: string; featured?: boolean }) {
  return (
    <div className="relative m-3 mb-0 rounded-2xl overflow-hidden border border-white/10 bg-[#080c17]">
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/[0.07] bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.6)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.6)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.6)]" />
        <span className="ml-2 flex-1 text-[10px] font-jetbrains text-muted-foreground truncate bg-black/30 rounded-md px-2.5 py-1 border border-white/[0.06]">
          {title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.vercel.app
        </span>
        {featured && (
          <span className="inline-flex items-center gap-1 text-[10px] font-jetbrains font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-white shadow-[0_0_18px_rgba(0,212,255,0.5)]">
            <Sparkles className="w-3 h-3" /> FEATURED
          </span>
        )}
      </div>
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${color}`}>
        <div className="absolute inset-0 bg-[#0a0f22]/20" />
        {/* fake app skeleton */}
        <div className="absolute inset-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/15 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
            <div className="w-16 h-2 rounded-full bg-white/25" />
            <div className="w-10 h-2 rounded-full bg-white/15" />
            <div className="ml-auto flex gap-1.5">
              <div className="w-8 h-4 rounded-full bg-white/20" />
              <div className="w-8 h-4 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" />
            </div>
          </div>
          <div className="p-3 grid grid-cols-[1fr_1.4fr] gap-2.5">
            <div className="space-y-2">
              <div className="h-2 w-3/4 rounded-full bg-white/20" />
              <div className="h-2 w-1/2 rounded-full bg-white/12" />
              <div className="h-14 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/10" />
              <div className="flex gap-1.5">
                <div className="h-5 flex-1 rounded-md bg-white/15" />
                <div className="h-5 flex-1 rounded-md bg-white/25" />
              </div>
            </div>
            <div className="rounded-lg bg-black/40 border border-white/10 grid place-items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:18px_18px]" />
              <span className="relative w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/25 grid place-items-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <Icon className="w-6 h-6 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              </span>
            </div>
          </div>
          <div className="px-3 pb-3 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-9 rounded-lg bg-white/[0.07] border border-white/[0.08]" />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }

  useEffect(() => {
    onScroll()
  }, [])

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-card]")
    const w = card ? card.offsetWidth + 20 : 340
    el.scrollBy({ left: dir * w, behavior: "smooth" })
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#05070f]" id="projects">
      <DottedWaves className="opacity-40" />
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-fuchsia-600/[0.07] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <SectionHeading
          pill="Featured work"
          icon={<span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,212,255,1)] inline-block" />}
          title="Featured"
          highlight="projects"
          sub="Enterprise builds + focused crafts — drag or use arrows to explore the showcase."
        />

        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex-1 h-[3px] rounded-full bg-white/[0.06] overflow-hidden max-w-xs">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_12px_rgba(0,212,255,0.7)] transition-all duration-300"
                style={{ width: `${Math.max(12, progress * 100)}%` }}
              />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => scrollByCards(-1)} aria-label="Scroll projects left" className="illum-tile w-12 h-12 rounded-full grid place-items-center focus-ring hover:scale-105 transition-transform">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scrollByCards(1)} aria-label="Scroll projects right" className="neon-btn w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 grid place-items-center text-white focus-ring hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div ref={trackRef} onScroll={onScroll} className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-5 -mx-6 px-6">
            {cards.map((project, index) => (
              <motion.article
                key={project.title}
                data-card
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.06, 0.3), duration: 0.55 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-[26px] opaque-glass protrude overflow-hidden flex flex-col min-w-[310px] sm:min-w-[360px] max-w-[370px] snap-start hover:border-cyan-300/25 transition-colors duration-300"
              >
                <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 opacity-80 z-10" />
                <MockBrowser title={project.title} icon={project.icon} color={project.color} featured={project.featured} />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[11px] font-jetbrains tracking-[0.14em] uppercase text-cyan-200/70">
                    <span className={`w-6 h-[2px] rounded-full bg-gradient-to-r ${project.color}`} />
                    0{index + 1} — {project.featured ? "Enterprise" : "Side build"}
                  </div>
                  <h4 className="mt-2 font-space font-bold text-[18px] leading-tight text-white group-hover:text-cyan-100 transition-colors line-clamp-1">
                    {project.title}
                  </h4>
                  {project.featured && <p className="text-xs text-violet-300/90 font-medium mt-0.5">{mainProject.subtitle}</p>}
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] font-semibold text-white/70 hover:text-white hover:border-cyan-300/30 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/70 group-hover:text-white transition-colors">
                      View case <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                    <span className={`w-10 h-10 rounded-full bg-gradient-to-br ${project.color} grid place-items-center shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-white/20 group-hover:scale-110 group-hover:rotate-[-8deg] transition-transform duration-300`}>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
