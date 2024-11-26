'use client';

import { RootState } from '@/app/redux/store';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
  className?: string;
}

export const CartMobileItem: React.FC<Props> = ({}) => {
  const { CartItems } = useSelector((state: RootState) => state.cart);

  const count = CartItems.reduce((sum, acc) => {
    return (sum += acc.countItem);
  }, 0);

  return (
    <Link href="/cart" className="flex flex-col items-center cursor-pointer relative">
      {count > 0 && (
        <div className="absolute bg-green-800 text-white size-5 rounded-full flex justify-center items-center -right-[2px] -top-3 shadow-xl text-xs">
          <div className="pr-[1px]">{count}</div>
        </div>
      )}
      <ShoppingCart className="size-5 max-sm:size-4" />
      <div className="">Корзина</div>
    </Link>
  );
};
