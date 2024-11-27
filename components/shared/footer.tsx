import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import { prisma } from '@/prisma/prisma-client';
import { AtSign } from 'lucide-react';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = async ({ className }) => {
  const category = await prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  });

  return (
    <div className={cn('bg-black', className)}>
      <Container className="text-white">
        <div className="flex flex-wrap gap-3 justify-center py-6 border-b border-gray-500">
          <div className="border-r pr-3">Каталог</div>
          {category.map((obj) => (
            <a
              href={'/catalog?category=' + obj.id}
              key={obj.id}
              className="text-gray-500 transition-all cursor-pointer hover:text-white ">
              {obj.name}
            </a>
          ))}
        </div>
        <div className="flex py-4 justify-between px-4">
          <div className="my-2">
            <div className="flex gap-1 items-center mb-2">
              <AtSign size={20} /> aleksandrov, 2024
            </div>
            <div className="text-sm text-gray-400">
              Крупнейшая сеть магазинов и сервисных центров техники Apple
            </div>
          </div>
          <div className="text-end">
            <div className="mb-1">8 800 555-35-35</div>
            <div className="text-gray-400 text-sm">с 9:00 до 22:00, без выходных</div>
          </div>
        </div>
      </Container>
    </div>
  );
};
