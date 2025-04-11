"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col text-white bg-gradient-to-br from-black via-[#121212] to-[#0f0f0f]">
      {/* Encabezado */}
      <header className="container mx-auto flex h-16 items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Cappsy</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className=" text-white hover:bg-gray-800"
            onClick={() => router.push("/auth/login")}
          >
            Iniciar sesión
          </Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => router.push("/auth/register")}
          >
            Registrarse
          </Button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
          {/* Sección de texto principal */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Bienvenido a Cappsy
            </h1>
            <p className="text-xl text-gray-300">
              Tu herramienta para crecer en redes sociales. Genera contenido
              atractivo, programa publicaciones y analiza tu rendimiento, todo
              en un solo lugar.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                size="lg"
                onClick={() => router.push("/auth/register")}
              >
                Comenzar Ahora
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-black hover:bg-gray-800"
                size="lg"
                onClick={() => router.push("/auth/login")}
              >
                Iniciar Sesión
              </Button>
            </div>
          </div>

          {/* Tarjeta con imagen */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md overflow-hidden rounded-xl border-0 bg-[#1e1e1e] shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-video w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Cappsy Dashboard Preview"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">
                    Potencia tu presencia en redes sociales
                  </h3>
                  <p className="mt-2 text-gray-400">
                    Genera ideas de contenido, captions atractivos y
                    programa tus publicaciones para maximizar tu alcance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sección de “features” (tarjetas) */}
        <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Tarjeta 1 */}
          <Card className="border-0 bg-[#1e1e1e] shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Generador de Contenido</h3>
              <p className="mt-2 text-gray-400">
                Crea captions atractivos y hashtags optimizados para tus
                publicaciones en segundos.
              </p>
            </CardContent>
          </Card>

          {/* Tarjeta 2 */}
          <Card className="border-0 bg-[#1e1e1e] shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Calendario de Publicaciones</h3>
              <p className="mt-2 text-gray-400">
                Programa y organiza tus publicaciones para mantener una
                presencia constante.
              </p>
            </CardContent>
          </Card>

          {/* Tarjeta 3 */}
          <Card className="border-0 bg-[#1e1e1e] shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Análisis de Rendimiento</h3>
              <p className="mt-2 text-gray-400">
                Monitorea el crecimiento de tus redes sociales con métricas
                detalladas.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="border-t border-gray-800 bg-black py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Cappsy. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
