"use client"

import { motion } from "framer-motion"
import { BookOpen, Bot, Globe, ShoppingCart, ArrowUpRight, Box } from "lucide-react"
import { miniProjects } from "@/lib/data"

const iconMap: Record<string, React.ElementType> = { BookOpen, Bot, ShoppingCart, Globe }

export default function Projects() {
  return (
    <section className="relative py-20 sm:py-28" id="projects">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background pointer-events-none" />
      <div className="absolute inset-0 animated-grid opacity-25 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground premium-ring">
            <Box className="w-3 h-3 text-primary" /> Selected work
          </span>
          <h2 className="mt-4 font-space font-bold tracking-[-0.032em] text-3xl sm:text-4xl md:text-[42px] leading-none text-foreground">
            Personal <span className="gradient-text">projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Small focused builds — crafted with modern stacks and clean UX.</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
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
                  className="group relative rounded-[24px] glass-strong premium-ring p-7 overflow-hidden card-glow flex flex-col min-h-[186px]"
                >
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.color} opacity-18 blur-2xl rounded-full pointer-events-none group-hover:opacity-28 transition-opacity`} />
                  <div className="relative flex-1">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} grid place-items-center shadow-lg mb-4 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5.5 h-5.5 text-white" />
                    </div>
                    <h4 className="font-space font-semibold text-[17px] leading-tight text-foreground group-hover:text-primary transition-colors">{project.title}</h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 group-hover:bg-white group-hover:text-zinc-900 transition-colors">
                      Explore <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
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
