'use client';

import { setSort } from '@/app/redux/sortSlice/slice';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { sort, sortType } from './lib/sortType';

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { sortItem } = useSelector((state: RootState) => state.sort);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const setItem = (obj: sort) => {
    if (obj.id != sortItem.id) {
      dispatch(setSort(obj));
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    function clickAnd(e: MouseEvent) {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        setIsOpen(false);
      }
    }
    document.body.addEventListener('click', clickAnd);

    return () => {
      document.body.removeEventListener('click', clickAnd);
    };
  }, [isOpen]);

  return (
    <div ref={ref} className={cn('gap-1 h-[28px]', className)}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer mt-1 flex gap-2 items-center justify-end max-w-[200px]">
        <div className="font-medium max-sm:hidden">Cортировка:</div>
        <b className="text-primary underline text-nowrap max-sm:text-sm">{sortItem.name}</b>
      </div>
      <div
        className={cn(
          'w-full flex flex-col translate-y-4 transition pointer-events-none bg-white shadow-lg relative z-50 opacity-0 rounded-sm my-2',
          isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : '',
        )}>
        {sortType.map((obj) => (
          <div
            key={obj.id}
            onClick={() => setItem(obj)}
            className={cn(
              'py-[6px] px-3 cursor-pointer transition-all max-[590px]:text-sm first:rounded-t-sm last:rounded-b-sm text-nowrap',
              obj.id == sortItem.id ? 'bg-slate-200' : 'hover:bg-slate-200',
            )}>
            {obj.name}
          </div>
        ))}
      </div>
    </div>
  );
};
