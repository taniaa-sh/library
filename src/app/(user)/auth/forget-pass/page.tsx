"use client"

import { useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import imagesAddresses from "@/utils/imageAddresses"
import { useRouter } from "next/navigation"
import SiteUrls from "@/utils/routs"
import CustomButton from "@/components/CustomButton"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"

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
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: SignUpFormData) => {
        setLoading(true)

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email: data.email }),
            })

            setLoading(false)

            if (res.ok) {
                toast.success("A reset link has been sent to your email")
            } else {
                toast.error("Failed to send reset link")
                router.push(SiteUrls.resetPass)
            }
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="w-full flex items-center flex-col lg:flex-row">
            <div className="w-full h-screen bg-[url('/images/loginBg.png')] bg-cover bg-center p-6 md:p-10 lg:p-20 flex items-center justify-center">
                <div className="flex items-center justify-center">
                    <div className="bg-gray-900 dark:bg-gray-50 p-6 md:p-8 rounded-xl w-full max-w-md text-white dark:text-black flex flex-col gap-4">

                        <div className="flex justify-between">
                            <div>
                                <Image
                                    src={imagesAddresses.images.logo}
                                    alt="logo"
                                    width={120}
                                    height={120}
                                    className="lg:mx-0 dark:hidden"
                                />
                                <Image
                                    src={imagesAddresses.icons.FrameWhite}
                                    alt="logo"
                                    width={120}
                                    height={120}
                                    className="lg:mx-0 hidden dark:block"
                                />
                            </div>

                            <div>
                                <Image
                                    src={imagesAddresses.icons.arrowRightYellow2}
                                    alt="logo"
                                    width={25}
                                    height={20}
                                    className="cursor-pointer dark:hidden"
                                    onClick={() => router.back()}
                                />
                                <Image
                                    src={imagesAddresses.icons.arrowRightYellow}
                                    alt="logo"
                                    width={25}
                                    height={20}
                                    className="cursor-pointer hidden dark:flex"
                                    onClick={() => router.back()}
                                />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-start !mt-2">Forgot Password</h1>
                        <p className="text-gray-400 text-start text-sm !-mt-2">
                            Enter your email and we will send you a reset link.
                        </p>

                        <form
                            className="flex flex-col gap-3 md:gap-4 lg:gap-5 mt-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="text-sm md:text-base lg:text-lg">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    className="bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg text-white dark:text-black text-sm md:text-base lg:text-lg"
                                    placeholder="your@email.com"
                                    {...register("email")}
                                />

                                {errors.email && (
                                    <span className="text-red-500 text-xs">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            <CustomButton
                                type="submit"
                                text="Send Reset Link"
                                color="yellow"
                                containerClassName="w-full cursor-pointer flex text-nowrap !mt-4"
                                loading={loading}
                            />
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative w-full h-screen">
                <Image
                    src={imagesAddresses.images.loginPic}
                    alt="logo"
                    fill
                />
            </div>
        </div>
    )
}

export default ForgotPasswordPage
