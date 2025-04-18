// src/app/dashboard/content/ideas/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Home, MessageSquare, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import TrendingIdeas from "@/components/TrendingIdeas"
import FormatCards from "@/components/FormatCards"
import FiltersSidebar from "@/components/FiltersSidebar"
import ContentAIForm from "@/components/ContentAIForm"

export default function ContentIdeas() {
  const router = useRouter()
  const [popularityValue, setPopularityValue] = useState([50])

  return (
    <div className="flex min-h-screen text-white">
      <div className="flex flex-1 flex-col">

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Ideas de Contenido</h1>
            <p className="text-gray-400">
              Descubre ideas populares para tu próximo contenido
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <TrendingIdeas />
              <FormatCards />
              <ContentAIForm />
            </div>

            <FiltersSidebar
              popularityValue={popularityValue}
              setPopularityValue={setPopularityValue}
            />
          </div>

          {/* Bottom Navigation for Mobile */}
          <div className="fixed bottom-0 left-0 right-0 flex justify-around border-t border-gray-800 bg-gray-900 p-3 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
            >
              <Home className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard/content/generate")}
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-red-600">
              <BarChart className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard/content/calendar")}
            >
              <Calendar className="h-6 w-6" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
