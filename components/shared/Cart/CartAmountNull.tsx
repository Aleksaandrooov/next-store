'use client';

import { Button } from '@/components/ui/button';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AuthModal } from '../modals/auth-modal';
import { useSession } from 'next-auth/react';
import { ProductsTabl } from '../productCart';
import { Api } from '@/app/services/apiClient';
import { SwiperPoster } from '../lib/swiperPoster';
import { Container } from '../container';

export const CartAmountNUll: React.FC = () => {
  const [open, isOpen] = useState(false);
  const { data: session } = useSession();
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

  return (
    <div className="min-w-full text-center mt-10">
      <div className="">
        <PackageOpen className="size-28 mx-auto" strokeWidth={1} color="gray" />
      </div>
      <div className="mt-4 text-4xl font-bold">Ваша корзина пуста</div>
      <div className="mt-2 text-lg">Самое время добавить в нее что-нибудь!</div>
      <Link href="/catalog?category=1&">
        <Button variant="secondary" className="mt-4 py-6" size="lg">
          Перейти в каталог
        </Button>
      </Link>
      {!session && (
        <div className="mt-4 max-w-[450px] mx-auto text-gray-500">
          Наполняли корзину при прошлом визите?{' '}
          <span onClick={() => isOpen((prev) => !prev)} className="text-green-800 cursor-pointer">
            Авторизуйтесь,
          </span>{' '}
          и добавленные товары появятся на странице
        </div>
      )}
      <AuthModal open={open} onOpenChange={() => isOpen((prev) => !prev)} />
      {product?.length ? (
        <Container className="px-0 my-10 min-w-full">
          <SwiperPoster product={product} />
        </Container>
      ) : (
        <></>
      )}
    </div>
  );
};
