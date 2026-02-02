import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type LastInputTone = {
  pill: string;
  dot: string;
};

const sizeClass = {
  md: "px-3 py-1 text-xs",
  sm: "px-3 py-1 text-[11px]",
  xs: "px-2 py-0.5 text-[10px]",
};

type LastInputPillProps = HTMLAttributes<HTMLSpanElement> & {
  tone: LastInputTone;
  label: string;
  value: string;
  size?: keyof typeof sizeClass;
};

const LastInputPill = ({
  className,
  tone,
  label,
  value,
  size = "sm",
  ...props
}: LastInputPillProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-semibold",
        tone.pill,
        sizeClass[size],
        className,
      )}
      {...props}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", tone.dot)} />
      <span className="text-[9px] uppercase tracking-[0.2em]">{label}</span>
      <span>{value}</span>
    </span>
  );
};

export { LastInputPill };
