import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { hab } from '../lib/sortType';

interface Props {
  className?: string;
  id: number;
}

export const ProfileCheckout: React.FC<Props> = ({ id }) => {
  return (
    <div className="flex flex-col text-center max-xl:hidden">
      {hab.map((obj, i) => (
        <Link
          href={obj.url}
          key={i}
          className={cn(
            'w-60 py-4 border-gray-300 border-1 first:border-b-0 first:rounded-t-sm last:border-t-0 last:rounded-b-sm cursor-pointer ',
            i == id ? 'bg-gray-100' : 'hover:bg-gray-100',
          )}>
          {obj.name}
        </Link>
      ))}
    </div>
  );
};
