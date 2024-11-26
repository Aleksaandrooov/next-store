import { cn } from '@/lib/utils';
import { House } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { DrawerCatalog } from './drawerCatalog';
import { MobileProfile } from './MobileProfile';
import { getUserSession } from './lib/get-user-session';
import { CartMobileItem } from './mobileCartFavorites/cartMobileItem';
import { FavoritesMobileItem } from './mobileCartFavorites/favoritesMobileItem';

interface Props {
  className?: string;
}

export const HeaderMobile: React.FC<Props> = async ({ className }) => {
  const session = await getUserSession();

  return (
    <div className={cn('', className)}>
      <div className="max-w-[600px] h-full flex justify-between px-10 mx-auto items-center text-sm max-sm:text-xs">
        <Link href="/" className="flex flex-col items-center cursor-pointer">
          <House className="size-5 max-sm:size-4" />
          <div className="">Главная</div>
        </Link>
        <DrawerCatalog />
        <CartMobileItem />
        {session && <FavoritesMobileItem />}
        <div className="">
          <MobileProfile />
        </div>
      </div>
    </div>
  );
};
