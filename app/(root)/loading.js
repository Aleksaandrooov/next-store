import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col pb-16 max-md:pb-10">
      <Skeleton className="w-full xl:h-[420px] max-xl:h-[280px] max-lg:h-[200px] max-[500px]:h-[170px]" />
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 mt-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="m-4">
            <Skeleton className="h-[300px] max-md:h-[220px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
