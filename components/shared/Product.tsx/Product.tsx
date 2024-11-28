'use client';

import React, { useEffect, useState } from 'react';
import { ProductsTabl } from '../productCart';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ImgProduct } from './imgProduct';
import { toStringPrice } from '../lib/price-calc';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { addItemCart } from '@/app/redux/CartSlice/slice';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Heart, Truck } from 'lucide-react';
import { addFavorites } from '@/app/redux/favoritesSlise/slice';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { ToasterProduct } from './toasterProduct';
import { Apple } from '../apple';
import { dataTime } from '../Cart/payment/dataMasiv';
import { useMedia } from 'react-use';

interface Props {
  product: ProductsTabl;
  andProducts: ProductsTabl[];
}

export const Product: React.FC<Props> = ({ product, andProducts }) => {
  const mediaQuery = useMedia('only screen and (max-width : 1280px)');
  const { items, count } = useSelector((state: RootState) => state.favorites);
  const [loading, isLoading] = useState(false);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const checked = items.filter((obj) => obj.productItem.id == product.id).length;

  const colors = andProducts.filter((obj) =>
    obj.memoryId
      ? obj.memoryId === product.memoryId &&
        obj.memoryOpId === product.memoryOpId &&
        obj.procesorId == product.procesorId
      : obj.sizeId === product.sizeId,
  );
  const memory = andProducts.filter(
    (obj) =>
      obj.colorId == product.colorId &&
      obj.memoryOpId == product.memoryOpId &&
      obj.procesorId == product.procesorId,
  );
  const memoryOp = andProducts.filter(
    (obj) =>
      obj.colorId == product.colorId &&
      obj.memoryId == product.memoryId &&
      obj.procesorId == product.procesorId,
  );

  const onAddItem = () => {
    isLoading(true);
    const id = toast.loading('Товар добавляется...', {
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    });
    dispatch(addItemCart({ productId: product.id })).then(() => {
      isLoading(false);
      toast.success('Товар добавлен', {
        id,
      });
    });
  };

  const addLike = () => {
    setLoadingFavorites(true);
    dispatch(addFavorites(product.id)).then(() => {
      setLoadingFavorites(false);
      if (session) {
        toast.dismiss();
      }
      if (!checked) {
        if (!mediaQuery) {
          if (session) {
            toast(<ToasterProduct {...product} count={count} />, {
              style: {
                minHeight: '150px',
                maxWidth: '8000px',
                marginBottom: '-16px',
                width: '100%',
              },
              position: 'bottom-center',
            });
          }
        }
      }
    });
  };

  useEffect(() => {
    const item = localStorage
      .getItem('product')
      ?.split(',')
      .filter((obj) => Number(obj) != product.id)
      .join(',');

    localStorage.setItem('product', product.id + (item ? ',' + item : ''));
  }, []);

  return (
    <div className="flex gap-10 max-sm:gap-7 justify-center max-lg:flex-wrap">
      <div className="w-[650px] h-[550px] flex mt-10 max-xl:mt-0 max-xl:h-[430px] max-md:w-[360px] max-sm:w-[310px] max-[370px]:w-[270px]">
        <ImgProduct img={product.Img?.img} className="" />
      </div>
      <div className="xl:max-w-[550px] py-5 gap-3 flex-col flex max-md:pt-0 w-full">
        <div className="flex justify-between">
          <div className="font-semibold min-h-[100px] max-md:min-h-[70px] text-2xl max-w-[400px] text-wrap flex max-md:text-lg">
            {product.title}
            {product.sizeId ? `, ${product.Size?.name},` : ''}{' '}
            {product.MemoryOp ? ` ${product.MemoryOp.name},` : ''} {product.Memory?.name}
            {product.Color && ` "${product.Color?.name}"`}
          </div>
          <div className="p-1 transition-all text-gray-400">
            <div onClick={() => addLike()} className="flex cursor-pointer gap-1 items-center">
              <div className="flex items-center justify-center">
                <Button
                  loading={loadingFavorites}
                  className={cn('bg-white group', loadingFavorites ? 'bg-primary' : '')}
                  size="sm">
                  <Heart
                    className={cn(
                      'text-gray-500 cursor-pointer transition size-[18px]',
                      checked ? 'text-[#FF219F] fill-[#FF219F] size-5' : 'group-hover:text-white',
                    )}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {product.colorId && (
          <div className="flex gap-8 items-center min-h-[60px] max-md:gap-4">
            <div className="w-[120px] border-r text-lg max-md:text-base max-md:w-[100px] max-sm:w-[80px]">
              Цвет
            </div>
            <div className="flex gap-4 items-center">
              {colors.map((products) => (
                <Link
                  href={`/catalog/product/${products.id}`}
                  key={products.id}
                  className={cn(
                    'w-[30px] h-[30px] group relative rounded-[50%] border-white transition-all border-[2px] flex justify-center items-center',
                    products.id == product.id ? 'border-gray-300' : 'hover:border-slate-300',
                  )}>
                  <div className="absolute -top-[30px] text-sm w-max text-white bg-primary py-[2px] px-2 rounded-sm opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                    {products.Color?.name}
                  </div>
                  <div
                    style={{ backgroundColor: '#' + products.Color?.colorName }}
                    className="w-[26px] h-[26px] rounded-[50%] shadow-xl border border-gray-200"></div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {product.sizeId && (
          <div className="flex gap-8 items-center min-h-[60px] max-md:gap-4">
            <div className="w-[120px] border-r text-lg max-md:text-base max-md:w-[100px] max-sm:w-[80px]">
              Экран
            </div>
            <div className="flex gap-5">
              {memory.map((products) => (
                <Link
                  href={`/catalog/product/${products.id}`}
                  key={products.id}
                  className={cn(
                    'h-[40px] w-[120px] group max-md:w-[90px] relative cursor-pointer border-[1px] border-gray-300 rounded-md flex items-center justify-center transition-all',

                    products.id == product.id ? 'border-blue-900' : 'hover:border-gray-400',
                  )}>
                  <div className="absolute -top-[30px] text-sm w-max text-white bg-primary pt-[2px] px-2 rounded-sm opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                    {toStringPrice(products.price)} ₽
                  </div>
                  {products.Size?.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        {product.memoryId && (
          <div className="flex gap-8 items-center min-h-[60px] max-md:gap-4">
            <div className="w-[120px] border-r text-lg max-md:text-base max-md:w-[100px] max-sm:w-[80px]">
              {product.memoryOpId ? <>Объём SSD</> : <>Память</>}
            </div>
            <div className="flex gap-5 max-xl:flex-wrap">
              {memory.map((products) => (
                <Link
                  href={`/catalog/product/${products.id}`}
                  key={products.id}
                  className={cn(
                    'h-[40px] w-[120px] max-md:w-[90px] group relative cursor-pointer border-[1px] border-gray-300 rounded-md flex items-center justify-center transition-all',

                    products.id == product.id ? 'border-blue-900' : 'hover:border-gray-400',
                  )}>
                  <div className="absolute -top-[30px] text-sm w-max text-white bg-primary pt-[2px] px-2 rounded-sm opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                    {toStringPrice(products.price)} ₽
                  </div>
                  {products.Memory?.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        {product.memoryOpId && (
          <div className="flex gap-8 items-center min-h-[60px] max-md:gap-4">
            <div className="w-[120px] border-r text-lg max-md:text-base max-md:w-[100px] max-sm:w-[80px]">
              ОЗУ
            </div>
            <div className="flex gap-5">
              {memoryOp.map((products) => (
                <Link
                  href={`/catalog/product/${products.id}`}
                  key={products.id}
                  className={cn(
                    'h-[40px] w-[120px] max-md:w-[90px] group relative cursor-pointer border-[1px] border-gray-300 rounded-md flex items-center justify-center transition-all',

                    products.id == product.id ? 'border-blue-900' : 'hover:border-gray-400',
                  )}>
                  <div className="absolute -top-[30px] text-sm w-max text-white bg-primary pt-[2px] px-2 rounded-sm opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                    {toStringPrice(products.price)} ₽
                  </div>
                  {products.MemoryOp?.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-between border-t items-center border-gray-200 mt-7 max-md:mt-2 pt-7">
          <div className="text-3xl font-medium max-sm:text-2xl">
            {toStringPrice(product.price)} ₽
          </div>
          <div className="bg-gray-400 opacity-80 text-sm text-white py-[2px] px-3 rounded-sm">
            Гарантия
          </div>
        </div>
        <Button
          onClick={() => onAddItem()}
          loading={loading}
          className="mt-3 bg-primary text-lg text-center rounded-sm cursor-pointer py-6 max-sm:text-base max-sm:mt-1 text-white">
          Добавить в корзину
        </Button>
        {/* <Button
          loading={loading}
          className="bg-slate-100 text-lg text-center rounded-sm hover:bg-slte-100 text-primary font-semibold cursor-pointer h-12">
          Быстрый заказ
        </Button> */}
        <div className="flex justify-between items-center">
          <div className=" text-gray-500">Код товара: {product.id}</div>
          <div className="flex gap-1 items-center text-gray-500">
            <Apple className="w-[16px]" color="fill-black" />
            <div className="pt-[3px]">Все товары Apple</div>
          </div>
        </div>
        <div className="bg-slate-100 py-4 px-6 rounded-sm">
          <div className="flex justify-between items-center">
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
        </div>
      </div>
    </div>
  );
};
