'use client'

import { useState, useRef, useLayoutEffect, useEffect } from "react"
import HTMLFlipBook from "react-pageflip"
import { FlipPage } from "./FlipPage"
import CustomButton from "@/components/CustomButton"
import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import { motion } from "framer-motion"
import PdfPreviewModal from "@/components/PdfPreviewModal"
import * as pdfjsLib from "pdfjs-dist";
import showToast from "@/utils/toast"

const FlipBookPreview = () => {
  const [showOpenBook, setShowOpenBook] = useState(false)
  const [showPdfModal, setShowPdfModal] = useState(false)
  const flipBookRef = useRef<any>(null)

  const [bookWidth, setBookWidth] = useState(500)
  const [bookHeight, setBookHeight] = useState(700)
  const [isMobile, setIsMobile] = useState(false)

  const [isMdUp, setIsMdUp] = useState(false);
  const [pages, setPages] = useState<string[]>([]);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js";
  }, []);

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

const handleDownloadPdf = async () => {
  try {
    setLoading(true);

    await new Promise(res => setTimeout(res, 3000));

    showToast("PDF downloaded successfully", "success");
  } finally {
    setLoading(false);
  }
};

  const loadPdfAsImages = async (pdfUrl: string) => {
    setIsLoadingPdf(true);

    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const images: string[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const DPR = window.devicePixelRatio || 2;
        const scale =
          window.innerWidth < 768
            ? (bookWidth / baseViewport.width) * 2.8 * DPR
            : (bookWidth / baseViewport.width) * 3.2 * DPR;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const base64 = canvas
          .toDataURL("image/png")
          .replace("data:image/png;base64,", "");

        images.push(base64);
      }
      setPages(images);
    } catch (error) {
      console.error("PDF load error:", error);
    } finally {
      setIsLoadingPdf(false);
    }
  };

  const openBook = async () => {
    setShowOpenBook(true);

    if (pages.length === 0) {
      await loadPdfAsImages("/samplePdf.pdf");
    }
  };

  return (
    <>
      {
        showPdfModal &&
        <PdfPreviewModal
          setShowPdfModal={setShowPdfModal}
          pdfUrl="/pdf.pdf"
        />
      }

      <div className="flex flex-col items-center w-full mt-10 px-4 md:px-0">

        {/* Closed Book */}
        {!showOpenBook && (
          <div
            className="relative cursor-pointer mt-8"
            onClick={openBook}
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
                  pages.map((pageBase64, index) => (
                    <FlipPage
                      key={index}
                      number={index + 1}
                      imageSrc={pageBase64}
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
            text=""
            iconPosition="center"
            iconAddress={imagesAddresses.icons.eyeBlack}
            onClick={() => setShowPdfModal(true)}
            containerClassName="cursor-pointer dark:hidden"
          />
          <CustomButton
            color="yellow"
            text=""
            iconPosition="center"
            iconAddress={imagesAddresses.icons.eyeWhite}
            onClick={() => setShowPdfModal(true)}
            containerClassName="cursor-pointer dark:flex hidden"
          />
          <CustomButton
            color="yellow"
            text=""
            iconPosition="center"
            iconAddress={imagesAddresses.icons.save}
            onClick={handleDownloadPdf}
            containerClassName="cursor-pointer dark:hidden"
            loading={loading}
          />
          <CustomButton
            color="yellow"
            text=""
            iconPosition="center"
            iconAddress={imagesAddresses.icons.saveWhite}
            onClick={handleDownloadPdf}
            containerClassName="cursor-pointer dark:flex hidden"
            loading={loading}
          />
        </div>
      </div>
    </>
  )
}

export default FlipBookPreview
