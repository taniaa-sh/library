"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface LogoutModalProps {
    setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal = ({ setShowLogoutModal }: LogoutModalProps) => {
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    const [isClosing, setIsClosing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        if (isClosing || isLoading) return;

        setIsClosing(true);

        setTimeout(() => {
            setShowLogoutModal(false);
        }, shouldReduceMotion ? 0 : 220);
    };

    const handleLogout = async () => {
        if (isLoading || isClosing) return;

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            setShowLogoutModal(false);
            router.replace(SiteUrls.signIn);
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isLoading, isClosing, shouldReduceMotion]);

    const closeButton = (
        <button
            type="button"
            aria-label="Close logout modal"
            onClick={handleClose}
            disabled={isLoading}
            className="
                flex size-9 shrink-0 items-center justify-center rounded-xl
                border border-white/10 bg-white/[0.04]
                transition-all duration-300
                hover:rotate-90 hover:border-[#E7C9A5]/40
                hover:bg-[#E7C9A5]/10
                disabled:cursor-not-allowed disabled:opacity-50
                dark:border-[#B88A4B]/20 dark:bg-white/60
            "
        >
            <Image
                src={imagesAddresses.icons.modalCloseWhite}
                alt=""
                width={17}
                height={17}
                className="dark:hidden"
            />

            <Image
                src={imagesAddresses.icons.modalClose}
                alt=""
                width={17}
                height={17}
                className="hidden dark:block"
            />
        </button>
    );

    const modalContent = (
        <div className="relative z-10 flex flex-col gap-5 p-5 sm:gap-6 sm:p-7">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#E7C9A5] shadow-[0_0_12px_rgba(231,201,165,0.6)]" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7C9A5] dark:text-[#95682F]">
                        BookWise Account
                    </span>
                </div>

                <div className="hidden md:block">{closeButton}</div>
            </div>

            {/* Icon */}
            <div className="flex flex-col items-center text-center">
                <motion.div
                    initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.35,
                        ease: "easeOut",
                    }}
                    className="
                        relative mb-5 flex size-[100px] items-center justify-center
                        rounded-[30px] border border-[#E7C9A5]/20
                        bg-gradient-to-br from-[#E7C9A5]/15 to-[#B88A4B]/5
                        shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                        dark:border-[#B88A4B]/25
                    "
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-2 rounded-[23px] border border-[#E7C9A5]/10"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-[30px] bg-[#E7C9A5]/5 blur-xl"
                    />

                    <Image
                        src={imagesAddresses.icons.deny}
                        alt=""
                        width={62}
                        height={62}
                        className="relative z-10 object-contain"
                    />

                    <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border-[3px] border-[#11110F] bg-[#E7C9A5] dark:border-[#FAF5EC]">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="size-3.5 text-[#211A13]"
                            aria-hidden="true"
                        >
                            <path
                                d="M10 17l5-5-5-5M15 12H3m9-8h6a3 3 0 013 3v10a3 3 0 01-3 3h-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl font-bold tracking-tight text-white dark:text-[#211A13] sm:text-[28px]">
                    Leaving already?
                </h2>

                <p className="mt-2 max-w-[310px] text-sm leading-6 text-stone-400 dark:text-[#897965]">
                    Are you sure you want to log out? You’ll need to sign in again
                    to continue your reading journey.
                </p>
            </div>

            {/* Info card */}
            <div className="relative overflow-hidden rounded-xl border border-[#E7C9A5]/15 bg-white/[0.035] p-3.5 dark:border-[#B88A4B]/20 dark:bg-white/60 sm:p-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#E7C9A5]/15 bg-[#E7C9A5]/10 dark:border-[#B88A4B]/20 dark:bg-[#B88A4B]/10">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="size-5 text-[#E7C9A5] dark:text-[#95682F]"
                            aria-hidden="true"
                        >
                            <path
                                d="M12 3 5 6v5c0 4.5 3 7.5 7 10 4-2.5 7-5.5 7-10V6l-7-3Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                            />
                            <path
                                d="m9 12 2 2 4-4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-white dark:text-[#352A1D]">
                            Your account stays secure
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-stone-400 dark:text-[#897965]">
                            You can always come back and pick up where you left off.
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2.5 sm:flex-row">
                <div className="w-full sm:flex-1">
                    <CustomButton
                        text="Stay signed in"
                        color="secondary"
                        containerClassName="w-full cursor-pointer !rounded-xl"
                        onClick={handleClose}
                    />
                </div>

                <div
                    className={`w-full sm:flex-1 ${
                        isLoading ? "pointer-events-none opacity-60" : ""
                    }`}
                >
                    <CustomButton
                        text={isLoading ? "Logging out..." : "Yes, log me out"}
                        color="red"
                        containerClassName="w-full cursor-pointer !rounded-xl"
                        onClick={handleLogout}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 dark:text-[#9A8B78]">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10 dark:to-[#B88A4B]/20" />

                <span>Thanks for reading with us</span>

                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10 dark:to-[#B88A4B]/20" />
            </div>
        </div>
    );

    return (
        <AnimatePresence
            onExitComplete={() => {
                if (isClosing) {
                    setShowLogoutModal(false);
                }
            }}
        >
            {!isClosing && (
                <motion.div
                    className="fixed inset-0 z-[10002] flex items-end justify-center md:items-center md:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.18,
                    }}
                >
                    {/* Overlay */}
                    <button
                        type="button"
                        aria-label="Close logout modal"
                        disabled={isLoading}
                        onClick={handleClose}
                        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="logout-modal-title"
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
                        onMouseDown={(event) => event.stopPropagation()}
                        className="
                            relative z-10 flex max-h-[88dvh] w-full flex-col
                            overflow-y-auto rounded-t-[24px]
                            border border-[#E7C9A5]/15
                            bg-[#11110F] text-white
                            shadow-[0_-10px_80px_rgba(0,0,0,0.3)]
                            dark:border-[#B88A4B]/25 dark:bg-[#FAF5EC]
                            dark:text-[#211A13]
                            md:max-w-[460px] md:rounded-[26px]
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

                        {/* Mobile handle */}
                        <button
                            type="button"
                            aria-label="Close logout modal"
                            onClick={handleClose}
                            disabled={isLoading}
                            className="relative z-20 mx-auto mt-3 flex w-full justify-center py-1 md:hidden"
                        >
                            <span className="h-1 w-9 rounded-full bg-stone-600 transition-colors hover:bg-[#E7C9A5] dark:bg-[#C8BBA8]" />
                        </button>

                        {modalContent}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LogoutModal