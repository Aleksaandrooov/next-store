'use client';

import { removeAllItemCart, setChangeItems } from '@/app/redux/CartSlice/slice';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { Checkbox } from '@/components/ui/box';
import { Title } from '@/components/ui/title';
import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Item } from './item';
import { useSet } from 'react-use';
import toast from 'react-hot-toast';
import { CartAmountNUll } from './CartAmountNull';
import { Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  className?: string;
}

export const CartItems: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { CartItems, status } = useSelector((state: RootState) => state.cart);
  const [cartItemChange, { clear: clearCartItem, toggle: setCartItemChange }] = useSet(
    new Set<number>(),
  );

  const ChangeAll = () => {
    clearCartItem();
    CartItems?.map((obj) => setCartItemChange(obj.id));
  };

  const removeAllVoid = () => {
    const id = toast.loading('Удаление товаров...', {
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    });
    dispatch(removeAllItemCart(cartItemChange)).then(() => {
      toast.success('Успешно', {
        id,
      });
      clearCartItem();
    });
  };

  useEffect(() => {
    dispatch(
      setChangeItems(
        CartItems.filter((obj) => {
          return cartItemChange.has(obj.id);
        }),
      ),
    );
  }, [cartItemChange, CartItems]);

  const filter = CartItems.filter((obj) => !cartItemChange.has(obj.id)).length > 0;

  useEffect(() => {
    ChangeAll();
  }, [CartItems]);

  if (status == 'loading') {
    return (
      <div className="flex-auto flex-col">
        <Skeleton className="w-36 h-12 mb-16" />
        <div className="flex justify-between">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-32 h-8" />
        </div>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full h-20 my-4 first:mt-6" />
        ))}
      </div>
    );
  }

  if (CartItems.length == 0 && status == 'success') {
    return <CartAmountNUll />;
  }

  return (
    <div className={cn('', className)}>
      <div className="flex items-center gap-3">
        <Title text="Корзина" size="md" />
        {status == 'success' && (
          <div className="text-[24px] text-gray-300 font-medium">{CartItems.length}</div>
        )}
      </div>
      <div className="h-20"></div>
      <div className="flex justify-between items-end pb-4 border-b">
        <div className="flex gap-2 group items-center">
          <Checkbox
            checked={filter ? false : true}
            onCheckedChange={() => {
              return filter && ChangeAll();
            }}
            id="0"
            defaultChecked
          />
          <label htmlFor="0" className="group-hover:cursor-pointer">
            Выбрать все
          </label>
        </div>
        <div
          onClick={() => removeAllVoid()}
          className="cursor-pointer text-gray-400 hover:text-primary transition-all flex gap-2">
          Удалить выбранные
          <Trash2 size={20} />
        </div>
      </div>
      <div className="flex flex-col">
        {CartItems.map((obj) => (
          <Item
            key={obj.id}
            item={obj}
            onCheked={cartItemChange}
            onChangeItem={(id) => setCartItemChange(id)}
          />
        ))}
      </div>
    </div>
  );
};
