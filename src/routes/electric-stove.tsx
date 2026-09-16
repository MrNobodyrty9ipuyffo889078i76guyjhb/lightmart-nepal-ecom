import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/electric-stove")({
  head: () => ({
    meta: [
      { title: "Induction Cookers & Electric Stoves | LightMart Nepal" },
      { name: "description", content: "Induction cookers, infrared cookers, hot plates and built-in hobs for Nepali kitchens." },
      { property: "og:title", content: "Induction Cookers & Electric Stoves | LightMart Nepal" },
      { property: "og:description", content: "Induction cookers, infrared cookers, hot plates and built-in hobs for Nepali kitchens." },
    ],
  }),
  component: () => <CategoryPage category="electric-stove" />,
});
