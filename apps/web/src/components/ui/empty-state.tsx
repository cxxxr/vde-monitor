import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EmptyStateProps = {
  icon: ReactNode;
  message: string;
  iconWrapperClassName?: string;
  messageClassName?: string;
  className?: string;
};

const EmptyState = ({
  icon,
  message,
  iconWrapperClassName,
  messageClassName,
  className,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center gap-3 py-8 text-center", className)}>
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          iconWrapperClassName,
        )}
      >
        {icon}
      </div>
      <p className={cn("text-latte-subtext0 text-sm", messageClassName)}>{message}</p>
    </div>
  );
};

export { EmptyState };
