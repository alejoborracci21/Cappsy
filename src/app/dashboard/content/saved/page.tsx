"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/supabase"
import { Loader2, Trash2, Search, CalendarDays, Tags } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"

interface Idea {
  id: string
  idea: string
  created_at: string
  tag?: string | null
}

export default function SavedIdeasPage() {
  const supabase = createClientComponentClient<Database>()
  const user = useUser()
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [tagFilter, setTagFilter] = useState("")

  const fetchIdeas = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("content_ideas")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error al obtener ideas:", error)
    } else {
      setIdeas(data as Idea[])
    }

    setLoading(false)
  }

  const deleteIdea = async (id: string) => {
    const { error } = await supabase.from("content_ideas").delete().eq("id", id)
    if (error) {
      alert("No se pudo eliminar la idea.")
    } else {
      setIdeas((prev) => prev.filter((idea) => idea.id !== id))
    }
  }

  useEffect(() => {
    if (user) fetchIdeas()
  }, [user])

  const uniqueTags = Array.from(new Set(ideas.map((i) => i.tag).filter(Boolean)))

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch = idea.idea.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = dateFilter
      ? format(new Date(idea.created_at), "yyyy-MM-dd") === dateFilter
      : true
    const matchesTag = tagFilter ? idea.tag === tagFilter : true
    return matchesSearch && matchesDate && matchesTag
  })

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">📂 Ideas guardadas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-1">
          <Label>Buscar por palabra clave</Label>
          <div className="relative">
            <Input
              placeholder="Ej: moda, fitness, educación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="space-y-1">
          <Label>Filtrar por fecha</Label>
          <div className="relative">
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700"
            />
            <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="space-y-1">
          <Label>Filtrar por etiqueta</Label>
          <div className="relative">
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded bg-gray-900 text-white border border-gray-700 appearance-none"
            >
              <option value="">Todas</option>
              {uniqueTags.map((tag) => (
                <option key={tag} value={tag!}>{tag}</option>
              ))}
            </select>
            <Tags className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          Cargando ideas...
        </div>
      ) : filteredIdeas.length === 0 ? (
        <p className="text-slate-400">No se encontraron ideas con los filtros actuales.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="bg-slate-900 border border-slate-700">
              <CardContent className="p-4 space-y-4">
                <p className="text-sm text-slate-300 whitespace-pre-line">{idea.idea}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{format(new Date(idea.created_at), "dd/MM/yyyy HH:mm")}</span>
                  {idea.tag && <span className="bg-slate-700 px-2 py-0.5 rounded-full text-white text-xs">#{idea.tag}</span>}
                </div>
                <div className="flex justify-end">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteIdea(idea.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}