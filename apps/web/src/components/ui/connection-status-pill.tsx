import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ConnectionStatusPillProps = HTMLAttributes<HTMLDivElement> & {
  connected: boolean;
  connectedLabel?: string;
  disconnectedLabel?: string;
};

const ConnectionStatusPill = ({
  className,
  connected,
  connectedLabel = "Connected",
  disconnectedLabel = "Reconnecting...",
  ...props
}: ConnectionStatusPillProps) => {
  const label = connected ? connectedLabel : disconnectedLabel;
  const wrapperClass = connected
    ? "border-latte-green/40 bg-latte-green/10 text-latte-green"
    : "border-latte-red/40 bg-latte-red/10 text-latte-red animate-pulse";
  const dotClass = connected
    ? "bg-latte-green shadow-[0_0_8px_rgb(var(--ctp-green)/0.6)]"
    : "bg-latte-red shadow-[0_0_8px_rgb(var(--ctp-red)/0.6)]";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
        wrapperClass,
        className,
      )}
      {...props}
    >
      <span className={cn("h-2 w-2 rounded-full", dotClass)} />
      <span>{label}</span>
    </div>
  );
};

export { ConnectionStatusPill };
