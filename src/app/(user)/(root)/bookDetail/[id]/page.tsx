"use client";

import BookFeature from "@/app/(user)/(root)/_components/BookFeature";
import imagesAddresses from "@/utils/imageAddresses";
import { BookFeatureProps } from "@/utils/type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import FlipBookPreview from "../_components/FlipBookPreview";
import BookReviews from "../_components/BookReviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const SIMILAR_BOOKS = [3, 2, 4, 5, 6, 7];

const BookDetailPage = () => {
    const params = useParams();
    const id = params?.id as string;

    const [data, setData] = useState<BookFeatureProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volumeRange, setVolumeRange] = useState(50);
    const [soundAdjustment, setSoundAdjustment] = useState(false);

    useEffect(() => {
        let isMounted = true;

        setIsLoading(true);
        setData(null);

        fetch("/data/data.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to load books");
                }

                return res.json();
            })
            .then((json: BookFeatureProps[]) => {
                if (!isMounted) return;

                const selected = json.find(
                    (item) => String(item.id) === String(id)
                );

                setData(selected || null);
            })
            .catch((err) => {
                console.error("Error loading book:", err);

                if (isMounted) {
                    setData(null);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [id]);

    const togglePlay = async () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            try {
                await video.play();
            } catch (error) {
                console.error("Unable to play video:", error);
            }
        } else {
            video.pause();
        }
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video) return;

        const current = video.currentTime;
        const total = Number.isFinite(video.duration) ? video.duration : 0;

        setCurrentTime(current);
        setDuration(total);
        setProgress(total > 0 ? (current / total) * 100 : 0);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;

        if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
            return;
        }

        const value = Number(e.target.value);
        video.currentTime = (value / 100) * video.duration;
        setProgress(value);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        const video = videoRef.current;

        setVolumeRange(value);
        setIsMuted(value === 0);

        if (video) {
            video.volume = value / 100;
            video.muted = value === 0;
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.muted || volumeRange === 0) {
            const restoredVolume = volumeRange === 0 ? 50 : volumeRange;

            video.volume = restoredVolume / 100;
            video.muted = false;

            setVolumeRange(restoredVolume);
            setIsMuted(false);
        } else {
            video.muted = true;
            setIsMuted(true);
        }
    };

    const skipVideo = (seconds: number) => {
        const video = videoRef.current;
        if (!video) return;

        const total = Number.isFinite(video.duration) ? video.duration : 0;

        video.currentTime = Math.min(
            Math.max(video.currentTime + seconds, 0),
            total || Infinity
        );
    };

    const formatTime = (time: number) => {
        if (!Number.isFinite(time) || time < 0) return "00:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const reveal = {
        initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: "easeOut" as const,
        },
    };

    const sectionTitleClass =
        "text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#F8F2E6] dark:text-[#17130F]";

    const sectionEyebrowClass =
        "text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#E7C9A5] dark:text-[#8B642D]";

    const secondaryTextClass = "text-[#B8AA96] dark:text-[#75634E]";

    return (
        <main className="relative isolate -mt-10 min-h-screen w-full overflow-hidden text-[#F8F2E6] transition-colors duration-300 dark:text-[#17130F]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 right-[-100px] -z-10 h-80 w-80 rounded-full bg-[#E7C9A5]/[0.07] blur-[100px] dark:bg-[#A87938]/[0.09]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-120px] top-[650px] -z-10 h-80 w-80 rounded-full bg-[#E7C9A5]/[0.04] blur-[100px] dark:bg-[#A87938]/[0.06]"
            />

            <div className="mx-auto mt-32 flex w-full max-w-[1600px] flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10 lg:gap-14">
                {/* Book feature */}
                <motion.section {...reveal}>
                    {isLoading ? (
                        <div className="grid animate-pulse grid-cols-1 gap-6 rounded-3xl border border-white/[0.08] bg-[#171614] p-5 dark:border-[#A87938]/15 dark:bg-[#FBF7EF] sm:p-8 lg:grid-cols-[240px_1fr]">
                            <div className="mx-auto aspect-[3/4] w-full max-w-[220px] rounded-2xl bg-white/[0.06] dark:bg-[#A87938]/10" />
                            <div className="flex flex-col gap-4 py-2">
                                <div className="h-7 w-2/3 rounded-lg bg-white/[0.06] dark:bg-[#A87938]/10" />
                                <div className="h-4 w-1/3 rounded-lg bg-white/[0.06] dark:bg-[#A87938]/10" />
                                <div className="h-20 w-full rounded-xl bg-white/[0.06] dark:bg-[#A87938]/10" />
                            </div>
                        </div>
                    ) : data ? (
                        <BookFeature
                            title={data.title || ""}
                            Genre={data.genre || ""}
                            author={data.author || ""}
                            rating={data.rating || 0}
                            description={data.description || ""}
                            bookImg={data.coverUrl || ""}
                            totalBooks={data.totalCopies || 0}
                            availableBooks={data.availableCopies || 0}
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-[#171614] px-5 py-12 text-center dark:border-[#A87938]/15 dark:bg-[#FBF7EF]">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E7C9A5]/10 dark:bg-[#A87938]/10">
                                <Image
                                    src={imagesAddresses.icons.serach}
                                    alt=""
                                    width={28}
                                    height={28}
                                    className="opacity-70 dark:hidden"
                                />
                                <Image
                                    src={imagesAddresses.icons.searchLight}
                                    alt=""
                                    width={28}
                                    height={28}
                                    className="hidden opacity-70 dark:block"
                                />
                            </div>

                            <h2 className={sectionTitleClass}>
                                Book not found
                            </h2>

                            <p className={`max-w-md text-sm leading-6 ${secondaryTextClass}`}>
                                We couldnt find this book. It may have been
                                removed or the address may be incorrect.
                            </p>
                        </div>
                    )}
                </motion.section>

                {data && (
                    <>
                        {/* Main content */}
                        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(380px,1fr)] lg:gap-8 xl:gap-10">
                            {/* Video and summary */}
                            <div className="flex min-w-0 flex-col gap-10">
                                {/* Video */}
                                <motion.section
                                    {...reveal}
                                    className="flex min-w-0 flex-col gap-4"
                                >
                                    <div className="flex flex-col gap-2">
                                        <p className={sectionEyebrowClass}>
                                            Watch and discover
                                        </p>
                                        <h2 className={sectionTitleClass}>
                                            Book video
                                        </h2>
                                    </div>

                                    <div className="overflow-hidden rounded-2xl border border-[#E7C9A5]/20 bg-[#171614] shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition-colors duration-300 dark:border-[#B88A4B]/30 dark:bg-[#F8F2E6]">
                                        <div className="group relative overflow-hidden bg-black">
                                            <video
                                                ref={videoRef}
                                                poster={
                                                    !data.videoUrl
                                                        ? imagesAddresses.images.notFoundBg
                                                        : undefined
                                                }
                                                src={data.videoUrl || undefined}
                                                preload="metadata"
                                                playsInline
                                                onPlay={() => setIsPlaying(true)}
                                                onPause={() => setIsPlaying(false)}
                                                onTimeUpdate={handleTimeUpdate}
                                                onEnded={() => {
                                                    setIsPlaying(false);
                                                    setProgress(100);
                                                }}
                                                onClick={togglePlay}
                                                onLoadedMetadata={() => {
                                                    const video = videoRef.current;
                                                    if (!video) return;

                                                    setDuration(
                                                        Number.isFinite(video.duration)
                                                            ? video.duration
                                                            : 0
                                                    );
                                                    setProgress(0);
                                                    setCurrentTime(0);
                                                }}
                                                onVolumeChange={() => {
                                                    const video = videoRef.current;
                                                    if (!video) return;

                                                    setIsMuted(video.muted);

                                                    if (!video.muted) {
                                                        setVolumeRange(
                                                            Math.round(video.volume * 100)
                                                        );
                                                    }
                                                }}
                                                className="aspect-video max-h-[520px] w-full cursor-pointer object-contain"
                                            />

                                            <AnimatePresence>
                                                {!isPlaying && (
                                                    <motion.button
                                                        type="button"
                                                        aria-label="Play video"
                                                        initial={
                                                            shouldReduceMotion
                                                                ? false
                                                                : { opacity: 0 }
                                                        }
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        onClick={togglePlay}
                                                        className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/40"
                                                    >
                                                        <motion.span
                                                            whileHover={
                                                                shouldReduceMotion
                                                                    ? undefined
                                                                    : { scale: 1.08 }
                                                            }
                                                            whileTap={
                                                                shouldReduceMotion
                                                                    ? undefined
                                                                    : { scale: 0.95 }
                                                            }
                                                            className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E7C9A5]/60 bg-[#E7C9A5]/90 dark:border-[#A87938]/60 dark:bg-[#A87938]/90 shadow-[0_0_40px_rgba(231,201,165,0.2)] backdrop-blur-md sm:h-20 sm:w-20"
                                                        >
                                                            <Image
                                                                src={imagesAddresses.icons.playWhite}
                                                                alt=""
                                                                width={21}
                                                                height={21}
                                                                className="dark:block hidden"
                                                            />
                                                            <Image
                                                                src={imagesAddresses.icons.playWhite}
                                                                alt=""
                                                                width={21}
                                                                height={21}
                                                                className="dark:hidden invert"
                                                            />
                                                        </motion.span>
                                                    </motion.button>
                                                )}
                                            </AnimatePresence>

                                            {!data.videoUrl && (
                                                <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white/80 backdrop-blur-md">
                                                    Video unavailable
                                                </div>
                                            )}
                                        </div>

                                        {/* Video controls */}
                                        <div className="flex flex-col gap-4 border-t border-[#E7C9A5]/15 bg-[#171614] p-4 dark:border-[#B88A4B]/25 dark:bg-[#F8F2E6] sm:p-5">
                                            {/* Progress bar */}
                                            <div className="flex items-center gap-3">
                                                <span className="min-w-[42px] text-right font-mono text-[11px] tabular-nums text-stone-400 dark:text-[#75634E]">
                                                    {formatTime(currentTime)}
                                                </span>

                                                <input
                                                    type="range"
                                                    aria-label="Video progress"
                                                    min="0"
                                                    max="100"
                                                    step="0.1"
                                                    value={progress}
                                                    onChange={handleSeek}
                                                    disabled={!data.videoUrl || duration <= 0}
                                                    className="bookwise-range h-1.5 min-w-0 flex-1 cursor-pointer rounded-full disabled:cursor-not-allowed disabled:opacity-40"
                                                    style={{
                                                        background: `linear-gradient(to right, #E7C9A5 0%, #E7C9A5 ${progress}%, #75634E ${progress}%, #75634E 100%)`,
                                                    }}
                                                />

                                                <span className="min-w-[42px] font-mono text-[11px] tabular-nums text-stone-400 dark:text-[#75634E]">
                                                    {formatTime(duration)}
                                                </span>
                                            </div>

                                            {/* Playback and volume controls */}
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4 sm:gap-5">
                                                    <button
                                                        type="button"
                                                        aria-label="Rewind 5 seconds"
                                                        disabled={!data.videoUrl}
                                                        onClick={() => skipVideo(-5)}
                                                        className="rounded-lg p-1.5 opacity-80 transition hover:bg-white/5 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-[#A87938]/10"
                                                    >
                                                        <Image
                                                            src={imagesAddresses.icons.backward}
                                                            alt=""
                                                            width={21}
                                                            height={21}
                                                            className="dark:block hidden"
                                                        />
                                                        <Image
                                                            src={imagesAddresses.icons.backward}
                                                            alt=""
                                                            width={21}
                                                            height={21}
                                                            className="dark:hidden invert"
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        aria-label={isPlaying ? "Pause video" : "Play video"}
                                                        disabled={!data.videoUrl}
                                                        onClick={togglePlay}
                                                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7C9A5] text-[#17130F] shadow-[0_4px_15px_rgba(231,201,165,0.12)] transition hover:bg-[#D9B58A] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#A87938] dark:hover:bg-[#966C30]"
                                                    >
                                                        <Image
                                                            src={
                                                                isPlaying
                                                                    ? imagesAddresses.icons.pause
                                                                    : imagesAddresses.icons.play
                                                            }
                                                            alt=""
                                                            width={18}
                                                            height={18}
                                                            className="object-contain dark:invert"
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        aria-label="Forward 5 seconds"
                                                        disabled={!data.videoUrl}
                                                        onClick={() => skipVideo(5)}
                                                        className="rounded-lg p-1.5 opacity-80 transition hover:bg-white/5 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-[#A87938]/10"
                                                    >
                                                        <Image
                                                            src={imagesAddresses.icons.forward}
                                                            alt=""
                                                            width={21}
                                                            height={21}
                                                            className="dark:block hidden"
                                                        />
                                                        <Image
                                                            src={imagesAddresses.icons.forward}
                                                            alt=""
                                                            width={21}
                                                            height={21}
                                                            className="dark:hidden invert"
                                                        />
                                                    </button>
                                                </div>

                                                <div className="relative flex items-center gap-3">
                                                    <AnimatePresence>
                                                        {soundAdjustment && (
                                                            <motion.div
                                                                initial={
                                                                    shouldReduceMotion
                                                                        ? false
                                                                        : { opacity: 0, y: 5 }
                                                                }
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: 5 }}
                                                                className="absolute bottom-full right-0 z-20 mb-3 flex w-36 items-center gap-3 rounded-xl border border-[#E7C9A5]/20 bg-[#201E1A] p-3 shadow-xl dark:border-[#B88A4B]/30 dark:bg-[#F8F2E6]"
                                                            >
                                                                <span className="text-[10px] text-stone-400 dark:text-[#75634E]">
                                                                    Volume
                                                                </span>

                                                                <input
                                                                    type="range"
                                                                    aria-label="Volume"
                                                                    min="0"
                                                                    max="100"
                                                                    value={volumeRange}
                                                                    onChange={handleVolumeChange}
                                                                    className="bookwise-range h-1.5 min-w-0 flex-1 cursor-pointer rounded-full"
                                                                    style={{
                                                                        background: `linear-gradient(to right, #E7C9A5 0%, #E7C9A5 ${volumeRange}%, #39352F ${volumeRange}%, #39352F 100%)`,
                                                                    }}
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                    <button
                                                        type="button"
                                                        aria-label={
                                                            isMuted || volumeRange === 0
                                                                ? "Unmute video"
                                                                : "Mute video"
                                                        }
                                                        disabled={!data.videoUrl}
                                                        onClick={toggleMute}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-[#A87938]/10"
                                                    >
                                                        <Image
                                                            src={
                                                                isMuted || volumeRange === 0
                                                                    ? imagesAddresses.icons.mute
                                                                    : imagesAddresses.icons.volume
                                                            }
                                                            alt=""
                                                            width={21}
                                                            height={21}
                                                            className="dark:block hidden"
                                                        />
                                                        <Image
                                                            src={
                                                                isMuted || volumeRange === 0
                                                                    ? imagesAddresses.icons.mute
                                                                    : imagesAddresses.icons.volume
                                                            }
                                                            alt=""
                                                            width={21}
                                                            height={21}
                                                            className="dark:hidden invert"
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        aria-label="Adjust volume"
                                                        disabled={!data.videoUrl}
                                                        onClick={() =>
                                                            setSoundAdjustment((previous) => !previous)
                                                        }
                                                        className={`rounded-lg px-2 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${soundAdjustment
                                                            ? "bg-[#E7C9A5]/15 text-[#E7C9A5] dark:bg-[#A87938]/15 dark:text-[#8B642D]"
                                                            : "text-stone-400 hover:bg-white/5 dark:text-[#75634E] dark:hover:bg-[#A87938]/10"
                                                            }`}
                                                    >
                                                        {volumeRange}%
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.section>

                                {/* Summary */}
                                <motion.section
                                    {...reveal}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex flex-col gap-2">
                                        <p className={sectionEyebrowClass}>
                                            A closer look
                                        </p>
                                        <h2 className={sectionTitleClass}>
                                            Summary
                                        </h2>
                                    </div>

                                    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#171614] p-5 dark:border-[#A87938]/15 dark:bg-[#FBF7EF] sm:p-7">
                                        <div
                                            aria-hidden="true"
                                            className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#E7C9A5] via-[#E7C9A5]/30 to-transparent dark:from-[#A87938] dark:via-[#A87938]/30"
                                        />

                                        {data.summary ? (
                                            <p className="whitespace-pre-line text-sm leading-7 text-[#D8CDBD] dark:text-[#40372B] sm:text-base sm:leading-8">
                                                {data.summary}
                                            </p>
                                        ) : (
                                            <p className={`text-sm leading-7 ${secondaryTextClass}`}>
                                                No summary is available for this book yet.
                                            </p>
                                        )}
                                    </div>
                                </motion.section>
                            </div>

                            {/* Sidebar */}
                            <aside className="flex min-w-0 flex-col gap-8">
                                {/* Similar books */}
                                <motion.section
                                    {...reveal}
                                    className="flex min-w-0 flex-col gap-4"
                                >
                                    <div className="flex flex-col gap-2">
                                        <p className={sectionEyebrowClass}>
                                            Keep exploring
                                        </p>
                                        <h2 className={sectionTitleClass}>
                                            Similar books
                                        </h2>
                                        <p className={`text-sm leading-6 ${secondaryTextClass}`}>
                                            More stories and ideas to discover.
                                        </p>
                                    </div>

                                    <div className="hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-3">
                                        {SIMILAR_BOOKS.map((num, index) => {
                                            const key =
                                                `book${num}` as keyof typeof imagesAddresses.images;

                                            return (
                                                <motion.div
                                                    key={num}
                                                    initial={
                                                        shouldReduceMotion
                                                            ? false
                                                            : { opacity: 0, y: 14 }
                                                    }
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: shouldReduceMotion ? 0 : 0.35,
                                                        delay: shouldReduceMotion ? 0 : index * 0.05,
                                                    }}
                                                    whileHover={
                                                        shouldReduceMotion
                                                            ? undefined
                                                            : { y: -4 }
                                                    }
                                                    className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#171614] p-2 transition-colors hover:border-[#E7C9A5]/35 dark:border-[#A87938]/15 dark:bg-[#FBF7EF] dark:hover:border-[#A87938]/40"
                                                >
                                                    <div className="-ml-10 overflow-hidden">
                                                        <Image
                                                            src={imagesAddresses.images[key]}
                                                            alt={`Similar book ${num}`}
                                                            width={200}
                                                            height={260}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    </div>

                                                    <div className="mt-2 flex items-center justify-center gap-1.5 py-1">
                                                        <span className="text-[10px] font-medium text-[#B8AA96] dark:text-[#75634E]">
                                                            Explore book
                                                        </span>
                                                        <span className="text-xs text-[#E7C9A5] dark:text-[#8B642D]">
                                                            ↗
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    <div className="w-full min-w-0 overflow-hidden md:hidden">
                                        <Swiper
                                            modules={[Autoplay]}
                                            autoplay={{
                                                delay: 2800,
                                                disableOnInteraction: false,
                                                pauseOnMouseEnter: true,
                                            }}
                                            loop={SIMILAR_BOOKS.length > 2}
                                            spaceBetween={12}
                                            slidesPerView="auto"
                                            speed={500}
                                            className="similar-books-swiper w-full"
                                        >
                                            {SIMILAR_BOOKS.map((num) => {
                                                const key =
                                                    `book${num}` as keyof typeof imagesAddresses.images;

                                                return (
                                                    <SwiperSlide
                                                        key={num}
                                                        className="!w-[140px] !shrink-0 sm:!w-[160px]"
                                                    >
                                                        <div className="w-full overflow-hidden rounded-xl border border-[#A87938]/20 bg-[#171614] p-2 dark:bg-[#FBF7EF]">
                                                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg -ml-4">
                                                                <Image
                                                                    src={imagesAddresses.images[key]}
                                                                    alt={`Similar book ${num}`}
                                                                    width={200}
                                                                    height={260}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>

                                                            <p className="mt-2 truncate text-center text-[10px] text-[#B8AA96] dark:text-[#75634E]">
                                                                Explore book ↗
                                                            </p>
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                    </div>
                                </motion.section>

                                {/* PDF */}
                                <motion.section
                                    {...reveal}
                                    className="flex min-w-0 flex-col gap-4"
                                >
                                    <div className="flex flex-col gap-2">
                                        <p className={sectionEyebrowClass}>
                                            Read at your own pace
                                        </p>
                                        <h2 className={sectionTitleClass}>
                                            Book PDF
                                        </h2>
                                    </div>

                                    <div className="min-w-0 overflow-hidden rounded-2xl border border-[#E7C9A5]/20 bg-gradient-to-br from-[#E7C9A5]/10 via-[#171614] to-[#171614] p-3 dark:border-[#A87938]/20 dark:from-[#A87938]/10 dark:via-[#FBF7EF] dark:to-[#FBF7EF] sm:p-5">
                                        <div className="mb-5 flex items-start gap-3">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E7C9A5]/20 bg-[#E7C9A5]/10 dark:border-[#A87938]/20 dark:bg-[#A87938]/10">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="h-6 w-6 text-[#E7C9A5] dark:text-[#8B642D]"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M7 3.75h7l5 5v11.5a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2.5 2.5 0 0 1 2-2.5Z"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M14 4v5h5M8 14h8M8 17h6"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="text-sm font-semibold leading-6 text-[#F8F2E6] dark:text-[#17130F]">
                                                    Read the full book
                                                </h3>
                                                <p className={`mt-1 text-xs leading-5 ${secondaryTextClass}`}>
                                                    Open the preview below and start reading.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="min-w-0">
                                            <FlipBookPreview />
                                        </div>
                                    </div>
                                </motion.section>
                            </aside>
                        </div>

                        {/* Reviews */}
                        <motion.section
                            {...reveal}
                            className="flex min-w-0 flex-col gap-5 border-t border-white/[0.08] pt-9 dark:border-[#17130F]/10 sm:pt-12"
                        >
                            <div className="flex flex-col items-center gap-2 text-center">
                                <p className={sectionEyebrowClass}>
                                    Your thoughts matter
                                </p>
                                <h2 className={sectionTitleClass}>
                                    Reader reviews
                                </h2>
                                <p className={`max-w-lg text-sm leading-6 ${secondaryTextClass}`}>
                                    Share your thoughts and see what other
                                    readers think about this book.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/[0.08] bg-[#171614] p-4 dark:border-[#A87938]/15 dark:bg-[#FBF7EF] sm:rounded-3xl sm:p-6 lg:p-8">
                                <BookReviews bookId={String(data.id)} />
                            </div>
                        </motion.section>
                    </>
                )}
            </div>

            <style jsx>{`
                .bookwise-range {
                    appearance: none;
                    -webkit-appearance: none;
                    outline: none;
                }

                .bookwise-range::-webkit-slider-thumb {
                    appearance: none;
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #e7c9a5;
                    border: 2px solid #171614;
                    box-shadow: 0 0 0 3px rgba(231, 201, 165, 0.12);
                    transition: transform 0.2s ease;
                }

                .bookwise-range::-moz-range-thumb {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #e7c9a5;
                    border: 2px solid #171614;
                    box-shadow: 0 0 0 3px rgba(231, 201, 165, 0.12);
                    transition: transform 0.2s ease;
                }

                .bookwise-range:hover::-webkit-slider-thumb {
                    transform: scale(1.2);
                }

                .bookwise-range:focus-visible::-webkit-slider-thumb {
                    box-shadow: 0 0 0 4px rgba(231, 201, 165, 0.25);
                }

                :global(.dark) .bookwise-range::-webkit-slider-thumb {
                    background: #a87938;
                    border-color: #fbf7ef;
                }

                :global(.dark) .bookwise-range::-moz-range-thumb {
                    background: #a87938;
                    border-color: #fbf7ef;
                }
            `}</style>
        </main>
    );
};

export default BookDetailPage;