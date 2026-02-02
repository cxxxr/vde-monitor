import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Card } from "./card";

type EmptyCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  iconWrapperClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

const EmptyCard = ({
  icon,
  title,
  description,
  action,
  iconWrapperClassName,
  titleClassName,
  descriptionClassName,
  className,
}: EmptyCardProps) => {
  return (
    <Card className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <div className={cn("flex items-center justify-center rounded-full", iconWrapperClassName)}>
        {icon}
      </div>
      <div className="space-y-2">
        <h2 className={cn("font-display text-latte-text", titleClassName)}>{title}</h2>
        <p className={cn("text-latte-subtext0 text-sm", descriptionClassName)}>{description}</p>
      </div>
      {action}
    </Card>
  );
};

export { EmptyCard };
