'use client'

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
    password: yup.string().min(8, "Password must be at least 8 characters").required('Password is required'),
    confirmPass: yup.string().min(8, "Confirm Password must be at least 8 characters").required('Confirm Password is required'),
}).required();

type ResetPasswordFormData = {
    password: string
    confirmPass: string
}

const AdminResetPass = () => {
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<ResetPasswordFormData>({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        setLoading(true)

        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            body: JSON.stringify({ password: data.password }),
        })

        setLoading(false)

        if (res.ok) {
            toast.success("Password updated successfully")
            router.push(SiteUrls.signIn)
        } else {
            router.push(SiteUrls.signIn)
        }
    }

    return (
        <div className="w-full flex items-center flex-col lg:flex-row">
            {/* Left Section */}
            <div className="w-full !min-h-screen bg-[url('/images/loginBg.png')] dark:bg-gray-800 bg-cover bg-center p-6 md:p-10 lg:p-20 flex items-center justify-center">
                <div className="w-full flex items-center justify-center">
                    <div className="dark:bg-gray-900 bg-gray-50 w-full max-w-md md:max-w-lg lg:max-w-none p-6 md:p-8 flex flex-col gap-6 rounded-lg dark:text-white text-black">

                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
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
                                    className="!h-[20px] !w-[120px]lg:mx-0 dark:hidden"
                                />
                            </div>
                            <div>
                                <Image
                                    src={imagesAddresses.icons.arrowRightWhite}
                                    alt="back"
                                    width={25}
                                    height={20}
                                    className="cursor-pointer hidden dark:flex"
                                    onClick={() => router.back()}
                                />
                                <Image
                                    src={imagesAddresses.icons.arrowRightBlack}
                                    alt="back"
                                    width={25}
                                    height={20}
                                    className="cursor-pointer dark:hidden"
                                    onClick={() => router.back()}
                                />
                            </div>
                        </div>

                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mt-2 text-start">Reset Password</h1>
                        <p className="dark:text-gray-400 text-gray-600 text-sm md:text-base lg:text-lg text-start -mt-1">
                            Enter your new password below
                        </p>

                        {/* Form */}
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {/* New Password */}
                            <div className="flex flex-col gap-1 relative">
                                <label className="text-sm md:text-base lg:text-lg">New Password</label>
                                <input
                                    type={showPass ? "text" : "password"}
                                    maxLength={30}
                                    placeholder="Enter new password"
                                    {...register("password")}
                                    className={`w-full dark:!bg-dark-300 !bg-gray-50 border border-gray-300 p-2 md:p-3 rounded-lg dark:text-white text-gray-700 text-sm md:text-base lg:text-lg ${errors.password ? "border border-red-500" : ""}`}
                                />
                                {(watch("password") || "").length > 0 && (
                                    <>
                                        <Image
                                            src={showPass ? imagesAddresses.icons.blindBlack : imagesAddresses.icons.eyeBlack}
                                            alt="eye"
                                            width={20}
                                            height={20}
                                            className="absolute top-8 md:top-12 right-3 cursor-pointer dark:hidden"
                                            onClick={() => setShowPass(!showPass)}
                                        />
                                        <Image
                                            src={showPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                                            alt="eye"
                                            width={20}
                                            height={20}
                                            className="absolute top-8 md:top-12 right-3 cursor-pointer dark:block hidden"
                                            onClick={() => setShowPass(!showPass)}
                                        />
                                    </>
                                )}
                                {errors.password && (
                                    <span className="text-red-500 text-xs md:text-sm lg:text-base">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col gap-1 relative">
                                <label className="text-sm md:text-base lg:text-lg">Confirm Password</label>
                                <input
                                    type={showConfirmPass ? "text" : "password"}
                                    maxLength={30}
                                    placeholder="Repeat new password"
                                    {...register("confirmPass")}
                                    className={`w-full dark:!bg-dark-300 !bg-gray-50 border border-gray-300 p-2 md:p-3 rounded-lg dark:text-white text-gray-700 text-sm md:text-base lg:text-lg ${errors.confirmPass ? "border border-red-500" : ""}`}
                                />
                                {(watch("confirmPass") || "").length > 0 && (
                                    <>
                                        <Image
                                            src={showConfirmPass ? imagesAddresses.icons.blindBlack : imagesAddresses.icons.eyeBlack}
                                            alt="eye"
                                            width={20}
                                            height={20}
                                            className="absolute top-8 md:top-12 right-3 cursor-pointer dark:hidden"
                                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                                        />
                                        <Image
                                            src={showConfirmPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                                            alt="eye"
                                            width={20}
                                            height={20}
                                            className="absolute top-8 md:top-12 right-3 cursor-pointer dark:block hidden"
                                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                                        />
                                    </>
                                )}
                                {errors.confirmPass && (
                                    <span className="text-red-500 text-xs md:text-sm lg:text-base">
                                        {errors.confirmPass.message}
                                    </span>
                                )}
                            </div>

                            {/* Submit */}
                            <CustomButton
                                type="submit"
                                text="Reset Password"
                                color="blue"
                                containerClassName="w-full cursor-pointer flex text-nowrap mt-3"
                                loading={loading}
                            />
                        </form>

                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="hidden lg:block relative w-full h-screen">
                <Image
                    src={imagesAddresses.images.loginPic}
                    alt="loginPic"
                    fill
                    className="object-cover rounded-lg"
                    priority
                />
            </div>
        </div>
    )
}

export default AdminResetPass
