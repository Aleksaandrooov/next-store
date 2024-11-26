import React from 'react';
import { Container } from '../container';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { words } from '../lib/word-cals';
import { Color, Img, Memory, MemoryOp, Size } from '@prisma/client';

type props = {
  id: number;
  title: string;
  Img: Img | null;
  Size: Size | null;
  Color: Color | null;
  MemoryOp: MemoryOp | null;
  Memory: Memory | null;
  count: number;
};

export const ToasterProduct: React.FC<props> = ({
  title,
  Img,
  Size,
  Color,
  MemoryOp,
  Memory,
  count,
}) => {
  return (
    <Container className="flex items-center justify-between w-full">
      <div className="flex gap-8 items-center">
        <div className="flex items-top justify-center mx-6 w-[100px] max-h-[120px]">
          <img src={Img?.img[0]} alt="" className="w-max h-max max-h-[120px]" />
        </div>
        <div className="max-w-[1000px] min-h-[50px] flex flex-col gap-2">
          <div className="font-medium cursor-pointer w-max text-xl">
            {title},{Size ? ` ${Size.name},` : ''} {MemoryOp ? ` ${MemoryOp.name},` : ''}{' '}
            {Memory?.name}
            {Color ? ` "${Color.name}"` : ''}
          </div>
          <div className="flex items-center gap-1 transition-all text-gray-400 cursor-pointer">
            Всего в списке {count + 1} {words(count + 1, ['товар', 'товара', 'товаров'])}
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <Link href="/favorites">
          <Button onClick={() => toast.remove()} variant="secondary" size="lg">
            В избранное
          </Button>
        </Link>
        <X
          onClick={() => toast.dismiss()}
          size={38}
          className="cursor-pointer text-gray-400 transition-all hover:text-primary"
          strokeWidth={1.25}
        />
      </div>
    </Container>
  );
};
