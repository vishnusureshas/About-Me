"use client"

import { motion } from "framer-motion"
import { skillCategories } from "@/lib/data"
import { Layers, Code2, Layout, Smartphone, Server, Database, Cloud, Wrench } from "lucide-react"
import DottedWaves from "@/components/DottedWaves"

const iconMap: Record<string, React.ElementType> = {
  Languages: Code2,
  Frontend: Layout,
  Mobile: Smartphone,
  Backend: Server,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  "Testing & Tools": Wrench,
}

function initials(name: string) {
  const parts = name.replace(/[^A-Za-z0-9+.# ]/g, "").split(/[\s.]+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
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
    <section className="relative py-20 sm:py-28 overflow-hidden" id="skills">
      <DottedWaves className="opacity-30" />
      <div className="absolute inset-0 bg-[#060913]/60 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground premium-ring">
            <Layers className="w-3 h-3 text-cyan-300" /> Stack & Tooling
          </span>
          <h2 className="mt-4 font-space font-bold tracking-[-0.032em] text-3xl sm:text-4xl md:text-[42px] leading-none text-white">
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
                className="group relative rounded-[24px] opaque-glass protrude p-6 sm:p-7 overflow-hidden"
              >
                <div className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent`} />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-[0.07] group-hover:opacity-[0.13] transition-opacity`} />
                <div className={`absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br ${category.color} opacity-[0.16] blur-2xl rounded-full pointer-events-none`} />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`illum-tile w-11 h-11 rounded-xl bg-gradient-to-br ${category.color} grid place-items-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                    </span>
                    <div>
                      <h3 className="font-space font-semibold text-[17px] leading-none text-white">{category.title}</h3>
                      <p className="text-[11px] font-jetbrains tracking-wide text-muted-foreground mt-1">{category.skills.length} technologies</p>
                    </div>
                    <span className="ml-auto text-xs font-jetbrains text-muted-foreground/70 bg-white/[0.04] border border-white/10 px-2 py-1 rounded-lg">0{index + 1}</span>
                  </div>

                  {/* rows of colorful illuminated square logos */}
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                    {category.skills.map((skill) => (
                      <div key={skill} className="group/tile flex flex-col items-center gap-1.5" title={skill}>
                        <span className={`illum-tile w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-xl grid place-items-center bg-gradient-to-br ${category.color} !bg-none !bg-white/[0.05]`}>
                          <span className={`font-space font-bold text-[13px] bg-gradient-to-br ${category.color} bg-clip-text text-transparent drop-shadow-sm`}>
                            {initials(skill)}
                          </span>
                        </span>
                        <span className="text-[9.5px] leading-none text-muted-foreground text-center truncate w-full">{skill}</span>
                      </div>
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
