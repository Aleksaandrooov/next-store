import { prisma } from '@/prisma/prisma-client';
import React from 'react';
import { Model } from './model';

export const ProductsVariant = async () => {
  const data = await prisma.category.findMany({
    include: {
      model: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  return (
    <div className="">
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2">
        {data?.map((obj) => (
          <Model key={obj.id} {...obj} />
        ))}
        <div className="bg-white h-[298px] max-md:h-[220px] flex justify-center hover:z-30 hover:shadow-2xl transition">
          <img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-50-holiday-delivery-pickup-202411?wid=960&hei=1000&fmt=jpeg&qlt=90&.v=1728401800980"
            alt=""
            className="h-[298px] max-md:h-[220px]"
          />
        </div>
      </div>
    </div>
  );
};
