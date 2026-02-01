import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "bg-latte-surface1/50 animate-skeleton-pulse relative overflow-hidden rounded-lg",
        className,
      )}
    >
      <div className="from-latte-surface1/0 via-latte-surface2/30 to-latte-surface1/0 animate-skeleton-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r" />
    </div>
  );
};

const SkeletonText = ({ className }: SkeletonProps) => {
  return <Skeleton className={cn("h-4 w-full", className)} />;
};

const SkeletonCard = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "border-latte-surface1/60 bg-latte-base/50 space-y-4 rounded-3xl border p-6",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <SkeletonText className="w-3/4" />
      <SkeletonText className="w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
};

export { Skeleton, SkeletonCard, SkeletonText };
