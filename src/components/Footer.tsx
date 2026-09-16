import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PHONE_DISPLAY } from "@/lib/format";

const shop = [
  { to: "/light", label: "Lights" },
  { to: "/switch", label: "Switches" },
  { to: "/fan", label: "Fans" },
  { to: "/electric-stove", label: "Electric Stoves" },
  { to: "/clock", label: "Clocks" },
  { to: "/main", label: "Main Electrical" },
] as const;

const company = [
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
  { to: "/shop", label: "All Products" },
  { to: "/cart", label: "Your Cart" },
] as const;

const policies = [
  { to: "/delivery", label: "Delivery Information" },
  { to: "/returns", label: "Returns & Warranty" },
  { to: "/login", label: "Login" },
  { to: "/signup", label: "Create Account" },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-semibold tracking-tight">
            Light<span className="font-light">Mart</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Nepal&apos;s premium destination for lighting, switches, fans, electrical fittings,
            stoves and clocks — supplying homes, hotels and contractors since 2014.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">Shop</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {shop.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">Company</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {[...company, ...policies].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>New Road, Kathmandu, Nepal</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <a href="tel:+9779845441995" className="hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href="mailto:hello@lightmart.com.np" className="hover:text-white">
                hello@lightmart.com.np
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Sun – Fri, 9:30 AM – 7:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} LightMart Pvt. Ltd. All rights reserved.</p>
          <p>Cash on Delivery · Bank Transfer · WhatsApp Ordering</p>
        </div>
      </div>
    </footer>
  );
}
