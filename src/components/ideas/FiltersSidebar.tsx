"use client"

import type { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface Props {
  popularityValue: number[]
  setPopularityValue: Dispatch<SetStateAction<number[]>>
}

export default function FiltersSidebar({ popularityValue, setPopularityValue }: Props) {
  // Content type options
  const contentTypes = [
    { id: "all", label: "Todos", active: true },
    { id: "videos", label: "Videos", active: false },
    { id: "images", label: "Imágenes", active: false },
    { id: "text", label: "Texto", active: false },
  ]

  return (
    <div className="h-full rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 p-0.5">
      <div className="h-full rounded-lg bg-gray-900 px-5 py-6">
        <h2 className="mb-6 text-xl font-bold text-white">
          <span className="mr-2 inline-block h-3 w-3 rounded-full bg-red-500"></span>
          Filtros Personalizables
        </h2>

        {/* Content Type */}
        <div className="mb-6">
          <Label className="mb-3 block text-sm font-medium text-gray-300">Tipo de Contenido</Label>
          <div className="grid grid-cols-2 gap-2">
            {contentTypes.map((type) => (
              <Button
                key={type.id}
                variant={type.id === "videos" ? "default" : "outline"}
                size="sm"
                className={
                  type.id === "videos"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600 hover:bg-gray-700 hover:text-white"
                }
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Popularity Slider */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-300">Popularidad</Label>
            <span className="text-xs font-medium text-gray-400">{popularityValue[0]}%</span>
          </div>

          <Slider value={popularityValue} onValueChange={setPopularityValue} max={100} step={1} className="py-1 bg-gray-500 rounded-2xl" />

          <div className="flex justify-between">
            <div className="text-center">
              <div className="mx-auto mb-1 h-1 w-8 rounded bg-gradient-to-r from-gray-600 to-gray-500"></div>
              <span className="text-xs text-gray-400">Emergente</span>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-1 h-1 w-8 rounded bg-gradient-to-r from-gray-500 to-red-500"></div>
              <span className="text-xs text-gray-400">Tendencia</span>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-1 h-1 w-8 rounded bg-gradient-to-r from-red-500 to-red-600"></div>
              <span className="text-xs text-gray-400">Popular</span>
            </div>
          </div>
        </div>

        {/* Toggle Switches */}
        <div className="mb-8 space-y-4 rounded-lg border border-gray-800 bg-gray-800/30 p-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="nicho" className="text-sm font-medium text-gray-300">
              Tipo de contenido
            </Label>
            <Switch id="nicho" className="data-[state=checked]:bg-red-600" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="estacional" className="text-sm font-medium text-gray-300">
              Contenido Estacional
            </Label>
            <Switch id="estacional" className="data-[state=checked]:bg-red-600" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="evergreen" className="text-sm font-medium text-gray-300">
              Contenido Evergreen
            </Label>
            <Switch id="evergreen" className="data-[state=checked]:bg-red-600" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3">
          <Button className="w-full bg-red-600 text-white hover:bg-red-700">Obtener Ayuda</Button>
          <Button
            variant="outline"
            className="w-full border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800 hover:text-white"
          >
            Guardar Ideas
          </Button>
        </div>
      </div>
    </div>
  )
}
