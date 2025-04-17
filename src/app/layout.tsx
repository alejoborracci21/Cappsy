import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"
import SupabaseProvider from "@/components/providers/SupabaseProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Cappsy",
  description: "Tu calendario e ideas de contenido con IA para Instagram y TikTok",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
