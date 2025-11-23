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
                    <div className="bg-[#1a1f2c] p-8 rounded-xl w-full max-w-md text-white flex flex-col gap-4">
                        <Image
                            src={imagesAddresses.icons.arrowRightYellow2}
                            alt="logo"
                            width={25}
                            height={20}
                            className="text-end self-end justify-end flex items-end cursor-pointer"
                            onClick={() => router.back()}
                        />
                        <Image
                            src={imagesAddresses.images.logo}
                            alt="logo"
                            width={120}
                            height={120}
                            className="lg:mx-0"
                        />
                        <h1 className="text-2xl font-bold text-start !mt-2">Reset Password</h1>
                        <p className="text-gray-400 text-start text-sm !-mt-3">
                            Enter your new password below
                        </p>

                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-1 relative">
                                <label className="text-sm" htmlFor="password">New Password</label>
                                <input
                                    id="password"
                                    type={showPass ? "text" : "password"}
                                    maxLength={30}
                                    className="bg-[#232839] p-3 rounded-lg text-white"
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

                            <div className="flex flex-col gap-1 relative">
                                <label className="text-sm" htmlFor="confirm">Confirm Password</label>
                                <input
                                    id="confirm"
                                    type={showConfirmPass ? "text" : "password"}
                                    maxLength={30}
                                    className="bg-[#232839] p-3 rounded-lg text-white"
                                    placeholder="Repeat new password"
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                />
                                <Image
                                    src={showConfirmPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                                    alt="eye"
                                    width={20}
                                    height={20}
                                    className={`absolute top-10 right-3 cursor-pointer ${confirmPass.length > 0 ? "block" : "hidden"}`}
                                    onClick={() => setShowConfirmPass(!showPass)}
                                />
                            </div>

                            <Button
                                className="w-full cursor-pointer !text-black"
                                onClick={() => { }}
                            >
                                {loading ?
                                    <span className='w-4 h-4 rounded-full border-1 border-t-0 border-black animate-spin' /> :
                                    "Reset Password"
                                }
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
