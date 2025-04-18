// components/content-ideas/FiltersSidebar.tsx
"use client"

import { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface Props {
  popularityValue: number[]
  setPopularityValue: Dispatch<SetStateAction<number[]>>
}

export default function FiltersSidebar({ popularityValue, setPopularityValue }: Props) {
  return (
    <Card className="border-0 bg-gray-900">
      <CardContent className="p-6">
        <h2 className="mb-4 text-xl font-bold">Filtros Personalizables</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content-type">Tipo de Contenido</Label>
              <div className="h-4 w-4 rounded-full bg-red-600"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 text-white">
                Todos
              </Button>
              <Button variant="outline" size="sm" className="border-red-600 bg-red-600/20 text-white">
                Videos
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 text-white">
                Imágenes
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800 text-white">
                Texto
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="popularity">Popularidad</Label>
              <div className="h-4 w-4 rounded-full bg-red-600"></div>
            </div>
            <Slider
              id="popularity"
              value={popularityValue}
              onValueChange={setPopularityValue}
              max={100}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Emergente</span>
              <span>Tendencia</span>
              <span>Popular</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="nicho">Nicho</Label>
              <Switch id="nicho" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="estacional">Contenido Estacional</Label>
              <Switch id="estacional" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="evergreen">Contenido Evergreen</Label>
              <Switch id="evergreen" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 bg-red-600 text-white hover:bg-red-700">Obtener Ayuda</Button>
            <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800">
              Guardar Ideas
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
