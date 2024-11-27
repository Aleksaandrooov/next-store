'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Color,
  Diagonal,
  Img,
  Memory,
  MemoryOp,
  Model,
  Procesor,
  Product,
  Size,
} from '@prisma/client';
import { toStringPrice } from './lib/price-calc';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { addItemCart } from '@/app/redux/CartSlice/slice';
import { toast } from 'react-hot-toast';
import { Heart, Loader2 } from 'lucide-react';
import { addFavorites } from '@/app/redux/favoritesSlise/slice';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { ToasterProduct } from './Product.tsx/toasterProduct';
import { useSession } from 'next-auth/react';
import { useMedia } from 'react-use';

export interface ProductsTabl extends Product {
  Memory: Memory | null;
  Model: Model;
  MemoryOp: MemoryOp | null;
  Size: Size | null;
  Diagonal: Diagonal | null;
  Color: Color | null;
  Img: Img | null;
  Procesor?: Procesor | null;
  className?: string;
}

export const ProductCart: React.FC<ProductsTabl> = ({
  id,
  title,
  price,
  Img,
  Size,
  Color,
  MemoryOp,
  Memory,
  className,
  categoryId,
}) => {
  const [loading, isLoading] = useState(false);
  const { data: session } = useSession();
  const { items, count } = useSelector((state: RootState) => state.favorites);
  const dispatch = useAppDispatch();
  const [loadingFavorites, setLoadingFavirites] = useState(false);
  const mediaQuery = useMedia('only screen and (max-width : 1280px)');
  const onAddItem = () => {
    isLoading(true);
    const idToast = toast.loading('Товар добавляется...', {
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    });
    dispatch(addItemCart({ productId: id })).then(() => {
      isLoading(false);
      toast.success('Товар добавлен', {
        id: idToast,
      });
    });
  };

  const objProduct = {
    id,
    title,
    price,
    Img,
    Size,
    Color,
    MemoryOp,
    Memory,
    count,
  };
  const addLike = () => {
    setLoadingFavirites(true);
    dispatch(addFavorites(id)).then(() => {
      setLoadingFavirites(false);
      if (session) {
        toast.dismiss();
      }
      if (!items.filter((obj) => obj.productItem.id == id).length) {
        if (!mediaQuery) {
          if (session) {
            toast(<ToasterProduct {...objProduct} />, {
              style: {
                minHeight: '150px',
                maxWidth: '8000px',
                marginBottom: '-16px',
                width: '100%',
              },
              position: 'bottom-center',
            });
          }
        }
      }
    });
  };

  return (
    <div
      className={cn(
        'text-center h-[400px] relative group flex flex-col w-[300px] max-lg:w-[250px] bg-white max-lg:h-[355px] max-[590px]:h-[310px] max-[590px]:w-[190px]',
        className,
      )}>
      <div className="group-hover:z-10 group-hover:bg-white group-hover:shadow-lg h-auto">
        <div className="flex justify-between max-lg:px-3 max-[590px]:px-5 px-8 -mb-6 items-end">
          <div className="bg-green-700 text-white rounded-[5px] px-3 py-[2px] text-xs">
            Гарантия
          </div>
          <div
            className={cn(
              'h-10 w-6 flex items-end justify-center opacity-0 group-hover:opacity-100 transition',
              items.filter((obj) => obj.productItem.id == id).length ? 'opacity-100' : '',
            )}>
            {!loadingFavorites ? (
              <Heart
                onClick={() => addLike()}
                className={cn(
                  'text-gray-400 cursor-pointer transition size-[18px]',
                  items.filter((obj) => obj.productItem.id == id).length &&
                    'text-[#FF219F] fill-[#FF219F] size-5',
                )}
              />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            )}
          </div>
        </div>
        <Link href={`catalog/product/${id}`}>
          <div className="flex justify-center items-center pt-7 h-[270px] w-[250px] max-[590px]:w-[200px] mx-auto max-lg:max-h-[220px] max-[590px]:max-h-[190px]">
            <img
              src={Img?.img[0]}
              className={cn(
                'max-w-[230px] max-h-[220px] group-hover:opacity-0 transition-all max-lg:max-h-[160px] max-lg:max-w-[190px] max-[590px]:max-h-[140px] max-[590px]:max-w-[180px]',
                categoryId == 4 ? 'max-w-[270px]' : '',
              )}
              alt="Logo"
            />
            <img
              src={Img?.img[1]}
              className={cn(
                'max-w-[220px] max-h-[240px] absolute opacity-0 group-hover:opacity-100 max-[590px]:max-h-[140px] max-[590px]:max-w-[180px] transition-all max-lg:max-h-[160px] max-lg:max-w-[190px]',
                categoryId == 4 ? 'max-w-[270px]' : '',
              )}
              alt="Logo"
            />
          </div>
          <div className="h-[106px] flex flex-col my-2 max-lg:mt-0 max-[590px]:h-[94px]">
            <div className="font-extralight mx-2 px-4 max-lg:px-2 max-[590px]:px-1 max-[590px]:mx-0 flex-auto max-[590px]:text-sm">
              {title}
              {Size?.name ? ` ${Size.name},` : ''} {MemoryOp ? ` ${MemoryOp.name},` : ''}{' '}
              {Memory?.name}
              {Color?.name ? ` «${Color?.name}»` : ''}
            </div>
            <div className="text-lg font-semibold">{toStringPrice(price)} ₽</div>
          </div>
        </Link>
        <div className="w-[220px] mx-auto py-5 max-lg:py-3 max-lg:border-t-0 max-lg:w-full border-y-neutral-200 border-t opacity-0 group-hover:opacity-100">
          <Button
            loading={loading}
            onClick={() => onAddItem()}
            variant="secondary"
            size="lg"
            className="text-base bg-green-800 max-lg:text-sm font-thin rounded-md max-lg:w-[120px] max-lg:h-[30px] w-[150px]">
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
};
