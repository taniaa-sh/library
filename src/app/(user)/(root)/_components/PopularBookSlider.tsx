"use client";

import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { BookFeatureProps } from "@/utils/type";
import { useRouter } from "next/navigation";
import SiteUrls from "@/utils/routs";

export default function PopularBookSlider({ data }: { data: BookFeatureProps[] }) {
    const router = useRouter();

    return (
        <div className="w-full overflow-hidden px-2 sm:px-4 md:px-0">
            <Swiper
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 8, centeredSlides: true },
                    480: { slidesPerView: 3, spaceBetween: 10 },
                    640: { slidesPerView: 4, spaceBetween: 12 },
                    768: { slidesPerView: 5, spaceBetween: 16 },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 2000 }}
                loop
                centeredSlides={false}
            >
                {data.map((popularBook, idx) => (
                    <SwiperSlide
                        key={idx}
                        className="flex flex-col items-center justify-center mx-auto gap-1 sm:gap-2 cursor-pointer"
                        onClick={() => router.push(SiteUrls.bookDetail + `/${popularBook.id}`)}
                    >
                        <Image
                            src={popularBook.coverUrl}
                            alt={`Logo ${idx + 1}`}
                            width={160}
                            height={220}
                            className="w-[100px] h-[140px] sm:w-[140px] sm:h-[190px] md:w-[180px] md:h-[240px] object-cover rounded-md !-ml-12"
                        />
                        <p className="text-sm sm:text-base font-semibold text-white dark:text-gray-900 leading-5 sm:leading-6 text-center px-2 sm:px-4">
                            {popularBook.title}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base font-semibold text-white dark:text-gray-900  leading-4 sm:leading-6 text-center px-2 sm:px-4 !mt-1 sm:!mt-2">
                            By {popularBook.author}
                        </p>
                        <p className="text-xs sm:text-sm font-normal text-light-100 dark:text-gray-900  leading-4 text-center px-2 sm:px-4 !mt-1 sm:!mt-2">
                            {popularBook.genre}
                        </p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
