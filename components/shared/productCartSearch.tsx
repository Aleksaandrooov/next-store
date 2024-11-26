import Link from 'next/link';
import React from 'react';
import { ProductsTabl } from './productCart';
import { toStringPrice } from './lib/price-calc';
import { cn } from '@/lib/utils';

interface toChange extends ProductsTabl {
  onChange?: () => void;
  className?: string;
}

export const ProductCartSearch: React.FC<toChange> = ({
  id,
  title,
  price,
  Img,
  Size,
  Memory,
  MemoryOp,
  Color,
  onChange,
  className,
}) => {
  return (
    <div className={cn('text-center h-[260px] relative group flex flex-col w-[180px]', className)}>
      <div className="group-hover:z-10 group-hover:shadow-lg bg-white h-[220px] group-hover:h-auto">
        <Link onClick={() => onChange!()} href={`/catalog/product/${id}`}>
          <div className="flex relative justify-center items-center px-6 pt-2 h-[120px] w-[140px] mx-auto mb-2">
            <img
              src={Img?.img[0]}
              className="max-h-[110px] group-hover:opacity-0 transition"
              alt="Logo"
            />
            <img
              src={Img?.img[1]}
              className="max-h-[110px] opacity-0 absolute group-hover:opacity-100 transition-all"
              alt="Logo"
            />
          </div>
          <div className="flex flex-col">
            <div className="h-[85px] px-4 font-extralight break-normal break-words flex-auto text-[13px]">
              {title}
              {Size?.name ? `, ${Size.name},` : ''} {MemoryOp ? ` ${MemoryOp.name},` : ''}{' '}
              {Memory?.name}
              {Color ? ` "${Color.name}"` : ''}
            </div>
            <div className="text-[14px] pb-6 font-semibold">{toStringPrice(price)} ₽</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
