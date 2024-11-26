import React from 'react';
import { Container } from './container';
import { cn } from '@/lib/utils';
import { MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';
import { CartButton } from './cart-button';
import { Categories } from './categories';
import { prisma } from '@/prisma/prisma-client';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = async ({ className }) => {
  const model = await prisma.model.findMany({
    take: 9,
  });

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-4">
        <Link href="/">
          <div className="flex gap-2 items-center">
            <MonitorSmartphone size={34} strokeWidth={1} className="relative z-20" />
            <div>
              <h1 className="text-xl uppercase font-medium transition">Aleksandrov</h1>
              <p className="text-sm text-gray-400 leading-3">премиальные товары</p>
            </div>
          </div>
        </Link>
        <div className="flex flex-1 justify-between">
          <Categories />
          <CartButton model={model} className="flex items-center gap-3 max-xl:ml-auto" />
        </div>
      </Container>
    </header>
  );
};
