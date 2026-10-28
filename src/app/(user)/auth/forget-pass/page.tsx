
'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import imagesAddresses from "@/utils/imageAddresses";
import { useRouter } from "next/navigation";
import SiteUrls from "@/utils/routs";
import CustomButton from "@/components/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import showToast from "@/utils/toast";

const schema = yup.object({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
}).required();

type SignUpFormData = {
    email: string;
};

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const [shakeTrigger, setShakeTrigger] = useState(0);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setShakeTrigger((prev) => prev + 1);
        }
    }, [errors]);

    const onSubmit = async (data: SignUpFormData) => {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: data.email }),
            });

            if (res.ok) {
                showToast(
                    "A reset link has been sent to your email",
                    "success"
                );
            } else {
                showToast("Failed to send reset link", "error");
                router.push(SiteUrls.resetPass);
            }
        } catch {
            showToast("Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = `
        w-full rounded-xl border px-4 py-3.5 text-sm outline-none
        transition-all duration-300
        placeholder:text-[#A99A86]
        focus:ring-2 focus:ring-[#B88A4B]/25
        bg-[#211E19] border-[#7A6233]/50 text-[#F5EBDD]
        focus:border-[#E7C9A5]
        dark:bg-white dark:border-[#D6B98C]/70
        dark:text-[#342719] dark:placeholder:text-[#A99A86]
        dark:focus:border-[#B88A4B]
    `;

    return (
        <main className="
            relative grid min-h-screen overflow-hidden
            bg-[#0D0D0C] text-white
            dark:bg-[#F8F2E6] dark:text-[#17130F]
            lg:grid-cols-2
        ">
            {/* Background glow */}
            <div className="
                pointer-events-none absolute -left-32 -top-32
                size-96 rounded-full bg-[#B88A4B]/10 blur-[120px]
                dark:bg-[#B88A4B]/15
            " />

            <div className="
                pointer-events-none absolute -bottom-40 right-1/4
                size-96 rounded-full bg-[#E7C9A5]/5 blur-[120px]
                dark:bg-[#B88A4B]/10
            " />

            {/* Form section */}
            <section className="
                relative z-10 flex min-h-screen items-center
                justify-center px-5 py-10 sm:px-8 md:px-12
                lg:px-14 xl:px-20
            ">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-center sm:justify-start"
                    >
                        <Image
                            src={imagesAddresses.images.logo}
                            alt="BookWise"
                            width={120}
                            height={120}
                            className="h-6 w-[120px] object-contain dark:hidden"
                            priority
                        />

                        <Image
                            src={imagesAddresses.icons.FrameWhite}
                            alt="BookWise"
                            width={120}
                            height={120}
                            className="hidden h-6 w-[120px] object-contain dark:block"
                            priority
                        />
                    </motion.div>

                    {/* Form card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="
                            relative overflow-hidden rounded-3xl
                            border border-[#7A6233]/40
                            bg-[#171614]/95 p-6
                            shadow-[0_20px_70px_rgba(0,0,0,0.25)]
                            backdrop-blur-xl
                            dark:border-[#D6B98C]/60
                            dark:bg-white/85
                            dark:shadow-[0_20px_70px_rgba(126,91,43,0.10)]
                            sm:p-8 md:p-9
                        "
                    >
                        {/* Gold top line */}
                        <div className="
                            absolute inset-x-10 top-0 h-px
                            bg-gradient-to-r from-transparent
                            via-[#E7C9A5] to-transparent
                            dark:via-[#B88A4B]
                        " />

                        {/* Heading */}
                        <div className="mb-8">
                            <div className="
                                mb-5 flex size-12 items-center
                                justify-center rounded-2xl
                                border border-[#7A6233]/50
                                bg-[#E7C9A5]/10
                                dark:border-[#D6B98C]/70
                                dark:bg-[#E7C9A5]/30
                            ">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="size-6 text-[#E7C9A5] dark:text-[#8A6234]"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect x="4" y="10" width="16" height="11" rx="2.5" />
                                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    <path d="M12 14v3" />
                                </svg>
                            </div>

                            <p className="
                                mb-2 text-xs font-semibold uppercase
                                tracking-[0.24em] text-[#E7C9A5]
                                dark:text-[#A87938]
                            ">
                                Account Recovery
                            </p>

                            <h1 className="
                                text-2xl font-bold tracking-tight
                                text-[#F5EBDD]
                                dark:text-[#2B2117]
                                sm:text-3xl
                            ">
                                Forgot Password?
                            </h1>

                            <p className="
                                mt-3 text-sm leading-7
                                text-[#C6B69F]
                                dark:text-[#76634C]
                            ">
                                Dont worry, it happens. Enter your email
                                address and well help you get back into
                                your account.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            className="flex w-full flex-col gap-5"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                        >
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="
                                        text-sm font-medium
                                        text-[#F5EBDD]
                                        dark:text-[#342719]
                                    "
                                >
                                    Email address
                                </label>

                                <motion.input
                                    id="email"
                                    {...register("email")}
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Enter your email"
                                    aria-invalid={!!errors.email}
                                    animate={
                                        errors.email
                                            ? { x: [0, -5, 5, -5, 5, 0] }
                                            : { x: 0 }
                                    }
                                    key={shakeTrigger}
                                    transition={{ duration: 0.4 }}
                                    className={`
                                        ${inputClass}
                                        ${errors.email
                                            ? '!border-red-500 focus:!ring-red-500/20'
                                            : ''}
                                    `}
                                />

                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-400 dark:text-red-600">
                                        {errors.email.message?.toString()}
                                    </p>
                                )}
                            </div>

                            <CustomButton
                                type="submit"
                                text="Send Reset Link"
                                color="yellow"
                                containerClassName="
                                    mt-2 flex w-full cursor-pointer
                                    text-nowrap
                                "
                                loading={loading}
                            />
                        </form>

                        {/* Back to login */}
                        <div className="
                            mt-7 border-t border-[#7A6233]/30
                            pt-5 text-center text-sm
                            text-[#C6B69F]
                            dark:border-[#D6B98C]/50
                            dark:text-[#76634C]
                        ">
                            Remember your password?{" "}
                            <button
                                type="button"
                                onClick={() => router.push(SiteUrls.signIn)}
                                className="
                                    font-semibold text-[#E7C9A5]
                                    transition-colors hover:text-white
                                    dark:text-[#A87938]
                                    dark:hover:text-[#795323]
                                "
                            >
                                Login here
                            </button>
                        </div>
                    </motion.div>

                    {/* Footer caption */}
                    <p className="
                        mt-6 text-center text-xs
                        text-[#8D806D]
                        dark:text-[#94816A]
                    ">
                        Your next chapter is just a step away.
                    </p>
                </div>
            </section>


            {/* Visual section — desktop */}
            <aside className="relative hidden min-h-screen overflow-hidden p-5 lg:block xl:p-7">
                <div className="relative h-full min-h-[calc(100vh-2.5rem)] overflow-hidden rounded-[28px] border border-[#E7C9A5]/25 dark:border-[#B88A4B]/30">

                    <Image
                        src={imagesAddresses.images.loginPic}
                        alt="A welcoming reading atmosphere"
                        fill
                        priority
                        sizes="(min-width: 1280px) 50vw, 50vw"
                        className="object-cover transition-transform duration-[12000ms] hover:scale-105"
                    />

                    {/* Image overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C] via-[#0D0D0C]/25 to-[#0D0D0C]/10 dark:from-[#17130F]/90 dark:via-[#17130F]/20 dark:to-[#17130F]/10" />

                    <div className="absolute inset-0 bg-gradient-to-br from-[#E7C9A5]/10 via-transparent to-[#A87938]/20 dark:from-[#F8F2E6]/10 dark:to-[#B88A4B]/15" />

                    {/* Decorative rings */}
                    <div
                        aria-hidden="true"
                        className="absolute right-10 top-10 h-28 w-28 rounded-full border border-[#E7C9A5]/35 xl:right-14 xl:top-14 xl:h-36 xl:w-36"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute right-[72px] top-[72px] h-12 w-12 rounded-full border border-[#E7C9A5]/50 xl:right-[92px] xl:top-[92px] xl:h-16 xl:w-16"
                    />

                    {/* Image caption */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute inset-x-0 bottom-0 p-8 sm:p-10 xl:p-14"
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#E7C9A5]" />

                            <span className="text-[10px] uppercase tracking-[0.35em] text-[#E7C9A5] sm:text-xs">
                                A world between the pages
                            </span>
                        </div>

                        <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight text-white xl:text-5xl xl:leading-[1.2]">
                            A new password.
                            <br />
                            <span className="italic text-[#E7C9A5]">
                                A fresh chapter.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-md text-sm leading-7 text-white/75 xl:text-base">
                            Keep your account secure and return to the stories
                            waiting to be discovered. Your next chapter starts here.
                        </p>

                        <div className="mt-8 flex items-center gap-3">
                            <span className="h-1.5 w-8 rounded-full bg-[#E7C9A5]" />
                            <span className="h-1.5 w-2 rounded-full bg-white/50" />
                            <span className="h-1.5 w-2 rounded-full bg-white/50" />
                        </div>
                    </motion.div>

                    {/* Inner border accent */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-3 rounded-[20px] border border-white/10"
                    />
                </div>
            </aside>

        </main>
    );
};

export default ForgotPasswordPage;
