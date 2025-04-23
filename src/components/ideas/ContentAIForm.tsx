"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2, CalendarPlus, BookmarkPlus } from "lucide-react"
import { useUser } from "@supabase/auth-helpers-react"
import { generateContentIdea } from "@/lib/ai/generateContent"
import { saveIdeaToSupabase } from "@/lib/supabase/ideas"
import AgendarDialog from "@/components/AgendarDialog"

export default function ContentAIForm() {
  const user = useUser()

  const [platform, setPlatform] = useState("Instagram")
  const [niche, setNiche] = useState("")
  const [style, setStyle] = useState("informativo")
  const [loading, setLoading] = useState(false)
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([])
  const [modalIdea, setModalIdea] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setGeneratedIdeas([])

    const prompt = `Eres un asesor creativo para un influencer de contenido en ${platform}, especializado en el nicho ${niche}. 
Sugiere 3 ideas de contenido originales y virales con estilo ${style}, breves y prácticas. 
No des títulos genéricos. Sé concreto y creativo.
Responde solo con una lista en viñetas y sin texto adicional.`

    try {
      const generated = await generateContentIdea(prompt)

      const ideasArray = generated.result
        .split("\n")
        .map(i => i.replace(/^[-•]\s*/, "").trim())
        .filter(i => i.length > 0)

      setGeneratedIdeas(ideasArray)
    } catch {
      setGeneratedIdeas(["Error al generar contenido."])
    }

    setLoading(false)
  }

  return (
    <div className="mt-10 space-y-6">
      {/* Filtros */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Red Social</Label>
          <Input
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            placeholder="Instagram o TikTok"
          />
        </div>
        <div className="space-y-2">
          <Label>Tipo de contenido</Label>
          <Input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Fitness, moda, educación..."
          />
        </div>
        <div className="space-y-2">
          <Label>Estilo</Label>
          <Input
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            placeholder="divertido, storytelling, educativo..."
          />
        </div>
      </div>

      {/* Botón generar */}
      <Button
        onClick={handleGenerate}
        className="bg-red-600 hover:bg-red-700 text-white"
        disabled={loading || !platform || !niche || !style}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generando...
          </>
        ) : (
          "Generar Ideas"
        )}
      </Button>

      {/* Cards generadas */}
      {generatedIdeas.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {generatedIdeas.map((idea, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between h-full min-h-[240px] p-4 bg-muted border border-white/10"
            >
              <CardContent className="flex-1 text-sm text-foreground">
                <p>{idea}</p>
              </CardContent>
              <CardFooter className="mt-4 flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full border border-white/10 hover:border-red-500"
                  onClick={() => setModalIdea(idea)}
                >
                  <CalendarPlus className="mr-2 h-4 w-4 text-red-500" />
                  Agendar
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={async () => {
                    if (user?.id) {
                      await saveIdeaToSupabase(idea, user.id, niche, platform, style)
                      alert("✅ Idea guardada.")
                    } else {
                      alert("Debes iniciar sesión para guardar ideas.")
                    }
                  }}
                >
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Guardar Idea
                </Button>

              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Modal agendar */}
      {modalIdea && (
        <AgendarDialog
          open={!!modalIdea}
          idea={modalIdea}
          platform={platform}
          onClose={() => setModalIdea(null)}
        />
      )}
    </div>
  )
}
