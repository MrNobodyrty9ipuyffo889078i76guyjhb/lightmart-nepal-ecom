import { Facebook, Instagram, Music2, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/format";

const links = [
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://tiktok.com", label: "TikTok", Icon: Music2 },
  {
    href: whatsappLink("Hello LightMart! I have a question about your products."),
    label: "WhatsApp",
    Icon: MessageCircle,
  },
];

export function SocialBar() {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1 border border-border bg-white p-1 shadow-lg md:bottom-auto md:left-0 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:border-l-0">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="grid h-10 w-10 place-items-center text-ink transition-colors hover:bg-navy hover:text-white"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
