import { cn } from "@/lib/utils";

/**
 * Reserved image space. No imagery is generated for this project — every
 * product shot and client logo is a clean, correctly proportioned placeholder.
 */
export function ImagePlaceholder({
  label,
  className,
  ratio = "square",
}: {
  label?: string;
  className?: string;
  ratio?: "square" | "wide" | "tall";
}) {
  return (
    <div
      role="img"
      aria-label={label ? `${label} — image placeholder` : "Image placeholder"}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-ecru-soft",
        ratio === "square" && "aspect-square",
        ratio === "wide" && "aspect-[16/7]",
        ratio === "tall" && "aspect-[4/5]",
        className,
      )}
    >
      <div className="absolute inset-3 border border-dashed border-border" aria-hidden />
      {label && (
        <span className="relative z-10 max-w-[80%] text-center text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}

export function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex h-20 items-center justify-center border border-border bg-white px-4">
      <span className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {name}
      </span>
    </div>
  );
}
