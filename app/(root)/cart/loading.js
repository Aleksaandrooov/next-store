import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container className="mt-10 max-md:px-3">
      <div className="flex justify-between gap-6 xl:gap-20 max-xl:flex-col">
        <div className="flex-auto flex-col">
          <Skeleton className="w-36 h-12 mb-16" />
          <div className="flex justify-between">
            <Skeleton className="w-24 h-8" />
            <Skeleton className="w-32 h-8" />
          </div>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-full h-20 my-4 first:mt-6" />
          ))}
        </div>
        <div className="w-[400px] mt-14 max-xl:w-full mx-auto max-xl:mt-0 max-md:mx-4 max-sm:mx-2">
          <Skeleton className="h-20 max-md:mx-4" />
          <Skeleton className="h-52 my-4 max-md:mx-4" />
        </div>
      </div>
    </Container>
  );
}
