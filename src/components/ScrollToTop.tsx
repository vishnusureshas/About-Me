"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 360)
    window.addEventListener("scroll", toggle, { passive: true })
    return () => window.removeEventListener("scroll", toggle)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 pl-1 pr-4 py-1 rounded-full glass-strong shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-white/15 transition-colors focus-ring"
          aria-label="Scroll to top"
        >
          <span className="relative w-9 h-9 rounded-full bg-foreground text-background grid place-items-center overflow-hidden flex-shrink-0">
            <motion.span style={{ scaleY }} className="absolute inset-0 origin-bottom bg-gradient-to-t from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            <ArrowUp className="w-4 h-4 relative" />
          </span>
          <span className="hidden sm:block text-xs font-medium tracking-wide text-foreground pr-1">Back to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
