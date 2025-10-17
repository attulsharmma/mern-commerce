import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900">
      {/* You can add multiple skeletons to simulate content */}
      <Skeleton className="h-12 w-12 rounded-full bg-gray-700 animate-pulse" />
      <div className="mt-6 space-y-4">
        <Skeleton className="h-6 w-[1000px] bg-gray-700 animate-pulse" />
        <Skeleton className="h-6 w-[800px] bg-gray-700 animate-pulse" />
        <Skeleton className="h-6 w-[900px] bg-gray-700 animate-pulse" />
      </div>
    </div>
  );
}
