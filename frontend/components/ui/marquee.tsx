import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
};

export function Marquee({ items, className }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div className={cn("relative overflow-x-auto md:overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050816] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#050816] to-transparent" />
      <div className="flex min-w-max gap-3 md:animate-marquee">
        {loop.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
