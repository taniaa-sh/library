"use client"

import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import { useState } from "react"
import SupportModal from "./SupportModal"

const ShowSopportModal = () => {

    const [ShowSopportModal, setShowSopportModal] = useState<boolean>(false)

    return (
        <>
            {
                ShowSopportModal && (
                    <SupportModal setShowSopportModal={setShowSopportModal} />
                )
            }
            <div
                className="fixed bottom-8 left-6 md:right-60 cursor-pointer bg-gold100 rounded-full p-2 size-14 flex items-center justify-center animate-supportPop !z-[1000]"
                onClick={() => setShowSopportModal(!ShowSopportModal)}
                title="Click for assistance"
            >
                <Image
                    src={imagesAddresses.icons.support}
                    alt="support"
                    width={36}
                    height={36}
                />
            </div>
        </>
    )
}

export default ShowSopportModal