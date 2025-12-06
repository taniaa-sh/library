"use client"

import { useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import imagesAddresses from "@/utils/imageAddresses"
import { useRouter } from "next/navigation"
import SiteUrls from "@/utils/routs"
import CustomButton from "@/components/CustomButton"

const ResetPasswordPage = () => {

    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!password || !confirmPass) {
            toast.error("Please fill both fields")
            return
        }

        if (password !== confirmPass) {
            toast.error("Passwords do not match")
            return
        }

        setLoading(true)

        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            body: JSON.stringify({ password }),
        })

        setLoading(false)

        if (res.ok) {
            toast.success("Password updated successfully")
            router.push(SiteUrls.signIn)
        } else {
            // toast.error("Reset failed")
            router.push(SiteUrls.signIn)
        }
    }

    return (
        <div className="w-full flex items-center flex-col lg:flex-row">
            <div className="w-full h-screen bg-[url('/images/loginBg.png')] bg-cover bg-center p-6 md:p-10 lg:p-20 flex items-center justify-center">
                <div className="flex items-center justify-center w-full">
                    <div className="bg-gray-900 dark:bg-gray-50 p-6 md:p-8 rounded-xl w-full max-w-md text-white dark:text-black flex flex-col gap-4 md:gap-5 lg:gap-6">
                        {/* Back arrow */}
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
                                    className="text-end self-end justify-end flex items-end cursor-pointer dark:hidden"
                                    onClick={() => router.back()}
                                />
                                <Image
                                    src={imagesAddresses.icons.arrowRightYellow}
                                    alt="logo"
                                    width={25}
                                    height={20}
                                    className="text-end self-end justify-end items-end cursor-pointer hidden dark:flex"
                                    onClick={() => router.back()}
                                />
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mt-2 text-start">
                            Reset Password
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base lg:text-lg text-start -mt-1">
                            Enter your new password below
                        </p>

                        {/* Form */}
                        <form
                            className="flex flex-col gap-3 md:gap-4 lg:gap-5 mt-4"
                            onSubmit={handleSubmit}
                        >
                            {/* New Password */}
                            <div className="flex flex-col gap-1 relative">
                                <label
                                    htmlFor="password"
                                    className="text-sm md:text-base lg:text-lg"
                                >
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type={showPass ? "text" : "password"}
                                    maxLength={30}
                                    className="bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg text-white dark:text-gray-700 text-sm md:text-base lg:text-lg"
                                    placeholder="Enter new password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Image
                                    src={showConfirmPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                                    alt="eye"
                                    width={20}
                                    height={20}
                                    className={`absolute top-8 md:top-12 right-3 cursor-pointer ${confirmPass.length > 0 ? "block" : "hidden"} dark:hidden`}
                                    onClick={() => setShowPass(!showPass)}
                                />
                                <Image
                                    src={showConfirmPass ? imagesAddresses.icons.blindBlack : imagesAddresses.icons.eyeBlack}
                                    alt="eye"
                                    width={20}
                                    height={20}
                                    className={`absolute top-8 md:top-12 right-3 cursor-pointer ${confirmPass.length > 0 ? "block" : "hidden"} hidden dark:block`}
                                    onClick={() => setShowPass(!showPass)}
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col gap-1 relative">
                                <label htmlFor="confirm" className="text-sm md:text-base lg:text-lg">Confirm Password</label>
                                <input
                                    id="confirm"
                                    type={showConfirmPass ? "text" : "password"}
                                    maxLength={30}
                                    className="bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg text-white dark:text-gray-700 text-sm md:text-base lg:text-lg"
                                    placeholder="Repeat new password"
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                />
                                <Image
                                    src={showConfirmPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                                    alt="eye"
                                    width={20}
                                    height={20}
                                    className={`absolute top-8 md:top-12 right-3 cursor-pointer ${confirmPass.length > 0 ? "block" : "hidden"} dark:hidden`}
                                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                                />
                                <Image
                                    src={showConfirmPass ? imagesAddresses.icons.blindBlack : imagesAddresses.icons.eyeBlack}
                                    alt="eye"
                                    width={20}
                                    height={20}
                                    className={`absolute top-8 md:top-12 right-3 cursor-pointer ${confirmPass.length > 0 ? "block" : "hidden"} hidden dark:block`}
                                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                                />
                            </div>

                            {/* Submit Button */}
                            <CustomButton
                                type="submit"
                                text="Reset Password"
                                color="yellow"
                                containerClassName="w-full cursor-pointer flex text-nowrap"
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

export default ResetPasswordPage