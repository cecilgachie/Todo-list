import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import { LiveChat } from "@/components/live-chat"
import { CookieConsent } from "@/components/cookie-consent"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Poster Maker - Create Stunning Designs with AI",
  description:
    "Professional poster and flier maker powered by AI. Create beautiful designs in minutes with smart templates and AI-generated content.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <LiveChat />
          <CookieConsent />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
