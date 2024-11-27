import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container>
      <Skeleton className="my-10 mb-6 mx-20 w-72 h-16 max-xl:hidden" />
      <div className="flex ml-10 gap-28 max-xl:justify-center w-full">
        <Skeleton className="w-60 h-48 max-xl:hidden" />
        <div>
          <Skeleton className="w-72 h-14 max-xl:mt-12" />
          <div className="flex flex-col gap-4 w-96 mt-10 max-xl:mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="w-16 h-5" />
                <Skeleton className="w-full h-12 mt-3" />
              </div>
            ))}
            <Skeleton className="w-full h-16 mt-5" />
          </div>
        </div>
      </div>
    </Container>
  );
}
