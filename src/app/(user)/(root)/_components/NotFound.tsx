"use client";

import { useState } from "react";
import Image from "next/image";
import imagesAddresses from "@/utils/imageAddresses";
import Lottie from "lottie-react";
import animationData from "../../../../../public/lottie/Book.json";
import animationData1 from "../../../../../public/lottie/Lonely 404.json";
import { Admin } from "mongodb";
import AdminButton from "@/app/admin/(root)/_components/AdminButton";
import { Button } from "@mui/material";

export default function RootNotFound() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [radius, setRadius] = useState(700);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { innerWidth, innerHeight } = window;
        const centerX = innerWidth / 2;
        const centerY = innerHeight / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const normalized = distance / maxDistance;

        const newRadius = 2000 - (2000 - 700) * normalized;

        setMousePos({ x: e.clientX, y: e.clientY });
        setRadius(newRadius);
    };

    return (
        <>

            <div className="min-h-screen hidden dark:flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md flex flex-col items-center">
                    <Lottie
                        animationData={animationData1}
                        loop
                        className="w-60 h-60 sm:w-[400px] sm:h-[200px]"
                    />
                    <Lottie
                        animationData={animationData}
                        loop
                        className="w-60 h-60 sm:w-[400px] sm:h-[300px] -mt-20"
                    />
                    <div className="flex flex-col items-center text-center !-mt-4">
                        <div className="flex flex-col items-center justify-center gap-2">

                            <p className="text-sm md:text-xl text-gray-900 !-mt-4">
                                Hmmm, the page you were looking for doesnt seem to exist anymore.
                            </p>
                        </div>
                        <Button
                            className="!bg-[#d8b79c] !text-black !mt-6 hover:!bg-[#d8b79c]/80"
                            onClick={() => window.location.href = "/"}
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className="relative w-full h-screen custom-cursor-pointer dark:hidden"
                onMouseMove={handleMouseMove}
            >
                {/* Background image */}
                <Image
                    src={imagesAddresses.images.notFoundBg}
                    alt="weather"
                    fill
                    className="object-cover"
                />

                {/* Black overlay with circular transparent spot */}
                <div
                    className="hidden sm:block absolute inset-0 bg-black pointer-events-none notFound-Black-overlay"
                    style={{
                        maskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%)`,
                        WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%)`,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        transition: "mask-image 0.2s ease, -webkit-mask-image 0.2s ease",
                    }}
                />

                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col gap-6  items-center justify-center px-4 sm:px-10 lg:px-[100px] py-12 sm:py-20 lg:py-[100px] overflow-x-hidden text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="notfound">
                            <span>P</span>
                            <span>a</span>
                            <span className="disable">g</span>
                            <span className="blink">e</span>
                            <span>&nbsp;</span>
                            <span>n</span>
                            <span className="blink">o</span>
                            <span>t</span>
                            <span>&nbsp;</span>
                            <span>f</span>
                            <span className="ghost">o</span>
                            <span className="disable">u</span>
                            <span className="blink">n</span>
                            <span>d</span>
                        </div>

                        <p className="text-sm md:text-xl text-white mt-2">
                            Hmmm, the page you were looking for doesnt seem to exist anymore.
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.href = "/"}
                        className="bg-white text-black px-4 py-2 flex justify-center items-center  rounded-lg mt-4 cursor-pointerr"
                    >
                        Back to home
                    </button>
                </div>
            </div>
        </>
    );
}
