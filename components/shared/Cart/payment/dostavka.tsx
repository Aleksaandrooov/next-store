import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  data?: string;
  dataName: string;
  setActiveIndex: (i: number) => void;
  index: number;
  active: number;
}

export const Dostavka: React.FC<Props> = ({
  className,
  data,
  dataName,
  setActiveIndex,
  index,
  active,
}) => {
  return (
    <div
      onClick={() => setActiveIndex(index)}
      className={cn(
        'w-[120px] border rounded-md cursor-pointer ',
        className,
        index == active ? 'bg-slate-100' : 'hover:bg-slate-50',
      )}>
      <div className="py-2 px-3 text-nowrap">
        {data ? <div className="text-gray-400 text-sm">{data}</div> : <></>}
        <div className="">{dataName}</div>
      </div>
    </div>
  );
};
