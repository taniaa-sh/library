"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import showToast from "@/utils/toast";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
        answer:
            "To borrow a book, visit the library desk or use our online catalog to request it. Make sure you have a valid library card.",
    },
    {
        id: 2,
        question: "How can I return a book?",
        answer:
            "You can return books at the library's return desk or use the drop-off box outside the library if it's after hours.",
    },
    {
        id: 3,
        question: "How can I extend the deadline for a borrowed book?",
        answer:
            "You can extend the borrowing period online via your account, or by calling/emailing the library before the due date.",
    },
    {
        id: 4,
        question: "Is there a fine for late returns?",
        answer:
            "Yes, late returns incur a fine. The amount depends on how many days the book is overdue.",
    },
    {
        id: 5,
        question: "How can I reserve a book?",
        answer:
            "You can reserve a book through our online catalog or request it at the library desk. You'll be notified when the book is ready for pickup.",
    },
    {
        id: 6,
        question: "How can I contact support?",
        answer:
            "You can contact library support via phone at 1630, by email at support@library.com, or through our website's contact form.",
    },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: "easeOut" as const,
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" as const },
    },
};

const ContactUs = () => {
    const shouldReduceMotion = useReducedMotion();

    const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

    const handleChangeCategoryQuestion = (id: number) => {
        setOpenQuestionId((prevId) => (prevId === id ? null : id));
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const email = (
            form.elements.namedItem("email") as HTMLInputElement
        ).value.trim();
        const subject = (
            form.elements.namedItem("subject") as HTMLInputElement
        ).value.trim();
        const message = (
            form.elements.namedItem("message") as HTMLTextAreaElement
        ).value.trim();

        if (!email || !subject || !message) {
            showToast(
                "Please fill in all fields before sending your message.",
                "error"
            );
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showToast("Please enter a valid email address.", "error");
            return;
        }

        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
            email
        )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            message
        )}`;

        window.open(mailtoLink, "_blank");
    }

    const sectionMotion = shouldReduceMotion
        ? {}
        : {
            variants: sectionVariants,
            initial: "hidden" as const,
            whileInView: "visible" as const,
            viewport: { once: true, amount: 0.12 },
        };

    const itemMotion = shouldReduceMotion
        ? {}
        : {
            variants: itemVariants,
        };

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative mx-auto w-full overflow-hidden rounded-2xl border border-[#A87938]/20 bg-[#0D0D0C] p-4 text-white shadow-[0_20px_70px_rgba(0,0,0,0.18)] dark:border-[#A87938]/20 dark:bg-[#F8F2E6] dark:text-[#17130F] md:rounded-3xl md:p-8"
        >
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#A87938]/10 blur-3xl dark:bg-[#A87938]/10"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#E7C9A5]/5 blur-3xl dark:bg-[#A87938]/10"
            />

            <div className="relative z-10 space-y-16 md:space-y-24">
                {/* FAQ */}
                <motion.section {...sectionMotion} className="flex flex-col gap-5">
                    <motion.div {...itemMotion} className="mb-2">
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7C9A5]/25 bg-[#E7C9A5]/10 px-3 py-1.5 text-xs font-medium tracking-wide text-[#E7C9A5] dark:border-[#A87938]/25 dark:bg-[#A87938]/10 dark:text-[#A87938]">
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            NEED HELP?
                        </span>

                        <h2 className="text-2xl font-semibold tracking-tight text-[#F8F2E6] dark:text-[#17130F] md:text-4xl">
                            Common{" "}
                            <span className="text-[#E7C9A5] dark:text-[#A87938]">
                                Questions
                            </span>
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-[#B8AA98] dark:text-[#75634E] md:text-base">
                            Everything you need to know about borrowing,
                            returning, and discovering your next favorite book.
                        </p>
                    </motion.div>

                    <div className="flex flex-col gap-3">
                        {questions.map((question, index) => {
                            const isOpen = openQuestionId === question.id;

                            return (
                                <motion.div
                                    key={question.id}
                                    {...itemMotion}
                                    whileHover={
                                        shouldReduceMotion
                                            ? undefined
                                            : { x: 3 }
                                    }
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                    className={`overflow-hidden rounded-xl border transition-colors duration-300 ${isOpen
                                            ? "border-[#E7C9A5]/50 bg-[#171614] dark:border-[#A87938]/50 dark:bg-[#FBF7EF]"
                                            : "border-[#FFFFFF]/10 bg-[#171614]/70 hover:border-[#E7C9A5]/35 dark:border-[#A87938]/15 dark:bg-[#F2E9DA]/70 dark:hover:border-[#A87938]/40"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-answer-${question.id}`}
                                        onClick={() =>
                                            handleChangeCategoryQuestion(
                                                question.id
                                            )
                                        }
                                        className="group flex w-full items-center gap-3 p-4 text-left md:p-5"
                                    >
                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors duration-300 ${isOpen
                                                    ? "bg-[#E7C9A5] text-[#17130F] dark:bg-[#A87938] dark:text-white"
                                                    : "bg-[#E7C9A5]/10 text-[#E7C9A5] group-hover:bg-[#E7C9A5]/20 dark:bg-[#A87938]/10 dark:text-[#A87938] dark:group-hover:bg-[#A87938]/20"
                                                }`}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="flex-1 text-sm font-medium leading-6 text-[#F8F2E6] dark:text-[#17130F] md:text-base">
                                            {question.question}
                                        </span>

                                        <motion.span
                                            animate={{
                                                rotate: isOpen ? 180 : 0,
                                            }}
                                            transition={{
                                                duration: shouldReduceMotion
                                                    ? 0
                                                    : 0.25,
                                            }}
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen
                                                    ? "border-[#E7C9A5]/40 bg-[#E7C9A5]/10 text-[#E7C9A5] dark:border-[#A87938]/40 dark:bg-[#A87938]/10 dark:text-[#A87938]"
                                                    : "border-white/10 text-[#B8AA98] dark:border-[#A87938]/20 dark:text-[#75634E]"
                                                }`}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="m6 9 6 6 6-6"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </motion.span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                id={`faq-answer-${question.id}`}
                                                initial={
                                                    shouldReduceMotion
                                                        ? false
                                                        : {
                                                            height: 0,
                                                            opacity: 0,
                                                        }
                                                }
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    height: {
                                                        duration: shouldReduceMotion
                                                            ? 0
                                                            : 0.3,
                                                        ease: "easeInOut",
                                                    },
                                                    opacity: {
                                                        duration: shouldReduceMotion
                                                            ? 0
                                                            : 0.2,
                                                    },
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mx-4 border-t border-[#E7C9A5]/15 pb-5 pt-4 pl-1 dark:border-[#A87938]/20 md:mx-5">
                                                    <p className="text-sm leading-7 text-[#B8AA98] dark:text-[#75634E] md:text-base">
                                                        {question.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Contact form */}
                <motion.section {...sectionMotion} className="flex flex-col gap-6">
                    <motion.div {...itemMotion}>
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7C9A5]/25 bg-[#E7C9A5]/10 px-3 py-1.5 text-xs font-medium tracking-wide text-[#E7C9A5] dark:border-[#A87938]/25 dark:bg-[#A87938]/10 dark:text-[#A87938]">
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            GET IN TOUCH
                        </span>

                        <h2 className="text-2xl font-semibold tracking-tight text-[#F8F2E6] dark:text-[#17130F] md:text-4xl">
                            Let&apos;s{" "}
                            <span className="text-[#E7C9A5] dark:text-[#A87938]">
                                Talk
                            </span>
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-[#B8AA98] dark:text-[#75634E] md:text-base">
                            Have a question or need assistance? Send us a
                            message and we&apos;ll be happy to help.
                        </p>
                    </motion.div>

                    <motion.div
                        {...itemMotion}
                        whileHover={
                            shouldReduceMotion
                                ? undefined
                                : { y: -3 }
                        }
                        className="rounded-2xl border border-[#E7C9A5]/20 bg-[#171614]/70 p-4 shadow-[0_15px_45px_rgba(0,0,0,0.12)] dark:border-[#A87938]/20 dark:bg-[#FBF7EF]/80 md:p-7"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="flex w-full flex-col gap-5"
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-[#F8F2E6] dark:text-[#17130F]"
                                    >
                                        Your Email
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="name@gmail.com"
                                        className="w-full rounded-xl border border-white/10 bg-[#0D0D0C]/70 px-4 py-3 text-sm text-[#F8F2E6] outline-none transition duration-200 placeholder:text-[#807464] hover:border-[#E7C9A5]/40 focus:border-[#E7C9A5] focus:ring-4 focus:ring-[#E7C9A5]/10 dark:border-[#A87938]/20 dark:bg-white/70 dark:text-[#17130F] dark:placeholder:text-[#9A8873] dark:hover:border-[#A87938]/50 dark:focus:border-[#A87938] dark:focus:ring-[#A87938]/10"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="subject"
                                        className="text-sm font-medium text-[#F8F2E6] dark:text-[#17130F]"
                                    >
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Just saying hi!"
                                        className="w-full rounded-xl border border-white/10 bg-[#0D0D0C]/70 px-4 py-3 text-sm text-[#F8F2E6] outline-none transition duration-200 placeholder:text-[#807464] hover:border-[#E7C9A5]/40 focus:border-[#E7C9A5] focus:ring-4 focus:ring-[#E7C9A5]/10 dark:border-[#A87938]/20 dark:bg-white/70 dark:text-[#17130F] dark:placeholder:text-[#9A8873] dark:hover:border-[#A87938]/50 dark:focus:border-[#A87938] dark:focus:ring-[#A87938]/10"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-medium text-[#F8F2E6] dark:text-[#17130F]"
                                    >
                                        Message
                                    </label>
                                    <span className="text-xs text-[#938574] dark:text-[#9A8873]">
                                        Max. 500 characters
                                    </span>
                                </div>

                                <textarea
                                    maxLength={500}
                                    id="message"
                                    name="message"
                                    placeholder="Let's talk about..."
                                    className="min-h-40 w-full resize-y rounded-xl border border-white/10 bg-[#0D0D0C]/70 px-4 py-3 text-sm leading-7 text-[#F8F2E6] outline-none transition duration-200 placeholder:text-[#807464] hover:border-[#E7C9A5]/40 focus:border-[#E7C9A5] focus:ring-4 focus:ring-[#E7C9A5]/10 dark:border-[#A87938]/20 dark:bg-white/70 dark:text-[#17130F] dark:placeholder:text-[#9A8873] dark:hover:border-[#A87938]/50 dark:focus:border-[#A87938] dark:focus:ring-[#A87938]/10"
                                />
                            </div>

                            <div className="flex justify-end pt-1">
                                <div className="w-full md:w-auto">
                                    <CustomButton
                                        type="submit"
                                        text="Send Message"
                                        color="yellow"
                                        containerClassName="w-full md:!w-fit cursor-pointer flex text-nowrap"
                                    />
                                </div>
                            </div>
                        </form>
                    </motion.div>

                    {/* Contact information */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {[
                            {
                                title: "Call to support",
                                value: "1630",
                                icon: imagesAddresses.icons.phoneWhite,
                                darkIcon: imagesAddresses.icons.phone,
                                href: "tel:1630",
                            },
                            {
                                title: "Print documents",
                                value: "1630",
                                icon: imagesAddresses.icons.printWhite,
                                darkIcon: imagesAddresses.icons.print,
                                href: "tel:1630",
                            },
                            {
                                title: "Email support",
                                value: "support@library.com",
                                icon: imagesAddresses.icons.mailWhite,
                                darkIcon: imagesAddresses.icons.mail,
                                href: "mailto:support@library.com",
                            },
                        ].map((item, index) => (
                            <motion.a
                                key={item.title}
                                {...itemMotion}
                                href={item.href}
                                whileHover={
                                    shouldReduceMotion
                                        ? undefined
                                        : {
                                            y: -5,
                                            transition: {
                                                duration: 0.2,
                                            },
                                        }
                                }
                                whileTap={
                                    shouldReduceMotion
                                        ? undefined
                                        : { scale: 0.98 }
                                }
                                className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-[#171614]/70 p-4 transition-colors duration-300 hover:border-[#E7C9A5]/40 hover:bg-[#201E1A] dark:border-[#A87938]/15 dark:bg-[#F2E9DA]/70 dark:hover:border-[#A87938]/40 dark:hover:bg-[#FBF7EF]"
                            >
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E7C9A5]/10 transition-colors duration-300 group-hover:bg-[#E7C9A5]/20 dark:bg-[#A87938]/10 dark:group-hover:bg-[#A87938]/20">
                                    <Image
                                        src={item.icon}
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="block dark:hidden"
                                    />
                                    <Image
                                        src={item.darkIcon}
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="hidden dark:block"
                                    />
                                </span>

                                <span className="flex min-w-0 flex-1 flex-col gap-1">
                                    <span className="text-xs text-[#B8AA98] dark:text-[#75634E]">
                                        {item.title}
                                    </span>
                                    <span
                                        className={`break-words text-sm font-medium ${index === 2
                                                ? "break-all"
                                                : ""
                                            } text-[#F8F2E6] group-hover:text-[#E7C9A5] dark:text-[#17130F] dark:group-hover:text-[#A87938]`}
                                    >
                                        {item.value}
                                    </span>
                                </span>

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-4 w-4 shrink-0 text-[#E7C9A5] transition-transform duration-200 group-hover:translate-x-0.5 dark:text-[#A87938]"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M7 17 17 7M7 7h10v10"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </motion.a>
                        ))}
                    </div>

                    {/* Social links */}
                    <motion.div
                        {...itemMotion}
                        className="flex items-center justify-between gap-4 border-t border-white/10 pt-5 dark:border-[#A87938]/20"
                    >
                        <p className="text-sm text-[#B8AA98] dark:text-[#75634E]">
                            Follow our journey
                        </p>

                        <div className="flex items-center gap-3">
                            {[
                                {
                                    name: "Twitter",
                                    icon: imagesAddresses.icons.twitter,
                                    href: "",
                                },
                                {
                                    name: "Facebook",
                                    icon: imagesAddresses.icons.facebook,
                                    href: "",
                                },
                                {
                                    name: "LinkedIn",
                                    icon: imagesAddresses.icons.linkedin,
                                    href: "",
                                },
                            ].map((social) => (
                                <motion.div
                                    key={social.name}
                                    whileHover={
                                        shouldReduceMotion
                                            ? undefined
                                            : {
                                                y: -3,
                                                scale: 1.06,
                                            }
                                    }
                                    whileTap={
                                        shouldReduceMotion
                                            ? undefined
                                            : { scale: 0.95 }
                                    }
                                >
                                    <Link
                                        href={social.href}
                                        target="_blank"
                                        aria-label={social.name}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#171614] transition-colors hover:border-[#E7C9A5]/50 hover:bg-[#E7C9A5]/10 dark:border-[#A87938]/20 dark:bg-[#F2E9DA] dark:hover:border-[#A87938]/50 dark:hover:bg-[#A87938]/10"
                                    >
                                        <Image
                                            src={social.icon}
                                            alt=""
                                            width={18}
                                            height={18}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.section>

                {/* Branches */}
                <motion.section {...sectionMotion} className="flex flex-col gap-6">
                    <motion.div {...itemMotion}>
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7C9A5]/25 bg-[#E7C9A5]/10 px-3 py-1.5 text-xs font-medium tracking-wide text-[#E7C9A5] dark:border-[#A87938]/25 dark:bg-[#A87938]/10 dark:text-[#A87938]">
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            FIND US
                        </span>

                        <h2 className="text-2xl font-semibold tracking-tight text-[#F8F2E6] dark:text-[#17130F] md:text-4xl">
                            Our{" "}
                            <span className="text-[#E7C9A5] dark:text-[#A87938]">
                                Branches
                            </span>
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-[#B8AA98] dark:text-[#75634E] md:text-base">
                            Explore our locations and find the branch closest
                            to you.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
                        {/* Branch list */}
                        <div className="flex flex-col gap-3 md:col-span-2">
                            {branches.map((branch, index) => {
                                const isSelected =
                                    selectedBranch?.id === branch.id;

                                return (
                                    <motion.button
                                        key={branch.id}
                                        type="button"
                                        {...itemMotion}
                                        onClick={() =>
                                            setSelectedBranch(branch)
                                        }
                                        whileHover={
                                            shouldReduceMotion
                                                ? undefined
                                                : {
                                                    x: 3,
                                                    transition: {
                                                        duration: 0.2,
                                                    },
                                                }
                                        }
                                        whileTap={
                                            shouldReduceMotion
                                                ? undefined
                                                : { scale: 0.99 }
                                        }
                                        className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-colors duration-300 ${isSelected
                                                ? "border-[#E7C9A5]/60 bg-[#E7C9A5]/10 dark:border-[#A87938]/50 dark:bg-[#A87938]/10"
                                                : "border-white/10 bg-[#171614]/70 hover:border-[#E7C9A5]/35 dark:border-[#A87938]/15 dark:bg-[#F2E9DA]/70 dark:hover:border-[#A87938]/40"
                                            }`}
                                    >
                                        {isSelected && (
                                            <motion.span
                                                layoutId="selected-branch-indicator"
                                                className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-[#E7C9A5] dark:bg-[#A87938]"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 350,
                                                    damping: 30,
                                                }}
                                            />
                                        )}

                                        <div className="flex items-start gap-3">
                                            <span
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${isSelected
                                                        ? "bg-[#E7C9A5] text-[#17130F] dark:bg-[#A87938] dark:text-white"
                                                        : "bg-[#E7C9A5]/10 text-[#E7C9A5] dark:bg-[#A87938]/10 dark:text-[#A87938]"
                                                    }`}
                                            >
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            <span className="flex min-w-0 flex-1 flex-col gap-2">
                                                <span className="text-sm font-semibold text-[#F8F2E6] dark:text-[#17130F] md:text-base">
                                                    {branch.name}
                                                </span>

                                                <span className="text-xs leading-6 text-[#B8AA98] dark:text-[#75634E] md:text-sm">
                                                    {branch.address}
                                                </span>

                                                <span className="flex items-center gap-2 text-xs text-[#E7C9A5] dark:text-[#A87938] md:text-sm">
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="h-4 w-4 shrink-0"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M7 3h3l2 5-2 1.5a15 15 0 0 0 4.5 4.5L16 12l5 2v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 6c0-1.7.8-3 2-3Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    {branch.phone}
                                                </span>
                                            </span>

                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className={`mt-1 h-4 w-4 shrink-0 transition-transform duration-200 ${isSelected
                                                        ? "translate-x-0.5 text-[#E7C9A5] dark:text-[#A87938]"
                                                        : "text-[#807464] group-hover:translate-x-0.5"
                                                    }`}
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="m9 18 6-6-6-6"
                                                    stroke="currentColor"
                                                    strokeWidth="1.7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Map */}
                        <motion.div
                            {...itemMotion}
                            className="relative min-h-[320px] overflow-hidden rounded-2xl border border-[#E7C9A5]/20 bg-[#171614] shadow-[0_15px_45px_rgba(0,0,0,0.12)] dark:border-[#A87938]/20 dark:bg-[#F2E9DA] md:col-span-3 md:min-h-[480px]"
                        >
                            <div className="absolute inset-0 z-0">
                                <BranchMap
                                    branches={branches}
                                    selectedBranch={selectedBranch}
                                    onSelectBranch={setSelectedBranch}
                                />
                            </div>

                            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-[#0D0D0C]/30 to-transparent dark:from-[#F8F2E6]/20" />

                            <div className="pointer-events-none absolute bottom-4 left-4 z-[2] rounded-xl border border-white/10 bg-[#0D0D0C]/85 px-4 py-3 shadow-lg backdrop-blur-md dark:border-[#A87938]/20 dark:bg-[#FBF7EF]/90">
                                <p className="text-xs text-[#B8AA98] dark:text-[#75634E]">
                                    {selectedBranch
                                        ? "Selected location"
                                        : "Explore our locations"}
                                </p>
                                <p className="mt-1 text-sm font-medium text-[#E7C9A5] dark:text-[#A87938]">
                                    {selectedBranch?.name ??
                                        `${branches.length} library branches`}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </motion.div>
    );
};

export default ContactUs;