import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Button } from "./button";

type FilterOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

type FilterToggleGroupProps = {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  activeVariant?: "primary" | "ghost" | "danger";
  inactiveVariant?: "primary" | "ghost" | "danger";
  buttonClassName?: string;
};

const FilterToggleGroup = ({
  value,
  options,
  onChange,
  className,
  size = "sm",
  activeVariant = "primary",
  inactiveVariant = "ghost",
  buttonClassName,
}: FilterToggleGroupProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? activeVariant : inactiveVariant}
          size={size}
          onClick={() => onChange(option.value)}
          disabled={option.disabled}
          className={buttonClassName}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export { FilterToggleGroup };
