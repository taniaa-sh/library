"use client"

import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import { useState } from "react"

const ReadPdfComponent = () => {

    const [showOpenBook, setShowOpenBook] = useState<boolean>(false)

    return (
        <>
            <div
                className={`relative inline-block mt-6 cursor-pointer`}
                onClick={() => setShowOpenBook(true)}
            >
                <Image
                    src={imagesAddresses.icons.bookPdf}
                    alt="book"
                    width={300}
                    height={300}
                    className={` ${showOpenBook ? "hidden" : "flex"}`}
                />
                <div className={`absolute top-30 left-25 flex flex-col gap-2 items-center justify-center text-white text-center px-2 z space-y-2 text-2xl  ${showOpenBook ? "hidden" : "flex"}`}>
                    <p>Click</p>
                    <p>here</p>
                    <p>to read</p>
                    <p>and</p>
                    <p>download</p>
                </div>
            </div>

            {
                showOpenBook && (
                    <div className="flex mt-10 justify-center items-center book-container">

                        <div
                            className="page-left"
                            contentEditable
                        >
                           لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایان طراحانتاوردهای اصلی، و جوابگوی سوالات پیود طراحی اساسا مورد استفاده قرار گیرد.
                        </div>
                        <div className="spine"></div>
                        <div
                            className="page-right"
                            contentEditable
                        >
                           لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان
                        </div>

                    </div>
                )}
        </>
    )
}

export default ReadPdfComponent
