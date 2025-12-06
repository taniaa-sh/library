import Image from "next/image"
import { Button } from "../../../../components/ui/button"
import imagesAddresses from "@/utils/imageAddresses"
import { toast } from "sonner"

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

const BookFeature = ({
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
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-20 pt-30">
            <div className="flex flex-col max-w-[700px] gap-5 px-4 md:px-0 text-center md:text-left">
                <p className="text-white dark:text-gray-900 font-semibold text-3xl md:text-5xl lg:text-7xl">{title}</p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center md:justify-start">
                    <p className="text-light-100 dark:text-gray-700">
                        By <span className="text-gold-100 dark:text-gold-500 font-semibold">{author}</span>
                    </p>
                    <p className="text-light-100 dark:text-gray-700">
                        Category: <span className="text-gold-100 dark:text-gold-500 font-semibold">{Genre}</span>
                    </p>
                    <div className="flex items-center justify-center gap-1">
                        <Image
                            src={imagesAddresses.icons.stare}
                            alt="star"
                            width={18}
                            height={18}
                        />
                        <p className="text-gold-100  dark:text-gold-500 font-semibold">
                            {rating} <span className="text-light-100 dark:text-gray-700 font-normal">/5</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center md:justify-start">
                    <p className="text-light-100 dark:text-gray-700">
                        Total books: <span className="text-gold-100 dark:text-gold-500 font-semibold">{totalBooks}</span>
                    </p>
                    <p className="text-light-100 dark:text-gray-700">
                        Available books: <span className="text-gold-100 dark:text-gold-500 font-semibold">{availableBooks}</span>
                    </p>
                </div>

                <p className="text-light-100 dark:text-gray-700 text-sm md:text-lg leading-6 md:leading-8">{description}</p>

                <Button
                    onClick={() => toast.success("Book request sent successfully")}
                    className="w-fit self-center md:self-start px-6 mt-6 md:mt-8 cursor-pointer"
                >
                    <Image
                        src={imagesAddresses.icons.bookIcon}
                        alt="book"
                        width={20}
                        height={20}
                        className="dark:hidden"
                    />
                         <Image
                        src={imagesAddresses.icons.bookIconWhite}
                        alt="book"
                        width={20}
                        height={20}
                        className="hidden dark:block"
                    />
                    Borrow Book Request
                </Button>
            </div>

            <div className="flex justify-center relative lg:right-40 right-10">
                <Image
                    src={bookImg}
                    alt="book"
                    width={250}
                    height={280}
                    className="z-10 relative w-[250px] h-[280px] md:w-[300px] md:h-[340px] object-contain"
                />
                <Image
                    src={bookImg}
                    alt="book"
                    width={250}
                    height={280}
                    className="absolute -right-10 top-3 rotate-[15deg] z-0 opacity-70 blur-sm w-[250px] h-[280px] md:w-[300px] md:h-[340px] object-contain"
                    style={{ filter: "blur(6px)" }}
                />
            </div>
        </div>
    )
}

export default BookFeature