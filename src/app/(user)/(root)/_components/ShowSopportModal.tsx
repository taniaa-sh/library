"use client"

import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import { useEffect, useState } from "react"
import SupportModal from "./SupportModal"

const ShowSopportModal = () => {
    const [showModal, setShowModal] = useState(false)
    const [bottomOffset, setBottomOffset] = useState(32)

    useEffect(() => {
        const footer = document.querySelector("footer")
        if (!footer) return

        const updatePosition = () => {
            const rect = footer.getBoundingClientRect()
            if (rect.top < window.innerHeight) {
                setBottomOffset(window.innerHeight - rect.top + 16)
            } else {
                setBottomOffset(32)
            }
        }

        updatePosition()

        const handleScroll = () => requestAnimationFrame(updatePosition)
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            {showModal && <SupportModal setShowSopportModal={setShowModal} />}
            <div
                className="cursor-pointer bg-gold100 rounded-full p-2 size-14 flex items-center justify-center animate-supportPop !z-[1000] shadow-2xl border-2 border-gold200 transition-all duration-300"
                style={{
                    position: "fixed",
                    left: "1.5rem",
                    bottom: `${bottomOffset}px`,
                }}
                onClick={() => setShowModal(!showModal)}
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