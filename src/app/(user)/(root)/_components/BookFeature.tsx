"use client"

import Image from "next/image"
import imagesAddresses from "@/utils/imageAddresses"
import CustomButton from "@/components/CustomButton"
import { motion, Variants } from "framer-motion"

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

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
        <motion.div
            className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-20 pt-30"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Left Content */}
            <motion.div
                className="flex flex-col max-w-[700px] gap-5 px-4 md:px-0 text-center md:text-left"
                variants={itemVariants}
            >
                <motion.p
                    className="text-white dark:text-gray-900 font-semibold text-3xl md:text-5xl lg:text-7xl"
                    variants={itemVariants}
                >
                    {title}
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center md:justify-start"
                    variants={itemVariants}
                >
                    <p className="text-light-100 dark:text-gray-700">
                        By <span className="text-gold100 dark:text-gold600 font-semibold">{author}</span>
                    </p>
                    <p className="text-light-100 dark:text-gray-700">
                        Category: <span className="text-gold100 dark:text-gold600 font-semibold">{Genre}</span>
                    </p>
                    <div className="flex items-center justify-center gap-1">
                        <Image
                            src={imagesAddresses.icons.stare}
                            alt="star"
                            width={18}
                            height={18}
                        />
                        <p className="text-gold100 dark:text-gold600 font-semibold">
                            {rating} <span className="text-light-100 dark:text-gray-700 font-normal">/5</span>
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center md:justify-start"
                    variants={itemVariants}
                >
                    <p className="text-light-100 dark:text-gray-700">
                        Total books: <span className="text-gold100 dark:text-gold600 font-semibold">{totalBooks}</span>
                    </p>
                    <p className="text-light-100 dark:text-gray-700">
                        Available books: <span className="text-gold100 dark:text-gold600 font-semibold">{availableBooks}</span>
                    </p>
                </motion.div>

                <motion.p
                    className="text-light-100 dark:text-gray-700 text-sm md:text-lg leading-6 md:leading-8"
                    variants={itemVariants}
                >
                    {description}
                </motion.p>

                <motion.div className="flex flex-col md:flex-row gap-2" variants={itemVariants}>
                    <CustomButton
                        text="Borrow Book Request"
                        iconAddress={imagesAddresses.icons.bookIcon}
                        iconPosition="right"
                        color="yellow"
                        containerClassName="w-full md:!w-fit cursor-pointer dark:hidden"
                    />
                    <CustomButton
                        text="Borrow Book Request"
                        iconAddress={imagesAddresses.icons.bookIconWhite}
                        iconPosition="right"
                        color="yellow"
                        containerClassName="w-full md:!w-fit cursor-pointer hidden dark:flex text-nowrap"
                    />
                </motion.div>
            </motion.div>

            {/* Right Content (Book Image) */}
            <motion.div
                className="flex justify-center relative lg:right-40 right-10"
                variants={itemVariants}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <Image
                        src={bookImg}
                        alt="book"
                        width={250}
                        height={280}
                        className="w-[250px] h-[280px] md:w-[300px] md:h-[340px] object-contain"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="absolute -right-10 top-3 rotate-[15deg] z-0 w-[250px] h-[280px] md:w-[300px] md:h-[340px] object-contain"
                    style={{ filter: "blur(6px)" }}
                >
                    <Image
                        src={bookImg}
                        alt="book"
                        width={250}
                        height={280}
                        className="w-full h-full object-contain"
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default BookFeature