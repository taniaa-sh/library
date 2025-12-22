"use client";

import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { BookFeatureProps } from "@/utils/type";
import { useRouter } from "next/navigation";
import SiteUrls from "@/utils/routs";

export default function PopularBookSlider({
    data,
}: {
    data: BookFeatureProps[];
}) {
    const router = useRouter();

    return (
        <div className="w-full overflow-hidden px-2 sm:px-4 md:px-0">
            <Swiper
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 12 },
                    480: { slidesPerView: 3, spaceBetween: 14 },
                    640: { slidesPerView: 3, spaceBetween: 16 },
                    768: { slidesPerView: 4, spaceBetween: 20 },
                    1000: { slidesPerView: 5, spaceBetween: 16 },
                    1400: { slidesPerView: 6, spaceBetween: 16 },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 2200, disableOnInteraction: false }}
                loop
            >
                {data.map((popularBook, idx) => (
                    <SwiperSlide key={idx} className="flex justify-center">
                        <div
                            onClick={() =>
                                router.push(
                                    SiteUrls.bookDetail + `/${popularBook.id}`
                                )
                            }
                            className="
                                group w-full max-w-[150px] sm:max-w-[170px] md:max-w-[190px]
                                cursor-pointer rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1
                                bg-gradient-to-b from-[#0f0f0f] to-[#181818]
                                border border-white/5
                                shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                                hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)]
                                dark:bg-gradient-to-b dark:from-white dark:to-gray-100
                                dark:border-gray-200
                                dark:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                                dark:hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]
                            "
                        >
                            <div className="relative flex justify-center">
                                <Image
                                    src={popularBook.coverUrl}
                                    alt={popularBook.title}
                                    width={180}
                                    height={260}
                                    className="w-[110px] h-[155px] sm:w-[130px] sm:h-[185px] md:w-[150px] md:h-[210px] object-cover rounded-xl shadow-xl !-ml-10"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-black/30 to-transparent dark:from-black/40 dark:via-black/10" />
                            </div>

                            <div className="mt-3 h-[92px] flex flex-col justify-between text-start">
                                <div>
                                    {/* Title */}
                                    <p className="text-[12px] sm:text-sm font-semibold leading-5 line-clamp-2 min-h-[40px] transition-colors text-white group-hover:text-[#d4af37] dark:text-gray-900 dark:group-hover:text-amber-600">
                                        {popularBook.title}
                                    </p>

                                    {/* Author */}
                                    <p className="mt-1 text-[11px] italic truncate text-gray-400 dark:text-gray-500">
                                        by {popularBook.author}
                                    </p>
                                </div>

                                {/* Genre */}
                                <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 dark:bg-amber-100 dark:text-amber-700 dark:border-amber-200">
                                    {popularBook.genre}
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
