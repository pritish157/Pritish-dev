import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Subheading } from "@/components/ui/subheading";
import { cn } from "@/lib/utils";

export type SectionHeadingProps = React.HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ className, eyebrow, title, description, align = "left", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "max-w-3xl space-y-4 mb-12 sm:mb-16",
          align === "center" && "mx-auto text-center",
          className
        )}
        {...props}
      >
        {eyebrow && (
          <div>
            <Badge variant="accent">{eyebrow}</Badge>
          </div>
        )}
        <Heading level={2} size="h2">
          {title}
        </Heading>
        {description && (
          <Subheading size="large" className={align === "center" ? "mx-auto" : ""}>
            {description}
          </Subheading>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";
