"use client";

import React, { useEffect, useState } from 'react'
import animationData from "../../public/lottie/loading.json";
import dynamic from 'next/dynamic';
import fallbackGif from "../../public/gif/loading.gif";

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
        <div className="fixed inset-0 size-full  flex flex-col items-center justify-center gap-4">
            {isClient ? (
                <Lottie
                    animationData={animationData}
                    loop={true}
                    reversed
                    className={"size-[400px] sm:size-[600px]"}
                />
            ) : (
                <div className='flex flex-col gap-2'>
                    <img
                        src={fallbackGif.src}
                        alt="Loading..."
                        className="w-[400px] sm:w-[600px]"
                    />
                </div>
            )}

        </div>
    );
};

export default AdminLayoutLoading;