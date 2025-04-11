"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar, Home, MessageSquare, BarChart, Settings, ChevronLeft, ChevronRight, Edit } from "lucide-react"

export default function ContentCalendar() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState("Octubre 2023")

  // Example calendar data
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const startDay = 0 // Sunday
  const daysInMonth = 31

  // Example events
  const events = [
    { id: 1, title: "Launch Blog Post", date: "Oct 3, 2023" },
    { id: 2, title: "Team Meeting", date: "Oct 5, 2023" },
  ]

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
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push("/content-ideas")}
            >
              <BarChart className="mr-2 h-5 w-5" />
              Ideas de Contenido
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start bg-gray-800 text-white"
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

        {/* Content Calendar */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Calendario de Contenido</h1>
            <Button className="bg-red-600 text-white hover:bg-red-700">Nuevo Evento</Button>
          </div>

          <Card className="border-0 bg-gray-900">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="text-white">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="text-xl font-bold">{currentMonth}</h2>
                  <Button variant="ghost" size="icon" className="text-white">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-7 gap-1 text-center text-sm font-medium">
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                  <div key={day} className="py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-14 rounded-md p-1"></div>
                ))}

                {days.slice(0, daysInMonth).map((day) => {
                  const isToday = day === 4 // Example: 4th is today
                  const hasEvent = day === 3 || day === 5

                  return (
                    <div
                      key={day}
                      className={`h-14 rounded-md p-1 ${
                        isToday ? "bg-red-600/20 ring-1 ring-red-600" : "hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex h-full flex-col">
                        <span className={`text-sm ${isToday ? "font-bold text-red-600" : ""}`}>{day}</span>
                        {hasEvent && <div className="mt-1 h-1.5 w-1.5 rounded-full bg-red-600"></div>}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6">
                <h3 className="mb-4 text-lg font-bold">Próximos Eventos</h3>

                <div className="space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/50 p-3"
                    >
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-400">{event.date}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Navigation for Mobile */}
          <div className="fixed bottom-0 left-0 right-0 flex justify-around border-t border-gray-800 bg-gray-900 p-3 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.push("/content-generator")}>
              <MessageSquare className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.push("/content-ideas")}>
              <BarChart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-red-600">
              <Calendar className="h-6 w-6" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
