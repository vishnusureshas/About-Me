"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, Code } from "lucide-react"
import { personalInfo } from "@/lib/data"

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div className="animated-grid absolute inset-0" />

      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-2 bg-background rounded-full overflow-hidden">
                <img
                  src="/profile.jpeg"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <motion.a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </motion.a>

            <motion.a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-1 -left-2 sm:-bottom-2 sm:-left-4 w-9 h-9 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center shadow-lg"
              animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-foreground" />
            </motion.a>
          </motion.div>

          <div className="text-center flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                {personalInfo.title}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            >
              {personalInfo.name.split(" ")[0]}{" "}
              <span className="gradient-text">
                {personalInfo.name.split(" ").slice(1).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-muted-foreground max-w-2xl mb-8 text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-none"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
            >
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card hover:bg-card/80 border border-border transition-colors w-full sm:w-auto justify-center"
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground truncate max-w-[200px] sm:max-w-none">{personalInfo.email}</span>
              </a>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border w-full sm:w-auto justify-center">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">{personalInfo.location}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center gap-4"
            >
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                <Code className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 rounded-full bg-primary"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
