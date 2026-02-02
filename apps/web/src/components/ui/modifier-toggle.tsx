import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/cn";

type ModifierTone = "mauve" | "blue";

type ModifierToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  tone?: ModifierTone;
};

const toneClasses: Record<ModifierTone, string> = {
  mauve:
    "border-latte-mauve bg-latte-mauve/20 text-latte-mauve shadow-[0_0_12px_rgb(var(--ctp-mauve)/0.4)]",
  blue: "border-latte-blue bg-latte-blue/20 text-latte-blue shadow-[0_0_12px_rgb(var(--ctp-blue)/0.4)]",
};

const ModifierToggle = forwardRef<HTMLButtonElement, ModifierToggleProps>(
  ({ className, active = false, tone = "mauve", ...props }, ref) => {
    const ariaPressed = props["aria-pressed"] ?? active;
    return (
      <button
        ref={ref}
        aria-pressed={ariaPressed}
        className={cn(
          "focus-visible:ring-latte-lavender inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-60",
          active
            ? toneClasses[tone]
            : "border-latte-surface2 text-latte-subtext0 hover:border-latte-overlay1 hover:text-latte-text",
          className,
        )}
        {...props}
      />
    );
  },
);

ModifierToggle.displayName = "ModifierToggle";

export { ModifierToggle };
