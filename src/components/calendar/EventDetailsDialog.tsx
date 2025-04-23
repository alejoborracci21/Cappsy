"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface Event {
  id: string
  title: string
  description?: string
  date: Date
}

interface EventDetailsDialogProps {
  event: Event
  open: boolean
  onClose: () => void
}

export default function EventDetailsDialog({
  event,
  open,
  onClose,
}: EventDetailsDialogProps) {
  const [instructionInput, setInstructionInput] = useState("")
  const [instructions, setInstructions] = useState<string[]>([])

  const handleAddInstruction = () => {
    if (!instructionInput.trim()) return
    setInstructions((prev) => [...prev, instructionInput.trim()])
    setInstructionInput("")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalles del Evento</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">📅 {event.date.toLocaleDateString("es-AR")}</p>
          <p className="text-lg font-semibold text-white">{event.title}</p>
          {event.description && (
            <p className="text-sm text-slate-300 leading-snug">{event.description}</p>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <label className="text-sm font-medium">Instrucciones o tareas para este evento:</label>
          <div className="flex gap-2">
            <Input
              value={instructionInput}
              onChange={(e) => setInstructionInput(e.target.value)}
              placeholder="Ej: preparar imagen, redactar caption..."
            />
            <Button onClick={handleAddInstruction} variant="secondary">
              Agregar
            </Button>
          </div>

          {instructions.length > 0 && (
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mt-2">
              {instructions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="secondary">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
