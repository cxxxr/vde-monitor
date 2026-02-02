import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type MonoBlockProps = HTMLAttributes<HTMLDivElement>;

const MonoBlock = ({ className, ...props }: MonoBlockProps) => {
  return (
    <div
      className={cn(
        "text-latte-text w-max min-w-full whitespace-pre pl-4 font-mono text-xs",
        className,
      )}
      {...props}
    />
  );
};

export { MonoBlock };
