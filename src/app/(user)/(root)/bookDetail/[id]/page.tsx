"use client"

import BookFeature from "@/app/(user)/(root)/_components/BookFeature";
import imagesAddresses from "@/utils/imageAddresses";
import { BookFeatureProps } from "@/utils/type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FlipBookPreview from "../_components/FlipBookPreview";
import BookReviews from "../_components/BookReviews";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

const BookDetailPage = () => {
    const params = useParams();
    const id = params?.id as string;
    const [data, setData] = useState<null | BookFeatureProps>();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volumeRange, setVolumeRange] = useState(50);
    const [soundAdjustment, setSoundAdjustment] = useState(false);

    useEffect(() => {
        fetch('/data/data.json')
            .then((res) => res.json())
            .then((json: BookFeatureProps[]) => {
                const selected = json.find(item => item.id === id);
                setData(selected || null);
            })
            .catch((err) => console.error('خطا در دریافت JSON:', err));
    }, [id]);

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const current = videoRef.current?.currentTime ?? 0;
        const total = videoRef.current?.duration ?? 0;
        setCurrentTime(current);
        setDuration(total);
        setProgress(total > 0 ? (current / total) * 100 : 0);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (videoRef.current) videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
        setProgress(value);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (videoRef.current) videoRef.current.volume = value / 100;
        setVolumeRange(value);
        setIsMuted(value === 0);
    };

    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <>

            <div className="flex flex-col gap-10 px-4 py-10 overflow-hidden !-mt-10">
                {/* Book Feature */}
                <BookFeature
                    title={data?.title || ''}
                    Genre={data?.genre || ''}
                    author={data?.author || ''}
                    rating={data?.rating || 0}
                    description={data?.description || ''}
                    bookImg={data?.coverUrl || ''}
                    totalBooks={data?.totalCopies || 0}
                    availableBooks={data?.availableCopies || 0}
                />

                {/* Main Section */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-25">

                    {/* Left Column: Video + Summary */}
                    <div className="flex flex-col w-full lg:!w-[1000px] gap-6">

                        {/* Video */}
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-2xl md:text-3xl text-light-100 dark:text-gray-900">Video</p>
                            <div className="relative w-full rounded-lg shadow-lg overflow-hidden border border-gray-500">
                                <video
                                    ref={videoRef}
                                    poster={!data?.videoUrl ? imagesAddresses.images.notFoundBg : ''}
                                    height={200}
                                    src={data?.videoUrl}
                                    onTimeUpdate={handleTimeUpdate}
                                    onEnded={() => setIsPlaying(false)}
                                    onClick={togglePlay}
                                    onLoadedMetadata={() => {
                                        if (videoRef.current) {
                                            setDuration(videoRef.current.duration);
                                            setProgress(0);
                                            setCurrentTime(0);
                                            setIsPlaying(false);
                                        }
                                    }}
                                    className="w-full h-[200px] md:h-[400px] object-cover"
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
                                            className="rounded-full p-4"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col bg-gray-600 dark:bg-gray-400 p-4 items-center gap-4 rounded-b-lg">
                                {/* Progress Bar */}
                                <div className="w-full flex items-center gap-2">
                                    <span className="text-sm">{formatTime(currentTime)}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={progress}
                                        onChange={handleSeek}
                                        className="flex-1 h-1 bg-gray-300 rounded-lg cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #175CD3 0%, #175CD3 ${progress}%, #ddd ${progress}%, #ddd 100%)`
                                        }}
                                    />
                                    <span className="text-sm">{formatTime(duration)}</span>
                                </div>

                                {/* Play/Volume Controls */}
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={imagesAddresses.icons.backward}
                                            alt="back"
                                            width={24}
                                            height={24}
                                            className="cursor-pointer"
                                            onClick={() => {
                                                if (videoRef.current) videoRef.current.currentTime -= 5;
                                            }}
                                        />
                                        {isPlaying ? (
                                            <Image
                                                src={imagesAddresses.icons.pause}
                                                alt="pause"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer"
                                                onClick={togglePlay}
                                            />
                                        ) : (
                                            <Image
                                                src={imagesAddresses.icons.play}
                                                alt="play"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer"
                                                onClick={togglePlay}
                                            />
                                        )}
                                        <Image
                                            src={imagesAddresses.icons.forward}
                                            alt="forward"
                                            width={24}
                                            height={24}
                                            className="cursor-pointer"
                                            onClick={() => {
                                                if (videoRef.current) videoRef.current.currentTime += 5;
                                            }}
                                        />
                                    </div>
                                    <div className="relative flex items-center gap-3">
                                        {(isMuted || volumeRange === 0) ? (
                                            <Image
                                                src={imagesAddresses.icons.mute}
                                                alt="mute"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer"
                                                onClick={() => setIsMuted(false)}
                                            />
                                        ) : (
                                            <div className="relative">
                                                <Image
                                                    src={imagesAddresses.icons.volume}
                                                    alt="volume"
                                                    width={20}
                                                    height={20}
                                                    className="cursor-pointer"
                                                    onClick={() => setSoundAdjustment(!soundAdjustment)}
                                                />
                                                {soundAdjustment && (
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={volumeRange}
                                                        onChange={handleVolumeChange}
                                                        onBlur={() => setSoundAdjustment(false)}
                                                        className="absolute rotate-90 bottom-12 -right-5 w-20 cursor-pointer"
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-2xl md:text-3xl text-light-100 dark:text-gray-900">Summary</p>
                            <div className="flex flex-col gap-3">
                                <p className="text-base md:text-xl leading-7 md:leading-8 text-light-100  dark:text-gray-900 text-justify">
                                    {data?.summary}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Similar Books */}
                    <div className="flex flex-col gap-3 w-full">
                        <p className="font-semibold text-2xl md:text-3xl text-light-100 dark:text-gray-900">More similar books</p>
                        <div className="hidden lg:grid lg:grid-cols-3">
                            {[3, 2, 4, 5, 6, 7].map((num) => {
                                const key = `book${num}` as keyof typeof imagesAddresses.images;
                                return (
                                    <div key={num} className="flex-shrink-0 w-40 lg:w-auto">
                                        <Image
                                            src={imagesAddresses.images[key]}
                                            alt="book"
                                            width={200}
                                            height={200}
                                            className="rounded-lg object-cover"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="custom-scrollbar overflow-x-auto lg:hidden">
                            <Swiper
                                modules={[Autoplay]}
                                autoplay={{ delay: 2200, disableOnInteraction: false }}
                                loop
                                breakpoints={{
                                    360: { slidesPerView: 2 },
                                    500: { slidesPerView: 3 },
                                    768: { slidesPerView: 4 },
                                    1280: { slidesPerView: 5 },
                                }}
                            >
                                {[3, 2, 4, 5, 6, 7].map((num) => {
                                    const key = `book${num}` as keyof typeof imagesAddresses.images;
                                    return (
                                        <SwiperSlide key={key}>
                                            <Image
                                                src={imagesAddresses.images[key]}
                                                alt="book"
                                                width={200}
                                                height={200}
                                                className="rounded-lg object-cover cursor-grab"
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>

                        <p className="font-semibold text-lg md:text-3xl text-light-100 dark:text-gray-900 !mt-8">Book Pdf</p>
                        <motion.h2
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut"}}
                            className="text-3xl font-bold text-gray-300 dark:text-gray-600 mb-6 flex items-center gap-2 w-fit"
                        >
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="overflow-hidden whitespace-nowrap border-r-4 border-gray-500 !pr-2 text-base md:text-3xl"
                            >
                                You can read and download the book here
                            </motion.span>
                        </motion.h2>
                        {/* <ReadPdfComponent pdfUrl={"../../../../public/sample (1).pdf"} /> */}
                        <div className="-mt-10">
                            <FlipBookPreview />
                        </div>
                    </div>
                </div>

                {/* comments */}
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-2xl md:text-3xl text-light-100 dark:text-gray-900 self-center !mt-8">Comments</p>
                    <BookReviews />
                </div>
            </div>
        </>
    )
}

export default BookDetailPage;