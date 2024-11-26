'use client';

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ProductCartSearch } from './productCartSearch';
import { Api } from '@/app/services/apiClient';
import { useDebounce } from 'react-use';
import { ProductsTabl } from './productCart';
import { Button } from '../ui/button';
import { Container } from './container';
import { Model } from '@prisma/client';
import { RemoveScroll } from 'react-remove-scroll';

interface Props {
  className?: string;
  model: Model[];
}

export const SearchInput: React.FC<Props> = ({ className, model }) => {
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<ProductsTabl[]>([]);
  const ref = useRef(null);

  useDebounce(
    () => {
      Api.productSearch.search(searchQuery).then((items) => {
        setProducts(items);
      });
    },
    350,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
  };

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (!focused) return;
    function clickAnd(e: MouseEvent) {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        setFocused(false);
      }
    }
    document.body.addEventListener('click', clickAnd);

    return () => {
      document.body.removeEventListener('click', clickAnd);
    };
  }, [focused]);

  return (
    <RemoveScroll ref={ref} className="" enabled={focused}>
      {focused && (
        <div className="">
          <div
            onClick={() => setFocused(false)}
            className="fixed top-32 left-0 bottom-0 right-0 bg-black/50 z-30"></div>
        </div>
      )}
      <Button
        onClick={() => setFocused((prev) => !prev)}
        variant="outline"
        className="duration-300 hover:bg-primary hover:text-white">
        <div className="flex gap-2 items-center">
          <Search />
          <div className="xl:hidden">Поиск</div>
        </div>
      </Button>
      <div
        className={cn(
          'fixed left-0 right-0 xl:top-[105px] max-xl:top-[73px] pointer-events-none z-50 opacity-0',
          focused ? 'opacity-100 pointer-events-auto' : '',
        )}>
        <div className={cn('flex flex-1 justify-between z-30', className)}>
          <div className="right-0 bg-white left-0 absolute">
            <div className="flex relative h-16 max-w-[1000px] mx-auto">
              <Search className="absolute top-1/2 -translate-y-1/2 left-3 h-5 text-gray-600" />
              <input
                type="text"
                className="outline-none w-full pl-11"
                placeholder="Найти товар..."
                onFocus={() => setFocused(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <X
                onClick={() => setSearchQuery('')}
                className={cn(
                  'absolute cursor-pointer top-1/2 -translate-y-1/2 right-5 h-5 text-gray-600 opacity-0 pointer-events-none transition-all',
                  searchQuery ? 'opacity-100 pointer-events-auto' : '',
                )}
              />
            </div>
            <Container className="mb-4">
              {!searchQuery && (
                <div className="text-lg mb-4 max-lg:hidden font-medium">Популярные запросы</div>
              )}
              <div className="flex gap-3 justify-center max-lg:justify-start overflow-auto scroll">
                {model.map((obj) => (
                  <a
                    onClick={() => onClickItem()}
                    href={'/catalog?category=' + obj.categoryId + '&modelType=' + obj.id}
                    key={obj.id}
                    className="bg-gray-50 text-gray-500 px-3 py-1 rounded-sm text-sm text-nowrap cursor-pointer">
                    {obj.name}
                  </a>
                ))}
              </div>
            </Container>
            <div className="justify-center max-lg:justify-start flex overflow-x-scroll scroll">
              <div className="flex gap-2 justify-center max-lg:justify-start">
                {products.map((product) => (
                  <div key={product.id}>
                    <ProductCartSearch {...product} onChange={() => onClickItem()} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
};
