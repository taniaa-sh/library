'use client'

import { useState, useRef, useLayoutEffect, useEffect } from "react"
import HTMLFlipBook from "react-pageflip"
import { FlipPage } from "./FlipPage"
import CustomButton from "@/components/CustomButton"
import PdfModal from "./PdfModal"
import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import { motion } from "framer-motion"
import PdfPreviewModal from "@/components/PdfPreviewModal"

const FlipBookPreview = () => {
  const [showOpenBook, setShowOpenBook] = useState(false)
  const [showPdfModal, setShowPdfModal] = useState(false)
  const flipBookRef = useRef<any>(null)

  const [bookWidth, setBookWidth] = useState(500)
  const [bookHeight, setBookHeight] = useState(700)
  const [isMobile, setIsMobile] = useState(false)

  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMdUp(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useLayoutEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      if (mobile) {
        const width = Math.min(window.innerWidth * 0.9, 380)
        setBookWidth(width)
        setBookHeight(width * 1.4)
      } else {
        const width = Math.min(window.innerWidth * 0.8, 700)
        setBookWidth(width)
        setBookHeight(width * 1.4)
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const goNextPage = () => {
    flipBookRef.current?.pageFlip().flipNext();
  }

  const goPrevPage = () => {
    flipBookRef.current?.pageFlip().flipPrev();
  }

  const handleDownloadPdf = () => {
    //todo
  }

  return (
    <>
      {
        showPdfModal &&
        <PdfPreviewModal
          setShowPdfModal={setShowPdfModal}
          pdfUrl=""
        />
        }

      <div className="flex flex-col items-center w-full mt-10 px-4 md:px-0">

        {/* Closed Book */}
        {!showOpenBook && (
          <div
            className="relative cursor-pointer mt-8"
            onClick={() => setShowOpenBook(true)}
          >
            <div className="relative w-60 h-60 md:w-75 md:h-75 mx-auto">
              <Image
                src={imagesAddresses.icons.bookPdf}
                alt="book"
                fill
                className="object-contain transition-all duration-500 hover:scale-105"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                whileHover={
                  isMdUp
                    ? {
                      scale: 1.08,
                      textShadow: "0px 0px 12px rgba(255,255,255,0.9)",
                      boxShadow: "0px 0px 20px rgba(14, 165, 233,0.6)",
                    }
                    : {}
                }
                className={`flex flex-col items-center justify-center text-white text-center text-lg font-semibold space-y-1 px-4 py-3 rounded-xl absolute inset-0  ${isMdUp ? "backdrop-blur-md shadow-lg shadow-purple-500/40 z-20" : ""}`}
              >
                <motion.p whileHover={{ scale: 1.1 }}>Click</motion.p>
                <motion.p whileHover={{ scale: 1.1 }}>here</motion.p>
                <motion.p whileHover={{ scale: 1.1 }}>to read</motion.p>
                <motion.p whileHover={{ scale: 1.1 }}>and</motion.p>
                <motion.p whileHover={{ scale: 1.1 }}>download</motion.p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Open Book */}
        {showOpenBook && (
          <div className="flex flex-col items-center mt-10 w-full">
            <div className="max-w-[680px] w-full flex justify-center overflow-hidden">
              <HTMLFlipBook
                key={isMobile ? "mobile" : "desktop"}
                ref={flipBookRef as any}
                width={bookWidth}
                height={bookHeight}
                size={isMobile ? "fixed" : "stretch"}
                autoSize={!isMobile}
                usePortrait={isMobile}
                showCover={isMobile}
                drawShadow={!isMobile}
                showPageCorners={!isMobile}
                clickEventForward
                swipeDistance={30}
                mobileScrollSupport
                style={{}}
                startPage={0}
                minWidth={0}
                maxWidth={0}
                minHeight={0}
                maxHeight={0}
                maxShadowOpacity={0.5}
                flippingTime={700}
                startZIndex={0}
                useMouseEvents={true}
                disableFlipByClick={false}
                className="!shadow-2xl"
              >
                {
                  [1, 2, 3, 4, 5]?.map((item, index) => (
                    <FlipPage
                      key={index}
                      number={1}
                      imageSrc="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"
                    />
                  ))
                }
              </HTMLFlipBook>
            </div>
            <div className="flex mt-6 gap-4 flex-wrap justify-center">
              <CustomButton
                color="yellow"
                text=""
                iconAddress={imagesAddresses.icons.back}
                iconPosition="center"
                onClick={goPrevPage}
                containerClassName="cursor-pointer dark:hidden"
              />
              <CustomButton
                color="yellow"
                text=""
                iconAddress={imagesAddresses.icons.backWhite}
                iconPosition="center"
                onClick={goPrevPage}
                containerClassName="cursor-pointer hidden dark:block"
              />
              <CustomButton
                color="yellow"
                text=""
                iconAddress={imagesAddresses.icons.next}
                iconPosition="center"
                onClick={goNextPage}
                containerClassName="cursor-pointer dark:hidden"
              />
              <CustomButton
                color="yellow"
                text=""
                iconAddress={imagesAddresses.icons.nextWhite}
                iconPosition="center"
                onClick={goNextPage}
                containerClassName="cursor-pointer dark:block hidden"
              />
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-14 self-end flex-wrap">
          <CustomButton
            color="yellow"
            text="See pdf"
            onClick={() => setShowPdfModal(true)}
            containerClassName="cursor-pointer"
          />
          <CustomButton
            color="yellow"
            text=""
            iconPosition="center"
            iconAddress={imagesAddresses.icons.save}
            onClick={handleDownloadPdf}
            containerClassName="cursor-pointer dark:hidden"
          />
          <CustomButton
            color="yellow"
            text=""
            iconPosition="center"
            iconAddress={imagesAddresses.icons.saveWhite}
            onClick={handleDownloadPdf}
            containerClassName="cursor-pointer dark:flex hidden"
          />
        </div>
      </div>
    </>
  )
}

export default FlipBookPreview
