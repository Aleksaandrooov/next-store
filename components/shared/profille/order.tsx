'use client';

import { Order } from '@prisma/client';
import React, { useState } from 'react';
import { getDayName, getMonthName } from '../Cart/payment/dataMasiv';
import { cn } from '@/lib/utils';
import { ChevronDown, Phone, Truck } from 'lucide-react';
import { CartItemType } from '@/app/redux/CartSlice/slice';
import { toStringPrice } from '../lib/price-calc';
import { DeleteModal } from '../modals/delete-modal';
import Link from 'next/link';
import { useMedia } from 'react-use';

export const OrderItems = ({
  id,
  items,
  token,
  createdAt,
  status,
  totalAmount,
  number,
  cv,
  address,
  NameData,
  NameTime,
}: Order) => {
  const item = Object.values(items as string) as unknown as CartItemType['items'][];
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const mediaQuery = useMedia('only screen and (max-width : 768px)', false);

  return (
    <div
      className={cn(
        'border max-h-[170px] rounded-sm p-4 flex flex-col transition-all shadow-md relative',
        open ? 'max-h-[1000px]' : '',
      )}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'cursor-pointer flex items-center border-b pb-2 gap-4 max-md:gap-2 transition-all',
          open ? 'mb-3 max-md:mb-0' : 'mb-0',
        )}>
        <div className="flex justify-between w-[360px] max-md:text-sm">
          <div className="font-semibold">Заказ: {token.slice(mediaQuery ? 30 : 18)}</div>
          <div className="">
            от: {createdAt.getDate()} {getMonthName(createdAt.getMonth())},{' '}
            {getDayName(createdAt.getDay())}
          </div>
        </div>
        <div className="flex-1 flex justify-start max-md:w-full">
          <div
            className={cn(
              ' text-white px-2 rounded-[5px] text-nowrap text-sm max-md:text-xs max-md:px-1',
              status === 'success' ? 'bg-green-600' : 'bg-gray-400',
            )}>
            {status === 'success' ? 'Оплачен' : 'В ожидании'}
          </div>
        </div>
        <ChevronDown
          color="gray"
          className={cn('transition duration-400', open ? '-scale-100' : '')}
        />
      </div>
      <div
        className={cn(
          'flex justify-between items-center transition-all px-1',
          open
            ? '-translate-y-0 pointer-events-auto opacity-100 pb-5 pt-2 border-b mb-3 max-md:pb-7'
            : '-translate-y-4 pointer-events-none opacity-0',
        )}>
        <div className="flex gap-1 items-center text-sm">
          <Phone color="gray" size={20} strokeWidth={1} />
          <div className="text-gray-500">Телефон:</div>
          <div className="max-md:absolute max-md:mt-12">{number}</div>
        </div>
        <div className="flex gap-2 items-center text-sm flex-1 justify-end">
          <Truck size={20} strokeWidth={1} />
          <div className="text-gray-500">Доставка:</div>
          <div className="max-md:absolute max-md:mt-12">
            {address}, кв:{cv}
          </div>
          <div className="border-l px-2">
            {NameData}
            {!mediaQuery && ', ' + NameTime}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex flex-col transition-all max-h-0 border-b',
          open
            ? 'opacity-100 pointer-events-auto max-h-[500px] pt-1 pb-4 gap-6'
            : 'opacity-0 pointer-events-none',
        )}>
        {item.map((obj) => (
          <div key={obj.id} className="flex items-center">
            <Link
              href={'/catalog/product/' + obj.productItem.id}
              className="w-[110px] h-[90px] max-md:w-[70px] max-md:h-[80px] flex items-center justify-center">
              <img
                src={obj.productItem.Img.img[0]}
                alt=""
                className={cn(
                  'max-w-[70px] max-h-[90px] max-md:max-h-[70px] max-md:max-w-[60px] flex items-center justify-center',
                  obj.productItem.categoryId == 4
                    ? 'max-w-[110px] max-h-[100px] max-md:max-w-[90px] max-md:max-h-[80px]'
                    : '',
                )}
              />
            </Link>
            <div className="flex flex-1 max-md:flex-col relative">
              <div className="flex-1 ml-5 max-md:ml-3">
                <Link
                  href={'/catalog/product/' + obj.productItem.id}
                  className="max-w-[450px] max-md:text-sm">
                  {obj.productItem.title},
                  {obj.productItem.sizeId ? ` ${obj.productItem.Size?.name},` : ''}{' '}
                  {obj.productItem.MemoryOp ? ` ${obj.productItem.MemoryOp.name},` : ''}{' '}
                  {obj.productItem.Memory?.name}
                  {!mediaQuery && ` "${obj.productItem.Color?.name}"`}
                </Link>
                <div className="text-sm flex gap-2">
                  <div className="text-gray-500">Код товара:</div>
                  <div className="">{obj.productItem.id}</div>
                </div>
              </div>
              <div className="max-md:absolute right-0 bottom-0 max-md:flex-col-reverse max-md:flex">
                <div className="flex gap-1 justify-end items-center">
                  <div className="max-md:text-sm">Цена:</div>
                  <div className="text-lg max-md:text-base font-semibold">
                    {toStringPrice(obj.productItem.price * obj.countItem)} ₽
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-end max-md:text-xs">
                  {obj.countItem} шт.{' '}
                  {!mediaQuery && 'x ' + toStringPrice(obj.productItem.price) + ' ₽'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between px-2 transition-all duration-150">
        <div className={cn('absolute z-10', open ? 'opacity-100 text-red-700' : 'opacity-0')}>
          <div onClick={() => setModalOpen(true)} className="cursor-pointer mt-12">
            Удалить
          </div>
          <DeleteModal
            id={id}
            open={modalOpen}
            onOpenChange={() => setModalOpen((prev) => !prev)}
          />
        </div>
        <div
          className={cn(
            'flex gap-6 transition-all duration-150 ml-1',
            open ? 'opacity-0' : 'opacity-100',
          )}>
          {item
            .filter((_, i) => i < 5)
            .map((obj) => (
              <div key={obj.id} className="flex">
                <div className="max-w-[70px] h-[80px] flex items-center justify-center">
                  <img
                    src={obj.productItem.Img.img[0]}
                    alt=""
                    className={cn(
                      'max-w-[70px] max-h-[80px]',
                      obj.productItem.categoryId == 4 ? 'max-w-[100px]' : '',
                    )}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className={cn('text-end transition-all mt-1', open ? 'mt-4' : '')}>
          <div className="mb-1 text-gray-400">Сумма заказа:</div>
          <div className="text-lg font-semibold">{toStringPrice(totalAmount)} ₽</div>
        </div>
      </div>
    </div>
  );
};
