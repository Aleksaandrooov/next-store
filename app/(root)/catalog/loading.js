import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className="mt-5 bg-white py-5 max-xl:py-2 max-xl:mt-0 shadow-lg shadow-black/5 relative">
        <Container className="flex justify-between items-end h-12">
          <Skeleton className="h-14 w-56 max-xl:h-12 max-xl:w-40 max-sm:w-32 max-sm:h-10" />
          <Skeleton className="w-44 h-10" />
        </Container>
      </div>
      <Container className="max-w-[2000px] h-full flex">
        <div className="w-[350px] h-full mr-8 max-xl:hidden">
          <Skeleton className="w-28 h-8 mt-3" />
          <div className="flex flex-col mt-4 gap-5 w-[350px]">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-14" />
            ))}
            <Skeleton className="w-full h-40" />
          </div>
        </div>
        <div className="flex flex-wrap max-xl:px-5 justify-around mt-6 max-sm:px-0 max-xl:mx-auto max-w-[1380px] mx-auto max-xl:max-w-[950px] max-lg:max-w-[790px] max-[840px]:max-w-[540px] max-[590px]:max-w-[440px]">
          {[...Array(12)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-[380px] mx-1 mb-6 max-[590px]:mb-4 max w-[280px] max-lg:w-[230px] max-lg:h-[300px] max-[590px]:h-[250px] max-[590px]:w-[150px]"
            />
          ))}
        </div>
      </Container>
    </>
  );
}
