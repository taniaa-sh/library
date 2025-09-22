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
        <div className="w-full overflow-hidden">
            <Swiper
                breakpoints={{
                    360: { slidesPerView: 3, spaceBetween: 10 },
                    640: { slidesPerView: 4, spaceBetween: 1 },
                    768: { slidesPerView: 5, spaceBetween: 0 },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 1000 }}
                loop
                centeredSlides
            >
                {data.map((popularBook, idx) => (
                    <SwiperSlide
                        key={idx}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                        onClick={() => router.push(SiteUrls.bookDetail + `/${popularBook.id}`)}
                    >
                        <Image
                            src={popularBook.coverUrl}
                            alt={`Logo ${idx + 1}`}
                            width={200}
                            height={174}
                        />
                        <p className="text-base font-semibold text-white leading-6 text-center px-8">{popularBook.title}</p>
                        <p className="text-base font-semibold text-white leading-6 text-center px-8 !mt-2">By {popularBook.author}</p>
                        <p className="text-base font-normal text-light-100 leading-4 text-center px-8 !mt-2">{popularBook.genre}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
