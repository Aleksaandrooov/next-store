'use client';

import React, { useEffect, useState } from 'react';
import { Title } from '../ui/title';
import { Check, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

export interface FilterInterface {
  name: string;
  id: number;
  colorName?: string;
}

interface Props {
  className?: string;
  title: string;
  limit: number;
  loading?: boolean;
  items: FilterInterface[];
  itemVoid?: (values: string) => void;
  selected?: Set<string>;
}

export const FilterGroup: React.FC<Props> = ({ title, items, limit, itemVoid, selected }) => {
  const [activeFilter, setActiveFilter] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const searchParams = useSearchParams();
  const params = searchParams.get('category');
  const ogr = items?.filter((obj, i) => selected?.has(String(obj.id)) && i + 1 > limit);
  if (showAll == false) {
    if (items.length > limit) {
      limit = limit - ogr.length;
    } else {
      limit = limit;
    }
  }

  const listItem = showAll
    ? items
    : items
        ?.filter((obj, i) => (i + 1 > limit ? !selected?.has(String(obj.id)) : obj))
        .slice(0, limit);

  useEffect(() => {
    setActiveFilter(false);
    items.filter((obj) => selected?.has(String(obj.id)) && setActiveFilter(true));
  }, [params]);

  return (
    <div className=" border-y-neutral-200 border-b max-xl:pb-2">
      <div
        onClick={() => setActiveFilter((prev) => !prev)}
        className="flex items-center justify-between cursor-pointer hover:text-green-950">
        <Title text={title} className="font-semibold max-xl:text-lg" />
        <div className="">
          <Plus className={cn('transition-all', activeFilter ? 'rotate-90 opacity-0' : '')} />
          <Minus
            className={cn('-mt-6 transition-all', activeFilter ? '' : 'rotate-90 opacity-0')}
          />
        </div>
      </div>
      <div className="font-bold m-2">
        <div
          className={cn(
            'flex flex-col gap-1 max-h-0 transition-all duration-500 pr-2 overflow-hidden',
            activeFilter ? 'max-h-96' : '',
            showAll ? 'overflow-auto' : '',
          )}>
          {showAll == false &&
            ogr.map((obj, i) => (
              <div
                onClick={() => itemVoid?.(String(obj.id))}
                className={`group font-light w-100% transition-all duration-400 cursor-pointer rounded-sm py-2 px-3 flex justify-between ${
                  selected?.has(String(obj.id)) ? 'bg-slate-100' : ''
                }`}
                key={i}>
                <div className="transition-all group-hover:text-green-800 text-primary items-center flex gap-1">
                  {obj.colorName && (
                    <div
                      style={{ backgroundColor: '#' + obj.colorName }}
                      className="w-4 h-4 border-slate-200 shadow-xl rounded-full"></div>
                  )}
                  {obj.name}
                </div>
                <Check
                  className={`opacity-0 transition-all group-hover:text-green-700 ${
                    selected?.has(String(obj.id)) ? 'opacity-100' : ''
                  }`}
                />
              </div>
            ))}
          {listItem.map((obj, i) => (
            <div
              onClick={() => itemVoid?.(String(obj.id))}
              className={`group font-light w-100% transition-all duration-400 cursor-pointer rounded-sm py-2 px-3 flex justify-between ${
                selected?.has(String(obj.id)) ? 'bg-slate-100' : ''
              }`}
              key={i}>
              <div className="transition-all group-hover:text-green-800 text-primary items-center flex gap-2">
                {obj.colorName && (
                  <div
                    style={{ backgroundColor: '#' + obj.colorName }}
                    className="w-4 h-4 border border-slate-200 shadow-xl rounded-full"></div>
                )}
                {obj.name}
              </div>
              <Check
                className={`opacity-0 transition-all group-hover:text-green-700 ${
                  selected?.has(String(obj.id)) ? 'opacity-100' : ''
                }`}
              />
            </div>
          ))}
        </div>
        {items.length > limit && (
          <div
            className={cn(
              'transition-all duration-500 pointer-events-auto',
              activeFilter ? 'max-h-10' : 'max-h-0 opacity-0 pointer-events-none',
            )}>
            <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="text-primary mt-3 -ml-3 mb-1 cursor-pointer">
                {showAll ? 'Скрыть' : '+ Показать все'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
