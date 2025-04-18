"use client"

import { format, startOfMonth, endOfMonth, startOfWeek, eachDayOfInterval, addDays, isSameDay, isSameMonth } from "date-fns"
import { es } from "date-fns/locale"

interface Event {
  id: string
  title: string
  date: Date
}

interface CalendarGridProps {
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  setIsAddEventOpen: (open: boolean) => void
  events: Event[]
}

export default function CalendarGrid({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  setSelectedDate,
  setIsAddEventOpen,
  events,
}: CalendarGridProps) {
  const daysOfWeek = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"]

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    const firstDayOfWeek = startOfWeek(start, { weekStartsOn: 1 })
    const days = []
    let day = firstDayOfWeek
    while (day < start) {
      days.push(day)
      day = addDays(day, 1)
    }
    const daysInMonth = eachDayOfInterval({ start, end })
    days.push(...daysInMonth)
    day = addDays(end, 1)
    while (days.length < 42) {
      days.push(day)
      day = addDays(day, 1)
    }
    return days
  }

  const getEventsForDate = (date: Date) =>
    events.filter((event) => isSameDay(event.date, date))

  return (
    <div className="flex flex-col w-2/3 bg-slate-800/40 rounded-xl border border-slate-700/30 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-slate-700/30 bg-slate-800/60">
        <button
          onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
          className="text-slate-300 hover:text-white"
        >
          ◀
        </button>
        <h2 className="text-xl font-medium">{format(currentMonth, "MMMM yyyy", { locale: es })}</h2>
        <button
          onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
          className="text-slate-300 hover:text-white"
        >
          ▶
        </button>
      </div>

      <div className="p-4 flex-1">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-slate-300 py-2 bg-slate-800/40 rounded-md"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth().map((day, i) => {
            const dayEvents = getEventsForDate(day)
            const isToday = isSameDay(day, new Date())
            const isSelected = isSameDay(day, selectedDate)
            const isCurrentMonth = isSameMonth(day, currentMonth)

            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(day)
                  setIsAddEventOpen(true)
                }}
                className={`h-16 p-1 rounded-md flex flex-col items-center justify-start relative transition-colors
                  ${isToday ? "bg-slate-700/70 font-bold" : ""}
                  ${isSelected ? "bg-red-500/10 border border-white" : ""}
                  ${!isCurrentMonth ? "opacity-40" : "hover:bg-slate-700/50"}`}
              >
                <span className={`text-sm w-7 h-7 flex items-center justify-center rounded-full
                  ${isSelected ? "bg-red-500 text-white" : ""}
                  ${isToday && !isSelected ? "bg-slate-600 text-white" : ""}`}>
                  {format(day, "d")}
                </span>
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                    {dayEvents.length > 3 ? (
                      <div className="text-[8px] px-1 py-0 bg-red-500/20 text-red-300 rounded-full">
                        {dayEvents.length}
                      </div>
                    ) : (
                      dayEvents.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      ))
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}