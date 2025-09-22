"use client"

import BookFeature from "@/components/BookFeature";
import imagesAddresses from "@/utils/imageAddresses";
import { BookFeatureProps } from "@/utils/type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

    const [showForwardTitle, setShowForwardTitle] = useState<boolean>(false);
    const [showBackwardTitle, setShowBackwardTitle] = useState<boolean>(false);
    const [showPauseTitle, setShowPauseTitle] = useState<boolean>(false);
    const [showPlayTitle, setShowPlayTitle] = useState<boolean>(false);
    const [soundAdjustment, setSoundAdjustment] = useState<boolean>(false);

    useEffect(() => {
        fetch("/data/educationalVideoData.json")
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

    const togglePlay = () => {
        setSoundAdjustment(false)
        if (isPlaying) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setSoundAdjustment(false)
        videoRef.current!.muted = !isMuted;
        setIsMuted(!isMuted);
        setSoundAdjustment(false);
    };

    const handleTimeUpdate = () => {
        const current = videoRef.current?.currentTime ?? 0;
        const total = videoRef.current?.duration ?? 0;

        setCurrentTime(current);
        setDuration(total);

        if (total > 0) {
            setProgress((current / total) * 100);
        } else {
            setProgress(0);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSoundAdjustment(false)
        const value = Number(e.target.value);
        videoRef.current!.currentTime = (value / 100) * videoRef.current!.duration;
        setProgress(value);
    };

    const handleForward = () => {
        setSoundAdjustment(false)
        videoRef.current!.currentTime += 5;
    };

    const handleBackward = () => {
        setSoundAdjustment(false)
        videoRef.current!.currentTime -= 5;
    };

    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        videoRef.current!.volume = value / 100;
        setVolumeRange(value);
    }

    useEffect(() => {
        fetch('/data/data.json')
            .then((res) => {
                if (!res.ok) throw new Error('فایل پیدا نشد یا خطای سرور');
                return res.json();
            })
            .then((json: BookFeatureProps[]) => {
                const selected = json.find(item => item.id === id);
                setData(selected || null);
            })
            .catch((err) => console.error('خطا در دریافت JSON:', err));
    }, [id]);

    return (
        <div className="my-20 flex flex-col gap-10">
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
            <div className="flex mt-20 gap-40">
                <div className="w-[645px] flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold text-3xl text-light-100">Video</p>
                        <div className="relative w-full max-w-3xl mx-auto rounded-lg shadow-lg group z-10 overflow-x-hidden">
                            <div className="w-full rounded-lg overflow-hidden h-1/2 max-h-96 relative border rounded-b-none border-b-0 border-gray-500">
                                <video
                                    ref={videoRef}
                                    src={data?.videoUrl}
                                    // poster={data?.coverUrl}
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
                                    className="w-full h-auto object-contain rounded-lg rounded-b-none"
                                />

                                {!isPlaying && (
                                    <div
                                        onClick={togglePlay}
                                        className="absolute inset-0 flex items-center justify-center transition select-none custom-cursor-pointer"
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

                            {/* Mobile NavBar */}
                            <div className="flex flex-col bg-gray-600 p-4 items-center gap-5 transition rounded-b-lg">

                                <div className="w-full flex items-center gap-2 flex-1 z-50 select-none">
                                    {/* Total Time */}
                                    <span className="text-sm text-gray900">{formatTime(currentTime)}</span>

                                    {/* Progress bar */}
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={progress}
                                        onChange={handleSeek}
                                        className="custom-range flex-1 h-1 bg-gray300 rounded-lg cursor-pointer scroll-blue"
                                        style={{
                                            background: `linear-gradient(to right, #175CD3 0%, #175CD3 ${progress}%, #ddd ${progress}%, #ddd 100%)`
                                        }}
                                    />

                                    {/* Current Time */}
                                    <span className="text-sm text-gray900">{formatTime(duration)}</span>

                                </div>

                                <div className="flex items-center justify-between w-full select-none">

                                    {/* Play/Pause */}
                                    <div className="flex items-center gap-2 cursor-pointer z-50">
                                        <div
                                            className="relative"
                                        >
                                            <Image
                                                src={imagesAddresses.icons.forward}
                                                alt="play"
                                                width={20}
                                                height={20}
                                                onClick={handleBackward}
                                            />
                                        </div>
                                        <div onClick={togglePlay}>
                                            {isPlaying ? (
                                                <div
                                                    className="cursor-pointer"
                                                >
                                                    <Image
                                                        src={imagesAddresses.icons.pause}
                                                        alt="pause"
                                                        width={16}
                                                        height={16}
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    className="cursor-pointer"
                                                >
                                                    <Image
                                                        src={imagesAddresses.icons.play}
                                                        alt="play"
                                                        width={20}
                                                        height={20}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Image
                                                src={imagesAddresses.icons.backward}
                                                alt="play"
                                                width={24}
                                                height={24}
                                                onClick={handleForward}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 z-50">
                                        {/* Volume Section */}
                                        <div className="relative">
                                            {(isMuted || volumeRange === 0) ? (
                                                <Image
                                                    src={imagesAddresses.icons.mute}
                                                    alt="mute"
                                                    width={20}
                                                    height={20}
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setIsMuted(false);
                                                        if (volumeRange === 0) setVolumeRange(50);
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    className="cursor-pointer relative"
                                                    onClick={() => {
                                                        setSoundAdjustment(!soundAdjustment)
                                                    }}
                                                >
                                                    <Image
                                                        src={imagesAddresses.icons.volume}
                                                        alt="volume"
                                                        width={20}
                                                        height={20}
                                                        className="cursor-pointer z-50"
                                                    />

                                                    {soundAdjustment && (
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            value={volumeRange}
                                                            onChange={(e) => {
                                                                handleVolumeChange(e);
                                                                if (e.target.value === "0") {
                                                                    setIsMuted(true);
                                                                } else {
                                                                    setIsMuted(false);
                                                                }
                                                            }}
                                                            onBlur={() => setSoundAdjustment(false)}
                                                            className="absolute accent-brand600 rotate-[90deg] bottom-[52px] -right-7 w-20 text-gray700 p-2 rounded text-xs shadow-lg z-50 cursor-pointer"
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {soundAdjustment && (
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setSoundAdjustment(false)}
                                    />
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold text-3xl text-light-100">Summary</p>
                        <div className="flex flex-col gap-2">
                            <p className="font-normal text-xl leading-8 text-light-100">
                                People in Glass Houses by Jayne Castle (a pseudonym for Jayne Ann Krentz) is a science fiction romance set in a future world where people with psychic abilities live in harmony with advanced technology. The story follows the main characters, Harriet and Sam, who are drawn together under unusual circumstances.
                            </p>
                            <p className="font-normal text-xl leading-8 text-light-100">
                                Harriet, a talented psychic, works for a company that offers psychic services in a futuristic society. When she finds herself tangled in a dangerous situation involving a mysterious conspiracy, she enlists the help of Sam, a former investigator with a dark past. As they uncover the secrets surrounding a glass house—a mysterious structure tied to their investigation—they must navigate their growing attraction while facing hidden dangers.
                            </p>
                            <p className="font-normal text-xl leading-8 text-light-100">
                                {
                                    `The novel combines elements of mystery, suspense, and romance, with a focus on psychic abilities, futuristic technology, and the complexities of relationships. The title, "People in Glass Houses," symbolizes the fragile nature of the world the characters inhabit and the vulnerabilities they face in their personal and professional lives.`
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-semibold text-3xl text-light-100">More similar books</p>
                    <Image
                        src={data?.coverUrl || ''}
                        alt="book"
                        width={200}
                        height={200}
                        className="-ml-12"
                    />
                </div>
            </div>
        </div>
    )
}

export default BookDetailPage