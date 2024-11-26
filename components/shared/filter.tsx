'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../ui/title';
import { Input } from '../ui/input';
import { RangeSlider } from '../ui/rangeSlider';
import { FilterGroup } from './filterGroup';
import { Color, Diagonal, Memory, MemoryOp, Model, Procesor, Size } from '@prisma/client';
import { useMedia, useSet } from 'react-use';
import { Button } from '../ui/button';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { setSort } from '@/app/redux/sortSlice/slice';
import { cn } from '@/lib/utils';
import { ListFilter, X } from 'lucide-react';
import { RemoveScroll } from 'react-remove-scroll';

export interface priceProps {
  priceForm?: number;
  priceTo?: number;
}

interface searchInterface extends priceProps {
  modelType: string;
  memoryType: string;
  diagonalType: string;
  sizeType: string;
  category: string;
  type: string;
  procesorType: string;
  memoryOpType: string;
  acc: string;
  colorType: string;
}

interface Props {
  model?: Model[];
  memory?: Memory[];
  diagonal?: Diagonal[];
  size?: Size[];
  procesor?: Procesor[];
  memoryOp?: MemoryOp[];
  color?: Color[];
}

export const Filter: React.FC<Props> = ({
  model,
  memory,
  diagonal,
  size,
  procesor,
  memoryOp,
  color,
}) => {
  const searchParams = useSearchParams() as unknown as Map<keyof searchInterface, string>;
  const mediaQuery = useMedia('only screen and (max-width : 1280px)');
  const router = useRouter();
  const [open, isOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { sortItem } = useSelector((state: RootState) => state.sort);
  const ref = useRef(null);

  const [price, setPrice] = useState<priceProps>({
    priceForm: Number(searchParams.get('priceForm')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const getItem = (str: keyof searchInterface) => {
    return searchParams.get(str) ? searchParams.get(str)?.split(',') : [];
  };

  const [modelType, { clear: resetModel, toggle: toggleModel }] = useSet(
    new Set<string>(getItem('modelType')),
  );
  const [memoryType, { clear: resetMemory, toggle: toggleMemory }] = useSet(
    new Set<string>(getItem('memoryType')),
  );
  const [diagonalType, { clear: resetDiagonal, toggle: toggleDiagonal }] = useSet(
    new Set<string>(getItem('diagonalType')),
  );
  const [sizeType, { clear: resetSize, toggle: toggleSize }] = useSet(
    new Set<string>(getItem('sizeType')),
  );
  const [procesorType, { clear: resetProcesor, toggle: toggleProcesor }] = useSet(
    new Set<string>(getItem('procesorType')),
  );
  const [memoryOpType, { clear: resetMemoryOp, toggle: toggleMemoryOp }] = useSet(
    new Set<string>(getItem('memoryOpType')),
  );
  const [colorType, { clear: resetColor, toggle: toggleColor }] = useSet(
    new Set<string>(getItem('colorType')),
  );

  const clearFilter = () => {
    resetModel();
    resetMemory();
    resetDiagonal();
    resetSize();
    resetProcesor();
    resetMemoryOp();
    resetColor();
    setPrice({});
    dispatch(setSort({ id: 0, name: 'Популярные', type: 'rating', acc: 'desc' }));
  };

  const updatePrice = (name: keyof priceProps, value: number) => {
    setPrice({
      ...price,
      [name]: value,
    });
  };

  const filters = {
    modelType: Array.from(modelType),
    memoryType: Array.from(memoryType),
    diagonalType: Array.from(diagonalType),
    sizeType: Array.from(sizeType),
    procesorType: Array.from(procesorType),
    memoryOpType: Array.from(memoryOpType),
    colorType: Array.from(colorType),
    ...price,
  };

  const dataItems = qs.stringify(filters, { arrayFormat: 'comma' });
  const params = searchParams.get('category');
  const categoryUrl = `category=${params ? params : 1}`;
  const sortUrl = `sort=${sortItem.type}&type=${sortItem.acc}`;

  const filtersKey = () => {
    filtersQuery();
    if (mediaQuery) {
      isOpen(false);
    }
  };

  const clearKey = () => {
    clearFilter();
    router.push(`?${categoryUrl}&`, {
      scroll: false,
    });
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (mediaQuery) {
      isOpen(false);
    }
  };

  const filtersQuery = () => {
    router.push(`?${categoryUrl}&${sortUrl}&${dataItems}`, {
      scroll: false,
    });
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    filtersQuery();
    if (!mediaQuery) {
      isOpen(true);
    }
  }, [params, sortItem]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      clearFilter();
    }
  }, [params]);

  useEffect(() => {
    if (!mediaQuery) return;
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
  }, [open, mediaQuery]);

  return (
    <div className="">
      <div className="xl:hidden">
        {open && (
          <div className="z-40 absolute left-0 bottom-0 top-0 right-0 bg-black opacity-60"></div>
        )}
      </div>
      <div
        onClick={() => isOpen((prev) => !prev)}
        className="cursor-pointer absolute z-10 flex gap-2 items-center mt-4 max-sm:-mt-11 max-sm:ml-4">
        <h1 className="font-semibold text-lg">Фильтры</h1>
        <ListFilter className={cn('transition-all', open ? 'opacity-0' : '')} />
        <X className={cn('-ml-8 transition-all', !open ? 'opacity-0' : '')} />
      </div>
      <RemoveScroll
        enabled={open && mediaQuery}
        ref={ref}
        className={cn(
          'w-[320px] pt-12 pb-6 transition-all max-md:w-full max-xl:overflow-auto duration-400 max-xl:p-8 max-xl:w-[500px] max-xl:shadow-2xl max-xl:bg-white max-xl:z-50 max-xl:fixed max-xl:top-0 max-xl:bottom-0 max-xl:left-0',
          !open ? '-ml-56 opacity-0 pointer-events-none' : '-ml-0 opacity-100 pointer-events-auto',
        )}>
        <div className="">
          <div className="flex justify-between xl:hidden items-center mb-14 max-xl:mb-4">
            <div className="font-medium text-2xl">Фильтры</div>
            <X
              className="cursor-pointer"
              size={28}
              strokeWidth={1.5}
              onClick={() => isOpen(false)}
            />
          </div>
          <div className={cn('flex flex-col gap-5 mt-6 h-full', !open ? 'hidden' : '')}>
            {model?.length != 0 && (
              <FilterGroup
                title="Модель"
                limit={3}
                items={model!}
                itemVoid={(value) => toggleModel(value)}
                selected={modelType}
              />
            )}
            {memory?.length != 0 && (
              <FilterGroup
                title="Память"
                limit={3}
                items={memory!}
                itemVoid={(value) => toggleMemory(value)}
                selected={memoryType}
              />
            )}
            {diagonal?.length != 0 && (
              <FilterGroup
                title="Диагональ"
                limit={4}
                items={diagonal!}
                itemVoid={(value) => toggleDiagonal(value)}
                selected={diagonalType}
              />
            )}
            {size?.length != 0 && (
              <FilterGroup
                title="Размер"
                limit={3}
                items={size!}
                itemVoid={(value) => toggleSize(value)}
                selected={sizeType}
              />
            )}
            {memoryOp?.length != 0 && (
              <FilterGroup
                title="Оперативная память"
                limit={3}
                items={memoryOp!}
                itemVoid={(value) => toggleMemoryOp(value)}
                selected={memoryOpType}
              />
            )}
            {procesor?.length != 0 && (
              <FilterGroup
                title="Процессор"
                limit={3}
                items={procesor!}
                itemVoid={(value) => toggleProcesor(value)}
                selected={procesorType}
              />
            )}
            {color?.length != 0 && (
              <FilterGroup
                title="Цвет"
                limit={4}
                items={color!}
                itemVoid={(value) => toggleColor(value)}
                selected={colorType}
              />
            )}

            <div className="mt-5 border-b border-y-neutral-200 pb-5 max-xl:mt-0">
              <Title className="font-semibold mb-3" text="Цена ₽" />
              <div className="">
                <div className="flex gap-3 mb-5">
                  <Input
                    type="number"
                    placeholder="390"
                    min={390}
                    max={429990}
                    value={price.priceForm || 390}
                    onChange={(e) => updatePrice('priceForm', Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="429990"
                    min={390}
                    max={429990}
                    value={price.priceTo || 429990}
                    onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
                  />
                </div>
                <div className="max-xl:px-6">
                  <RangeSlider
                    min={390}
                    max={429990}
                    step={90}
                    className="relative z-10"
                    value={[price.priceForm || 390, price.priceTo || 429990]}
                    onValueChange={([priceForm, priceTo]) => setPrice({ priceForm, priceTo })}
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={() => filtersKey()}
              className="text-base font-semibold mt-4 max-xl:mt-0">
              Применить
            </Button>
            <div
              onClick={() => clearKey()}
              className="text-center hover:text-green-900 transition-all">
              <Title text="Сбросить" className="cursor-pointer font-semibold" size="xs" />
            </div>
          </div>
        </div>
      </RemoveScroll>
    </div>
  );
};
