"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Bell, Calendar, MessageSquare } from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("metrics")

  return (
    <div className="flex min-h-screen bg-black text-white">

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

        {/* Dashboard content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400">Bienvenido de nuevo, Usuario</p>
          </div>

          <Tabs defaultValue="metrics" className="space-y-6">
            <TabsList className="bg-gray-800">
              <TabsTrigger
                value="metrics"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                onClick={() => setActiveTab("metrics")}
              >
                Métricas
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                onClick={() => setActiveTab("insights")}
              >
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-0 bg-gray-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total de Vistas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,024</div>
                    <div className="mt-1 flex items-center text-xs text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      12% desde el mes pasado
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gray-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Nuevos Usuarios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">256</div>
                    <div className="mt-1 flex items-center text-xs text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      8% desde el mes pasado
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gray-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Contenido Generado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">48</div>
                    <div className="mt-1 flex items-center text-xs text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      24% desde el mes pasado
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gray-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Publicaciones Programadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <div className="mt-1 flex items-center text-xs text-yellow-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 01.707.293l1 1a1 1 0 01-1.414 1.414L10 5.414 8.707 6.707a1 1 0 01-1.414-1.414l1-1A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      2% desde el mes pasado
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 bg-gray-900">
                <CardHeader>
                  <CardTitle>Rendimiento de Publicaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full">
                    {/* Chart would go here */}
                    <div className="flex h-full items-end">
                      {[40, 25, 60, 75, 45, 55, 70, 65, 80, 90, 85, 95].map((height, i) => (
                        <div key={i} className="mx-1 flex-1">
                          <div className="bg-red-600 rounded-t" style={{ height: `${height}%` }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="border-0 bg-gray-900">
                <CardHeader>
                  <CardTitle>Mejores Horas para Publicar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                      <div key={day} className="text-center text-sm font-medium">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 7 }).map((_, dayIndex) => (
                      <div key={dayIndex} className="space-y-2">
                        {Array.from({ length: 3 }).map((_, timeIndex) => {
                          const intensity = Math.floor(Math.random() * 100)
                          let bgColor = "bg-gray-800"

                          if (intensity > 75) bgColor = "bg-red-600"
                          else if (intensity > 50) bgColor = "bg-red-500/70"
                          else if (intensity > 25) bgColor = "bg-red-500/40"

                          return (
                            <div
                              key={timeIndex}
                              className={`h-8 rounded ${bgColor} flex items-center justify-center text-xs`}
                            >
                              {["9AM", "3PM", "8PM"][timeIndex]}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gray-900">
                <CardHeader>
                  <CardTitle>Temas Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Tecnología", count: 45 },
                      { name: "Marketing", count: 38 },
                      { name: "Diseño", count: 32 },
                      { name: "Negocios", count: 28 },
                      { name: "Productividad", count: 25 },
                      { name: "Desarrollo Personal", count: 22 },
                      { name: "Finanzas", count: 18 },
                      { name: "Salud", count: 15 },
                    ].map((topic) => (
                      <div key={topic.name} className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                        {topic.name} <span className="text-gray-400">({topic.count})</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-6 border-0 bg-gray-900">
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-red-600/20 p-2">
                    <MessageSquare className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Caption Generado</p>
                    <p className="text-sm text-gray-400">5 mins atrás</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-red-600/20 p-2">
                    <BarChart className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Idea de Contenido Añadida</p>
                    <p className="text-sm text-gray-400">10 mins atrás</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-red-600/20 p-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Publicación Programada</p>
                    <p className="text-sm text-gray-400">1 hora atrás</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
