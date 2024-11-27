'use client';

import { CartItemType, removeItemCart, updateItemCart } from '@/app/redux/CartSlice/slice';
import { Checkbox } from '@/components/ui/box';
import { ChevronDown, Heart, Loader2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toStringPrice } from '../lib/price-calc';
import { cn } from '@/lib/utils';
import { RootState, useAppDispatch } from '@/app/redux/store';
import toast from 'react-hot-toast';
import { ToasterProduct } from '../Product.tsx/toasterProduct';
import { addFavorites } from '@/app/redux/favoritesSlise/slice';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useMedia } from 'react-use';

interface Props {
  item: CartItemType['items'];
  onChangeItem: (id: number) => void;
  onCheked: Set<number>;
}

const countNumber = [1, 2, 3, 4, 5];

export const Item: React.FC<Props> = ({ item, onChangeItem, onCheked }) => {
  const { items, count } = useSelector((state: RootState) => state.favorites);
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loadingFavorites, setLoadinFavorites] = useState(false);
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const checked = items.filter((obj) => obj.productItem.id == item.productItem.id).length;
  const mediaQuery = useMedia('only screen and (max-width : 1280px)');

  const voidDispatch = (id: number, count: number) => {
    const ids = toast.loading('Обновление...', {
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    });
    dispatch(updateItemCart({ id, count })).then(() => {
      toast.success('Успешно', {
        id: ids,
      });
    });
    setOpen(false);
  };

  const removeVoid = () => {
    const id = toast.loading('Удаление...', {
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    });
    dispatch(removeItemCart(item.id)).then(() => {
      if (onCheked.has(item.id)) {
        onChangeItem(item.id);
      }
      toast.success('Успешно', {
        id,
      });
    });
  };

  const addLike = () => {
    setLoadinFavorites(true);
    dispatch(addFavorites(item.productItem.id)).then(() => {
      setLoadinFavorites(false);
      if (session) {
        toast.dismiss();
      }
      if (!checked) {
        if (!mediaQuery) {
          if (session) {
            toast(<ToasterProduct {...item.productItem} count={count} />, {
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

  useEffect(() => {
    if (!open) return;
    function clickAnd(e: MouseEvent) {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        setOpen(false);
      }
    }
    document.body.addEventListener('click', clickAnd);

    return () => {
      document.body.removeEventListener('click', clickAnd);
    };
  }, [open]);

  useEffect(() => {
    return () => onChangeItem(item.id);
  }, []);

  return (
    <div className="flex py-7 border-b max-h-56">
      <Checkbox
        checked={onCheked.has(item.id) && true}
        onCheckedChange={() => onChangeItem(item.id)}
        id={String(item.id)}
      />
      <div className="flex items-start justify-center mx-6 min-w-[52px] max-sm:max-w-[60px] max-h-[80px] max-md:mx-2">
        <img
          src={item.productItem.Img?.img[0]}
          className={cn(
            'max-h-[85px] max-w-[100px] max-sm:max-h-[60px] max-sm:max-w-[60px]',
            item.productItem.categoryId == 4 ? 'max-sm:max-h-[36px] mt-1' : '',
          )}
        />
      </div>
      <div className="max-w-[350px] min-h-[80px] flex flex-col justify-between">
        <Link
          href={'/catalog/product/' + item.productItem.id}
          className="font-semibold cursor-pointer max-md:text-sm">
          {item.productItem.title},
          {item.productItem.sizeId ? ` ${item.productItem.Size?.name},` : ''}{' '}
          {item.productItem.MemoryOp ? ` ${item.productItem.MemoryOp.name},` : ''}{' '}
          {item.productItem.Memory?.name}
          {` "${item.productItem.Color?.name}"`}
        </Link>
        <div
          onClick={() => addLike()}
          className="flex items-center gap-1 transition-all text-gray-400 cursor-pointer">
          <div className=" flex justify-center items-center">
            {!loadingFavorites ? (
              <Heart
                className={cn(
                  'text-gray-300 cursor-pointer transition size-[18px] max-md:size-4',
                  checked && 'text-[#FF219F] fill-[#FF219F] size-5 max-md:size-4',
                )}
              />
            ) : (
              <Loader2 className="size-5 animate-spin text-gray-400 max-md:size-4" />
            )}
          </div>
          <div className="text-sm">
            В избранн
            {checked ? 'ом' : 'ое'}
          </div>
        </div>
      </div>
      <div className="flex ml-auto justify-between">
        <div
          ref={ref}
          className="mr-8 text-nowrap max-md:mr-0 ml-1 max-md:absolute max-md:mt-[58px]">
          <div onClick={() => setOpen((prev) => !prev)} className="flex cursor-pointer">
            <div className="flex items-center gap-1 max-md:text-sm">
              {item.countItem} шт{' '}
              <ChevronDown
                className={cn('rotate-0 transition duration-400', open ? 'rotate-180' : '')}
                size={18}
                strokeWidth={1}
              />
            </div>
          </div>
          <div
            className={cn(
              'absolute transition-all opacity-0 z-30 bg-white invisible translate-y-2',
              open ? 'visible opacity-100 translate-y-0' : '',
            )}>
            <div className="flex flex-col shadow-lg rounded-md">
              {countNumber.map((count, i) => (
                <div
                  key={i}
                  onClick={() => {
                    return count != item.countItem && voidDispatch(item.id, count);
                  }}
                  className={cn(
                    'px-5 py-[4px] hover:bg-slate-100 cursor-pointer transition-all duration-300 first:rounded-t-md last:rounded-b-md',
                    count == item.countItem ? ' bg-slate-100' : '',
                  )}>
                  {count}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex gap-2 max-md:gap-1 max-md:flex-wrap max-md:justify-between max-md:items-end max-md:h-full max-md:flex-col">
            <div className="flex flex-col items-end gap-[2px] w-[130px] max-md:w-[90px]">
              <div className="font-semibold text-xl text-nowrap max-md:text-base">
                {toStringPrice(item.productItem.price * item.countItem)} ₽
              </div>
              {item.countItem > 1 && (
                <div className="text-sm text-gray-400 max-md:text-xs">
                  {toStringPrice(item.productItem.price)} ₽ x{item.countItem}
                </div>
              )}
            </div>
            <X
              onClick={() => removeVoid()}
              className="cursor-pointer text-gray-400 max-md:size-6 size-7 transition-all hover:text-primary"
              strokeWidth={1.25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
