import { CartItems } from '@/components/shared/Cart/CartItems';
import { CartPrices } from '@/components/shared/Cart/CartPrices';
import { Container } from '@/components/shared/container';
import React from 'react';

export default async function CartPage() {
  return (
    <Container className="mt-10 max-md:px-3">
      <div className="flex justify-between gap-6 xl:gap-20 max-xl:flex-wrap">
        <CartItems className="flex-auto flex-col" />
        <CartPrices className="flex flex-col" />
      </div>
    </Container>
  );
}
