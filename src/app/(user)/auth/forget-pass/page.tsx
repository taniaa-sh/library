'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import imagesAddresses from "@/utils/imageAddresses"
import { useRouter } from "next/navigation"
import SiteUrls from "@/utils/routs"
import CustomButton from "@/components/CustomButton"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { motion } from 'framer-motion';
import showToast from "@/utils/toast"

const schema = yup.object({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
}).required()

type SignUpFormData = {
    email: string
}

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false)
    const [shakeTrigger, setShakeTrigger] = useState(0);
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setShakeTrigger((prev) => prev + 1);
        }
    }, [errors]);

    const onSubmit = async (data: SignUpFormData) => {
        setLoading(true)

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email: data.email }),
            })

            setLoading(false)

            if (res.ok) {
                showToast("A reset link has been sent to your email", "success");
            } else {
                showToast("Failed to send reset link", "error");
                router.push(SiteUrls.resetPass)
            }
        } catch (error) {
            setLoading(false)
            showToast("Something went wrong", "error");
        }
    }

    return (
        <div className="w-full flex items-center flex-col lg:flex-row">
            <div className="w-full !min-h-screen bg-[url('/images/loginBg.png')] bg-cover bg-center p-6 md:p-10 lg:p-20 flex items-center justify-center">
                <div className="bg-gray-900 dark:bg-gray-50 w-full max-w-md md:max-w-lg lg:max-w-none p-6 md:p-8 flex flex-col gap-6 rounded-lg">

                    {/* HEADER */}
                    <div className="flex flex-col justify-start items-start gap-1">
                        <Image
                            src={imagesAddresses.images.logo}
                            alt="logo"
                            width={120}
                            height={120}
                            className="!h-[20px] !w-[120px] lg:mx-0 dark:hidden"
                        />
                        <Image
                            src={imagesAddresses.icons.FrameWhite}
                            alt="logo"
                            width={120}
                            height={120}
                            className="!h-[20px] !w-[120px] lg:mx-0 hidden dark:block"
                        />
                        <h1 className="text-xl md:text-2xl font-bold text-white dark:text-black !mt-5">
                            Forgot Password
                        </h1>
                        <p className="text-gray-400 dark:text-gray-600 text-sm md:text-base font-normal -mt-1">
                            Enter your email and we will send you a reset link.
                        </p>
                    </div>

                    {/* FORM */}
                    <form
                        className="w-full flex flex-col gap-4 text-white dark:text-gray-900"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-1">
                            <label className="text-sm md:text-base lg:text-lg">Email</label>
                            <motion.input
                                {...register("email")}
                                className={`w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 
                                p-2 md:p-3 rounded-lg placeholder-gray-400 text-sm md:text-base lg:text-lg
                                ${errors.email ? "border border-red-500" : ""}`}
                                type="email"
                                placeholder="Enter your email"
                                animate={errors.email ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                                key={shakeTrigger}
                                transition={{ duration: 0.4 }}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message?.toString()}
                                </p>
                            )}
                        </div>

                        <CustomButton
                            type="submit"
                            text="Send Reset Link"
                            color="yellow"
                            containerClassName="w-full cursor-pointer flex text-nowrap mt-3"
                            loading={loading}
                        />
                    </form>

                    <div className="text-white dark:text-gray-900 text-[12px] md:text-sm font-normal self-center">
                        Remember your password?{" "}
                        <span
                            className="text-gold100 dark:text-gold700 text-sm font-normal cursor-pointer"
                            onClick={() => router.push(SiteUrls.signIn)}
                        >
                            Login here
                        </span>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative w-full h-screen">
                <Image
                    src={imagesAddresses.images.loginPic}
                    alt="logo"
                    fill
                    className="object-cover rounded-lg"
                    priority
                />
            </div>
        </div>
    )
}

export default ForgotPasswordPage
