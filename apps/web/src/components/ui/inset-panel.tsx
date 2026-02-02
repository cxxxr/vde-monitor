import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type InsetPanelProps = HTMLAttributes<HTMLDivElement>;

const InsetPanel = ({ className, ...props }: InsetPanelProps) => {
  return (
    <div
      className={cn("border-latte-surface2/70 bg-latte-base/70 rounded-2xl border", className)}
      {...props}
    />
  );
};

export { InsetPanel };
