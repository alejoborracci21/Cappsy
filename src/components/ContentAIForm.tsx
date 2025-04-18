"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { generateContentIdea } from "@/lib/ai/generateContent"
import { useUser } from "@supabase/auth-helpers-react"
import { saveIdeaToSupabase } from "@/lib/supabase/ideas"

export default function ContentAIForm() {
  const user = useUser()
  const [platform, setPlatform] = useState("Instagram")
  const [niche, setNiche] = useState("")
  const [style, setStyle] = useState("informativo")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  const handleGenerate = async () => {
    setLoading(true)
    setResult("")

    const prompt = `Genera 3 ideas de contenido para un influencer de ${niche} en ${platform} con un estilo ${style}. Escribilas en español, deben ser creativas, virales y breves.`

    try {
      const generated = await generateContentIdea(prompt)
      console.log("Generated content:", generated)
      setResult(generated.result)

      if (user?.id) {
        await saveIdeaToSupabase(generated.result, user.id, niche)
      }
    } catch {
      setResult("Error al generar contenido.")
    }

    setLoading(false)
  }

  return (
    <div className="mt-10 space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Red Social</Label>
          <Input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Instagram o TikTok" />
        </div>
        <div className="space-y-2">
          <Label>Tipo de contenido</Label>
          <Input value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Fitness, moda, educación..." />
        </div>
        <div className="space-y-2">
          <Label>Estilo</Label>
          <Input value={style} onChange={(e) => setStyle(e.target.value)} placeholder="divertido, storytelling, educativo..." />
        </div>
      </div>

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

      {result && (
        <div className="mt-6">
          <Label>Resultado:</Label>
          <Textarea readOnly value={result} className="bg-gray-900 border-gray-700 text-white mt-2" rows={8} />
        </div>
      )}
    </div>
  )
}
