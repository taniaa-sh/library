import Image from "next/image"
import { Button } from "./ui/button"
import imagesAddresses from "@/utils/imageAddresses"

interface PropsType {
    title: string
    Genre: string
    author: string
    rating: number
    description: string
    bookImg: string
    totalBooks: number
    availableBooks: number
}

const BookFeature = (
    {
        title,
        Genre,
        author,
        rating,
        description,
        bookImg,
        totalBooks,
        availableBooks,

    }: PropsType) => {

    return (
        <div className="w-full flex">
            <div className="flex flex-col gap-8 w-[645px]">
                <div className="flex flex-col gap-3">
                    <p className="text-white font-semibold text-7xl">{title}</p>
                    <div className="w-full flex gap-12">
                        <p className="text-light-100 font-normal text-x leading-7">By <span className="text-light-200 font-semibold text-xl leading-7">{author}</span></p>
                        <p className="text-light-100 font-normal text-x leading-7">Category: <span className="text-light-200 font-semibold text-xl leading-7">{Genre}</span></p>
                        <div className="flex gap-1">
                            <Image
                                src={imagesAddresses.icons.stare}
                                alt="star"
                                width={22}
                                height={22}
                            />
                            <p className="text-light-200 font-semibold text-xl leading-7">{rating} <span className="text-light-100 font-normal text-xl leading-7">/5</span></p>
                        </div>
                    </div>
                    <div className="w-full flex gap-8">
                        <p className="text-light-100 font-normal text-x leading-7">Total books: <span className="text-light-200 font-semibold text-xl leading-7">{totalBooks}</span></p>
                        <p className="text-light-100 font-normal text-x leading-7">Available books: <span className="text-light-200 font-semibold text-xl leading-7">{availableBooks}</span></p>
                    </div>
                    <p className="text-light-100 font-normal text-xl leading-8">{description}</p>
                </div>
                <Button className="w-fit px-6">
                    <Image
                        src={imagesAddresses.icons.bookIcon}
                        alt="book"
                        width={20}
                        height={20}
                    />
                    Borrow Book Request
                </Button>
            </div>
            <div className="flex">
                <Image
                    src={bookImg}
                    alt="book"
                    width={300}
                    height={384}
                    className="z-10 relative -right-28"
                />
                <Image
                    src={bookImg}
                    alt="book"
                    width={300}
                    height={384}
                    className="relative top-7 rotate-[18deg] z-0 opacity-90"
                    style={{ filter: "blur(6px)" }}
                />
            </div>
        </div>
    )
}

export default BookFeature