"use client"

import { useEffect, useState } from "react"
import { parseISO, isSameDay } from "date-fns"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/supabase"
import { CalendarIcon } from "lucide-react"

import CalendarGrid from "@/components/CalendarGrid"
import EventsSidebar from "@/components/EventsSidebar"
import AddEventModal from "@/components/AddEventModal"

interface SupabaseEvent {
  id: string
  title: string
  scheduled_date: string
}

interface Event {
  id: string
  title: string
  date: Date
}

export default function CalendarPage() {
  const supabase = createClientComponentClient<Database>()
  const user = useUser()
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [newEventTitle, setNewEventTitle] = useState("")
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const fetchEvents = async () => {
    if (!user?.id) return
    const { data, error } = await supabase
      .from("posts_schedule")
      .select("*")
      .eq("user_id", user.id)
      .order("scheduled_date", { ascending: true })

    if (error) return console.error("Error al traer eventos:", error)

    const mapped =
      data?.map((e: SupabaseEvent): Event => ({
        id: e.id,
        title: e.title,
        date: parseISO(e.scheduled_date),
      })) || []

    setEvents(mapped)
  }

  useEffect(() => {
    fetchEvents()
  }, [user])

  const handleAddEvent = async () => {
    if (!selectedDate || !newEventTitle.trim() || !user?.id) return
    const { error } = await supabase.from("posts_schedule").insert({
      title: newEventTitle,
      scheduled_date: selectedDate.toISOString(),
      user_id: user.id,
    })

    if (error) {
      alert("Error al guardar evento")
      console.error(error)
    } else {
      fetchEvents()
      setNewEventTitle("")
      setIsAddEventOpen(false)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    const { error } = await supabase.from("posts_schedule").delete().eq("id", id)

    if (error) {
      alert("Error al eliminar evento")
      console.error(error)
    } else {
      fetchEvents()
    }
  }

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-80px)]">
      <div className="flex items-center justify-between p-4 border-b border-slate-700/30">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-red-500" />
          Calendario de publicaciones
        </h1>
        <p className="text-slate-400">Planifica y organiza tus publicaciones en el calendario</p>
      </div>

      <div className="flex flex-1 p-4 gap-4">
        <CalendarGrid
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setIsAddEventOpen={setIsAddEventOpen}
          events={events}
        />

        <EventsSidebar
          currentMonthEvents={events.filter(e => e.date.getMonth() === currentMonth.getMonth())}
          setSelectedDate={setSelectedDate}
          setIsAddEventOpen={setIsAddEventOpen}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>

      <AddEventModal
        open={isAddEventOpen}
        onOpenChange={setIsAddEventOpen}
        selectedDate={selectedDate}
        newEventTitle={newEventTitle}
        setNewEventTitle={setNewEventTitle}
        selectedDateEvents={events.filter(e => isSameDay(e.date, selectedDate))}
        handleAddEvent={handleAddEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
    </div>
  )
}
