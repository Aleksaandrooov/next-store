'use client';

import { RootState } from '@/app/redux/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown, Store, Truck } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { toStringPrice } from '../lib/price-calc';
import { words } from '../lib/word-cals';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { dataTime } from './payment/dataMasiv';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  className?: string;
}

export const CartPrices: React.FC<Props> = ({ className }) => {
  const { data: session } = useSession();
  const { totalAmount, totalCount, CartItems } = useSelector((state: RootState) => state.cart);

  if (!CartItems.length) {
    return (
      <div className="w-[400px] mt-14 max-xl:w-full mx-auto max-xl:mt-0 max-md:mx-4 max-sm:mx-2">
        <Skeleton className="h-20 max-md:mx-4" />
        <Skeleton className="h-52 my-4 max-md:mx-4" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-[400px] mt-14 max-xl:max-w-[800px] max-xl:w-full mx-auto max-xl:mt-0 max-md:mx-4 max-sm:mx-2',
        className,
      )}>
      <div className="bg-slate-100 rounded-md px-8 py-6 mb-4 max-sm:px-6 max-sm:text-center">
        <div className="font-semibold">
          {totalCount} {words(totalCount, ['товар', 'товара', 'товаров'])} на сумму{' '}
          {toStringPrice(totalAmount)} ₽
        </div>
      </div>
      <div className="bg-slate-100 rounded-md py-6 px-8 mb-5 text-center max-sm:px-4">
        <div className="text-sm text-gray-500 pb-4 mb-4 border-gray-300 border-b text-start">
          Стоимость доставки будет рассчитана на следующем шаге
        </div>
        <div className="flex justify-between mb-4 items-center">
          <div className="text-lg font-bold max-sm:text-base">
            К оплате: {toStringPrice(totalAmount)} ₽
          </div>
          <div className="text-sm text-gray-500 max-sm:text-xs">До +43498 бонусов</div>
        </div>
        <Link className="text-center" href={totalAmount && session ? '/cart/payment' : ''}>
          <Button
            size="lg"
            variant="outline"
            disabled={totalAmount == 0 || !session}
            className="max-w-[400px] w-full text-base">
            {session ? 'Оформить заказ' : 'Требуется авторизация'}
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-5 pt-4 border-t border-slate-200">
        <div className="flex gap-1">
          <div className="">Получить в</div>
          <div className="flex items-center text-green-900 cursor-pointer">
            Санк-Петербурге и ЛО <ChevronDown size={18} strokeWidth={1} />
          </div>
        </div>
        <div className="flex flex-col gap-6 max-xl:mx-10 max-sm:mx-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Truck size={28} strokeWidth={1} />
              <div className="text-sm">
                <div className="">Курьером</div>
                <div className="text-gray-400">
                  {dataTime()[0].dataName}, {dataTime()[0].data}
                </div>
              </div>
            </div>
            <div className="text-sm">бесплатно</div>
          </div>
          <div className="flex justify-between mb-12">
            <div className="flex gap-2">
              <Store size={28} strokeWidth={1} />
              <div className="text-sm">
                <div className="">Забрать в магазине</div>
                <div className="text-gray-400">Есть в 8 магазинах</div>
              </div>
            </div>
            <div className="text-sm">бесплатно</div>
          </div>
        </div>
      </div>
    </div>
  );
};
