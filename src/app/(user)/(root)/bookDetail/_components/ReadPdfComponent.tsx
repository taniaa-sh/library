'use client'

import { useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import PdfModal from "./PdfModal"
import Image from "next/image"
import imagesAddresses from "@/utils/imageAddresses"
import CustomButton from "@/components/CustomButton"

const Document = dynamic(
    () => import('react-pdf').then(mod => mod.Document),
    { ssr: false }
)
const Page = dynamic(
    () => import('react-pdf').then(mod => mod.Page),
    { ssr: false }
)

const ReadPdfComponent = ({ pdfUrl }: { pdfUrl: string }) => {

    const [showOpenBook, setShowOpenBook] = useState(false)
    const [showPdfModal, setShowPdfModal] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [numPages, setNumPages] = useState<number | null>(null)

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }

    const nextPage = () => {
        if (pageNumber + 2 <= (numPages || 0)) setPageNumber(pageNumber + 2)
    }

    const prevPage = () => {
        if (pageNumber - 2 >= 1) setPageNumber(pageNumber - 2)
    }

    return (
        <>
            {showPdfModal && <PdfModal setShowPdfModal={setShowPdfModal} />}

            <div className="flex flex-col items-center w-full mt-10 px-4 md:px-0">

                {!showOpenBook && (
                    <div
                        className="relative cursor-pointer"
                        onClick={() => setShowOpenBook(true)}
                    >
                        <Image
                            src={imagesAddresses.icons.bookPdf}
                            alt="book"
                            width={200}
                            height={200}
                            className="transition-all duration-500 hover:scale-105 mx-auto w-60 h-60 md:w-75 md:h-75"
                        />

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
                                top-6 left-40 -translate-x-1/2 mt-2 md:mt-0
                            "
                        >
                            <motion.p whileHover={{ scale: 1.1 }}>Click</motion.p>
                            <motion.p whileHover={{ scale: 1.1 }}>here</motion.p>
                            <motion.p whileHover={{ scale: 1.1 }}>to read</motion.p>
                            <motion.p whileHover={{ scale: 1.1 }}>and</motion.p>
                            <motion.p whileHover={{ scale: 1.1 }}>download</motion.p>
                        </motion.div>
                    </div>
                )}

                {showOpenBook && (
                    <div className="flex flex-col items-center mt-10">
                        <div className="flex book-container">
                            <div className="page-left">
                                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                    {pageNumber <= (numPages || 0) && <Page pageNumber={pageNumber} width={260} />}
                                </Document>
                            </div>

                            <div className="spine"></div>

                            <div className="page-right">
                                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                    {pageNumber + 1 <= (numPages || 0) && <Page pageNumber={pageNumber + 1} width={260} />}
                                </Document>
                            </div>
                        </div>

                        <div className="flex mt-5 gap-4">
                            <CustomButton 
                                iconAddress={imagesAddresses.icons.backWhite}
                                iconPosition="right"
                                containerClassName="cursor-pointer hidden dark:block"
                                color="yellow"
                                text=""
                                onClick={prevPage}
                            />
                            <CustomButton
                                iconAddress={imagesAddresses.icons.back}
                                iconPosition="right"
                                containerClassName="cursor-pointer dark:hidden "
                                color="yellow"
                                text=""
                                onClick={prevPage}
                            />
                            <CustomButton
                                iconAddress={imagesAddresses.icons.nextWhite}
                                iconPosition="right"
                                containerClassName="cursor-pointer hidden dark:block"
                                color="yellow"
                                text=""
                                onClick={nextPage}
                            />
                            <CustomButton
                                iconAddress={imagesAddresses.icons.next}
                                iconPosition="right"
                                containerClassName="cursor-pointer dark:hidden"
                                color="yellow"
                                text=""
                                onClick={nextPage}
                            />
                        </div>
                    </div>
                )}
                <div className="flex gap-3 mt-14 self-end">
                    <CustomButton
                        containerClassName="cursor-pointer"
                        color="yellow"
                        text="See pdf"
                        onClick={() => { setShowPdfModal(true) }}
                    />
                    <CustomButton
                        containerClassName="cursor-pointer"
                        color="yellow"
                        text="Download pdf"
                        onClick={() => { }}
                    />
                </div>
            </div>
        </>
    )
}

export default ReadPdfComponent
