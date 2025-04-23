import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"

export const saveIdeaToSupabase = async (idea: string, userId: string, tag?: string, niche?: string, platform?: string, tone?:string ) => {
    const supabase = createClientComponentClient<Database>()
  
    const { error } = await supabase.from("content_ideas").insert({
      idea,
      user_id: userId,
      tag,
      niche,
      platform,
      tone
    })
  
    if (error) {
      console.error("❌ Error al guardar idea:", error)
      throw new Error("No se pudo guardar la idea")
    }
  }