"use client";

import Image from "next/image";
import { useState } from "react";
import SupportModal from "./SupportModal";
import imagesAddresses from "@/utils/imageAddresses";

const ShowSopportModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <SupportModal setShowSopportModal={setShowModal} />
            )}

            <button
                type="button"
                className="fixed bottom-8 right-6 z-[1000] flex size-14 items-center justify-center rounded-full border-2 border-gold200 bg-gold100 p-2 shadow-2xl transition-all duration-300 hover:scale-110 animate-supportPop"
                onClick={() => setShowModal((prev) => !prev)}
                title="Click for assistance"
                aria-label="Open support"
            >
                <Image
                    src={imagesAddresses.icons.support}
                    alt=""
                    width={36}
                    height={36}
                />
            </button>
        </>
    );
};

export default ShowSopportModal;