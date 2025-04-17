"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Event {
  id: string
  title: string
  date: Date
}

interface Props {
  currentMonthEvents: Event[]
  setSelectedDate: (date: Date) => void
  setIsAddEventOpen: (open: boolean) => void
  handleDeleteEvent: (id: string) => void
}

export default function EventsSidebar({
  currentMonthEvents,
  setSelectedDate,
  setIsAddEventOpen,
  handleDeleteEvent,
}: Props) {
  return (
    <div className="w-1/3 flex flex-col gap-4">
      <div className="bg-slate-800/40 rounded-xl border border-slate-700/30 overflow-hidden flex-1 shadow-lg">
        <div className="p-4 border-b border-slate-700/30 bg-slate-800/60 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Publicaciones programadas</h2>
            <p className="text-sm text-slate-400">{currentMonthEvents.length} publicaciones este mes</p>
          </div>
          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              setSelectedDate(new Date())
              setIsAddEventOpen(true)
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Agregar
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-400px)] min-h-[300px]">
          <div className="p-4 space-y-3">
            {currentMonthEvents.length > 0 ? (
              currentMonthEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-700/20"
                >
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-slate-400">
                      {format(event.date, "PPP", { locale: es })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-purple-500/10"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 py-8">No hay publicaciones programadas</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
