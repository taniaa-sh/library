"use client"

import React from 'react'
import animationData from "../../public/lottie/loading.json";
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
    loading: () => null,
});

const LayoutLoading = () => {
    return (
        <div className="fixed inset-0 size-full bg-gray-500/50 flex flex-col items-center justify-center gap-4">
            <Lottie
                animationData={animationData}
                loop={true}
                reversed
                className={"size-[400px] sm:size-[600px]"}
            />
        </div>
    )
}

export default LayoutLoading