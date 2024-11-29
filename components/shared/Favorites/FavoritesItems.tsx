'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { words } from '../lib/word-cals';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { ProductCart } from '../productCart';
import { cn } from '@/lib/utils';
import { sort, sortType } from '../lib/sortType';
import { setSort } from '@/app/redux/favoritesSlise/slice';

interface Props {
  className?: string;
}

export const FavoritesItems: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { sortItem, items, count } = useSelector((state: RootState) => state.favorites);
  const [isOpen, setOpen] = useState(false);

  const setItem = (obj: sort) => {
    if (obj.id != sortItem.id && dispatch(setSort(obj))) {
      setOpen(false);
    }
  };

  return (
    <div className={className}>
      <div className="border-b pb-4">
        <div className="flex justify-end gap-6">
          <div className="">
            {count} {words(count, ['товар', 'товара', 'товаров'])}
          </div>
          <div className="relative">
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-1 cursor-pointer">
              <div className="">{sortItem.name}</div>
              <ChevronDown />
            </div>
            <div
              className={cn(
                ' w-[200px] right-0 flex flex-col translate-y-4 absolute transition pointer-events-none bg-white shadow-lg py-1 z-50 opacity-0 rounded-sm',
                isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : '',
              )}>
              {sortType.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setItem(obj)}
                  className={cn(
                    'mx-1 py-[6px] px-3 cursor-pointer transition-all',
                    obj.id == sortItem.id ? 'bg-slate-200' : 'hover:bg-slate-200',
                  )}>
                  {obj.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap px-6">
        {items.map((obj) => (
          <ProductCart key={obj.productItem.id} {...obj.productItem} />
        ))}
      </div>
    </div>
  );
};
