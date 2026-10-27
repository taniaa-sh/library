"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import showToast from "@/utils/toast";

interface BorrowBookModalProps {
    setShowBorrowModal: React.Dispatch<React.SetStateAction<boolean>>;
    bookImg: string;
    title: string;
    author: string;
    Genre: string;
    availableBooks: number;
}

interface FormValues {
    name: string;
    email: string;
    quantity: number;
}

const BorrowBookModal = ({
    setShowBorrowModal,
    bookImg,
    title,
    author,
    Genre,
    availableBooks,
}: BorrowBookModalProps) => {
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    const [isClosing, setIsClosing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shakeTrigger, setShakeTrigger] = useState(0);

    const isAvailable = availableBooks > 0;

    const schema = yup.object({
        name: yup
            .string()
            .trim()
            .required("Full name is required")
            .max(100, "Name is too long"),
        email: yup
            .string()
            .trim()
            .email("Please enter a valid email")
            .required("Email is required"),
        quantity: yup
            .number()
            .transform((value, originalValue) =>
                originalValue === "" || isNaN(value) ? undefined : value
            )
            .typeError("Please enter a quantity")
            .required("Quantity is required")
            .integer("Quantity must be a whole number")
            .min(1, "Minimum 1 book")
            .max(availableBooks, `Maximum ${availableBooks} books`),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            quantity: 1,
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setShakeTrigger((prev) => prev + 1);
        }
    }, [errors]);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isSubmitting) {
                handleClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isSubmitting]);

    const handleClose = () => {
        if (isClosing || isSubmitting) return;

        setIsClosing(true);

        setTimeout(() => {
            setShowBorrowModal(false);
        }, shouldReduceMotion ? 0 : 220);
    };

    const onSubmit = async (data: FormValues) => {
        if (isSubmitting || !isAvailable) return;

        setIsSubmitting(true);

        try {
            // Replace this simulation with the actual borrow-request API.
            await new Promise((resolve) => setTimeout(resolve, 1000));

            showToast("Book borrowed successfully", "success");

            reset();
            setIsClosing(true);

            setTimeout(() => {
                setShowBorrowModal(false);
                router.push("/");
            }, shouldReduceMotion ? 0 : 220);
        } catch {
            showToast("Something went wrong. Please try again.", "error");
            setIsSubmitting(false);
        }
    };

    const inputClassName = (hasError: boolean) =>
        `w-full rounded-lg border bg-white/[0.04] px-3 py-2.5 text-sm text-white
    outline-none transition-all duration-300
    placeholder:text-stone-500
    focus:bg-white/[0.07] focus:ring-2
    dark:bg-white/80 dark:text-[#211A13]
    dark:placeholder:text-[#A09280]
    ${hasError
            ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/10 dark:border-red-400"
            : "border-white/10 focus:border-[#E7C9A5]/60 focus:ring-[#E7C9A5]/10 dark:border-[#B88A4B]/25 dark:focus:border-[#B88A4B] dark:focus:ring-[#B88A4B]/10"
        }`;

    const shakeAnimation = {
        x: [0, -5, 5, -4, 4, 0],
    };

    return (
        <AnimatePresence>
            {!isClosing && (
                <motion.div
                    className="fixed inset-0 z-[10004] flex items-end justify-center md:items-center md:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                >
                    {/* Overlay */}
                    <button
                        type="button"
                        aria-label="Close borrow request modal"
                        disabled={isSubmitting}
                        onClick={handleClose}
                        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="borrow-modal-title"
                        initial={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 30, scale: 0.98 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 20, scale: 0.98 }
                        }
                        transition={{
                            duration: shouldReduceMotion ? 0 : 0.25,
                            ease: "easeOut",
                        }}
                        className="
              relative z-10 flex max-h-[88dvh] w-full flex-col
              overflow-y-auto rounded-t-[24px]
              border border-[#E7C9A5]/15
              bg-[#11110F] text-white
              shadow-[0_-10px_80px_rgba(0,0,0,0.3)]
              dark:border-[#B88A4B]/25 dark:bg-[#FAF5EC]
              dark:text-[#211A13]
              md:max-w-[560px] md:rounded-[24px]
              md:shadow-[0_30px_100px_rgba(0,0,0,0.4)]
            "
                    >
                        {/* Decorative background */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 overflow-hidden"
                        >
                            <div className="absolute -right-24 -top-28 size-64 rounded-full bg-[#E7C9A5]/10 blur-[80px] dark:bg-[#B88A4B]/10" />

                            <div className="absolute -bottom-28 -left-20 size-56 rounded-full bg-[#B88A4B]/10 blur-[80px]" />

                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(231,201,165,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(184,138,75,0.06),transparent_60%)]" />
                        </div>

                        <div className="relative z-10 flex flex-col gap-4 p-5 sm:gap-4 sm:p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4">
                                <button
                                    type="button"
                                    aria-label="Close modal"
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    className="hidden size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors hover:border-[#E7C9A5]/40 hover:bg-[#E7C9A5]/10 dark:border-[#B88A4B]/20 dark:bg-white/60 md:flex"
                                >
                                    <Image
                                        src={imagesAddresses.icons.modalClose}
                                        alt=""
                                        width={17}
                                        height={17}
                                        className="hidden dark:block"
                                    />

                                    <Image
                                        src={imagesAddresses.icons.modalCloseWhite}
                                        alt=""
                                        width={17}
                                        height={17}
                                        className="dark:hidden"
                                    />
                                </button>
                            </div>

                            {/* Mobile handle */}
                            <button
                                type="button"
                                aria-label="Close modal"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="mx-auto -mt-1 flex w-full justify-center py-0.5 md:hidden"
                            >
                                <span className="h-1 w-9 rounded-full bg-stone-600 dark:bg-[#C8BBA8]" />
                            </button>

                            {/* Book information */}
                            <motion.div
                                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                                transition={{ duration: 0.2 }}
                                className="relative overflow-hidden rounded-xl border border-[#E7C9A5]/15 bg-white/[0.035] dark:border-[#B88A4B]/20 dark:bg-white/60"
                            >
                                <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
                                    {/* Book cover */}
                                    <div className="relative flex h-[105px] w-[75px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E7C9A5]/15 bg-gradient-to-br from-[#E7C9A5]/10 to-transparent p-1.5 dark:border-[#B88A4B]/20 dark:from-[#B88A4B]/10 sm:h-[115px] sm:w-[82px]">
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 bg-[#E7C9A5]/5 blur-2xl dark:bg-[#B88A4B]/10"
                                        />

                                        <Image
                                            src={bookImg}
                                            alt={title}
                                            width={110}
                                            height={150}
                                            sizes="82px"
                                            className="relative z-10 h-full w-full rounded-md object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
                                        />
                                    </div>

                                    {/* Book details */}
                                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                                        <span className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#E7C9A5] dark:text-[#95682F]">
                                            Selected book
                                        </span>

                                        <h3 className="line-clamp-2 text-sm font-bold leading-5 sm:text-base">
                                            {title}
                                        </h3>

                                        <p className="mt-1 truncate text-xs text-stone-400 dark:text-[#897965]">
                                            By {author}
                                        </p>

                                        <div className="mt-2 inline-flex w-fit max-w-full items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 dark:border-[#B88A4B]/20 dark:bg-white/70">
                                            <span className="truncate text-[10px] text-[#E7C9A5] dark:text-[#805827]">
                                                {Genre}
                                            </span>
                                        </div>

                                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                            <span
                                                className={`size-1.5 rounded-full ${isAvailable ? "bg-emerald-400" : "bg-red-400"
                                                    }`}
                                            />

                                            <p className="text-[11px] text-stone-400 dark:text-[#897965]">
                                                {isAvailable
                                                    ? `${availableBooks} ${availableBooks === 1 ? "copy" : "copies"
                                                    } available`
                                                    : "Currently unavailable"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/30 to-transparent dark:via-[#B88A4B]/30" />
                            </motion.div>

                            {/* Form */}
                            <form
                                className="flex flex-col gap-2.5"
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                {/* Name and quantity */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.3fr_0.7fr]">
                                    <div className="flex min-w-0 flex-col">
                                        <label
                                            htmlFor="borrow-name"
                                            className="mb-1.5 text-xs font-medium text-stone-300 dark:text-[#766856]"
                                        >
                                            Full name
                                        </label>

                                        <motion.input
                                            id="borrow-name"
                                            autoFocus
                                            autoComplete="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            disabled={isSubmitting}
                                            {...register("name")}
                                            className={inputClassName(!!errors.name)}
                                            animate={errors.name ? shakeAnimation : { x: 0 }}
                                            key={`name-${shakeTrigger}`}
                                            transition={{ duration: 0.35 }}
                                            aria-invalid={!!errors.name}
                                            aria-describedby={
                                                errors.name ? "borrow-name-error" : undefined
                                            }
                                        />

                                        <p
                                            id="borrow-name-error"
                                            className="mt-1 min-h-3.5 text-[11px] text-red-400"
                                        >
                                            {errors.name?.message}
                                        </p>
                                    </div>

                                    <div className="flex min-w-0 flex-col">
                                        <label
                                            htmlFor="borrow-quantity"
                                            className="mb-1.5 text-xs font-medium text-stone-300 dark:text-[#766856]"
                                        >
                                            Quantity
                                        </label>

                                        <motion.input
                                            id="borrow-quantity"
                                            type="number"
                                            min={1}
                                            max={Math.max(1, availableBooks)}
                                            step={1}
                                            inputMode="numeric"
                                            disabled={isSubmitting || !isAvailable}
                                            placeholder="Quantity"
                                            {...register("quantity", { valueAsNumber: true })}
                                            className={inputClassName(!!errors.quantity)}
                                            animate={errors.quantity ? shakeAnimation : { x: 0 }}
                                            key={`quantity-${shakeTrigger}`}
                                            transition={{ duration: 0.35 }}
                                            aria-invalid={!!errors.quantity}
                                            aria-describedby={
                                                errors.quantity
                                                    ? "borrow-quantity-error"
                                                    : undefined
                                            }
                                        />

                                        <p
                                            id="borrow-quantity-error"
                                            className="mt-1 min-h-3.5 text-[11px] text-red-400"
                                        >
                                            {errors.quantity?.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="borrow-email"
                                        className="mb-1.5 text-xs font-medium text-stone-300 dark:text-[#766856]"
                                    >
                                        Email address
                                    </label>

                                    <motion.input
                                        id="borrow-email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        disabled={isSubmitting}
                                        {...register("email")}
                                        className={inputClassName(!!errors.email)}
                                        animate={errors.email ? shakeAnimation : { x: 0 }}
                                        key={`email-${shakeTrigger}`}
                                        transition={{ duration: 0.35 }}
                                        aria-invalid={!!errors.email}
                                        aria-describedby={
                                            errors.email ? "borrow-email-error" : undefined
                                        }
                                    />

                                    <p
                                        id="borrow-email-error"
                                        className="mt-1 min-h-3.5 text-[11px] text-red-400"
                                    >
                                        {errors.email?.message}
                                    </p>
                                </div>

                                {/* Availability warning */}
                                {!isAvailable && (
                                    <div className="rounded-lg border border-red-400/20 bg-red-400/[0.06] px-3 py-2">
                                        <p className="text-xs text-red-400">
                                            No copies are currently available to borrow.
                                        </p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="mt-1 flex flex-col-reverse gap-2 border-t border-white/10 pt-3 dark:border-[#B88A4B]/20 sm:flex-row sm:justify-end">
                                    <div className="w-full sm:w-auto">
                                        <CustomButton
                                            text="Cancel"
                                            color="secondary"
                                            type="button"
                                            containerClassName="w-full cursor-pointer sm:!w-fit sm:!px-6"
                                            onClick={handleClose}
                                        />
                                    </div>

                                    <div
                                        className={`w-full sm:w-auto ${!isAvailable || isSubmitting
                                                ? "pointer-events-none opacity-60"
                                                : ""
                                            }`}
                                    >
                                        <CustomButton
                                            text={isSubmitting ? "Submitting..." : "Submit Request"}
                                            color="yellow"
                                            type="submit"
                                            containerClassName="w-full cursor-pointer sm:!w-fit sm:!px-7"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BorrowBookModal;