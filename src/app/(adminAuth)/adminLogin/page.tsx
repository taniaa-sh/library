"use client"

import imagesAddresses from '@/utils/imageAddresses'
import SiteUrls from '@/utils/routs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { signIn, getSession } from "next-auth/react"
import { toast } from 'sonner'
import AdminButton from '@/app/admin/components/AdminButton'

const AdminSignIn = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [showPass, setShowPass] = useState<boolean>(false)
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeAdmin");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!email || !password) {
      toast.error("Please enter email and password")
      setLoading(false)
      return
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      toast.error("Invalid email or password")
      setLoading(false)
      return
    }

    const sessionData = await getSession()

    if (sessionData?.user?.role === "admin") {
      router.push(SiteUrls.admin)
    } else {
      router.push(SiteUrls.dashbord)
    }

    setLoading(false)
  }

  return (
    <div className="w-full flex items-center flex-col lg:flex-row">
      <div className="w-full h-screen bg-[url('/images/loginBg.png')] bg-cover bg-center bg-gray-100 dark:bg-black p-6 md:p-10 lg:p-20 flex items-center justify-center">
        <div className="bg-white dark:bg-[#020817] w-full max-w-md  p-6 md:p-8 lg:p-10 flex flex-col gap-8 rounded-lg">
          <div className="flex flex-col justify-start items-start gap-1">
            <Image
              src={imagesAddresses.images.adminLogo}
              alt="logo"
              width={120}
              height={120}
              className="lg:mx-0 dark:hidden"
            />
            <Image
              src={imagesAddresses.images.logo}
              alt="logo"
              width={120}
              height={120}
              className="lg:mx-0 hidden dark:block"
            />
            <h1 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white lg:text-left !mt-5">
              Welcome Back to the BookWise
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-base font-normal lg:text-left -mt-2">
              Access the vast collection of resources, and stay updated
            </p>
          </div>

          <form className="w-full flex flex-col gap-3 text-gray-800 dark:text-white">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm md:text-base lg:text-lg">Email</label>
              <input
                id="email"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F9FAFB] dark:bg-[#1e293b] text-sm sm:text-base cursor-pointer"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="text-sm md:text-base lg:text-lg">Password</label>
              <input
                id="password"
                maxLength={8}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F9FAFB] dark:bg-[#1e293b] text-sm sm:text-base cursor-pointer"
                type={showPass ? "text" : "password"}
                placeholder="At least 8 characters long"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Image
                src={showPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                alt="eye"
                width={20}
                height={20}
                className={`absolute top-8 md:top-12 right-3 cursor-pointer ${password.length > 0 ? "block" : "hidden"}`}
                onClick={() => setShowPass(!showPass)}
              />
              <p
                className='self-end text-xs md:text-sm text-[#25388c] dark:text-[#3a4fae] cursor-pointer'
                onClick={() => { router.push(SiteUrls.forgetPass) }}
              >
                forget your password ?
              </p>
            </div>
          </form>

          <AdminButton
            color='blue'
            onClick={handleLogin}
            text="Login"
            width="w-full"
            type="submit"
            loading={loading}
          />

          <div className="text-gray-600 dark:text-gray-400 text-[12px] md:text-sm font-normal self-center">
            Don’t have an account already?{" "}
            <span
              className="text-[#25388c] dark:text-[#3a4fae] text-sm font-normal cursor-pointer"
              onClick={() => router.push(SiteUrls.signUp)}
            >
              Register here
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSignIn