"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import imagesAddresses from "@/utils/imageAddresses"
import { useRouter } from "next/navigation"
import SiteUrls from "@/utils/routs"

export default function ResetPasswordPage() {

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
                    <div className="bg-[#1a1f2c] p-6 md:p-8 lg:p-10 rounded-xl w-full max-w-md text-white flex flex-col gap-4 md:gap-5 lg:gap-6">
                        {/* Back arrow */}
                        <Image
                            src={imagesAddresses.icons.arrowRightYellow2}
                            alt="back"
                            width={25}
                            height={20}
                            className="self-end cursor-pointer"
                            onClick={() => router.back()}
                        />

                        {/* Logo */}
                        <Image
                            src={imagesAddresses.images.logo}
                            alt="logo"
                            width={120}
                            height={120}
                            className="lg:mx-0"
                        />

                        {/* Heading */}
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mt-2 text-start">
                            Reset Password
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base lg:text-lg text-start -mt-1">
                            Enter your new password below
                        </p>

                        {/* Form */}
                        <form className="flex flex-col gap-3 md:gap-4 lg:gap-5 mt-4" onSubmit={handleSubmit}>
                            {/* New Password */}
                            <div className="flex flex-col gap-1 relative">
                                <label htmlFor="password" className="text-sm md:text-base lg:text-lg">New Password</label>
                                <input
                                    id="password"
                                    type={showPass ? "text" : "password"}
                                    maxLength={30}
                                    className="bg-[#232839] p-2 md:p-3 lg:p-4 rounded-lg text-white text-sm md:text-base lg:text-lg"
                                    placeholder="Enter new password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Image
                                    src={showPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                                    alt="eye"
                                    width={20}
                                    height={20}
                                    className={`absolute top-10 right-3 cursor-pointer ${password.length > 0 ? "block" : "hidden"}`}
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
                                    className="bg-[#232839] p-2 md:p-3 lg:p-4 rounded-lg text-white text-sm md:text-base lg:text-lg"
                                    placeholder="Repeat new password"
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                />
                                <Image
                                    src={showConfirmPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                                    alt="eye"
                                    width={20}
                                    height={20}
                                    className={`absolute top-10 right-3 cursor-pointer ${confirmPass.length > 0 ? "block" : "hidden"}`}
                                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                className="w-full cursor-pointer text-sm md:text-base lg:text-lg !text-black"
                                type="submit"
                            >
                                {loading ? (
                                    <span className='w-4 h-4 rounded-full border-1 border-t-0 border-black animate-spin' />
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

            </div>

            <div className="hidden lg:block relative w-full h-[960px]">
                <Image
                    src={imagesAddresses.images.loginPic}
                    alt="logo"
                    fill
                    className="object-cover rounded-lg" sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                />
            </div>
        </div>
    )
}
