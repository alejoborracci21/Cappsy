"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar, Home, MessageSquare, BarChart, Settings, User, Upload } from "lucide-react"

export default function Profile() {
  const router = useRouter()
  const [name, setName] = useState("Usuario Ejemplo")
  const [email, setEmail] = useState("usuario@ejemplo.com")
  const [bio, setBio] = useState("Creador de contenido digital especializado en marketing y tecnología.")
  const [password, setPassword] = useState("")

  const handleSave = () => {
    // Handle save profile logic
    console.log("Profile saved")
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - same as dashboard */}
      <div className="hidden w-64 flex-col border-r border-gray-800 bg-gray-900 md:flex">
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <h1 className="text-xl font-bold">Cappsy</h1>
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push("/dashboard")}
            >
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push("/content/generate")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Generador
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push("/content/ideas")}
            >
              <BarChart className="mr-2 h-5 w-5" />
              Ideas de Contenido
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push("/content/calendar")}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Calendario
            </Button>
          </nav>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start bg-gray-800 text-white"
              onClick={() => router.push("/profile")}
            >
              <User className="mr-2 h-5 w-5" />
              Perfil
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push("/settings")}
            >
              <Settings className="mr-2 h-5 w-5" />
              Configuración
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
          <div className="md:hidden">
            <h1 className="text-xl font-bold">Cappsy</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback className="bg-red-600">US</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Profile */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Perfil</h1>
            <p className="text-gray-400">Administra tu información personal</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-0 bg-gray-900">
              <CardContent className="flex flex-col items-center p-6">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                    <AvatarFallback className="bg-red-600 text-xl">US</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full border-gray-700 bg-gray-800"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-gray-400">{email}</p>

                <div className="mt-6 w-full">
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => router.push("/dashboard")}
                  >
                    Ver Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-900 md:col-span-2">
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[100px] border-gray-700 bg-gray-800 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Contraseña
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresa una nueva contraseña para cambiarla"
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>

                  <Button className="bg-red-600 text-white hover:bg-red-700" onClick={handleSave}>
                    Guardar Cambios
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
