"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import type { Database } from "@/types/supabase"
import { Loader2, Trash2, Search, CalendarDays, Tags, X, Filter, BookmarkPlus } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  const [showFilters, setShowFilters] = useState(false)

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
    try {
      const { error } = await supabase.from("content_ideas").delete().eq("id", id)
      if (error) throw error
      setIdeas((prev) => prev.filter((idea) => idea.id !== id))
    } catch (error) {
      alert("No se pudo eliminar la idea.")
      console.error(error)
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setDateFilter("")
    setTagFilter("")
  }

  useEffect(() => {
    if (user) fetchIdeas()
  }, [user])

  const uniqueTags = Array.from(new Set(ideas.map((i) => i.tag).filter(Boolean)))

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch = idea.idea.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = dateFilter ? format(new Date(idea.created_at), "yyyy-MM-dd") === dateFilter : true
    const matchesTag = tagFilter ? idea.tag === tagFilter : true
    return matchesSearch && matchesDate && matchesTag
  })

  const isFiltering = searchTerm || dateFilter || tagFilter

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-3 text-3xl font-bold">
              <span className="rounded-lg bg-red-600/20 p-2 text-red-500">
                <BookmarkPlus className="h-8 w-8" />
              </span>
              Historial de Ideas
            </h1>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtros
              {isFiltering && (
                <Badge variant="destructive" className="ml-2 bg-red-600">
                  {(searchTerm ? 1 : 0) + (dateFilter ? 1 : 0) + (tagFilter ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="mt-6 rounded-xl bg-gray-800/30 p-5 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium">Filtrar ideas</h2>
                {isFiltering && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 text-xs text-gray-400 hover:text-white"
                  >
                    <X className="mr-1 h-3 w-3" />
                    Limpiar filtros
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-400">Buscar por palabra clave</Label>
                  <div className="relative">
                    <Input
                      placeholder="Ej: moda, fitness, educación..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-gray-700 bg-gray-800/50 pl-10 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    {searchTerm && (
                      <button
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
                        onClick={() => setSearchTerm("")}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-400">Filtrar por fecha</Label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="border-gray-700 bg-gray-800/50 pl-10 text-white focus:border-red-500 focus:ring-red-500/20"
                    />
                    <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    {dateFilter && (
                      <button
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
                        onClick={() => setDateFilter("")}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-400">Filtrar por tipo de contenido</Label>
                  <div className="relative">
                    <select
                      value={tagFilter}
                      onChange={(e) => setTagFilter(e.target.value)}
                      className="w-full appearance-none rounded border border-gray-700 bg-gray-800/50 py-2 pl-10 pr-8 text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/20"
                    >
                      <option value="">Todos</option>
                      {uniqueTags.map((tag) => (
                        <option key={tag} value={tag!}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <Tags className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {loading ? (
          <div className="flex h-60 items-center justify-center rounded-xl bg-gray-800/20 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-red-500" />
              <p className="text-lg text-gray-400">Cargando tus hiostorial...</p>
            </div>
          </div>
        ) : filteredIdeas.length === 0 ? (
          <div className="flex h-60 flex-col items-center justify-center gap-4 rounded-xl bg-gray-800/20 p-8 text-center backdrop-blur-sm">
            {isFiltering ? (
              <>
                <div className="rounded-full bg-gray-800 p-3">
                  <Search className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-xl font-medium">No se encontraron ideas</h3>
                  <p className="text-gray-400">No hay resultados con los filtros actuales.</p>
                </div>
                <Button variant="outline" onClick={clearFilters} className="mt-2 border-gray-700 hover:bg-gray-800">
                  Limpiar filtros
                </Button>
              </>
            ) : (
              <>
                <div className="rounded-full bg-gray-800 p-3">
                  <BookmarkPlus className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-xl font-medium">No tienes ideas guardadas</h3>
                  <p className="text-gray-400">Guarda ideas de contenido para verlas aquí.</p>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                {filteredIdeas.length} {filteredIdeas.length === 1 ? "idea encontrada" : "ideas encontradas"}
                {isFiltering && " con los filtros actuales"}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <TooltipProvider>
                {filteredIdeas.map((idea) => (
                  <Card
                    key={idea.id}
                    className="group overflow-hidden border-gray-800 bg-gray-900/80 transition-all duration-200 hover:border-gray-700 hover:bg-gray-900 hover:shadow-lg hover:shadow-black/20"
                  >
                    <CardContent className="p-5">
                      {idea.idea
                        .split(/\n|(?=\d+\.)/)
                        .map((line, idx) => (
                          <p key={idx} className="text-sm text-gray-200 mb-2 leading-relaxed">
                            {line.trim()}
                          </p>
                        ))}
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t border-gray-800 bg-gray-900/50 px-4 py-2">
                      <div className="flex items-center gap-2">
                        <time className="text-xs text-gray-500" dateTime={idea.created_at}>
                          {format(new Date(idea.created_at), "dd/MM/yyyy")}
                        </time>
                        {idea.tag && (
                          <Badge
                            variant="outline"
                            className="w-fit border-red-900/30 bg-red-900/10 px-2 text-xs font-normal text-red-400"
                            onClick={() => setTagFilter(idea.tag || "")}
                          >
                            #{idea.tag}
                          </Badge>
                        )}
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteIdea(idea.id)}
                            className="h-8 w-8 text-gray-500 opacity-0 transition-opacity hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Eliminar idea</p>
                        </TooltipContent>
                      </Tooltip>
                    </CardFooter>
                  </Card>
                ))}
              </TooltipProvider>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
