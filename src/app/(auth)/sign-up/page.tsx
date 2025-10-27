"use client"

import { Button } from '@/components/ui/button'
import imagesAddresses from '@/utils/imageAddresses'
import SiteUrls from '@/utils/routs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const SignUp = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [universityIDNumber, setUniversityIDNumber] = useState("")
  // const [idCard, setIdCard] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: firstName,
        email,
        universityId: universityIDNumber
      })
    });

    if (res.ok) {
      toast.success("Account created successfully");
      router.push(SiteUrls.signIn);
    } else {
      const error = await res.json();
      toast.error(error.error);
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setIsLoading(false);
  }
}

  return (
    <div className="w-full flex items-center flex-col lg:flex-row overflow-y-hidden">
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
              Create Your Library Account
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-normal text-center lg:text-left -mt-2">
              Please complete all fields and upload a valid university ID to gain access to the library
            </p>
          </div>

          <form className="w-full flex flex-col gap-3 text-white">
            <div className="flex flex-col gap-1">
              <label htmlFor="fullname" className="text-sm">Full Name</label>
              <input
                id="fullname"
                className="w-full bg-[#232839] p-3 rounded-lg placeholder-gray-400"
                type="text"
                placeholder="Enter your full name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

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

            {/* <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm">Password</label>
              <input
                id="password"
                className="w-full bg-[#232839] p-3 rounded-lg placeholder-gray-400"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> */}

            {/* <div className="flex flex-col gap-1">
              <label htmlFor="idCard" className="text-sm">Upload University ID Card</label>
              <input
                id="idCard"
                className="w-full bg-[#232839] p-3 rounded-lg placeholder-gray-400"
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log("Selected file:", file.name);
                    setIdCard(file)
                  }
                }}
              />
            </div> */}
          </form>

          <Button
            className="w-full cursor-pointer"
            onClick={handleSignUp}
          >
            {
              isLoading ? (
               <span className='w-4 h-4 border-1 border-black rounded-full border-t-0 animate-spin'></span>
              ) : (
                "Sign Up"
              )
            }
          </Button>

          <div className="text-white text-sm font-normal self-center">
            Have an account already?{"  "}
            <span
              className="text-light-200 text-sm font-normal cursor-pointer"
              onClick={() => router.push(SiteUrls.signIn)}
            >
              Login
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

export default SignUp
