import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container className="mt-10 mb-14">
      <Skeleton className="w-52 h-16 mx-auto" />
      <div className="flex justify-end mt-4">
        <Skeleton className="h-10 w-56" />
      </div>
      <div className="flex flex-wrap max-xl:px-5 mt-8 max-sm:px-0 justify-center max-xl:mx-auto max-w-[1380px] mx-auto max-xl:max-w-[950px] max-lg:max-w-[790px] max-[840px]:max-w-[540px] max-[590px]:max-w-[440px]">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-[380px] mb-8 w-[280px] mx-3 max-lg:w-[230px] max-lg:h-[300px] max-[590px]:h-[250px] max-[590px]:w-[170px]"
          />
        ))}
      </div>
    </Container>
  );
}
