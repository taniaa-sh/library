"use client";

import imagesAddresses from "@/utils/imageAddresses";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SiteUrls from "@/utils/routs";
import { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";

const DetailBookPage = () => {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="mx-auto flex flex-col gap-10  p-4 sm:p-6 mt-[90px] dark:bg-gray-900 w-full h-full">
            {/* <CustomButton
                text="Go back"
                iconAddress={imagesAddresses.icons.arrowLeft}
                iconPosition="right"
                color="white"
                containerClassName="cursor-pointer !w-fit dark:hidden"
                onClick={() => router.back()}
            />
            <CustomButton
                text="Go back"
                iconAddress={imagesAddresses.icons.arrowLeftWhite}
                iconPosition="right"
                color="white"
                containerClassName="cursor-pointer !w-fit hidden dark:flex text-nowrap"
                onClick={() => router.back()}
            /> */}

            <div className="w-full flex flex-col md:flex-row gap-6 sm:gap-[35px]">
                <div className="flex justify-center items-center rounded-xl bg-[#C4214C1A] py-4 sm:py-6 px-6 sm:pr-18 sm:pl-8 dark:bg-[#C4214C33]">
                    <Image
                        src={imagesAddresses.images.book2}
                        alt="book"
                        width={180}
                        height={190}
                    />
                </div>

                <div className="flex flex-col gap-4 sm:gap-[18px]">
                    <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                        <p className="font-normal text-sm sm:text-base text-dark-50 dark:text-gray-400">
                            Created at:
                        </p>
                        <div className="flex gap-1 items-center">
                            <Image
                                src={imagesAddresses.icons.calendar}
                                alt="calendar"
                                width={16}
                                height={16}
                            />
                            <p className="font-normal text-sm sm:text-base text-dark-200 dark:text-gray-300">
                                12/12/2023
                            </p>
                        </div>
                    </div>

                    <p className="font-semibold text-lg sm:text-2xl text-dark-400 leading-snug dark:text-gray-100">
                        Jayne Castle - People in Glass Houses
                    </p>
                    <p className="font-semibold text-base sm:text-lg text-dark-200 dark:text-gray-300">
                        By Jayne Ann Krentz
                    </p>
                    <p className="font-normal text-sm sm:text-base text-dark-50 dark:text-gray-400">
                        Strategic, Fantasy
                    </p>

                    <CustomButton
                        text="Edit Book"
                        iconAddress={imagesAddresses.icons.whiteEdit}
                        iconPosition="right"
                        color="blue"
                        containerClassName="cursor-pointer !w-full"
                        onClick={() => router.push(SiteUrls.adminEditBook)}
                    />
                </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-8 sm:gap-10">
                <div className="w-full md:w-[620px] flex flex-col gap-3 sm:gap-4">
                    <p className="font-semibold text-base sm:text-lg text-dark-400 dark:text-gray-100">
                        Summary
                    </p>
                    <div className="flex flex-col gap-5 sm:gap-8 text-justify">
                        <p className="font-normal text-sm sm:text-base text-slate-500 dark:text-gray-300 leading-relaxed">
                            People in Glass Houses by Jayne Castle (a pseudonym for Jayne Ann
                            Krentz) is a science fiction romance set in a future world where
                            people with psychic abilities live in harmony with advanced
                            technology. The story follows the main characters, Harriet and
                            Sam, who are drawn together under unusual circumstances.
                        </p>
                        <p className="font-normal text-sm sm:text-base text-slate-500 dark:text-gray-300 leading-relaxed">
                            Harriet, a talented psychic, works for a company that offers
                            psychic services in a futuristic society. When she finds herself
                            tangled in a dangerous situation involving a mysterious conspiracy,
                            she enlists the help of Sam, a former investigator with a dark
                            past. As they uncover the secrets surrounding a glass house—a
                            mysterious structure tied to their investigation—they must
                            navigate their growing attraction while facing hidden dangers.
                        </p>
                        <p className="font-normal text-sm sm:text-base text-slate-500 dark:text-gray-300 leading-relaxed">
                            The novel combines elements of mystery, suspense, and romance,
                            with a focus on psychic abilities, futuristic technology, and the
                            complexities of relationships. The title People in Glass Houses
                            symbolizes the fragile nature of the world the characters inhabit
                            and the vulnerabilities they face in their personal and
                            professional lives.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="font-semibold text-base sm:text-lg text-dark-400 dark:text-gray-100">
                        Video
                    </p>
                    <div className="relative w-full rounded-lg shadow-lg overflow-hidden border border-gray-500 dark:border-gray-700">
                        <video
                            ref={videoRef}
                            poster={imagesAddresses.images.notFoundBg}
                            height={200}
                            src={"https://ik.imagekit.io/pwd17k26p/books/videos/file_vcXsdjkqw.png"}
                            onEnded={() => setIsPlaying(false)}
                            onClick={togglePlay}
                            className="w-full h-[200px] md:h-[300px] object-cover"
                        />
                        {!isPlaying && (
                            <div
                                onClick={togglePlay}
                                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20"
                            >
                                <Image
                                    src={imagesAddresses.icons.playWhite}
                                    alt="play"
                                    width={64}
                                    height={64}
                                    className="rounded-full p-4 border-4 border-white"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DetailBookPage;
