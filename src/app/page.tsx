import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Education from "@/components/Education"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-clip bg-[#05070f]">
      <Navbar />
      <Hero />
      <div className="h-px max-w-6xl mx-auto bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
