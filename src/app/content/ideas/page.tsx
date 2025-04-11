"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar, Home, MessageSquare, BarChart, Settings, Video, Headphones, FileText } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ContentIdeas() {
  const router = useRouter()
  const [popularityValue, setPopularityValue] = useState([50])

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - same as dashboard */}
      <div className="hidden w-64 flex-col border-r border-gray-800 bg-gray-900 md:flex">
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <h1 className="text-xl font-bold">Cappsy</h1>
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push("/dashboard")}
            >
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push("/content-generator")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Generador
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start bg-gray-800 text-white"
              onClick={() => router.push("/content-ideas")}
            >
              <BarChart className="mr-2 h-5 w-5" />
              Ideas de Contenido
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push("/content-calendar")}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Calendario
            </Button>
          </nav>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push("/settings")}
            >
              <Settings className="mr-2 h-5 w-5" />
              Configuración
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
          <div className="md:hidden">
            <h1 className="text-xl font-bold">Cappsy</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback className="bg-red-600">US</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Ideas */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Ideas de Contenido</h1>
            <p className="text-gray-400">Descubre ideas populares para tu próximo contenido</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="border-0 bg-gray-900">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-bold">Temas Tendencia</h2>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="group relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Sustainable Living"
                        width={300}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-bold">Vida Sostenible</h3>
                      </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Tech Innovations"
                        width={300}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-bold">Innovaciones Tech</h3>
                      </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Mental Health"
                        width={300}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-bold">Salud Mental</h3>
                      </div>
                    </div>
                  </div>

                  <h2 className="mb-4 mt-8 text-xl font-bold">Formatos Populares</h2>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/50 p-4">
                      <div className="flex items-center">
                        <Video className="mr-3 h-5 w-5 text-red-600" />
                        <span>Video Ensayos</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Ver
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/50 p-4">
                      <div className="flex items-center">
                        <Headphones className="mr-3 h-5 w-5 text-red-600" />
                        <span>Podcasts</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Ver
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/50 p-4">
                      <div className="flex items-center">
                        <FileText className="mr-3 h-5 w-5 text-red-600" />
                        <span>Blogs</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Ver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-0 bg-gray-900">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-bold">Filtros Personalizables</h2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="content-type">Tipo de Contenido</Label>
                        <div className="h-4 w-4 rounded-full bg-red-600"></div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 text-white">
                          Todos
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-600 bg-red-600/20 text-white">
                          Videos
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 text-white">
                          Imágenes
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 text-white">
                          Texto
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="popularity">Popularidad</Label>
                        <div className="h-4 w-4 rounded-full bg-red-600"></div>
                      </div>
                      <Slider
                        id="popularity"
                        value={popularityValue}
                        onValueChange={setPopularityValue}
                        max={100}
                        step={1}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Emergente</span>
                        <span>Tendencia</span>
                        <span>Popular</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="nicho">Nicho</Label>
                        <Switch id="nicho" />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="estacional">Contenido Estacional</Label>
                        <Switch id="estacional" />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="evergreen">Contenido Evergreen</Label>
                        <Switch id="evergreen" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-red-600 text-white hover:bg-red-700">Obtener Ayuda</Button>
                      <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800">
                        Guardar Ideas
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Navigation for Mobile */}
          <div className="fixed bottom-0 left-0 right-0 flex justify-around border-t border-gray-800 bg-gray-900 p-3 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.push("/content-generator")}>
              <MessageSquare className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-red-600">
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
