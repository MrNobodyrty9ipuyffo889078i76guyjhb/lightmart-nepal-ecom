import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/light")({
  head: () => ({
    meta: [
      { title: "LED Lights & Lamps in Nepal | LightMart" },
      { name: "description", content: "Shop LED bulbs, panel lights, pendants, strips and flood lights with delivery across Nepal." },
      { property: "og:title", content: "LED Lights & Lamps in Nepal | LightMart" },
      { property: "og:description", content: "Shop LED bulbs, panel lights, pendants, strips and flood lights with delivery across Nepal." },
    ],
  }),
  component: () => <CategoryPage category="light" />,
});
