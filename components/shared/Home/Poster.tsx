'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '../container';
import { Posters } from './posters';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { ProductsTabl } from '../productCart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Api } from '@/app/services/apiClient';

import { SwiperPoster } from '../lib/swiperPoster';

const masiv = [
  {
    name: 'Только',
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-50-holiday-iphone-202411_GEO_US?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1729180987357',
    duration: 'duration-700',
  },
  {
    name: 'Качественная',
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-50-holiday-macbook-air-202411?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1728492751837',
    duration: 'duration-1000',
  },
  {
    name: 'Продукция',
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-50-holiday-ipad-pro-202411?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1728492745491',
    duration: 'duration-[1300ms]',
  },
];

export const Poster = () => {
  const [product, setProduct] = useState<ProductsTabl[]>();

  useEffect(() => {
    const item = localStorage.getItem('product') || '';
    try {
      async function fetchProductsLocal() {
        const data = await Api.localProducts.localProduct(item);
        setProduct(data);
      }
      fetchProductsLocal();
    } catch {}
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <Container className="mt-16 max-lg:mt-8 flex flex-col max-sm:px-4">
      <div
        ref={ref}
        className={cn(
          'opacity-0 transition duration-1000 translate-y-28 max-md:hidden',
          inView ? 'opacity-100 translate-y-0' : '',
        )}>
        <img
          src="https://static.re-store.ru/upload/resize_cache/iblock/106/10500_600_140cd750bba9870f18aada2478b24840a/yjjh5u5i1msi9u1iglfrvzoy6fc2mie4.jpg"
          alt=""
          className="rounded-2xl hover:scale-[1.02] transition hover:shadow-2xl"
        />
      </div>
      <div className="mt-10 max-md:hidden flex justify-between gap-5 max-lg:gap-2 max-lg:mt-4">
        {masiv.map((obj, i) => (
          <Posters key={i} {...obj} />
        ))}
      </div>
      <div
        ref={ref2}
        className={cn(
          'translate-y-28 opacity-0 duration-1000 max-md:opacity-100 max-md:translate-y-0',
          inView2 ? 'opacity-100 translate-y-0' : '',
        )}>
        <div className="mt-10 max-lg:mt-4 bg-white pt-10 rounded-2xl transition hover:shadow-2xl hover:scale-[1.02]">
          <img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/financing-apple-card-benefits-202409?wid=1960&hei=752&fmt=jpeg&qlt=90&.v=1726847249116"
            alt=""
            className="max-h-[400px] mx-auto"
          />
        </div>
      </div>
      {product?.length ? <SwiperPoster product={product} /> : <></>}
      <div
        ref={ref3}
        className={cn(
          'translate-y-28 opacity-0 duration-1000 mt-10 max-lg:mt-4 relative max-md:hidden',
          inView3 ? 'opacity-100 translate-y-0' : '',
        )}>
        <div className="absolute text-white w-full text-center pt-10 max-lg:pt-3">
          <div className="text-lg font-semibold max-lg:text-sm ">
            Покупайте онлайн и в розничнах магазинах
          </div>
          <div className="text-3xl font-bold mt-1 max-lg:text-xl">Магазины</div>
          <Link href="/catalog?category=1&">
            <Button
              variant="ghost"
              className="mt-5 text-lg h-12 hover:bg-white hover:text-black transition-all px-6 max-lg:mt-7">
              Купить онлайн
            </Button>
          </Link>
        </div>
        <img
          src="https://static.re-store.ru/upload/resize_cache/iblock/6bf/10500_600_140cd750bba9870f18aada2478b24840a/0z59aqsdm8jcekppwshvwkkg7ronyc52.jpg"
          alt=""
          className="rounded-2xl"
        />
      </div>
    </Container>
  );
};
