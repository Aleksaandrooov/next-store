import React from 'react';
import { ProductsTabl } from './productCart';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { toStringPrice } from './lib/price-calc';

interface Props extends ProductsTabl {
  className?: string;
}

export const ProductLocalCart: React.FC<Props> = ({
  id,
  title,
  price,
  Img,
  categoryId,
  Size,
  Memory,
  MemoryOp,
  Color,
  className,
}) => {
  return (
    <div
      className={cn(
        'text-center group bg-white h-[320px]  w-[210px] max-[600px]:w-[154px] max-[600px]:h-[250px]',
        className,
      )}>
      <Link href={`/catalog/product/${id}`}>
        <div
          className={cn(
            'flex relative justify-center items-center px-6 pt-6 pb-2 h-[190px] max-[600px]:h-[150px] w-[200px] max-[600px]:pt-5 max-[600px]:w-[150px] max-[600px]:mb-0 mx-auto mb-2',
            categoryId == 4 ? 'px-2' : '',
          )}>
          <img
            src={Img?.img[0]}
            className=" max-h-[170px] group-hover:opacity-0 transition max-[600px]:max-h-[130px]"
            alt="Logo"
          />
          <img
            src={Img?.img[1]}
            className="max-w-[170px] max-h-[170px] opacity-0 absolute group-hover:opacity-100 transition-all max-[600px]:max-h-[130px]"
            alt="Logo"
          />
        </div>
        <div className="flex flex-col">
          <div className="h-[85px] px-4 font-extralight break-normal text-sm break-words  flex-auto max-[600px]:text-[13px] max-[600px]:h-[70px] max-[600px]:px-2">
            {title}
            {Size?.name ? `, ${Size.name},` : ''} {MemoryOp ? ` ${MemoryOp.name},` : ''}{' '}
            {Memory?.name}
            {Color && categoryId != 4 && categoryId != 5 && categoryId != 7
              ? ` "${Color.name}"`
              : ''}
          </div>
          <div className="text-[14px] font-semibold">{toStringPrice(price)} ₽</div>
        </div>
      </Link>
    </div>
  );
};
