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
                {data.map((popularBook) => (
                    <SwiperSlide
                        key={popularBook.id}
                        className="flex justify-center"
                    >
                        <div
                            onClick={() =>
                                router.push(
                                    SiteUrls.bookDetail + `/${popularBook.id}`
                                )
                            }
                            className="
                                group w-full max-w-[150px] cursor-pointer
                                rounded-2xl border border-[#E7C9A5]/30
                                bg-gradient-to-b from-[#171613] to-[#0D0D0C]
                                p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                                transition-all duration-300
                                hover:-translate-y-1
                                hover:border-[#E7C9A5]/80
                                hover:shadow-[0_15px_35px_rgba(231,201,165,0.12)]
                                sm:max-w-[170px] md:max-w-[190px]
                                dark:border-[#B88A4B]/30
                                dark:bg-gradient-to-b dark:from-white dark:to-[#F8F2E6]
                                dark:shadow-[0_8px_20px_rgba(117,99,78,0.08)]
                                dark:hover:border-[#B88A4B]/80
                                dark:hover:shadow-[0_14px_30px_rgba(184,138,75,0.16)]
                            "
                        >
                            {/* Book Cover */}
                            <div className="relative flex justify-center">
                                <Image
                                    src={popularBook.coverUrl}
                                    alt={popularBook.title}
                                    width={180}
                                    height={260}
                                    className="h-[155px] w-[110px] rounded-xl object-cover !-ml-8 sm:h-[185px] sm:w-[130px] md:h-[210px] md:w-[150px] md:!-ml-10"
                                />
                            </div>

                            {/* Book Information */}
                            <div className="mt-3 flex h-[92px] flex-col justify-between text-start">
                                <div>
                                    <p className="line-clamp-2 min-h-[40px] text-[12px] font-semibold leading-5 text-white transition-colors duration-300 group-hover:text-[#E7C9A5] sm:text-sm dark:text-[#17130F] dark:group-hover:text-[#A87938]">
                                        {popularBook.title}
                                    </p>

                                    <p className="mt-1 truncate text-[11px] italic text-stone-400 dark:text-[#75634E]">
                                        by {popularBook.author}
                                    </p>
                                </div>

                                {/* Genre */}
                                <span className="inline-block w-fit max-w-full truncate rounded-full border border-[#E7C9A5]/70 bg-[#E7C9A5]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#E7C9A5] dark:border-[#B88A4B]/70 dark:bg-[#B88A4B]/10 dark:text-[#A87938]">
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