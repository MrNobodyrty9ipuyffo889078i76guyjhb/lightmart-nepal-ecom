import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/switch")({
  head: () => ({
    meta: [
      { title: "Modular Switches & Sockets | LightMart Nepal" },
      { name: "description", content: "Buy 1, 2, 4 and 6 gang modular switches, sockets and dimmers with 3-year warranty." },
      { property: "og:title", content: "Modular Switches & Sockets | LightMart Nepal" },
      { property: "og:description", content: "Buy 1, 2, 4 and 6 gang modular switches, sockets and dimmers with 3-year warranty." },
    ],
  }),
  component: () => <CategoryPage category="switch" />,
});
