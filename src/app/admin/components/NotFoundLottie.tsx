"use client";

import React from "react";
import dynamic from "next/dynamic";
import animationData from "../../../../public/lottie/404Error(4).json";
import Link from "next/link";
import SiteUrls from "@/utils/routs";
import AdminButton from "./AdminButton";

const Lottie = dynamic(() => import("lottie-react"), {
    ssr: false,
    loading: () => null,
});

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md flex flex-col items-center">
                <Lottie
                    animationData={animationData}
                    loop
                    className="w-96 h-96 sm:w-[500px] sm:h-[500px]"
                />
                <div className="flex flex-col items-center text-center !-mt-4">
                    {/* <h1 className="text-6xl sm:text-7xl font-bold text-blue-900 drop-shadow-md">
                        404
                    </h1> */}
                    <p className="text-2xl sm:text-3xl font-semibold text-blue-800 mt-2 drop-shadow-sm">
                        Oops! Page Not Found
                    </p>
                    <p className="mt-4 text-blue-700/80">
                        Sorry, the page you are looking for does not exist.
                    </p>
                    <Link href={SiteUrls.admin}>
                        <AdminButton
                            text="Back to Home"
                            color="white"
                            containerClassName="!text-blue-600 px-6 py-3 mt-6 font-bold hover:bg-blue-50 transition-all cursor-pointer"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
