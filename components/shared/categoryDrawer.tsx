'use client';

import { cn } from '@/lib/utils';
import { Category, Model } from '@prisma/client';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { DrawerClose } from '../ui/drawer';

type Props = Category & {
  model: Model[];
};

export const CategoryDrawer: React.FC<Props> = ({ id, name, model }) => {
  const [open, isOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function clickAnd(e: MouseEvent) {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        isOpen(false);
      }
    }
    document.body.addEventListener('click', clickAnd);

    return () => {
      document.body.removeEventListener('click', clickAnd);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className={cn(
        'max-h-12 overflow-hidden transition-all duration-500',
        open ? `max-h-[500px]` : '',
      )}>
      <div
        onClick={() => isOpen((prev) => !prev)}
        key={id}
        className={cn(
          'px-4 h-12 w-full rounded-md flex justify-between transition-all items-center',
          open ? 'bg-slate-200' : 'hover:bg-slate-200',
        )}>
        <div className="text-lg">{name}</div>
        <ChevronRight className={cn('transition', open ? 'rotate-90' : '')} color="gray" />
      </div>
      <div
        className={cn(
          'flex flex-col transition-all opacity-0 pb-2 mb-2',
          open ? 'border-b opacity-100' : '',
        )}>
        {model.map((obj) => (
          <a
            href={'/catalog?category=' + id + '&modelType=' + obj.id}
            key={obj.id}
            className="rounded-sm first:mt-2 mx-4 hover:bg-slate-100">
            <DrawerClose className="w-full text-left py-3 px-4">{obj.name}</DrawerClose>
          </a>
        ))}
      </div>
    </div>
  );
};
