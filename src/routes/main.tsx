import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/main")({
  head: () => ({
    meta: [
      { title: "MCBs, Distribution Boards & Wires | LightMart Nepal" },
      { name: "description", content: "Main electrical supplies: MCBs, RCCBs, distribution boards, copper wire and changeovers." },
      { property: "og:title", content: "MCBs, Distribution Boards & Wires | LightMart Nepal" },
      { property: "og:description", content: "Main electrical supplies: MCBs, RCCBs, distribution boards, copper wire and changeovers." },
    ],
  }),
  component: () => <CategoryPage category="main" />,
});
