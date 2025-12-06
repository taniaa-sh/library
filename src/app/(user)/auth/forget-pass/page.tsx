"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import imagesAddresses from "@/utils/imageAddresses"
import { useRouter } from "next/navigation"
import SiteUrls from "@/utils/routs"
import CustomButton from "@/components/CustomButton"

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
            toast.error("Please enter your email")
            return
        }
        setLoading(true)
        const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({ email }),
        })

        setLoading(false)

        if (res.ok) {
            toast.success("A reset link has been sent to your email")
        } else {
            // toast.error("Failed to send reset link")
            router.push(SiteUrls.resetPass)
        }
    }

    return (
        <div className="w-full flex items-center flex-col lg:flex-row">
            <div className="w-full h-screen bg-[url('/images/loginBg.png')] bg-cover bg-center p-6 md:p-10 lg:p-20 flex items-center justify-center">
                <div className=" flex items-center justify-center">
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
                        <h1 className="text-2xl font-bold text-start !mt-2">Forgot Password</h1>
                        <p className="text-gray-400 text-start text-sm !-mt-2">
                            Enter your email and we will send you a reset link.
                        </p>
                        <form
                            className="flex flex-col gap-3 md:gap-4 lg:gap-5 mt-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="email"
                                    className="text-sm md:text-base lg:text-lg"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg text-white dark:text-black text-sm md:text-base lg:text-lg"
                                    placeholder="your@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <CustomButton
                                type="submit"
                                text="Send Reset Link"
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

export default ForgotPasswordPage
