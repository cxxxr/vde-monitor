import React from "react";

import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "shadow-glass rounded-3xl border border-white/70 bg-white/80 p-4 backdrop-blur",
        className,
      )}
      {...props}
    />
  );
};

export { Card };
