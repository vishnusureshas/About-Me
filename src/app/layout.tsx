import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vishnu A.S | Full Stack Developer",
  description: "Full Stack Developer specializing in React.js, React Native, Node.js, Express.js, and PostgreSQL. Nearly 3 years of experience building ERP, LMS, and enterprise applications.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body>{children}</body>
    </html>
  )
}
