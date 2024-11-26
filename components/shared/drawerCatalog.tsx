import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Library, X } from 'lucide-react';
import { prisma } from '@/prisma/prisma-client';
import { CategoryDrawer } from './categoryDrawer';

interface Props {
  className?: string;
}

export const DrawerCatalog: React.FC<Props> = async ({}) => {
  const categories = await prisma.category.findMany({
    include: {
      model: true,
    },
  });

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
          <Library className="size-5 max-sm:size-4" />
          <div className="">Каталог</div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-white flex-col max-md:w-full w-[450px] max-md:rounded-none">
        <DrawerHeader>
          <DrawerTitle className="ml-auto">
            <DrawerClose>
              <X />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-full overflow-auto">
          <div className="text-2xl mx-16 mb-10">Каталог товаров</div>
          <div className="flex flex-col mx-8 gap-[2px]">
            {categories.map((obj) => (
              <CategoryDrawer key={obj.id} {...obj} />
            ))}
          </div>
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
