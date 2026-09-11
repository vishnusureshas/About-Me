"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ShoppingCart, BookOpen, Bot, Globe, ArrowUpRight, Box, Layers3 } from "lucide-react"
import { mainProject, miniProjects } from "@/lib/data"

const iconMap: Record<string, React.ElementType> = { BookOpen, Bot, ShoppingCart, Globe }

export default function Projects() {
  return (
    <section className="relative py-20 sm:py-28" id="projects">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground">
            <Box className="w-3 h-3 text-primary" /> Selected work
          </span>
          <h2 className="mt-4 font-space font-bold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[42px] leading-none text-foreground">
            Personal <span className="gradient-text">projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground">A collection of full-stack builds — from enterprise ERP to AI-native experiences.</p>
        </motion.div>

        {/* Main project - bento */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative rounded-[28px] glass-strong overflow-hidden card-glow">
            <div className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] bg-secondary/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-0">
              {/* Browser mock */}
              <div className="relative p-4 sm:p-6 lg:p-8">
                <div className="rounded-[20px] overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <div className="h-9 flex items-center justify-between px-4 bg-white/[0.04] border-b border-white/10">
                    <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-amber-400" /><span className="w-3 h-3 rounded-full bg-emerald-400" /></div>
                    <span className="text-[11px] font-jetbrains text-white/50 hidden sm:block">erp.vishnu.as — production ●</span>
                    <span className="w-6 h-6 rounded-full bg-white/10 hidden sm:grid place-items-center"><Layers3 className="w-3.5 h-3.5 text-white/70" /></span>
                  </div>
                  <div className="aspect-[16/10.2] relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 flex flex-col">
                    <div className="absolute inset-0 animated-grid opacity-30" />
                    <div className="relative flex-1 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4 sm:p-5 overflow-hidden">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center"><ShoppingCart className="w-5 h-5 text-white" /></span>
                          <div>
                            <p className="text-sm font-semibold text-white">{mainProject.title}</p>
                            <p className="text-xs text-white/50 font-jetbrains">{mainProject.subtitle}</p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 text-[11px] font-medium">Live • v2.4</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                          { k: "Revenue", v: "₹ 42.8L", d: "+12.4%" },
                          { k: "Orders", v: "3,248", d: "+8.1%" },
                          { k: "Active users", v: "1,204", d: "+5.3%" },
                        ].map((m) => (
                          <div key={m.k} className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
                            <p className="text-[10px] font-jetbrains tracking-wide uppercase text-white/50">{m.k}</p>
                            <p className="text-sm font-bold text-white mt-1">{m.v}</p>
                            <p className="text-[11px] text-emerald-300 mt-0.5">{m.d}</p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl bg-zinc-950 border border-white/10 p-3">
                        <div className="flex gap-2 mb-3">
                          {["Inventory", "HR", "Finance", "Analytics"].map((t, i) => (
                            <span key={t} className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${i === 0 ? "bg-foreground text-background border-foreground" : "bg-white/5 text-white/60 border-white/10"}`}>{t}</span>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {[58, 74, 46].map((w, i) => (
                            <div key={i} className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${w}%` }} /></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex gap-2 justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <a href="#" className="px-4 py-2 rounded-full bg-white text-zinc-900 text-sm font-medium inline-flex items-center gap-1.5"><Github className="w-4 h-4" /> Code</a>
                      <a href="#" className="px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/15 text-white text-sm font-medium inline-flex items-center gap-1.5"><ExternalLink className="w-4 h-4" /> Live demo</a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {mainProject.techStack.slice(0, 6).map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full glass text-xs font-medium text-foreground/80">{t}</span>
                  ))}
                  <span className="px-2.5 py-1 rounded-full bg-foreground text-background text-xs font-medium">+{mainProject.techStack.length - 6} more</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-8 lg:p-9 flex flex-col relative">
                <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Featured — Enterprise
                </span>
                <h3 className="mt-4 font-space font-bold text-2xl sm:text-[28px] leading-tight tracking-tight text-foreground">{mainProject.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mt-1">{mainProject.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{mainProject.description}</p>

                <ul className="mt-6 space-y-3">
                  {mainProject.features.map((f, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 shadow-[0_0_8px_rgba(0,212,255,0.5)]" />
                      <span className="text-foreground/90">{f}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {mainProject.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/20 transition-colors">{tech}</span>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">View case study <ArrowUpRight className="w-4 h-4" /></a>
                  <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium hover:bg-white/10 transition-colors"><Github className="w-4 h-4" /> Source</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other projects */}
        <div className="max-w-6xl mx-auto mt-10 sm:mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="text-[11px] font-jetbrains tracking-[0.18em] uppercase text-muted-foreground px-3 py-1 rounded-full glass">More builds</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {miniProjects.map((project, index) => {
              const Icon = iconMap[project.icon] || Globe
              return (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-[22px] glass-strong p-6 overflow-hidden card-glow flex flex-col min-h-[200px]"
                >
                  <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${project.color} opacity-20 blur-2xl rounded-full pointer-events-none group-hover:opacity-30 transition-opacity`} />
                  <div className="relative flex-1">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.color} grid place-items-center shadow-lg mb-4 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-space font-semibold text-[16px] leading-tight text-foreground group-hover:text-primary transition-colors">{project.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    Explore <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
