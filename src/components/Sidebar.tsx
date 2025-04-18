// components/Sidebar.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, BarChart, Calendar, Settings, Bookmark } from "lucide-react";

import Image from "next/image";

export default function Sidebar() {
  const router = useRouter();
  return (
    <aside className="hidden w-64 flex-col border-r border-gray-800 bg-gray-900 md:flex">
      {/* Contenedor superior para el logo */}
      <div className="flex h-32 items-center justify-center border-b border-gray-800 px-6">
        <Image src="/logo.png" alt="Logo de Cappsy" width={100} height={100} />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <nav className="space-y-1">



          {/* Dashboard */}
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800"
            onClick={() => router.push("/dashboard")}
          >
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>


          {/* Generar ideas con IA */}
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800"
            onClick={() => router.push("/dashboard/content/ideas")}
          >
            <BarChart className="mr-2 h-5 w-5" />
            Generar ideas con IA
          </Button>


          {/* Historial de ideas */}
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800"
            onClick={() => router.push("/dashboard/content/saved")}
          >
            <Bookmark className="mr-2 h-5 w-5" />
            Historial de ideas
          </Button>


          {/* Calendario */}
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800"
            onClick={() => router.push("/dashboard/content/calendar")}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Calendario
          </Button>
        </nav>

        <div className="space-y-1">
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
    </aside>
  );
}
