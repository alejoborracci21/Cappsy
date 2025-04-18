"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Copy, Home, MessageSquare, BarChart } from "lucide-react"

export default function ContentGenerator() {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!content.trim()) return

    setIsGenerating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Example generated captions
    const captions = [
      "La vida es corta, haz que cada momento cuente.",
      "Brillar como un villano.",
      "Tomando mi café y disfrutando de la vista.",
    ]

    setGeneratedCaptions(captions)
    setIsGenerating(false)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="flex min-h-screen text-white">
      
      {/* Main content */}
      <div className="flex flex-1 flex-col">

        {/* Content Generator */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Generador de Contenido</h1>
            <p className="text-gray-400">Crea captions atractivos para tus publicaciones</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 bg-gray-900">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Escribe sobre qué quieres generar contenido..."
                    className="min-h-[150px] border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />

                  <Button
                    className="w-full bg-red-600 text-white hover:bg-red-700"
                    onClick={handleGenerate}
                    disabled={isGenerating || !content.trim()}
                  >
                    {isGenerating ? "Generando..." : "Generar"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-900">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold">Caption Preview</h2>

                {generatedCaptions.length > 0 ? (
                  <div className="space-y-4">
                    {generatedCaptions.map((caption, index) => (
                      <div key={index} className="group relative rounded-lg border border-gray-800 bg-gray-800/50 p-4">
                        <p className="text-white">{caption}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => handleCopy(caption)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-gray-800">
                    <p className="text-center text-gray-400">
                      {isGenerating ? "Generando captions..." : "Los captions generados aparecerán aquí"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bottom Navigation for Mobile */}
          <div className="fixed bottom-0 left-0 right-0 flex justify-around border-t border-gray-800 bg-gray-900 p-3 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-red-600">
              <MessageSquare className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.push("/content-ideas")}>
              <BarChart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.push("/content-calendar")}>
              <Calendar className="h-6 w-6" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
