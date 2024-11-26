import { Button } from '@/components/ui/button';
import React from 'react';
import { CartItemType } from '@/app/redux/CartSlice/slice';
import { toStringPrice } from '../../lib/price-calc';
import { words } from '../../lib/word-cals';

interface Props {
  className?: string;
  totalItems: CartItemType['items'][];
  totalAmount: number;
  totalCount: number;
  loading: boolean;
}

export const Pay: React.FC<Props> = ({
  className,
  totalItems,
  totalCount,
  totalAmount,
  loading,
}) => {
  return (
    <div className={className}>
      <div className="px-6 py-5 flex max-sm:px-3 flex-col gap-5 border rounded-lg w-[450px] max-sm:w-full shadow-md max-xl:mt-6">
        {totalItems.map((obj) => (
          <div key={obj.id} className="flex gap-4">
            <div className="w-[80px] max-sm:w-[58px] max-h-[60px] flex justify-center items-center">
              <img
                src={obj.productItem.Img.img[0]}
                alt=""
                className="max-h-[60px] max-sm:max-h-[50px] my-auto"
              />
            </div>
            <div className="text-sm flex-1">
              {obj.productItem.title}
              {obj.productItem.Size?.name ? ` ${obj.productItem.Size.name},` : ''}{' '}
              {obj.productItem.MemoryOp ? ` ${obj.productItem.MemoryOp.name},` : ''}{' '}
              {obj.productItem.Memory?.name}
              {obj.productItem.Color?.name && obj.productItem.categoryId != 4
                ? ` «${obj.productItem.Color?.name}»`
                : ''}
            </div>
            <div className="text-end font-semibold">
              <div className="">{toStringPrice(obj.productItem.price * obj.countItem)} ₽</div>
              {obj.countItem > 1 && (
                <div className="text-xs text-gray-500">
                  {toStringPrice(obj.productItem.price)} ₽ ({obj.countItem})
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg w-[450px] mb-6 max-sm:w-full shadow-md mt-5 px-5 py-4 border">
        <div className="flex justify-between">
          <div className="">
            {totalCount} {words(totalCount, ['товар', 'товара', 'товаров'])}
          </div>
          <div className="">{toStringPrice(totalAmount)} ₽</div>
        </div>
        <div className="flex justify-between mt-3 items-end border-t pt-3">
          <div className="text-lg font-bold">К оплате: {toStringPrice(totalAmount)} ₽</div>
          <div className="text-sm text-gray-500">До +6000 бонусов</div>
        </div>
        <Button type="submit" loading={loading} className="mt-5 w-full h-12 text-base">
          Перейти к оплате
        </Button>
      </div>
    </div>
  );
};
