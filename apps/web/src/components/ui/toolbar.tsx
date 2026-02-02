import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ToolbarProps = HTMLAttributes<HTMLDivElement>;

const Toolbar = ({ className, ...props }: ToolbarProps) => {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-between gap-2", className)}
      {...props}
    />
  );
};

export { Toolbar };
