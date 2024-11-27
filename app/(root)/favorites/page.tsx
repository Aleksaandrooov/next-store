import { Container } from '@/components/shared/container';
import { FavoritesItems } from '@/components/shared/Favorites/FavoritesItems';
import { Skeleton } from '@/components/ui/skeleton';
import React, { Suspense } from 'react';

export default async function CartPage() {
  return (
    <Container className="mt-10 mb-14">
      <div className="text-center text-4xl font-semibold mb-10">Избранное</div>
      <Suspense
        fallback={
          <div className="">
            <Skeleton className="ml-auto w-48 h-9"></Skeleton>
            <div className="flex flex-wrap max-xl:px-5 mt-8 max-sm:px-0 justify-center max-xl:mx-auto max-w-[1380px] mx-auto max-xl:max-w-[950px] max-lg:max-w-[790px] max-[840px]:max-w-[540px] max-[590px]:max-w-[440px]">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-[380px] mb-8 w-[280px] mx-3 max-lg:w-[230px] max-lg:h-[300px] max-[590px]:h-[250px] max-[590px]:w-[170px]"
                />
              ))}
            </div>
          </div>
        }>
        <FavoritesItems />
      </Suspense>
    </Container>
  );
}
