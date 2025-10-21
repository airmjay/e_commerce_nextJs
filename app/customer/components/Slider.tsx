"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                pagination={{
                    clickable: true
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Image
                        alt="slider image one"
                        src="/images/1.png"
                        layout="fill"
                        objectFit="fill"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        alt="slider image two"
                        src="/images/2.png"
                        layout="fill"
                        objectFit="fill"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        alt="slider image three"
                        src="/images/3.png"
                        layout="fill"
                        objectFit="fill"
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
