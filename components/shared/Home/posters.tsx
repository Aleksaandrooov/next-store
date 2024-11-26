'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  className?: string;
  url: string;
  name: string;
  duration: string;
}

export const Posters: React.FC<Props> = ({ url, name, duration }) => {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 translate-y-28',
        duration,
        inView ? 'opacity-100 translate-y-0' : '',
      )}>
      <div
        ref={ref}
        className="max-w-[430px] relative cursor-pointer hover:scale-[1.02] transition hover:shadow-2xl rounded-2xl">
        <div className="absolute z-20 text-black top-10 left-10 font-semibold lg:text-2xl max-md:text-sm max-md:left-2 max-md:top-2 max-lg:lg max-lg:top-5 max-lg:left-5">
          {name}
        </div>
        <img className="w-full rounded-2xl" src={url} />
      </div>
    </div>
  );
};
