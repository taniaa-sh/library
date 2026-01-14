"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ContactUs = () => {

    const [showAnswer, setShowAnswer] = useState<boolean>(false)

    function handleSubmit(event: any) {
        event.preventDefault();

        const email = event.target.email.value;
        const subject = event.target.subject.value;
        const message = event.target.message.value;

        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

        window.open(mailtoLink, "_blank");
    }

    return (
        <div className="w-full  mx-auto bg-gray-900 dark:bg-gray-50 rounded-xl p-4 md:p-8 space-y-8">
            {/* common question */}
            <div className="flex flex-col gap-3">
                <p className="flex items-center justify-center text-white dark:text-gray-900 text-sm md:text-xl">common question</p>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
                        return (
                            <>
                                <div
                                    key={index}
                                    className={`flex items-center justify-between bg-gray-800 dark:bg-gray-100 border border-gray-200 px-4 py-2 cursor-pointer ${showAnswer ? "rounded-b-0 rounded-t-lg" : "rounded-lg"}`}
                                    onClick={() => setShowAnswer(!showAnswer)}
                                >
                                    <p className="text-xs md:text-lg text-white dark:text-gray-900">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    <Image
                                        src={showAnswer ? imagesAddresses.icons.arrowUpWhite : imagesAddresses.icons.arrowDownWhite}
                                        alt="arrowDown"
                                        width={24}
                                        height={24}
                                        className="dark:hidden block w-4 h-4 md:w-6 md:h-6"
                                    />
                                    <Image
                                        src={showAnswer ? imagesAddresses.icons.arrowUp : imagesAddresses.icons.arrowDown}
                                        alt="arrowDown"
                                        width={24}
                                        height={24}
                                        className="hidden dark:block w-4 h-4 md:w-6 md:h-6"
                                    />
                                </div>
                                {
                                    showAnswer && (
                                        <div
                                            className="flex items-center justify-between bg-gray-500 dark:bg-gray-100 border border-gray-200 border-t-0 rounded-lg px-4 py-2 cursor-pointer -mt-3 rounded-t-none"
                                        >
                                            <p className="text-xs md:text-lg text-white dark:text-gray-900">Lorem ipsum dolor sit amet consectetur.</p>
                                        </div>
                                    )
                                }
                            </>
                        )
                    })
                }
            </div>

            {/* contact us */}
            <div className="flex flex-col gap-3 mt-20">
                <p className="flex items-center justify-center text-white dark:text-gray-900 text-sm md:text-xl">contact us</p>
                <section className="grid !gap-6 md:gap-12 relative">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center self-center w-full">
                        <div className="w-full">
                            <label
                                htmlFor="email"
                                className="text-white block !mb-1 text-xs md:text-lg font-medium"
                            >
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="name@gmail.com"
                                className="p-2.5 rounded-lg bg-gray-800 dark:bg-gray-100 border border-gray-200 text-gray-100 dark:text-gray-700 text-sm block w-full"
                            />
                        </div>

                        <div className="w-full">
                            <label
                                htmlFor="subject"
                                className="text-white block !mb-1 text-xs md:text-lg font-medium"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                placeholder="Just saying hi !"
                                className="p-2.5 rounded-lg bg-gray-800 dark:bg-gray-100 border border-gray-200 text-gray-100 dark:text-gray-700 text-sm block w-full"
                            />
                        </div>

                        <div className="!mb-6 w-full">
                            <label
                                htmlFor="message"
                                className="text-white block text-xs md:text-lg !mb-2 font-medium"
                            >
                                Message
                            </label>
                            <textarea
                                maxLength={500}
                                id="message"
                                name="message"
                                required
                                placeholder="Let's talk about..."
                                className="p-2.5 -mt-1 resize-none h-40 rounded-lg bg-gray-800 dark:bg-gray-100 border border-gray-200 text-gray-100 dark:text-gray-700 text-sm block w-full"
                            />
                        </div>
                        <CustomButton
                            text="Send Message"
                            color="yellow"
                            containerClassName="w-full md:!w-fit cursor-pointer flex text-nowrap self-start"
                        />
                    </form>
                </section>
                <div className="w-full flex flex-col md:flex-row gap-6 mt-20">
                    <div className="bg-gray-800 dark:bg-gray-100 border border-gray-200 w-full flex flex-col gap-2 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                                <Image
                                    src={imagesAddresses.icons.phone}
                                    alt="logout"
                                    width={16}
                                    height={16}
                                />
                                <p className="text-xs md:text-lg text-white dark:text-gray-900">call to support:</p>
                            </div>
                            <p className="text-xs md:text-lg text-white dark:text-gray-900">1630</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                                <Image
                                    src={imagesAddresses.icons.print}
                                    alt="logout"
                                    width={16}
                                    height={16}
                                />
                                <p className="text-xs md:text-lg text-white dark:text-gray-900">call to support:</p>
                            </div>
                            <p className="text-xs md:text-lg text-white dark:text-gray-900">1630</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                                <Image
                                    src={imagesAddresses.icons.mail}
                                    alt="logout"
                                    width={16}
                                    height={16}
                                />
                                <p className="text-xs md:text-lg text-white dark:text-gray-900">call to support:</p>
                            </div>
                            <p className="text-xs md:text-lg text-white dark:text-gray-900">1630</p>
                        </div>
                        <span className="w-full h-px bg-gray-400" />
                        <div className="flex gap-2 items-center justify-center">
                            <Link target='_blank' href={""}>
                                <Image
                                    src={imagesAddresses.icons.twitter}
                                    alt="logout"
                                    width={30}
                                    height={30}
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link target='_blank' href={""}>
                                <Image
                                    src={imagesAddresses.icons.facebook}
                                    alt="logout"
                                    width={16}
                                    height={16}
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link target='_blank' href={""}>
                                <Image
                                    src={imagesAddresses.icons.linkedin}
                                    alt="logout"
                                    width={30}
                                    height={30}
                                    className="cursor-pointer"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="bg-gray-800 dark:bg-gray-100 border border-gray-200 rounded-lg p-4 flex flex-col gap-4 w-full">
                        <p className="text-xs md:text-lg text-white dark:text-gray-900">address</p>
                        <p className="text-xs md:text-lg text-white dark:text-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, a.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;