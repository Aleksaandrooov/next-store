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
import { Heart, LogOut, ShoppingCart, User, X } from 'lucide-react';
import { hab } from './lib/sortType';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Props {
  className?: string;
}

export const ProfileMobile: React.FC<Props> = ({}) => {
  const onClickSignOut = () => {
    signOut();

    document.cookie = 'cartToken=; Max-Age=0; path=/;';
    document.cookie = 'favoritesToken=; Max-Age=0; path=/;';
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
          <User className="size-5 max-sm:size-4" />
          <div className="">Профиль</div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-white flex-col transition max-md:w-full min-w-[400px] max-md:rounded-none">
        <DrawerHeader>
          <DrawerTitle className="ml-auto">
            <DrawerClose>
              <X />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <div className=" border-b"></div>
        <div className="py-4 flex flex-col h-full">
          {hab?.map((obj, i) => (
            <Link
              key={i}
              href={obj.url}
              className="flex justify-between mx-4 my-1 transition-all rounded-md text-lg cursor-pointer hover:bg-slate-100">
              <DrawerClose className="flex p-3 justify-between w-full">
                <div className="">{obj.name}</div>
                {i == 0 && <User color="gray" />}
                {i == 1 && <Heart color="gray" />}
                {i == 2 && <ShoppingCart color="gray" />}
              </DrawerClose>
            </Link>
          ))}
          <DrawerClose
            onClick={() => onClickSignOut()}
            className="mt-auto justify-between p-3 mx-4 my-1 transition-all rounded-md text-lg cursor-pointer hover:bg-slate-100 border group">
            <div className="flex justify-between w-full">
              <div className="group-hover:text-red-700 transition-all">Выход</div>
              <LogOut className="group-hover:text-red-700 transition-all" />
            </div>
          </DrawerClose>
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
