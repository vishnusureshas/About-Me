"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin, ShieldCheck } from "lucide-react"
import { education } from "@/lib/data"
import SectionHeading from "@/components/SectionHeading"

export default function Education() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#060913] overflow-hidden" id="education">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[640px] h-[260px] bg-violet-600/[0.09] blur-[80px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <SectionHeading
          pill="Education"
          icon={<GraduationCap className="w-3.5 h-3.5" />}
          title="Academic"
          highlight="foundation"
          sub="Strong CS fundamentals fused with hands-on product engineering."
        />

        <div className="max-w-4xl mx-auto grid gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-[28px] opaque-glass protrude p-7 sm:p-9 overflow-hidden"
            >
              <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 opacity-80" />
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-cyan-500/12 to-violet-600/12 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_80%_at_80%_0%,black,transparent)]" />

              <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1.5 rounded-[1.4rem] bg-gradient-to-br from-cyan-400/50 to-violet-600/50 blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                  <div className="relative w-16 h-16 rounded-[1.2rem] bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 grid place-items-center border border-white/25 shadow-[0_12px_30px_rgba(123,47,247,0.35)]">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <p className="text-[11px] font-jetbrains tracking-[0.22em] uppercase text-cyan-200/70">Bachelor&apos;s Degree</p>
                  <h3 className="mt-1 font-space font-bold text-xl sm:text-2xl tracking-tight text-white">{edu.degree}</h3>
                  <div className="mt-3 flex flex-wrap justify-center sm:justify-start items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/80 text-[13px]">
                      <MapPin className="w-3.5 h-3.5 text-cyan-300" /> {edu.institution}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-violet-500/15 border border-cyan-300/20 text-cyan-100 text-[13px]">
                      <Calendar className="w-3.5 h-3.5" /> {edu.year}
                    </span>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center gap-2 justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-300/25 text-emerald-200 text-xs font-jetbrains">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(16,185,129,1)]" />
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-[24px] border border-dashed border-white/12 bg-white/[0.02] px-6 py-5 text-center text-sm text-muted-foreground"
          >
            Continuous learning — <span className="text-white font-medium">System Design • Cloud • AI-driven development</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
