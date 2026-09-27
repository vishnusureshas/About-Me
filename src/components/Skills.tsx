"use client"

import { motion } from "framer-motion"
import { Code2, Layout, Smartphone, Server, Database, Cloud, Wrench, Cpu, Boxes, Network, Layers3, GitBranch, Container } from "lucide-react"
import { skillCategories } from "@/lib/data"
import DottedWaves from "@/components/DottedWaves"
import SectionHeading from "@/components/SectionHeading"

const iconMap: Record<string, React.ElementType> = {
  Languages: Code2,
  Frontend: Layout,
  Mobile: Smartphone,
  Backend: Server,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  "Testing & Tools": Wrench,
}

// Original brand icons via Simple Icons CDN (correct logo per technology)
const brandIcon: Record<string, string> = {
  JavaScript: "https://cdn.simpleicons.org/javascript",
  TypeScript: "https://cdn.simpleicons.org/typescript",
  HTML5: "https://cdn.simpleicons.org/html5",
  CSS3: "https://cdn.simpleicons.org/css3",
  C: "https://cdn.simpleicons.org/c",
  React: "https://cdn.simpleicons.org/react",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/white",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss",
  Bootstrap: "https://cdn.simpleicons.org/bootstrap",
  Redux: "https://cdn.simpleicons.org/redux",
  "React Native": "https://cdn.simpleicons.org/react",
  Expo: "https://cdn.simpleicons.org/expo/white",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs",
  "Express.js": "https://cdn.simpleicons.org/express/white",
  Prisma: "https://cdn.simpleicons.org/prisma/white",
  "Socket.io": "https://cdn.simpleicons.org/socketdotio/white",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql",
  MongoDB: "https://cdn.simpleicons.org/mongodb",
  MySQL: "https://cdn.simpleicons.org/mysql",
  SQLite: "https://cdn.simpleicons.org/sqlite",
  Firebase: "https://cdn.simpleicons.org/firebase",
  Supabase: "https://cdn.simpleicons.org/supabase",
  Redis: "https://cdn.simpleicons.org/redis",
  AWS: "https://cdn.simpleicons.org/amazonwebservices",
  EC2: "https://cdn.simpleicons.org/amazonec2",
  "S3 Bucket": "https://cdn.simpleicons.org/amazons3",
  Cloudinary: "https://cdn.simpleicons.org/cloudinary",
  Docker: "https://cdn.simpleicons.org/docker",
  Nginx: "https://cdn.simpleicons.org/nginx",
  Vercel: "https://cdn.simpleicons.org/vercel/white",
  Netlify: "https://cdn.simpleicons.org/netlify",
  Jest: "https://cdn.simpleicons.org/jest",
  Git: "https://cdn.simpleicons.org/git",
  GitHub: "https://cdn.simpleicons.org/github/white",
  Postman: "https://cdn.simpleicons.org/postman",
  Swagger: "https://cdn.simpleicons.org/swagger",
  Figma: "https://cdn.simpleicons.org/figma",
}

// Conceptual topics with no brand logo -> meaningful Lucide fallback
const fallbackIcon: Record<string, React.ElementType> = {
  "Context API": Network,
  EJS: Layers3,
  "REST APIs": Network,
  OOPs: Boxes,
  MVC: Layers3,
  "Repository Architecture": Database,
  "CI/CD Pipelines": GitBranch,
  "Socket.io_no": Container,
}

export default function Skills() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#060913]" id="skills">
      <DottedWaves className="opacity-30" />
      <div className="absolute top-20 left-[8%] w-96 h-96 bg-cyan-500/[0.07] blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-[5%] w-96 h-96 bg-violet-600/[0.08] blur-[90px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <SectionHeading
          pill="Stack & Tooling"
          icon={<Cpu className="w-3.5 h-3.5" />}
          title="Technologies I"
          highlight="work with"
          sub="From frontend to backend, databases to cloud — every tool with its official logo."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.title] || Code2
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
                whileHover={{ y: -7 }}
                className="group relative rounded-[26px] opaque-glass protrude p-6 sm:p-7 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-[0.08] group-hover:opacity-[0.14] transition-opacity duration-500`} />
                <div className={`absolute -top-20 -right-20 w-52 h-52 bg-gradient-to-br ${category.color} opacity-[0.18] blur-3xl rounded-full pointer-events-none group-hover:opacity-[0.28] transition-opacity duration-500`} />
                <div className={`absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r ${category.color} opacity-80`} />

                <div className="relative">
                  <div className="flex items-center gap-3.5">
                    <span className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} grid place-items-center shadow-[0_10px_28px_rgba(0,0,0,0.4)] border border-white/25 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                      <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} blur-lg opacity-40 -z-10`} />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-space font-bold text-[17px] text-white tracking-tight">{category.title}</h3>
                      <p className="text-[11px] font-jetbrains tracking-[0.12em] uppercase text-muted-foreground mt-0.5">
                        {category.skills.length} technologies
                      </p>
                    </div>
                    <span className="font-space font-bold text-2xl text-white/[0.08] group-hover:text-white/[0.16] transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Original-logo tiles */}
                  <div className="mt-6 grid grid-cols-3 gap-2.5">
                    {category.skills.map((skill) => {
                      const src = brandIcon[skill]
                      const Fallback = fallbackIcon[skill]
                      return (
                        <div
                          key={skill}
                          title={skill}
                          className="group/tile relative rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 px-2 py-3.5 flex flex-col items-center gap-2.5 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.4),0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300 cursor-default overflow-hidden"
                        >
                          <span className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r ${category.color} opacity-0 group-hover/tile:opacity-100 transition-opacity`} />
                          <span className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 grid place-items-center shadow-inner group-hover/tile:scale-110 transition-transform duration-300">
                            {src ? (
                              <img src={src} alt={`${skill} logo`} loading="lazy" className="w-6 h-6 object-contain" />
                            ) : Fallback ? (
                              <Fallback className="w-6 h-6 text-white/85" />
                            ) : (
                              <span className="font-space font-bold text-[11px] text-white/85">
                                {skill.slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </span>
                          <span className="text-[11px] leading-tight font-medium text-white/75 group-hover/tile:text-white text-center w-full">
                            {skill}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 flex justify-center">
          <p className="inline-flex items-center gap-3 text-xs font-jetbrains tracking-wide text-muted-foreground px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
            Always exploring • System design • Cloud • AI-driven development
          </p>
        </motion.div>
      </div>
    </section>
  )
}
