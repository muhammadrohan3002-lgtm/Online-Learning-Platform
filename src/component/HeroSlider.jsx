"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import HeroSlide from "./HeroSlide";
import slides from "@/data/slides.json";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSlider() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-neutral text-neutral-content">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full min-h-[340px] md:min-h-[380px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <HeroSlide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}