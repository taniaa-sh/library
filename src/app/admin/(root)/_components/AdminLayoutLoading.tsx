"use client";

import React, { useEffect, useState } from "react";
import animationData from "../../../../../public/lottie/supportLoading.json";
import dynamic from "next/dynamic";
import fallbackGif from "../../../../../public/gif/LoadingAnimationBlue.gif";

const Lottie = dynamic(() => import("lottie-react"), {
    ssr: false,
    loading: () => null,
});

const AdminLayoutLoading = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center md:left-[90px] dark:bg-black/95">
            {isClient ? (
                <Lottie
                    animationData={animationData}
                    loop={true}
                    className="w-[100px] sm:w-[200px]"
                />
            ) : (
                <img
                    src={fallbackGif.src}
                    alt="Loading..."
                    className="w-[100px] sm:w-[200px]"
                />
            )}
            <p className="sm:!ml-12  text-sm md:text-lg dark:text-white">Loading...</p>
        </div>
    );
};

export default AdminLayoutLoading;