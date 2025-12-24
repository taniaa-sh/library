'use client'

import { useState, useRef, useLayoutEffect } from "react"
import HTMLFlipBook from "react-pageflip"
import { FlipPage } from "./FlipPage"
import CustomButton from "@/components/CustomButton"
import PdfModal from "./PdfModal"
import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import { motion } from "framer-motion"

const FlipBookPreview = () => {
  const [showOpenBook, setShowOpenBook] = useState(false)
  const [showPdfModal, setShowPdfModal] = useState(false)
  const flipBookRef = useRef<any>(null)

  const [bookWidth, setBookWidth] = useState(500)
  const [bookHeight, setBookHeight] = useState(700)
  const [isMobile, setIsMobile] = useState(false)

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

  const goPrevPage = () => {
    flipBookRef.current?.flipPrev()
  }

  const goNextPage = () => {
    flipBookRef.current?.flipNext()
  }

  return (
    <>
      {
        showPdfModal &&
        <PdfModal
          setShowPdfModal={setShowPdfModal}
        />}

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
                whileHover={{
                  scale: 1.08,
                  textShadow: "0px 0px 12px rgba(255,255,255,0.9)",
                  boxShadow: "0px 0px 20px rgba(14, 165, 233, 0.6)",
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-white text-center text-lg font-semibold space-y-1 px-4 py-3 rounded-xl backdrop-blur-md shadow-lg shadow-purple-500/40 z-20"
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
                <FlipPage number={1} />
                <FlipPage number={2} />
                <FlipPage number={3} />
                <FlipPage number={4} />
                <FlipPage number={5} />
                <FlipPage number={6} />
              </HTMLFlipBook>
            </div>
            <div className="flex mt-6 gap-4 flex-wrap justify-center">
              <CustomButton
                color="yellow"
                text="Prev"
                onClick={goPrevPage}
              />
              <CustomButton
                color="yellow"
                text="Next"
                onClick={goNextPage}
              />
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-14 self-end flex-wrap">
          <CustomButton
            color="yellow"
            text="See pdf"
            onClick={() => setShowPdfModal(true)}
          />
          <CustomButton
            color="yellow"
            text="Download pdf"
            onClick={() => { }}
          />
        </div>
      </div>
    </>
  )
}

export default FlipBookPreview
