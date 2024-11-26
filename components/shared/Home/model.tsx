import { Category } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

type Props = Category & {
  model: {
    id: number;
    name: string;
    categoryId: number;
  }[];
};

export const Model: React.FC<Props> = ({ name, model, price, img, id }) => {
  return (
    <div className="h-[300px] max-md:h-[220px] relative group hover:z-30 bg-white border border-l-0 border-t-0">
      <div className="text-center flex flex-col pt-14 max-md:pt-4 items-center transition group-hover:shadow-2xl group-hover:bg-white">
        <Link href={'/catalog?category=' + id} className="cursor-pointer">
          <div className="max-w-[200px] w-full max-md:h-[130px] flex items-center justify-center h-[150px] max-md:mb-3 mb-6">
            <img src={img} className="max-h-[160px] max-md:max-h-[230px] max-md:max-w-[130px]" />
          </div>
          <div className="mb-5 max-md:mb-2">
            <div className=" font-semibold">{name}</div>
            <div className="text-gray-400 text-sm">{price}</div>
          </div>
        </Link>
        <div className="opacity-0 transition group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none py-2 px-10 max-lg:px-2">
          <div className="flex flex-wrap gap-2 justify-center mb-2">
            {model.map((obj) => (
              <Link
                href={`/catalog?category=${id}&modelType=${obj.id}`}
                key={obj.id}
                className="text-sm text-green-800 cursor-pointer">
                {obj.name}
              </Link>
            ))}
          </div>
          {id <= 4 && <div className="text-sm text-gray-400 mb-1">Какой {name} выбрать?</div>}
        </div>
      </div>
    </div>
  );
};
