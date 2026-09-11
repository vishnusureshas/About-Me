"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"
import { education } from "@/lib/data"

export default function Education() {
  return (
    <section className="relative py-20 sm:py-28" id="education">
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
            <Award className="w-3 h-3 text-primary" /> Education
          </span>
          <h2 className="mt-4 font-space font-bold tracking-[-0.03em] text-3xl sm:text-4xl md:text-[42px] leading-none text-foreground">
            Academic <span className="gradient-text">foundation</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Strong CS fundamentals with hands-on product engineering.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative rounded-[24px] glass-strong p-6 sm:p-8 overflow-hidden card-glow flex flex-col sm:flex-row sm:items-center gap-6"
              >
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-secondary/10 rounded-full blur-3xl opacity-60 pointer-events-none" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary grid place-items-center flex-shrink-0 shadow-[0_10px_24px_rgba(0,212,255,0.25)]">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-space font-semibold text-lg sm:text-xl tracking-tight text-foreground">{edu.degree}</h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10"><MapPin className="w-3.5 h-3.5 text-primary" /> {edu.institution}</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass"><Calendar className="w-3.5 h-3.5" /> {edu.year}</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-jetbrains tracking-wide text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-[20px] border border-dashed border-white/10 p-5 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Continuous learning — <span className="text-foreground font-medium">System design • Cloud • AI engineering</span> • building in public
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
