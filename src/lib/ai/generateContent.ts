export const generateContentIdea = async (prompt: string): Promise<{ result: string }> => {
    const response = await fetch("/api/ai/idea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
  
    if (!response.ok) {
      console.error("❌ Error al generar contenido vía API interna")
      throw new Error("Error en la generación de ideas")
    }
  
    const data = await response.json()
    console.log("✅ Respuesta de la API:", data)
    return data // <-- Devolvés el objeto completo, con propiedad `result`
  }