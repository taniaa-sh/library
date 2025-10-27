"use client"

import { Button } from '@/components/ui/button'
import imagesAddresses from '@/utils/imageAddresses'
import SiteUrls from '@/utils/routs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import { toast } from 'sonner'

const SignIn = () => {

  const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [universityIDNumber, setUniversityIDNumber] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!email || !universityIDNumber) {
      toast.error("Please enter email and password")
      return
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      universityIDNumber,
    })

    if (res?.error) {
      toast.error("Invalid email or password")
    } else {
      router.push(SiteUrls.dashbord)
    }

    setLoading(false)
  }

  return (
    <div className="w-full flex items-center flex-col lg:flex-row">
      <div className="w-full h-screen bg-[url('/images/loginBg.png')] bg-cover bg-center p-6 md:p-10 lg:p-20 flex items-center justify-center">
        <div className="bg-gray-900 w-full max-w-md md:max-w-lg lg:max-w-none p-6 md:p-8 lg:p-10 flex flex-col gap-8 rounded-lg">
          <div className="flex flex-col gap-5">
            <Image
              src={imagesAddresses.images.logo}
              alt="logo"
              width={120}
              height={120}
              className="mx-auto lg:mx-0"
            />
            <h1 className="text-xl md:text-2xl font-bold text-white text-center lg:text-left">
              Welcome Back to the BookWise
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-normal text-center lg:text-left -mt-2">
              Access the vast collection of resources, and stay updated
            </p>
          </div>

          <form className="w-full flex flex-col gap-3 text-white">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm">Email</label>
              <input
                id="email"
                className="w-full bg-[#232839] p-3 rounded-lg placeholder-gray-400"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm">Password</label>
              <input
                maxLength={11}
                id="password"
                className="w-full bg-[#232839] p-3 rounded-lg placeholder-gray-400"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> */}
            <div className="flex flex-col gap-1">
              <label htmlFor="universityId" className="text-sm">University ID Number</label>
              <input
                id="universityId"
                maxLength={11}
                className="w-full bg-[#232839] p-3 rounded-lg placeholder-gray-400"
                type="text"
                placeholder="Enter your university ID number"
                onChange={(e) => setUniversityIDNumber(e.target.value)}
              />
            </div>
          </form>

          <Button
            className="w-full cursor-pointer"
            onClick={handleLogin}
          >
            {
              loading ? (
                <span className='w-4 h-4 rounded-full border-1 border-t-0 border-black animate-spin' />
              ) : (
                "Login"
              )
            }
          </Button>

          <div className="text-white text-sm font-normal self-center">
            Don’t have an account already?{" "}
            <span
              className="text-light-200 text-sm font-normal cursor-pointer"
              onClick={() => router.push(SiteUrls.signUp)}
            >
              Register here
            </span>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-full h-[960px]">
        <Image
          src={imagesAddresses.images.loginPic}
          alt="logo"
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  )
}

export default SignIn