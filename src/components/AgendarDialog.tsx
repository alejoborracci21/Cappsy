"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "@supabase/auth-helpers-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AgendarDialog({
  open,
  onClose,
  idea,
  platform,
}: {
  open: boolean
  onClose: () => void
  idea: string
  platform: string
}) {
  const supabase = createClientComponentClient<Database>()
  const user = useUser()

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState(false)
  const [customTitle, setCustomTitle] = useState("")

  const handleSave = async () => {
    if (!date || !user?.id || !customTitle) return

    setLoading(true)

    const { error } = await supabase.from("posts_schedule").insert({
      user_id: user.id,
      title: customTitle,
      platform: platform.toLowerCase(),
      scheduled_date: date,
      description: idea, // ✅ ESTA es la línea que faltaba
    })

    if (error) {
      alert(`❌ Error al agendar publicación: ${error.message}`)
      console.error("Supabase error:", error)
    } else {
      alert("✅ Idea agendada correctamente")
      onClose()
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Agendar Evento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Título */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Título:</label>
            <Input
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Ej: Publicación de tendencia de moda"
            />
          </div>

          {/* Descripción */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Descripción:</label>
            <p className="text-sm text-muted-foreground leading-snug bg-background/30 border border-white/10 p-3 rounded-md">
              {idea}
            </p>
          </div>

          {/* Calendario */}
          <div className="space-y-2 w-full">
            <label className="text-sm font-medium">Seleccioná una fecha:</label>
            <DayPicker
              mode="single"
              selected={date}
              onSelect={(day) => day && setDate(day)}
              fromDate={new Date()}
              defaultMonth={date}
              showOutsideDays
              className="p-2 w-full"
              classNames={{
                months: "flex flex-col w-full",
                month: "w-full space-y-4",
                caption: "flex justify-between items-center w-full px-2",
                caption_label: "text-sm font-medium",
                nav: "flex items-center gap-1",
                nav_button: "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "ml-1",
                nav_button_next: "mr-1",
                table: "w-full border-collapse",
                head_row: "grid grid-cols-7 w-full",
                head_cell:
                  "text-muted-foreground text-center text-[0.8rem] font-normal",
                row: "grid grid-cols-7 gap-0 w-full",
                cell: "aspect-square text-center w-full",
                day: cn(
                  "w-full h-full p-0 rounded-md font-normal text-sm flex items-center justify-center",
                  "transition-colors",
                  "hover:bg-transparent", // 🔥 sin fondo al hacer hover
                  "aria-selected:bg-neutral-200",
                  "aria-selected:text-black",
                  "aria-selected:ring-2",
                  "aria-selected:ring-red-500"
                ),
                day_selected: "", // opcional si usás aria-selected
                day_today: "text-white bg-white/10 font-semibold",
                day_outside: "text-muted-foreground",
                day_disabled: "text-muted-foreground opacity-50",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: ({ className, ...props }) => (
                  <ChevronLeft className={cn("size-4", className)} {...props} />
                ),
                IconRight: ({ className, ...props }) => (
                  <ChevronRight className={cn("size-4", className)} {...props} />
                ),
              }}
            />

            <p className="text-xs text-muted-foreground text-center mt-2">
              {date
                ? `📅 Fecha seleccionada: ${format(date, "dd/MM/yyyy")}`
                : "Ninguna fecha seleccionada"}
            </p>
          </div>
        </div>

        {/* Botón */}
        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={!date || !customTitle || loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? "Agendando..." : "Guardar en Calendario"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
