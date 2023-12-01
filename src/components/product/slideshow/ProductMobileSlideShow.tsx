"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}
export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  console.log(images);

  return (
    <div className={className!}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        autoplay={{
          delay: 2000,
        }}
        pagination
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            {/* la imagen viene de products */}
            <Image
              src={`/products/${image}`}
              alt={title}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
