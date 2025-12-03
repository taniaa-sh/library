"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import imagesAddresses from "@/utils/imageAddresses"
import { useRouter } from "next/navigation"
import SiteUrls from "@/utils/routs"

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

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
                    <div className="bg-[#1a1f2c] dark:bg-gray-50 p-8 rounded-xl w-full max-w-md text-white dark:text-black flex flex-col gap-4">
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
                            className="lg:mx-0 dark:hidden"
                        />
                        <Image
                            src={imagesAddresses.icons.FrameWhite}
                            alt="logo"
                            width={120}
                            height={120}
                            className="lg:mx-0 hidden dark:block"
                        />
                        <h1 className="text-2xl font-bold text-start !mt-2">Forgot Password</h1>
                        <p className="text-gray-400 text-start text-sm !-mt-2">
                            Enter your email and we will send you a reset link.
                        </p>
                        <form className="flex flex-col gap-3 md:gap-4 lg:gap-5 mt-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="text-sm md:text-base lg:text-lg">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="bg-[#232839] dark:bg-gray-50 dark:border dark:border-gray-300 p-2 md:p-3 rounded-lg text-white dark:text-black text-sm md:text-base lg:text-lg"
                                    placeholder="your@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <Button
                                className="w-full cursor-pointer text-sm md:text-base lg:text-lg !text-black dark:!text-white"
                                type="submit"
                            >
                                {loading ? (
                                    <span className='w-4 h-4 rounded-full border-1 border-t-0 border-black dark:border-white animate-spin' />
                                ) : (
                                    "Send Reset Link"
                                )}
                            </Button>
                        </form>

                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative w-full h-screen">
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

export default ForgotPasswordPage
