"use client";
import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import showToast from "@/utils/toast";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion"
import { branches } from "../../../../../../public/data/banch";
import dynamic from "next/dynamic";

const BranchMap = dynamic(() => import("./BranchMap"), { ssr: false });


type Branch = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    address: string;
    phone: string;
};

const questions = [
    {
        id: 1,
        question: "How can I borrow a book?",
        answer: "To borrow a book, visit the library desk or use our online catalog to request it. Make sure you have a valid library card."
    },
    {
        id: 2,
        question: "How can I return a book?",
        answer: "You can return books at the library's return desk or use the drop-off box outside the library if it's after hours."
    },
    {
        id: 3,
        question: "How can I extend the deadline for a borrowed book?",
        answer: "You can extend the borrowing period online via your account, or by calling/emailing the library before the due date."
    },
    {
        id: 4,
        question: "Is there a fine for late returns?",
        answer: "Yes, late returns incur a fine. The amount depends on how many days the book is overdue."
    },
    {
        id: 5,
        question: "How can I reserve a book?",
        answer: "You can reserve a book through our online catalog or request it at the library desk. You'll be notified when the book is ready for pickup."
    },
    {
        id: 6,
        question: "How can I contact support?",
        answer: "You can contact library support via phone at 1630, by email at support@library.com, or through our website's contact form."
    },
];

const ContactUs = () => {

    const [openQuestionId, setOpenQuestionId] = useState<number | null>(null)
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

    const handleChangeCategoryQuestion = (id: number) => {
        setOpenQuestionId(prevId => prevId === id ? null : id)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
        const subject = (form.elements.namedItem("subject") as HTMLInputElement).value.trim();
        const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

        if (!email || !subject || !message) {
            showToast("Please fill in all fields before sending your message.", 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Please enter a valid email address.", 'error');
            return;
        }

        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.open(mailtoLink, "_blank");
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full mx-auto bg-gray-900 dark:bg-gray-50 rounded-xl p-4 md:p-8 space-y-8"
        >
            {/* common question */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08 } },
                }}
                className="flex flex-col gap-3"
            >
                <p className="flex items-start justify-start text-gold100 dark:text-gold800 text-base md:text-3xl !mb-4">
                    common question
                </p>

                {questions.map((question) => {
                    const isOpen = openQuestionId === question.id;

                    return (
                        <motion.div
                            key={question.id}
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="flex flex-col"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02, y: -2 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className={`flex items-center justify-between bg-gray-800 dark:bg-gray-100 border border-gray-200 px-4 py-2 cursor-pointer ${isOpen ? "rounded-b-0 rounded-t-lg" : "rounded-lg"
                                    }`}
                                onClick={() => handleChangeCategoryQuestion(question.id)}
                            >
                                <p className="text-xs md:text-lg text-white dark:text-gray-900">
                                    {question.question}
                                </p>

                                <Image
                                    src={isOpen ? imagesAddresses.icons.arrowUpWhite : imagesAddresses.icons.arrowDownWhite}
                                    alt="arrow"
                                    width={24}
                                    height={24}
                                    className="dark:hidden block w-4 h-4 md:w-6 md:h-6"
                                />

                                <Image
                                    src={isOpen ? imagesAddresses.icons.arrowUp : imagesAddresses.icons.arrowDown}
                                    alt="arrow"
                                    width={24}
                                    height={24}
                                    className="hidden dark:block w-4 h-4 md:w-6 md:h-6"
                                />
                            </motion.div>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden bg-gray-700 dark:bg-gray-200 border border-gray-200 border-t-0 rounded-b-lg px-4"
                                    >
                                        <div className="py-2">
                                            <p className="text-xs md:text-lg text-white dark:text-gray-900">
                                                {question.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* contact us */}
            <div className="flex flex-col gap-3 mt-16 md:mt-20">
                <p className="flex items-center justify-start text-gold100 dark:text-gold800 text-base md:text-3xl !mb-4 md:!mb-10">contact us</p>
                <motion.section
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="grid relative border border-gold100 dark:border-gold800 rounded-lg p-4"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 justify-center items-center self-center w-full"
                    >
                        <div className="w-full flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <label
                                    htmlFor="email"
                                    className="text-white dark:text-gray-700 block !mb-1 text-xs md:text-base font-medium"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@gmail.com"
                                    className="p-2.5 rounded-lg bg-gray-800 dark:bg-gray-100 border border-gray-200 text-gray-100 dark:text-gray-700 text-sm block w-full"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="subject"
                                    className="text-white dark:text-gray-700 block !mb-1 text-xs md:text-base font-medium"
                                >
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Just saying hi !"
                                    className="p-2.5 rounded-lg bg-gray-800 dark:bg-gray-100 border border-gray-200 text-gray-100 dark:text-gray-700 text-sm block w-full"
                                />
                            </div>
                        </div>
                        <div className="!mb-6 w-full">
                            <label
                                htmlFor="message"
                                className="text-white dark:text-gray-700 block text-xs md:text-base !mb-2 font-medium"
                            >
                                Message
                            </label>
                            <textarea
                                maxLength={500}
                                id="message"
                                name="message"
                                placeholder="Let's talk about..."
                                className="p-2.5 -mt-1 resize-none h-40 rounded-lg bg-gray-800 dark:bg-gray-100 border border-gray-200 text-gray-100 dark:text-gray-700 text-sm block w-full"
                            />
                        </div>
                        <CustomButton
                            type="submit"
                            text="Send Message"
                            color="yellow"
                            containerClassName="w-full md:!w-fit cursor-pointer flex text-nowrap self-end -mt-3"
                        />
                    </form>
                </motion.section>
                <div className="w-full flex flex-col md:flex-row gap-6 mt-6">
                    <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="bg-gray-800 dark:bg-gray-100 border border-gray-200 w-full flex flex-col gap-2 rounded-lg p-4"
                    >

                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                                <Image
                                    src={imagesAddresses.icons.phone}
                                    alt="logout"
                                    width={16}
                                    height={16}
                                    className="hidden dark:flex"
                                />
                                <Image
                                    src={imagesAddresses.icons.phoneWhite}
                                    alt="logout"
                                    width={16}
                                    height={16}
                                    className="dark:hidden"
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
                                    className="hidden dark:flex"
                                />
                                <Image
                                    src={imagesAddresses.icons.printWhite}
                                    alt="logout"
                                    width={16}
                                    height={16}
                                    className="dark:hidden"
                                />
                                <p className="text-xs md:text-lg text-white dark:text-gray-900">Print Documents:</p>
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
                                    className="hidden dark:flex"
                                />
                                <Image
                                    src={imagesAddresses.icons.mailWhite}
                                    alt="logout"
                                    width={16}
                                    height={16}
                                    className="dark:hidden"
                                />
                                <p className="text-xs md:text-lg text-white dark:text-gray-900">Email Support:</p>
                            </div>
                            <p className="text-xs md:text-lg text-white dark:text-gray-900">support@library.com</p>
                        </div>
                        <span className="w-full h-px bg-gray-400" />
                        <div className="flex gap-2 items-center justify-center">
                            <Link target='_blank' href={""}>
                                <Image
                                    src={imagesAddresses.icons.twitter}
                                    alt="logout"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link target='_blank' href={""}>
                                <Image
                                    src={imagesAddresses.icons.facebook}
                                    alt="logout"
                                    width={10}
                                    height={10}
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link target='_blank' href={""}>
                                <Image
                                    src={imagesAddresses.icons.linkedin}
                                    alt="logout"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                            </Link>
                        </div>
                    </motion.div>
                    {/* <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="bg-gray-800 dark:bg-gray-100 border border-gray-200 rounded-lg p-4 flex flex-col gap-4 w-full"
                    >
                        <p className="text-xs md:text-lg text-white dark:text-gray-900">address</p>
                        <p className="text-xs md:text-lg text-white dark:text-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, a.</p>
                    </motion.div> */}
                </div>
            </div>

            {/* map section */}
            <div className="mt-10 md:mt-16">
                <p className="flex items-center justify-start text-gold100 dark:text-gold800 text-base md:text-3xl !mb-4 md:!mb-10">our branches</p>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 flex flex-col gap-3">
                        {branches.map((branch) => (
                            <motion.div
                                key={branch.id}
                                whileHover={{ scale: 1.02 }}
                                className={`p-4 border rounded-lg cursor-pointer ${selectedBranch?.id === branch.id
                                    ? "bg-gold100 dark:bg-gold800 text-gray-900"
                                    : "bg-gray-800 dark:bg-gray-100 text-white"
                                    }`}
                                onClick={() => setSelectedBranch(branch)}
                            >
                                <h3 className="font-bold text-sm md:text-base">{branch.name}</h3>
                                <p className="text-sm">{branch.address}</p>
                                <p className="text-sm">{branch.phone}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="w-full md:w-2/3">
                        <BranchMap
                            branches={branches}
                            selectedBranch={selectedBranch}
                            onSelectBranch={setSelectedBranch}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
export default ContactUs;