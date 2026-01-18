"use client"

import imagesAddresses from '@/utils/imageAddresses'
import SiteUrls from '@/utils/routs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form'

const schema = yup.object({
  email: yup.string().email("Invalid email format").required('Email is required'),
  password: yup.string().min(8, "Password must be at least 8 characters").required('Password is required'),
}).required();

type SignInFormData = {
  email: string;
  password: string;
};

const AdminLogin = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showPass, setShowPass] = useState<boolean>(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: SignInFormData) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  return (
    <div className="w-full flex items-center flex-col lg:flex-row">
      <div className="w-full !min-h-screen bg-[url('/images/loginBg.png')] dark:bg-gray-800 bg-cover bg-center p-6 md:p-10 lg:p-20 flex items-center justify-center">
        <div className="dark:bg-gray-900 bg-gray-50 w-full max-w-md md:max-w-lg lg:max-w-none p-6 md:p-8 flex flex-col gap-8 rounded-lg">

          {/* HEADER */}
          <div className="flex flex-col justify-start items-start gap-1">
            <Image
              src={imagesAddresses.images.logo}
              alt="logo"
              width={120}
              height={120}
              className="!h-[20px] !w-[120px] lg:mx-0 hidden dark:block"
            />
            <Image
              src={imagesAddresses.icons.FrameWhite}
              alt="logo"
              width={120}
              height={120}
              className="!h-[20px] !w-[120px] lg:mx-0 dark:hidden"
            />
            <h1 className="text-xl md:text-2xl font-bold dark:text-white text-black lg:text-left !mt-5">
              Welcome Back to the BookWise
            </h1>
            <p className="dark:text-gray-400 text-gray-600 text-sm md:text-base font-normal lg:text-left -mt-2">
              Access the vast collection of resources, and stay updated
            </p>
          </div>

          <form
            className="w-full flex flex-col gap-4 dark:text-white text-gray-900"
            onSubmit={handleSubmit(handleLogin)}
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm md:text-base lg:text-lg">Email</label>

              <input
                {...register("email")}
                className={`w-full dark:!bg-dark-300 !bg-gray-50 border border-gray-300 
                p-2 md:p-3 rounded-lg placeholder-gray-400 text-sm md:text-base lg:text-lg
                ${errors.email ? "border border-red-500" : ""}`}
                type="email"
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-sm md:text-base lg:text-lg">Password</label>

              <input
                {...register("password")}
                className={`w-full dark:!bg-dark-300 !bg-gray-50 border border-gray-300 
                p-2 md:p-3 rounded-lg placeholder-gray-400 text-sm md:text-base lg:text-lg
                ${errors.password ? "border border-red-500" : ""}`}
                type={showPass ? "text" : "password"}
                placeholder="At least 8 characters long"
                maxLength={20}
              />
              {
                watch("password")?.length > 0 && (
                  <>
                    <Image
                      src={showPass ? imagesAddresses.icons.blindBlack : imagesAddresses.icons.eyeBlack}
                      alt="eye"
                      width={20}
                      height={20}
                      className="absolute top-8 md:top-12 right-3 cursor-pointer dark:hidden"
                      onClick={() => setShowPass(!showPass)}
                    />
                    <Image
                      src={showPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                      alt="eye"
                      width={20}
                      height={20}
                      className="absolute top-8 md:top-12 right-3 cursor-pointer dark:block hidden"
                      onClick={() => setShowPass(!showPass)}
                    />
                  </>
                )
              }

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message?.toString()}
                </p>
              )}

              <p
                className='self-end text-xs md:text-sm text-primary-admin dark:text-blue-200 cursor-pointer'
                onClick={() => router.push(SiteUrls.adminForgetPass)}
              >
                forget your password ?
              </p>
            </div>

            <CustomButton
              text="Login"
              color="blue"
              containerClassName="w-full cursor-pointer flex text-nowrap mt-3"
              loading={loading}
              type="submit"
            />
          </form>

          <div className="dark:text-white text-gray-900 text-[12px] md:text-sm font-normal self-center">
            Don’t have an account already?{" "}
            <span
              className="text-primary-admin dark:text-blue-200 text-sm font-normal cursor-pointer"
              onClick={() => router.push(SiteUrls.adminRgister)}
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

export default AdminLogin