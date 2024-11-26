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

export const CategoriesItems: React.FC<Props> = async ({ id, name }) => {
  return (
    <div className="group">
      <Link
        href={'/catalog?category=' + id + '&'}
        key={id}
        className="header__categories flex items-center font-medium px-2 py-2 cursor-pointer">
        <div>{name}</div>
      </Link>
      {/* <div className="invisible transition pointer-events-none group-hover:pointer-events-auto group-hover:visible absolute top-[49px] left-0 right-0 min-w-max z-50 shadow-xl">
        <div className="h-6 opacity-0"></div>
        <div className="transition duration-1000 bg-white">
          <Container className="pt-8">
            {model.map((obj) => (
              <div key={obj.id} className="">
                {obj.name}
              </div>
            ))}
          </Container>
        </div>
      </div> */}
    </div>
  );
};
