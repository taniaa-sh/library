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

const AdminForgetPass = () => {
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
                showToast("A reset link has been sent to your email", "success", true, undefined, true);
            } else {
                showToast("Failed to send reset link", "error", true, undefined, true);
                router.push(SiteUrls.adminResetPass)
            }
        } catch (error) {
            setLoading(false)
            showToast("Something went wrong", "error", true, undefined, true);
        }
    }

    return (
        <div className="w-full flex items-center flex-col lg:flex-row">
            <div className="w-full !min-h-screen bg-[url('/images/loginBg.png')] dark:bg-gray-800 bg-cover bg-center p-6 md:p-10 lg:p-20 flex items-center justify-center">
                <div className="dark:bg-gray-900 bg-gray-50 w-full max-w-md md:max-w-lg lg:max-w-none p-6 md:p-8 flex flex-col gap-6 rounded-lg">

                    {/* HEADER */}
                    <div className="flex flex-col justify-start items-start gap-1">
                        <Image
                            src={imagesAddresses.images.logo}
                            alt="logo"
                            width={120}
                            height={120}
                            className="!h-[20px] !w-[120px] lg:mx-0 hidden dark:block"
                        />
                        <Image
                            src={imagesAddresses.icons.FrameWhite}
                            alt="logo"
                            width={120}
                            height={120}
                            className="!h-[20px] !w-[120px] lg:mx-0 dark:hidden"
                        />
                        <h1 className="text-xl md:text-2xl font-bold dark:text-white text-black !mt-5">
                            Forgot Password
                        </h1>
                        <p className="dark:text-gray-400 text-gray-600 text-sm md:text-base font-normal -mt-1">
                            Enter your email and we will send you a reset link.
                        </p>
                    </div>

                    {/* FORM */}
                    <form
                        className="w-full flex flex-col gap-4 dark:text-white text-gray-900"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-1">
                            <label className="text-sm md:text-base lg:text-lg">Email</label>
                            <motion.input
                                {...register("email")}
                                className={`w-full dark:!bg-dark-300 !bg-gray-50 border border-gray-300 
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
                            color="blue"
                            containerClassName="w-full cursor-pointer flex text-nowrap mt-3"
                            loading={loading}
                        />
                    </form>

                    <div className="dark:text-white text-gray-900 text-[12px] md:text-sm font-normal self-center">
                        Remember your password?{" "}
                        <span
                            className="text-primary-admin dark:text-blue-200 text-sm font-normal cursor-pointer"
                            onClick={() => router.push(SiteUrls.adminLogin)}
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

export default AdminForgetPass