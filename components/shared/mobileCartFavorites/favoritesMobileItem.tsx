'use client';

import { RootState } from '@/app/redux/store';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
  className?: string;
}

export const FavoritesMobileItem: React.FC<Props> = ({}) => {
  const { count } = useSelector((state: RootState) => state.favorites);

  return (
    <Link href="/favorites" className="flex flex-col items-center cursor-pointer relative">
      {count > 0 && (
        <div className="absolute bg-green-800 text-white size-5 rounded-full flex justify-center items-center right-2 -top-3 shadow-xl text-xs">
          <div className="">{count}</div>
        </div>
      )}
      <Heart className="size-5 max-sm:size-4" />
      <div className="">Избранное</div>
    </Link>
  );
};
