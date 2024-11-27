import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container className="flex gap-10 justify-center max-lg:flex-wrap">
      <div className="w-[650px] h-[550px] flex justify-center mt-16 max-xl:mt-8 gap-5 max-lg:mx-auto max-xl:h-[430px] max-xl:w-[360px] max-xl:flex-col-reverse">
        <div className="flex flex-col gap-5 max-xl:flex-row max-lg:gap-3 max-lg:mx-auto lg:ml-20">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 max-xl:w-14 max-xl:h-16" />
          ))}
        </div>
        <Skeleton className="w-[380px] max-h-[420px] max-xl:h-[320px] max-xl:w-[300px] max-lg:mx-auto lg:ml-20 xl:mr-12" />
      </div>
      <div className="xl:max-w-[550px] py-5 gap-3 flex-col flex max-md:pt-0 w-full">
        <div className="flex mt-7">
          <Skeleton className="flex-1 h-24" />
          <Skeleton className="h-12 w-12 ml-8" />
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <div className="flex gap-8 items-center min-h-[60px] max-md:gap-4">
            <Skeleton className="w-[120px] max-md:text-base max-md:w-[100px] h-12"></Skeleton>
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-9 h-9 rounded-full" />
              ))}
            </div>
          </div>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 items-center min-h-[60px] max-md:gap-4">
              <Skeleton className="w-[80px] max-md:text-base max-md:w-[40px] h-10"></Skeleton>
              <div className="flex gap-4">
                {[...Array(2 - i)].map((_, i) => (
                  <Skeleton key={i} className="h-[40px] w-[120px] max-md:w-[90px] rounded-md" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-6 mt-4 border-t items-center">
          <Skeleton className="h-14 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="w-full h-14 mt-2" />
      </div>
    </Container>
  );
}
