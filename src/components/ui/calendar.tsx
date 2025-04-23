"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 w-full", className)}
      classNames={{
        months: "flex flex-col w-full",
        month: "w-full space-y-4",
        caption: "flex justify-between items-center w-full px-2",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
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
          "hover:bg-neutral-800", // o "hover:bg-transparent" si no querés nada
          "aria-selected:bg-neutral-200",
          "aria-selected:text-black",
          "aria-selected:ring-2",
          "aria-selected:ring-red-500"
        ),
        day_selected: "", // lo estilamos con aria-selected directamente
        day_today: "text-white bg-white/10 font-semibold",
        day_outside: "text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
