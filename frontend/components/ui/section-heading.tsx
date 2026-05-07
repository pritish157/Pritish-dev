import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl space-y-5", align === "center" && "mx-auto text-center")}>
      <Badge className="border-violet-400/20 bg-violet-500/10 text-violet-200">{eyebrow}</Badge>
      <div className="space-y-4">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">{description}</p>
      </div>
    </div>
  );
}
