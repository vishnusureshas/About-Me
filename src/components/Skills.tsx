"use client"

import { motion } from "framer-motion"
import { skillCategories } from "@/lib/data"
import { Layers, Zap } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Skills() {
  return (
    <section className="relative py-20 sm:py-28" id="skills">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-jetbrains tracking-[0.16em] uppercase text-muted-foreground">
            <Layers className="w-3 h-3 text-primary" /> Stack & Tooling
          </span>
          <h2 className="mt-4 font-space font-bold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[42px] leading-none text-foreground">
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
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative rounded-[24px] glass-strong p-6 sm:p-7 overflow-hidden card-glow flex flex-col"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-[0.06] group-hover:opacity-[0.10] transition-opacity`} />
              <div className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${category.color} opacity-[0.12] blur-2xl rounded-full pointer-events-none`} />

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} grid place-items-center shadow-lg flex-shrink-0`}>
                    <Zap className="w-5 h-5 text-white" />
                  </span>
                  <div>
                    <h3 className="font-space font-semibold text-[17px] leading-none text-foreground">{category.title}</h3>
                    <p className="text-[11px] font-jetbrains tracking-wide text-muted-foreground mt-1">{category.skills.length} technologies</p>
                  </div>
                  <span className="ml-auto text-xs font-jetbrains text-muted-foreground/60">0{index + 1}</span>
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
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-jetbrains tracking-wide text-muted-foreground mt-8"
        >
          Always exploring • System design • Cloud • AI-driven development
        </motion.p>
      </div>
    </section>
  )
}
