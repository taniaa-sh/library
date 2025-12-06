"use client"

import DragAndDropUpload from '@/app/admin/(root)/allBooks/_components/DragAndDropUpload'
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
  const [firstName, setFirstName] = useState("")
  const [universityIDNumber, setUniversityIDNumber] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showUniversityId, setShowUniversityId] = useState(false)
  const [showPass, setShowPass] = useState(false)

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
            <h1 className="text-xl md:text-2xl font-bold text-white dark:text-black lg:text-left !mt-2">
              Create Your Library Account
            </h1>
            <p className="text-gray-400 dark:text-gray-600 text-sm md:text-base font-normal lg:text-left -mt-2">
              Please complete all fields and upload a valid university ID to gain access to the library
            </p>
          </div>

          <form className="w-full flex flex-col gap-3 md:gap-4 lg:gap-6 text-white dark:text-gray-900">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="fullname" className="text-sm md:text-base lg:text-lg">Full Name</label>
              <input
                id="fullname"
                className="w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg placeholder-gray-400 text-sm md:text-base lg:text-lg"
                type="text"
                placeholder="Enter your full name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm md:text-base lg:text-lg">Email</label>
              <input
                id="email"
                className="w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg placeholder-gray-400 text-sm md:text-base lg:text-lg"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* University ID */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="universityId" className="text-sm md:text-base lg:text-lg">University ID Number</label>
              <input
                id="universityId"
                maxLength={11}
                className="w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg placeholder-gray-400 text-sm md:text-base lg:text-lg"
                type={showUniversityId ? "text" : "password"}
                placeholder="Enter your university ID number"
                onChange={(e) => setUniversityIDNumber(e.target.value)}
              />
              <Image
                src={showUniversityId ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                alt="eye"
                width={20}
                height={20}
                className={`absolute top-8 md:top-12 right-3 cursor-pointer ${universityIDNumber.length > 0 ? "block" : "hidden"}`}
                onClick={() => setShowUniversityId(!showUniversityId)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="text-sm md:text-base lg:text-lg">Password</label>
              <input
                id="password"
                className="w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg placeholder-gray-400 text-sm md:text-base lg:text-lg"
                type={showPass ? "text" : "password"}
                maxLength={8}
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
            </div>

            {/* Upload University ID */}
            <div className="flex flex-col gap-1">
              <label htmlFor="upload" className="text-sm md:text-base lg:text-lg">Upload University ID Card</label>
              <DragAndDropUpload
                type="image"
                onChange={() => { }}
              />
            </div>
          </form>

          {/* Sign Up Button */}
          <Button
            className="w-full cursor-pointer text-sm md:text-base lg:text-lg"
            onClick={handleSignUp}
          >
            {isLoading ? (
              <span className='w-4 h-4 border-1 border-black rounded-full border-t-0 animate-spin'></span>
            ) : (
              "Sign Up"
            )}
          </Button>

          {/* Login Redirect */}
          <div className="text-white dark:text-gray-900 text-xs md:text-sm lg:text-base font-normal self-center">
            Have an account already?{" "}
            <span
              className="text-gold-100 dark:text-gold-200 text-sm md:text-base cursor-pointer"
              onClick={() => router.push(SiteUrls.signIn)}
            >
              Login
            </span>
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

export default SignUp
