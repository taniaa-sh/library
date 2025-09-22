"use client";

import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import imagesAddresses from "@/utils/imageAddresses";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';

export default function PopularBookSlider() {

    const popularBooks = [
        { src: imagesAddresses.images.book1, title: "title", genre: "imagesAddresses", author: "author" },
        { src: imagesAddresses.images.book1, title: "title", genre: "imagesAddresses", author: "author" },
        { src: imagesAddresses.images.book1, title: "title", genre: "imagesAddresses", author: "author" },
        { src: imagesAddresses.images.book1, title: "title", genre: "imagesAddresses", author: "author" },
        { src: imagesAddresses.images.book1, title: "title", genre: "imagesAddresses", author: "author" },
        { src: imagesAddresses.images.book1, title: "title", genre: "imagesAddresses", author: "author" },
        { src: imagesAddresses.images.book1, title: "title", genre: "imagesAddresses", author: "author" },
        { src: imagesAddresses.images.book1, title: "title", genre: "imagesAddresses", author: "author" },
        { src: imagesAddresses.images.book1, title: "title", genre: "imagesAddresses", author: "author" },
    ];

    return (
        <div className="w-full overflow-hidden">
            <Swiper
                breakpoints={{
                    360: { slidesPerView: 3, spaceBetween: 10 },
                    640: { slidesPerView: 4, spaceBetween: 1 },
                    768: { slidesPerView: 5, spaceBetween: 0 },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 500 }}
                loop
                centeredSlides
            >
                {popularBooks.map((popularBook, idx) => (
                    <SwiperSlide key={idx} className="flex flex-col items-start gap-2">
                        <Image
                            src={popularBook.src}
                            alt={`Logo ${idx + 1}`}
                            width={200}
                            height={174}
                        />
                        <p className="text-xl font-semibold text-white leading-6">{popularBook.title} - By {popularBook.author}</p>
                        <p className="text-base font-normal text-light-100 leading-4">{popularBook.genre}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
