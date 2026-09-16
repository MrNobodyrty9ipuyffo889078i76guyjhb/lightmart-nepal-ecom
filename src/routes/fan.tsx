import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/fan")({
  head: () => ({
    meta: [
      { title: "Ceiling, Wall & BLDC Fans in Nepal | LightMart" },
      { name: "description", content: "Energy-saving BLDC, ceiling, wall, stand and exhaust fans delivered across Nepal." },
      { property: "og:title", content: "Ceiling, Wall & BLDC Fans in Nepal | LightMart" },
      { property: "og:description", content: "Energy-saving BLDC, ceiling, wall, stand and exhaust fans delivered across Nepal." },
    ],
  }),
  component: () => <CategoryPage category="fan" />,
});
