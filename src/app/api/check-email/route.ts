import { NextRequest, NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdminClient'

export async function POST(request: NextRequest) {
  try {
    const { email } = (await request.json()) as { email?: string }

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 })
    }

    // Listar usuarios (puede paginar si hay muchos)
    const { data, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      console.error('Error al listar usuarios:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const exists = data.users.some((user) => user.email === email)
    return NextResponse.json({ exists })
  } catch (e: any) {
    console.error('Route /api/check-email error:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
