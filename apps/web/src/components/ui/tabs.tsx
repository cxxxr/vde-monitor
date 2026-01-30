import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";

import { cn } from "@/lib/cn";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 rounded-full border border-latte-surface2 bg-latte-surface0/60 p-1",
      className,
    )}
    {...props}
  />
));

TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "rounded-full px-3 py-1 text-xs font-semibold text-latte-subtext0 transition",
      "hover:bg-latte-surface1/70 hover:text-latte-text",
      "data-[state=active]:bg-white data-[state=active]:text-latte-text data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));

TabsTrigger.displayName = "TabsTrigger";

export { Tabs, TabsList, TabsTrigger };
