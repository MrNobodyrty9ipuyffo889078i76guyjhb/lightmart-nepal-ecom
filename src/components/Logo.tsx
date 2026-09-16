import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn("group inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-semibold tracking-tight text-brand",
          compact ? "text-xl" : "text-2xl sm:text-[1.75rem]",
        )}
      >
        Light<span className="font-light">Mart</span>
      </span>
      {!compact && (
        <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Lighting &amp; Electricals
        </span>
      )}
    </Link>
  );
}
