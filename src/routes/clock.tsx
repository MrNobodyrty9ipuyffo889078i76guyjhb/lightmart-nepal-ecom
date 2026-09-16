import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/clock")({
  head: () => ({
    meta: [
      { title: "Wall, Table & Digital Clocks | LightMart Nepal" },
      { name: "description", content: "Silent sweep wall clocks, pendulum clocks and digital desk clocks delivered in Nepal." },
      { property: "og:title", content: "Wall, Table & Digital Clocks | LightMart Nepal" },
      { property: "og:description", content: "Silent sweep wall clocks, pendulum clocks and digital desk clocks delivered in Nepal." },
    ],
  }),
  component: () => <CategoryPage category="clock" />,
});
