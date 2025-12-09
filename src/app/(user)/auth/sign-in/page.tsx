"use client"

import imagesAddresses from '@/utils/imageAddresses'
import SiteUrls from '@/utils/routs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { signIn, getSession } from "next-auth/react"
import { toast } from 'sonner'
import CustomButton from '@/components/CustomButton'

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [showPass, setShowPass] = useState<boolean>(false)
  const [password, setPassword] = useState("")
  const router = useRouter()

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
      <div className="w-full !min-h-screen bg-[url('/images/loginBg.png')] bg-cover bg-center p-6 md:p-10 lg:p-20 flex items-center justify-center">
        <div className="bg-gray-900 dark:bg-gray-50 w-full max-w-md md:max-w-lg lg:max-w-none p-6 md:p-8 flex flex-col gap-8 rounded-lg">
          <div className="flex flex-col justify-start items-start gap-1">
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
            <h1 className="text-xl md:text-2xl font-bold text-white dark:text-black lg:text-left !mt-5">
              Welcome Back to the BookWise
            </h1>
            <p className="text-gray-400 dark:text-gray-600 text-sm md:text-base font-normal lg:text-left -mt-2">
              Access the vast collection of resources, and stay updated
            </p>
          </div>

          <form className="w-full flex flex-col gap-3 text-white dark:text-gray-900">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm md:text-base lg:text-lg">Email</label>
              <input
                id="email"
                className="w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 md:p-3 rounded-lg placeholder-gray-400 text-sm md:text-base lg:text-lg"
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
                className="w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 md:p-3 rounded-lg placeholder-gray-400 text-sm md:text-base lg:text-lg"
                type={showPass ? "text" : "password"}
                placeholder="At least 8 characters long"
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 &&
                <>
                  <Image
                    src={showPass ? imagesAddresses.icons.blindBlack : imagesAddresses.icons.eyeBlack}
                    alt="eye"
                    width={20}
                    height={20}
                    className={`absolute top-8 md:top-12 right-3 cursor-pointer dark:block hidden`}
                    onClick={() => setShowPass(!showPass)}
                  />
                  <Image
                    src={showPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                    alt="eye"
                    width={20}
                    height={20}
                    className={`absolute top-8 md:top-12 right-3 cursor-pointer dark:hidden`}
                    onClick={() => setShowPass(!showPass)}
                  />
                </>
              }

              <p
                className='self-end text-xs md:text-sm text-gold100 dark:text-gold700 cursor-pointer'
                onClick={() => { router.push(SiteUrls.forgetPass) }}
              >
                forget your password ?
              </p>
            </div>
          </form>

          <CustomButton
            text="Login"
            color="yellow"
            containerClassName="w-full cursor-pointer flex text-nowrap"
            loading={loading}
            onClick={handleLogin}
          />

          <div className="text-white dark:text-gray-900 text-[12px] md:text-sm font-normal self-center">
            Don’t have an account already?{" "}
            <span
              className="text-gold100 dark:text-gold700 text-sm font-normal cursor-pointer"
              onClick={() => router.push(SiteUrls.signUp)}
            >
              Register here
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

export default SignIn