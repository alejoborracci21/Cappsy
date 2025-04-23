"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Dispatch, SetStateAction } from "react"

interface Event {
  id: string
  title: string
  description?: string
  date: Date
}

interface EventsSidebarProps {
  currentMonthEvents: Event[]
  setSelectedDate: (date: Date) => void
  setIsAddEventOpen: (open: boolean) => void
  handleDeleteEvent: (id: string) => void
  setSelectedEvent: Dispatch<SetStateAction<Event | null>> // 👈 clave para ver detalles
}

export default function EventsSidebar({
  currentMonthEvents,
  setSelectedDate,
  setIsAddEventOpen,
  handleDeleteEvent,
  setSelectedEvent,
}: EventsSidebarProps) {
  return (
    <div className="w-1/3 p-4 bg-slate-800/40 border border-slate-700/30 rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Publicaciones programadas</h2>

      <ScrollArea className="h-[calc(100vh-220px)] pr-2">
        {currentMonthEvents.length === 0 ? (
          <p className="text-sm text-slate-400">No hay publicaciones este mes</p>
        ) : (
          currentMonthEvents.map((event) => (
            <div
              key={event.id}
              className="mb-3 p-3 border border-white/10 rounded-md bg-slate-700/30"
            >
              <p className="text-white font-medium">{event.title}</p>
              <p className="text-sm text-slate-300">
                {format(event.date, "d 'de' MMMM yyyy", { locale: es })}
              </p>

              <div className="flex gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-500/10"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Eliminar
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedDate(event.date)
                    setSelectedEvent(event)
                  }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Ver detalles
                </Button>
              </div>
            </div>
          ))
        )}
      </ScrollArea>

      <Button
        onClick={() => setIsAddEventOpen(true)}
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white"
      >
        + Agregar
      </Button>
    </div>
  )
}
