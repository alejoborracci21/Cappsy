// components/content-ideas/FormatCards.tsx
import { Button } from "@/components/ui/button"
import { FileText, Headphones, Video } from "lucide-react"

export default function FormatCards() {
  const formats = [
    { icon: <Video className="mr-3 h-5 w-5 text-red-600" />, label: "Video Ensayos" },
    { icon: <Headphones className="mr-3 h-5 w-5 text-red-600" />, label: "Podcasts" },
    { icon: <FileText className="mr-3 h-5 w-5 text-red-600" />, label: "Blogs" },
  ]

  return (
    <div>
      <h2 className="mb-4 mt-8 text-xl font-bold">Formatos Populares</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {formats.map((format, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/50 p-4"
          >
            <div className="flex items-center">
              {format.icon}
              <span>{format.label}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              Ver
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}