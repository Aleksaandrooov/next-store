'use client';

import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { toStringPrice } from './lib/price-calc';
import { fetchCart } from '@/app/redux/CartSlice/slice';
import { cn } from '@/lib/utils';
import { SearchInput } from './searchInput';
import { useSession } from 'next-auth/react';
import { fetchFavorites } from '@/app/redux/favoritesSlise/slice';
import { Model } from '@prisma/client';

interface Props {
  className?: string;
  model: Model[];
}

export const CartButton: React.FC<Props> = ({ className, model }) => {
  const { CartItems, headerPrice, status } = useSelector((state: RootState) => state.cart);
  const { count: CountFavorites } = useSelector((state: RootState) => state.favorites);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchFavorites());
  }, [session]);
  const count = CartItems.reduce((sum, acc) => {
    return (sum += acc.countItem);
  }, 0);

  return (
    <div className={className}>
      <SearchInput model={model} />
      {session && (
        <Link href="/favorites" className="max-xl:hidden">
          <Button
            className=" group relative hover:bg-black transition hover:text-white"
            variant="outline">
            <Heart className="" />
            {CountFavorites > 0 && CountFavorites}
          </Button>
        </Link>
      )}
      <div className="max-xl:hidden">
        <Link href="/cart">
          <Button
            className="group relative"
            loading={status == 'success' ? false : true}
            variant="secondary">
            {headerPrice > 0 && (
              <>
                <b>{toStringPrice(headerPrice)} ₽</b>
                <span className="h-full w-[1px] bg-white/30 mx-2" />
              </>
            )}
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={16} className="relative" strokeWidth={2} />
              {headerPrice > 0 && <div className="pt-[2px]">{count}</div>}
            </div>
            <ArrowRight
              className={cn(
                'absolute right-6 transition duration-300 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0',
                headerPrice == 0 && 'right-4',
              )}
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};
