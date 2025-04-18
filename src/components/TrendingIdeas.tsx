// components/content-ideas/TrendingIdeas.tsx
import Image from "next/image"

export default function TrendingIdeas() {
  const topics = [
    { title: "Vida Sostenible", image: "/Vidasostenible.webp" },
    { title: "Innovaciones Tech", image: "/tech.webp" },
    { title: "Salud Mental", image: "/saludmental.webp" },
  ]

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Temas en Tendencia</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic, i) => (
          <div key={i} className="group relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <Image
              src={topic.image}
              alt={topic.title}
              width={300}
              height={200}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="font-bold">{topic.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}