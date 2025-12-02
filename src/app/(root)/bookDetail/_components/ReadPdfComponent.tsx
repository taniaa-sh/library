"use client"

import AdminButton from "@/app/admin/components/AdminButton"
import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import { useState } from "react"
import PdfModal from "./PdfModal"
import { motion } from "framer-motion";

const ReadPdfComponent = () => {

    const [showOpenBook, setShowOpenBook] = useState<boolean>(false)
    const [showPdfModal, setShowPdfModal] = useState<boolean>(false)

    return (
        <>
            {showPdfModal && (
                <PdfModal setShowPdfModal={setShowPdfModal} />
            )}

            <div className="flex flex-col items-center w-full mt-10 px-4 md:px-0">

                {
                    !showOpenBook && (
                        <div
                            className="relative cursor-pointer"
                            onClick={() => setShowOpenBook(true)}
                        >
                            <Image
                                src={imagesAddresses.icons.bookPdf}
                                alt="book"
                                width={200}
                                height={200}
                                className="transition-all duration-500 hover:scale-105 mx-auto w-[240px] h-[240px] md:w-[300px] md:h-[300px]"
                            />

                            {!showOpenBook && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    whileHover={{
                                        scale: 1.08,
                                        y: -5,
                                        textShadow: "0px 0px 12px rgba(255,255,255,0.9)",
                                        boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.6)",
                                    }}
                                    className="
                                flex flex-col items-center text-white 
                                text-center text-lg font-semibold z-20 
                                space-y-1 px-4 py-3 rounded-xl
                                backdrop-blur-md bg-white/10 
                                shadow-lg shadow-purple-500/40
                                absolute md:top-15 md:left-25 md:-translate-x-1/2
                                top-6 left-17 -translate-x-1/2 mt-2 md:mt-0
                            "
                                >
                                    <motion.p whileHover={{ scale: 1.1 }}>Click</motion.p>
                                    <motion.p whileHover={{ scale: 1.1 }}>here</motion.p>
                                    <motion.p whileHover={{ scale: 1.1 }}>to read</motion.p>
                                    <motion.p whileHover={{ scale: 1.1 }}>and</motion.p>
                                    <motion.p whileHover={{ scale: 1.1 }}>download</motion.p>
                                </motion.div>
                            )}
                        </div>
                    )
                }

                {showOpenBook && (
                    <>
                        <div className="mt-10 justify-center items-center book-container hidden md:flex">
                            <div className="page-left" contentEditable ></div>
                            <div className="spine"></div>
                            <div className="page-right" contentEditable ></div>
                        </div>
                        <div className="flex gap-3 mt-14 self-start">
                            <AdminButton
                                containerClassName="cursor-pointer"
                                color="yellow"
                                text="See pdf"
                                onClick={() => { setShowPdfModal(true) }}
                            />
                            <AdminButton
                                containerClassName="cursor-pointer"
                                color="yellow"
                                text="Download pdf"
                                onClick={() => { }}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default ReadPdfComponent
