import { Title } from '@/components/ui/title';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductLocalCart } from '../productLocalCart';
import { ProductsTabl } from '../productCart';

import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  className?: string;
  product: ProductsTabl[];
}

export const SwiperPoster: React.FC<Props> = ({ product }) => {
  return (
    <div className="mt-10 min-[1450px]:w-[1360px] min-[1300px]:w-[1220px] min-[1150px]:w-[1050px] min-[1050px]:w-[900px] min-[780px]:w-[700px] min-[600px]:w-[470px] min-[0px]:w-[330px]">
      <Title
        text="Недавно просмотренные"
        className="mb-5 ml-10 md:text-left max-[600px]:text-xl max-[600px]:font-semibold max-[600px]:mx-auto max-[600px]:mb-2"
        size="md"
      />
      <div className="">
        <Swiper
          breakpoints={{
            1450: {
              slidesPerView: 6,
            },
            1300: {
              slidesPerView: 5,
            },
            1150: {
              slidesPerView: 4,
            },
            1050: {
              slidesPerView: 4,
            },
            780: {
              slidesPerView: 3,
            },
            600: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 2,
            },
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper4 swiper min-w-full">
          {product?.map((obj) => (
            <SwiperSlide key={obj.id} className="first:ml-2">
              <ProductLocalCart className="rounded-3xl max-sm:rounded-xl" {...obj} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
