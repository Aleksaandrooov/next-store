'use client';

import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

interface Props {
  className?: string;
}
const masiv = [
  {
    img: 'https://static.re-store.ru/upload/resize_cache/iblock/302/10500_600_140cd750bba9870f18aada2478b24840a/83atprxlfbxzzdibx1w39bins7o1yxy9.jpg',
    url: '/catalog?category=1&modelType=2',
    bg: 'bg-black',
  },
  {
    img: 'https://static.re-store.ru/upload/resize_cache/iblock/17c/10500_600_140cd750bba9870f18aada2478b24840a/9pdjn6gomzgs96uayfac4b6apypmveq9.jpg',
    url: '/catalog?category=2&modelType=12',
    bg: 'bg-neutral-100',
  },
  {
    img: 'https://static.re-store.ru/upload/resize_cache/iblock/3b4/10500_600_140cd750bba9870f18aada2478b24840a/0qq8u0ih4iuc228i8xlqsrdxmffsprjh.jpg',
    url: '/catalog?category=3&modelType=6%2C13',
    bg: 'bg-black',
  },

  {
    img: 'https://static.re-store.ru/upload/resize_cache/iblock/ea3/10500_600_140cd750bba9870f18aada2478b24840a/yr4n4da6g1vsk739fj1u2491cxkgs3z8.jpg',
    url: '/catalog?category=4&procesorType=1',
    bg: 'bg-white',
  },
];

export const Reklama: React.FC<Props> = ({}) => {
  return (
    <div className="mySwiper3">
      <Swiper
        speed={1000}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="">
        {masiv.map((obj, i) => (
          <SwiperSlide key={i} className="overflow-hidden">
            <div className={obj.bg}>
              <Link href={obj.url} className="flex justify-center items-center">
                <img
                  className="w-max max-xl:max-h-[500px] max-lg:max-h-[400px] max-md:max-h-[300px] max-sm:max-w-[1000px] max-sm:max-h-[200px] max-[500px]:max-h-[170px]"
                  src={obj.img}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
