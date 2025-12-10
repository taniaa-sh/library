"use client";

import CustomButton from "@/components/CustomButton";
import DragAndDropUpload from "@/components/DragAndDropUpload";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    fullName: yup.string().required("Full name is required"),
    universityId: yup.string().required("University ID is required"),
    univercityIdImage: yup.string().required('University ID card is required'),
  })
  .required();

type SignUpFormData = {
  email: string;
  password: string;
  fullName: string;
  universityId: string;
  univercityIdImage: string;
};

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showUniversityId, setShowUniversityId] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Account created successfully");
        router.push(SiteUrls.signIn);
      } else {
        const error = await res.json();
        toast.error(error.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center flex-col lg:flex-row overflow-y-hidden">
      <div className="w-full h-screen bg-[url('/images/loginBg.png')] bg-cover bg-center p-6 md:p-10 lg:p-20 flex items-center justify-center">
        <div className="bg-gray-900 dark:bg-gray-50 w-full max-w-md md:max-w-lg lg:max-w-none p-6 md:p-8 flex flex-col gap-8 rounded-lg">

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="w-full flex flex-col gap-3 md:gap-4 lg:gap-6 text-white dark:text-gray-900"
          >
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm md:text-base lg:text-lg">Full Name</label>
              <input
                {...register("fullName")}
                className="w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg"
                type="text"
                placeholder="Enter your full name"
                maxLength={50}
              />
              {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm md:text-base lg:text-lg">Email</label>
              <input
                {...register("email")}
                className="w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg"
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* University ID */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-sm md:text-base lg:text-lg">University ID</label>
              <input
                {...register("universityId")}
                maxLength={11}
                className="w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg"
                type={showUniversityId ? "text" : "password"}
                placeholder="Enter your university ID number"
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
                      className="absolute top-9 md:top-11 right-3 cursor-pointer dark:block hidden"
                      onClick={() => setShowUniversityId(!showUniversityId)}
                    />
                    <Image
                      src={showUniversityId ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                      alt="eye"
                      width={20}
                      height={20}
                      className="absolute top-9 md:top-11 right-3 cursor-pointer dark:hidden"
                      onClick={() => setShowUniversityId(!showUniversityId)}
                    />
                  </>
                )
              }
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-sm md:text-base lg:text-lg">Password</label>
              <input
                {...register("password")}
                className="w-full bg-dark-300 dark:bg-gray-50 dark:border dark:border-gray-300 p-2 rounded-lg"
                type={showPass ? "text" : "password"}
                maxLength={50}
                placeholder="At least 8 characters long"
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
                      className="absolute top-9 md:top-11 right-3 cursor-pointer dark:block hidden"
                      onClick={() => setShowPass(!showPass)}
                    />
                    <Image
                      src={showPass ? imagesAddresses.icons.blind : imagesAddresses.icons.eyeWhite}
                      alt="eye"
                      width={20}
                      height={20}
                      className="absolute top-9 md:top-11 right-3 cursor-pointer dark:hidden"
                      onClick={() => setShowPass(!showPass)}
                    />
                  </>
                )
              }
            </div>

            {/* Upload */}
            <div className="flex flex-col gap-1">
              <label className="text-sm md:text-base lg:text-lg">Upload University ID Card</label>
              <DragAndDropUpload
                type="image"
                onChange={(file) => setValue('univercityIdImage', URL.createObjectURL(file as File))}
                error={errors.univercityIdImage?.message}
              />
            </div>

            {/* Submit */}
            <CustomButton
              text="Sign Up"
              color="yellow"
              containerClassName="w-full mt-4"
              loading={isLoading}
              type="submit"
            />
          </form>

          {/* Login Link */}
          <div className="text-white dark:text-gray-900 text-xs md:text-sm lg:text-base text-center">
            Already have an account?{" "}
            <span className="text-gold100 cursor-pointer" onClick={() => router.push(SiteUrls.signIn)}>
              Login
            </span>
          </div>

        </div>
      </div>

      <div className="hidden lg:block relative w-full h-screen">
        <Image src={imagesAddresses.images.loginPic} alt="logo" fill />
      </div>
    </div>
  );
};

export default SignUp;
