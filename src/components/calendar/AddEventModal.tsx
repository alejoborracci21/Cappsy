"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface Event {
  id: string
  title: string
  date: Date
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate: Date
  newEventTitle: string
  setNewEventTitle: (title: string) => void
  selectedDateEvents: Event[]
  handleAddEvent: () => void
  handleDeleteEvent: (id: string) => void
}

export default function AddEventModal({
  open,
  onOpenChange,
  selectedDate,
  newEventTitle,
  setNewEventTitle,
  selectedDateEvents,
  handleAddEvent,
  handleDeleteEvent,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>Programar nueva publicación</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-700/50">
            <CalendarIcon className="h-5 w-5 text-red-400" />
            <span>{format(selectedDate, "PPP", { locale: es })}</span>
          </div>
          <Input
            placeholder="¿Qué vas a publicar ese día?"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            className="bg-slate-700 border-slate-600 focus-visible:ring-red-500"
          />
          {selectedDateEvents.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-300">Publicaciones existentes en esta fecha:</h3>
              <div className="space-y-2">
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50"
                  >
                    <p className="font-medium">{event.title}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-purple-300 hover:bg-purple-500/10"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Cancelar
          </Button>
          <Button onClick={handleAddEvent} className="bg-red-600 hover:bg-red-700 text-white">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
