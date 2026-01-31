"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import showToast from "@/utils/toast";

const schema = yup
  .object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string()
      .min(8, "Password must be at least 8 characters")
      .required('Password is required')
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
    fullName: yup.string().required("Full name is required"),
    universityId: yup.string().required("Personal ID is required"),
  })
  .required();

type SignUpFormData = {
  email: string;
  password: string;
  fullName: string;
  universityId: string;
};

const AdminRgister = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showUniversityId, setShowUniversityId] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShakeTrigger((prev) => prev + 1);
    }
  }, [errors]);

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showToast("Account created successfully", "success", true, undefined, true);
        router.push(SiteUrls.adminLogin);
      } else {
        const error = await res.json();
        showToast(error.error || "Signup failed", "error", true, undefined, true);
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong", "error", true, undefined, true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center flex-col lg:flex-row">
      <div className="w-full min-h-screen bg-[url('/images/loginBg.png')] dark:bg-gray-800 bg-cover bg-center px-6 py-10 md:p-10 lg:p-20 flex items-center justify-center overflow-y-auto">
        <div className="dark:bg-gray-900 bg-gray-50 w-full max-w-md md:max-w-lg lg:max-w-none p-4 md:p-8 flex flex-col gap-8 rounded-lg">
          {/* HEADER */}
          <div className="flex flex-col justify-start items-start gap-1">
            <Image
              src={imagesAddresses.images.logo}
              alt="logo"
              width={120}
              height={120}
              className="lg:mx-0 hidden dark:block !h-[20px] !w-[120px]"
            />
            <Image
              src={imagesAddresses.icons.FrameWhite}
              alt="logo"
              width={120}
              height={120}
              className="lg:mx-0 dark:hidden !h-[20px] !w-[120px]"
            />
            <h1 className="text-xl md:text-2xl font-bold dark:text-white text-black lg:text-left !mt-5">
              Create your BookWise account
            </h1>
            <p className="dark:text-gray-400 text-gray-600 text-sm md:text-base font-normal lg:text-left -mt-2">
              Join BookWise and get access to a world of academic resources and digital books.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="w-full flex flex-col gap-3 md:gap-4 lg:gap-6 dark:text-white text-gray-900"
          >
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-base lg:text-lg">Full Name</label>
              <motion.input
                {...register("fullName")}
                className="w-full dark:!bg-dark-300 !bg-gray-50 border border-gray-300 p-2 rounded-lg"
                type="text"
                placeholder="Enter your full name"
                maxLength={50}
                animate={errors.fullName ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                key={shakeTrigger}
                transition={{ duration: 0.4 }}
              />
              {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs md:text-base lg:text-lg">Email</label>
              <motion.input
                {...register("email")}
                className="w-full dark:!bg-dark-300 !bg-gray-50 border border-gray-300 p-2 rounded-lg"
                type="email"
                placeholder="Enter your email"
                animate={errors.email ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                key={shakeTrigger}
                transition={{ duration: 0.4 }}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/*  Personal ID */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs md:text-base lg:text-lg">Personal ID</label>
              <motion.input
                {...register("universityId")}
                maxLength={11}
                className="w-full dark:!bg-dark-300 !bg-gray-50 border border-gray-300 p-2 rounded-lg"
                type={showUniversityId ? "text" : "password"}
                placeholder="Enter your personal ID number"
                animate={errors.universityId ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                key={shakeTrigger}
                transition={{ duration: 0.4 }}
              />
              {errors.universityId && <p className="text-red-500 text-xs">{errors.universityId.message}</p>}

              {/* Show/hide button */}
              {
                watch("universityId") && (
                  <>
                    <Image
                      src={showUniversityId ? imagesAddresses.icons.blindBlack : imagesAddresses.icons.eyeBlack}
                      alt="eye"
                      width={20}
                      height={20}
                      className="absolute top-8 md:top-11 right-3 cursor-pointer dark:hidden"
                      onClick={() => setShowUniversityId(!showUniversityId)}
                    />
                    <Image
                      src={showUniversityId ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                      alt="eye"
                      width={20}
                      height={20}
                      className="absolute top-8 md:top-11 right-3 cursor-pointer dark:block hidden"
                      onClick={() => setShowUniversityId(!showUniversityId)}
                    />
                  </>
                )
              }
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs md:text-base lg:text-lg">Password</label>
              <motion.input
                {...register("password")}
                className="w-full dark:!bg-dark-300 !bg-gray-50 border border-gray-300 p-2 rounded-lg"
                type={showPass ? "text" : "password"}
                maxLength={50}
                placeholder="At least 8 characters long"
                animate={errors.password ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                key={shakeTrigger}
                transition={{ duration: 0.4 }}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

              {/* Show/hide button */}
              {
                watch("password")?.length > 0 && (
                  <>
                    <Image
                      src={showPass ? imagesAddresses.icons.blindBlack : imagesAddresses.icons.eyeBlack}
                      alt="eye"
                      width={20}
                      height={20}
                      className="absolute top-8 md:top-11 right-3 cursor-pointer dark:hidden"
                      onClick={() => setShowPass(!showPass)}
                    />
                    <Image
                      src={showPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                      alt="eye"
                      width={20}
                      height={20}
                      className="absolute top-8 md:top-11 right-3 cursor-pointer dark:block hidden"
                      onClick={() => setShowPass(!showPass)}
                    />
                  </>
                )
              }
            </div>

            {/* Submit */}
            <CustomButton
              text="Register"
              color="blue"
              containerClassName="w-full mt-4 cursor-pointer"
              loading={isLoading}
              type="submit"
            />
          </form>

          {/* Login Link */}
          <div className="dark:text-white text-gray-900 text-xs md:text-sm lg:text-base text-center">
            Already have an account?{" "}
            <span
              className="text-primary-admin dark:text-blue-200 cursor-pointer"
              onClick={() => router.push(SiteUrls.adminLogin)}
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
  );
};

export default AdminRgister;