"use client"

import { motion } from "framer-motion"
import { skillCategories } from "@/lib/data"
import { Layers, Code2, Layout, Smartphone, Server, Database, Cloud, Wrench } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Languages: Code2,
  Frontend: Layout,
  Mobile: Smartphone,
  Backend: Server,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  "Testing & Tools": Wrench,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Skills() {
  return (
    <section className="relative py-20 sm:py-28" id="skills">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
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
            <Layers className="w-3 h-3 text-primary" /> Stack & Tooling
          </span>
          <h2 className="mt-4 font-space font-bold tracking-[-0.032em] text-3xl sm:text-4xl md:text-[42px] leading-none text-foreground">
            Technologies I <span className="gradient-text">work with</span>
          </h2>
          <p className="mt-4 text-muted-foreground">From frontend to backend, databases to cloud — a complete product engineering stack.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.title] || Code2
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative rounded-[24px] glass-strong p-6 sm:p-7 overflow-hidden card-glow flex flex-col hover:border-white/15 transition-colors"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-[0.055] group-hover:opacity-[0.11] transition-opacity`} />
                <div className={`absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br ${category.color} opacity-[0.14] blur-2xl rounded-full pointer-events-none group-hover:opacity-[0.20] transition-opacity`} />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`w-11 h-11 rounded-xl bg-gradient-to-br ${category.color} grid place-items-center shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </span>
                    <div>
                      <h3 className="font-space font-semibold text-[17px] leading-none text-foreground">{category.title}</h3>
                      <p className="text-[11px] font-jetbrains tracking-wide text-muted-foreground mt-1">{category.skills.length} technologies</p>
                    </div>
                    <span className="ml-auto text-xs font-jetbrains text-muted-foreground/55 bg-white/[0.04] border border-white/10 px-2 py-1 rounded-full">0{index + 1}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[13px] font-medium text-foreground/85 hover:bg-white hover:text-zinc-900 hover:border-white transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-jetbrains tracking-wide text-muted-foreground mt-10 px-4 py-2 rounded-full glass w-fit mx-auto"
        >
          Always exploring • System design • Cloud • AI-driven development
        </motion.p>
      </div>
    </section>
  )
}
