"use client";

import CustomButton from "@/components/CustomButton";
import DragAndDropUpload from "@/components/DragAndDropUpload";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import showToast from "@/utils/toast";
import { fetchData } from "@/utils/utils";
import { AxiosMethodEnum } from "@/utils/type";
import { Axios_Route } from "@/utils/axiosRoutes";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),

    fullName: yup.string().required("Full name is required"),
    universityId: yup.string().required("University ID is required"),
    univercityIdImage: yup
      .string()
      .required("University ID card is required"),
  })
  .required();

type SignUpFormData = {
  email: string;
  password: string;
  fullName: string;
  universityId: string;
  univercityIdImage: string;
};

type RegisterResponse = {
  success: boolean;
  status: number;
  error: string;
  data: {
    _id: string;
    email: string;
    fullName: string;
    universityId: string;
    role: string;
    univercityIdImage: string;
  };
};

const SignUp = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showUniversityId, setShowUniversityId] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const universityIdValue = watch("universityId");
  const passwordValue = watch("password");

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShakeTrigger((prev) => prev + 1);
    }
  }, [errors]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result.split(",")[1]);
        } else {
          reject(new Error("Failed to convert file to Base64"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
    });
  };

  const handleSignUp = async (data: SignUpFormData) => {
    if (!file) {
      showToast("Please upload your university ID card", "error");
      return;
    }

    setIsLoading(true);

    try {
      const univercityIdImage = await fileToBase64(file);

      const result = await fetchData<unknown, RegisterResponse>({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        apiRoute: Axios_Route.register,
        method: AxiosMethodEnum.post,
        queryParams: {
          email: data.email,
          password: data.password,
          universityId: data.universityId,
          fullName: data.fullName,
          univercityIdImage,
        },
        isFormData: false,
      });

      if (result) {
        showToast("Account created successfully", "success");
        router.push(SiteUrls.signIn);
      } else {
        showToast("Something went wrong", "error");
      }
    } catch (err) {
      console.log(err);

      showToast(
        err instanceof Error ? err.message : "Something went wrong",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white/[0.04] px-4 py-3
        text-sm text-white outline-none transition-all duration-300
        placeholder:text-stone-500
        focus:border-[#E7C9A5] focus:bg-white/[0.07]
        focus:ring-4 focus:ring-[#E7C9A5]/10
        dark:bg-[#F8F2E6] dark:text-[#17130F]
        dark:placeholder:text-[#9C8B76]
        dark:focus:bg-white
        ${hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
      : "border-[#E7C9A5]/20 dark:border-[#B88A4B]/30"
    }`;

  const labelClass =
    "text-sm font-medium text-stone-200 dark:text-[#403326]";

  const errorClass =
    "text-xs leading-5 text-red-400 dark:text-red-600";

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[#0D0D0C] text-white dark:bg-[#F8F2E6] dark:text-[#17130F] lg:grid-cols-2">

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 z-0 h-96 w-96 rounded-full bg-[#A87938]/15 blur-[120px] dark:bg-[#E7C9A5]/35"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/3 z-0 h-96 w-96 rounded-full bg-[#E7C9A5]/10 blur-[120px] dark:bg-[#B88A4B]/15"
      />

      {/* Registration section */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:px-10 xl:px-16">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/80 to-transparent lg:hidden"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="w-full max-w-lg"
        >

          {/* Form card */}
          <div className="relative overflow-hidden rounded-3xl border border-[#E7C9A5]/20 bg-[#171614]/95 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8 dark:border-[#B88A4B]/25 dark:bg-white/85 dark:shadow-[0_25px_80px_rgba(120,85,35,0.10)]">

            {/* Gold top border */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#E7C9A5] to-transparent dark:via-[#B88A4B]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E7C9A5]/[0.06] blur-3xl dark:bg-[#B88A4B]/10"
            />

            {/* Heading */}
            <div className="relative mb-7">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-[#E7C9A5] dark:bg-[#B88A4B]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#E7C9A5] dark:text-[#A87938]">
                  Become a member
                </span>
              </div>

              <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                Create Your Account
              </h1>

              <p className="mt-3 text-sm leading-6 text-stone-400 dark:text-[#75634E]">
                Join BookWise and discover a world of academic
                resources, knowledge, and digital books.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="relative flex flex-col gap-4 sm:gap-5"
              noValidate
            >
              {/* Full name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className={labelClass}>
                  Full name
                </label>

                <motion.input
                  {...register("fullName")}
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  maxLength={50}
                  placeholder="Enter your full name"
                  aria-invalid={!!errors.fullName}
                  className={inputClass(!!errors.fullName)}
                  animate={
                    errors.fullName
                      ? { x: [0, -5, 5, -5, 5, 0] }
                      : { x: 0 }
                  }
                  key={`fullName-${shakeTrigger}`}
                  transition={{ duration: 0.35 }}
                />

                {errors.fullName && (
                  <p role="alert" className={errorClass}>
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>

                <motion.input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  className={inputClass(!!errors.email)}
                  animate={
                    errors.email
                      ? { x: [0, -5, 5, -5, 5, 0] }
                      : { x: 0 }
                  }
                  key={`email-${shakeTrigger}`}
                  transition={{ duration: 0.35 }}
                />

                {errors.email && (
                  <p role="alert" className={errorClass}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* University ID */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="universityId"
                  className={labelClass}
                >
                  University ID
                </label>

                <div className="relative">
                  <motion.input
                    {...register("universityId")}
                    id="universityId"
                    type={showUniversityId ? "text" : "password"}
                    autoComplete="off"
                    maxLength={11}
                    placeholder="Enter your university ID"
                    aria-invalid={!!errors.universityId}
                    className={`${inputClass(
                      !!errors.universityId
                    )} pr-12`}
                    animate={
                      errors.universityId
                        ? { x: [0, -5, 5, -5, 5, 0] }
                        : { x: 0 }
                    }
                    key={`universityId-${shakeTrigger}`}
                    transition={{ duration: 0.35 }}
                  />

                  {universityIdValue && (
                    <button
                      type="button"
                      aria-label={
                        showUniversityId
                          ? "Hide university ID"
                          : "Show university ID"
                      }
                      onClick={() =>
                        setShowUniversityId((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg transition-colors hover:bg-[#E7C9A5]/10"
                    >
                      <Image
                        src={
                          showUniversityId
                            ? imagesAddresses.icons.blindBlack
                            : imagesAddresses.icons.eyeBlack
                        }
                        alt=""
                        width={19}
                        height={19}
                        className="hidden dark:block"
                      />

                      <Image
                        src={
                          showUniversityId
                            ? imagesAddresses.icons.blind
                            : imagesAddresses.icons.eyeWhite
                        }
                        alt=""
                        width={19}
                        height={19}
                        className="dark:hidden"
                      />
                    </button>
                  )}
                </div>

                {errors.universityId && (
                  <p role="alert" className={errorClass}>
                    {errors.universityId.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <motion.input
                    {...register("password")}
                    id="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    maxLength={50}
                    placeholder="At least 8 characters"
                    aria-invalid={!!errors.password}
                    className={`${inputClass(
                      !!errors.password
                    )} pr-12`}
                    animate={
                      errors.password
                        ? { x: [0, -5, 5, -5, 5, 0] }
                        : { x: 0 }
                    }
                    key={`password-${shakeTrigger}`}
                    transition={{ duration: 0.35 }}
                  />

                  {passwordValue?.length > 0 && (
                    <button
                      type="button"
                      aria-label={
                        showPass
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPass((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg transition-colors hover:bg-[#E7C9A5]/10"
                    >
                      <Image
                        src={
                          showPass
                            ? imagesAddresses.icons.blindBlack
                            : imagesAddresses.icons.eyeBlack
                        }
                        alt=""
                        width={19}
                        height={19}
                        className="hidden dark:block"
                      />

                      <Image
                        src={
                          showPass
                            ? imagesAddresses.icons.blind
                            : imagesAddresses.icons.eyeWhite
                        }
                        alt=""
                        width={19}
                        height={19}
                        className="dark:hidden"
                      />
                    </button>
                  )}
                </div>

                {errors.password && (
                  <p role="alert" className={errorClass}>
                    {errors.password.message}
                  </p>
                )}

                <p className="text-[11px] leading-5 text-stone-500 dark:text-[#8B7860]">
                  Use at least 8 characters, including uppercase,
                  lowercase, a number, and a special character.
                </p>
              </div>

              {/* University ID upload */}
              <div className="flex flex-col gap-2">
                <div className="mb-1">
                  <label className={labelClass}>
                    University ID card
                  </label>

                  <p className="mt-1 text-xs leading-5 text-stone-500 dark:text-[#8B7860]">
                    Upload an image of your university ID
                    for account verification.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#E7C9A5]/20 bg-white/[0.02] p-2 transition-colors duration-300 hover:border-[#E7C9A5]/50 dark:border-[#B88A4B]/25 dark:bg-[#B88A4B]/[0.03] dark:hover:border-[#B88A4B]/60">
                  <DragAndDropUpload
                    type="image"
                    onChange={(uploadedFile) => {
                      const selectedFile = uploadedFile as File;

                      setFile(selectedFile);

                      setValue("univercityIdImage", "ok", {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    error={errors.univercityIdImage?.message}
                    shakeTrigger={shakeTrigger}
                  />
                </div>

                {file && (
                  <div className="flex min-w-0 items-center gap-2 rounded-xl border border-[#E7C9A5]/20 bg-[#E7C9A5]/[0.05] px-3 py-2.5 dark:border-[#B88A4B]/25 dark:bg-[#B88A4B]/[0.05]">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-[#E7C9A5] dark:text-[#A87938]"
                    >
                      <path
                        d="M5 12.5L9.5 17L19 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="min-w-0 flex-1 truncate text-xs text-stone-300 dark:text-[#594B3B]">
                      {file.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setValue("univercityIdImage", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      className="shrink-0 rounded-lg px-2 py-1 text-xs text-[#E7C9A5] transition-colors hover:bg-[#E7C9A5]/10 dark:text-[#A87938]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {errors.univercityIdImage && !file && (
                  <p role="alert" className={errorClass}>
                    {errors.univercityIdImage.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="mt-2">
                <CustomButton
                  text="Sign Up"
                  color="yellow"
                  containerClassName="mt-1 flex w-full cursor-pointer text-nowrap"
                  loading={isLoading}
                  type="submit"
                />
              </div>
            </form>

            {/* Login link */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 border-t border-[#E7C9A5]/15 pt-5 text-center text-xs text-stone-400 sm:text-sm dark:border-[#B88A4B]/20 dark:text-[#75634E]">
              <span>Already have an account?</span>

              <button
                type="button"
                onClick={() => router.push(SiteUrls.signIn)}
                className="font-semibold text-[#E7C9A5] transition-colors duration-300 hover:text-white hover:underline dark:text-[#A87938] dark:hover:text-[#6C4B21]"
              >
                Sign in
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Desktop image section */}
      <aside className="relative hidden min-h-screen overflow-hidden p-5 lg:block xl:p-7">
        <div className="relative h-full min-h-[calc(100vh-2.5rem)] overflow-hidden rounded-[28px] border border-[#E7C9A5]/25 dark:border-[#B88A4B]/30">

          <Image
            src={imagesAddresses.images.loginPic}
            alt="A welcoming reading atmosphere"
            fill
            priority
            sizes="(min-width: 1280px) 50vw, 50vw"
            className="object-cover transition-transform duration-[12000ms] hover:scale-105"
          />

          {/* Image overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C] via-[#0D0D0C]/25 to-[#0D0D0C]/10 dark:from-[#17130F]/90 dark:via-[#17130F]/20 dark:to-[#17130F]/10" />

          <div className="absolute inset-0 bg-gradient-to-br from-[#E7C9A5]/10 via-transparent to-[#A87938]/20 dark:from-[#F8F2E6]/10 dark:to-[#B88A4B]/15" />

          {/* Decorative rings */}
          <div
            aria-hidden="true"
            className="absolute right-10 top-10 h-28 w-28 rounded-full border border-[#E7C9A5]/35 xl:right-14 xl:top-14 xl:h-36 xl:w-36"
          />

          <div
            aria-hidden="true"
            className="absolute right-[72px] top-[72px] h-12 w-12 rounded-full border border-[#E7C9A5]/50 xl:right-[92px] xl:top-[92px] xl:h-16 xl:w-16"
          />

          {/* Image caption */}
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 xl:p-14">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#E7C9A5]" />

              <span className="text-[10px] uppercase tracking-[0.35em] text-[#E7C9A5] sm:text-xs">
                Your next chapter starts here
              </span>
            </div>

            <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight text-white xl:text-5xl xl:leading-[1.2]">
              A new chapter.
              <br />
              <span className="italic text-[#E7C9A5]">
                A world of possibilities.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/75 xl:text-base">
              Join a world of stories, explore new ideas, and
              discover the books that inspire your next big idea.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-1.5 w-8 rounded-full bg-[#E7C9A5]" />
              <span className="h-1.5 w-2 rounded-full bg-white/50" />
              <span className="h-1.5 w-2 rounded-full bg-white/50" />
            </div>
          </div>

          {/* Inner border */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-[20px] border border-white/10"
          />
        </div>
      </aside>
    </main>
  );
};

export default SignUp;