"use client"

import React from 'react'
import animationData from "../../../../public/lottie/supportLoading.json"
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
    loading: () => null,
});

const AdminLayoutLoading = () => {
    return (
        <div className="fixed inset-0 size-full flex flex-col items-center justify-center md:left-36">
            <Lottie
                animationData={animationData}
                loop={true}
                reversed
                className={"size-[100px] sm:size-[200px]"}
            />
            <p className='sm:!ml-12 -mt-6 text-sm md:text-lg'>Loading...</p>
        </div>
    )
}

export default AdminLayoutLoading