'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { cn } from '@/lib/utils';
import { useMedia } from 'react-use';

interface Props {
  className?: string;
  img: string[] | undefined;
}

export const ImgProduct: React.FC<Props> = ({ className, img }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const mediaQuery = useMedia('only screen and (max-width : 1280px)');

  return (
    <div
      className={cn('flex gap-6 max-xl:flex-col-reverse max-xl:gap-4 max-xl:mx-auto', className)}>
      <Swiper
        direction={mediaQuery ? 'horizontal' : 'vertical'}
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className="mySwiper2 max-h-[400px] w-20 max-xl:h-16 max-xl:w-[280px]">
        {img?.map((obj, i) => (
          <SwiperSlide
            key={i}
            className="border-[2px] border-white hover:border-gray-300 p-[4px] rounded-sm cursor-pointer">
            <div className="flex items-center h-full justify-center">
              <img src={obj} className="max-h-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="mySwiper1 w-[500px] max-h-[420px] max-xl:max-h-[320px] max-md:w-[360px]">
        {img?.map((obj, i) => (
          <SwiperSlide key={i} className="px-8">
            <div className="flex items-center justify-center h-full">
              <img src={obj} className="max-h-full max-w-[350px]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
