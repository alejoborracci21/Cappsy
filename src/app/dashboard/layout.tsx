"use client"

import { ReactNode, useState } from "react"
import Sidebar from "@/components/Sidebar"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  )

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SessionContextProvider>
  )
}
