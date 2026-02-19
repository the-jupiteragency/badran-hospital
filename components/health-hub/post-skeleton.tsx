import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function PostSkeleton() {
  return (
    <Card className="h-full border-none shadow-sm rounded-xl overflow-hidden bg-white">
      {/* Image Skeleton */}
      <div className="relative w-full aspect-16/10 bg-muted">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col space-y-3">
        {/* Date */}
        <Skeleton className="h-3 w-20 rounded" />

        {/* Title */}
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-6 w-1/2 rounded" />

        {/* Description */}
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      </div>
    </Card>
  );
}
