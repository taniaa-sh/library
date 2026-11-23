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
import { AnimatePresence, motion } from "framer-motion";
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

const slides = [
  {
    id: 1,
    subtitle: "A world between the pages",
    title: "Find your next",
    highlight: "favorite story.",
    description:
      "A good book opens a thousand doors. Discover knowledge, find inspiration, and let every page take you somewhere new.",
  },
  {
    id: 2,
    subtitle: "Explore endless possibilities",
    title: "Every page",
    highlight: "holds a new world.",
    description:
      "Discover new perspectives, explore different worlds, and make every reading moment meaningful.",
  },
  {
    id: 3,
    subtitle: "Your next chapter starts here",
    title: "Read more.",
    highlight: "Dream bigger.",
    description:
      "Build your own collection, find your inspiration, and make reading a part of your everyday life.",
  },
];

const sliderImages = [
  imagesAddresses.images.loginPic,
  imagesAddresses.images.loginPic2,
  imagesAddresses.images.loginPic3,
];

const ArrowLeft = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const SignUp = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showUniversityId, setShowUniversityId] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
    `w-full min-w-0 rounded-xl border bg-white/[0.04] px-4 py-3.5 text-sm
    text-white outline-none transition-[border-color,background-color,box-shadow] duration-200
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

  const errorClass = "text-xs leading-5 text-red-400 dark:text-red-600";

  return (
    <main className="relative grid min-h-[100dvh] w-full grid-cols-1 overflow-x-hidden bg-[#0D0D0C] text-white dark:bg-[#F8F2E6] dark:text-[#17130F] lg:h-[100dvh] lg:grid-cols-[minmax(400px,40%)_minmax(0,1fr)] lg:overflow-hidden">
      {/* Background decorations */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-32 -top-32 z-0 hidden h-96 w-96 rounded-full bg-[#A87938]/15 blur-[120px] dark:bg-[#E7C9A5]/35 lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-40 left-1/3 z-0 hidden h-96 w-96 rounded-full bg-[#E7C9A5]/10 blur-[120px] dark:bg-[#B88A4B]/15 lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
      >
        <Image
          src={imagesAddresses.images.topLeft}
          alt=""
          width={650}
          height={480}
          priority
          className="absolute -left-12 -top-10 h-[480px] w-[650px] object-contain"
        />

        <Image
          src={imagesAddresses.images.topRight}
          alt=""
          width={550}
          height={430}
          className="absolute -right-12 -top-12 h-[430px] w-[550px] object-contain"
        />

        <Image
          src={imagesAddresses.images.bottomLeft}
          alt=""
          width={650}
          height={460}
          className="absolute -bottom-16 -left-12 h-[460px] w-[650px] object-contain"
        />

        <Image
          src={imagesAddresses.images.bottomRight}
          alt=""
          width={650}
          height={460}
          className="absolute -bottom-16 -right-12 h-[460px] w-[650px] object-contain"
        />
      </div>

      {/* Registration section - scrolls as one unit */}

      <section className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center px-5 py-5 sm:px-8 sm:py-8 lg:h-[100dvh] lg:min-h-0 lg:px-8 lg:py-6 xl:px-12">        <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/80 to-transparent lg:hidden"
      />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full max-w-md flex-1 flex-col"
        >
          {/* Form card */}

          <div className="relative flex w-full max-h-[calc(100dvh-3rem)] flex-col overflow-y-auto overflow-x-hidden overscroll-contain rounded-3xl border border-[#E7C9A5]/20 bg-[#171614]/95 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl dark:border-[#B88A4B]/25 dark:bg-white/85 dark:shadow-[0_25px_80px_rgba(120,85,35,0.10)] lg:max-h-[calc(100dvh-3rem)]">
            {/* Gold border */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 rounded-3xl"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#E7C9A5] to-transparent dark:via-[#B88A4B]" />

              <div className="absolute inset-y-0 left-0 w-[2px] rounded-l-3xl bg-gradient-to-b from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />

              <div className="absolute inset-y-0 right-0 w-[2px] rounded-r-3xl bg-gradient-to-b from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />

              <div className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-3xl bg-gradient-to-r from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />
            </div>

            {/* Glow */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E7C9A5]/[0.06] blur-3xl dark:bg-[#B88A4B]/10"
            />

            {/* Heading */}

            <div className="relative z-10 px-5 pb-4 pt-6 sm:px-8 sm:pb-5 sm:pt-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-[#E7C9A5] dark:bg-[#B88A4B]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E7C9A5] dark:text-[#A87938]">
                  Become a member
                </span>
              </div>

              <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                Create Your Account
              </h1>

              <p className="mt-3 text-sm leading-6 text-stone-400 dark:text-[#75634E]">
                Join BookWise and discover a world of academic resources,
                knowledge, and digital books.
              </p>
            </div>

            {/* Form content */}

            <div className="relative z-10 flex flex-col px-5 pb-5 sm:px-8 sm:pb-8">
              <form
                onSubmit={handleSubmit(handleSignUp)}
                className="flex flex-col"
                noValidate
              >
                {/* Fields */}

                <div className="flex flex-col gap-4 pb-4 sm:gap-5">
                  {/* Full name */}

                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className={labelClass}>
                      Full name
                    </label>

                    <input
                      {...register("fullName")}
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      maxLength={50}
                      placeholder="Enter your full name"
                      aria-invalid={!!errors.fullName}
                      className={inputClass(!!errors.fullName)}
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

                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      className={inputClass(!!errors.email)}
                    />

                    {errors.email && (
                      <p role="alert" className={errorClass}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* University ID */}

                  <div className="flex flex-col gap-2">
                    <label htmlFor="universityId" className={labelClass}>
                      University ID
                    </label>

                    <div className="relative">
                      <input
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
                      <input
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
                      />

                      {passwordValue?.length > 0 && (
                        <button
                          type="button"
                          aria-label={
                            showPass ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPass((prev) => !prev)}
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
                        Upload an image of your university ID for account
                        verification.
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
                </div>

                {/* Submit button */}

                <div className="mt-3 border-t border-[#E7C9A5]/15 pt-4 dark:border-[#B88A4B]/20">
                  <CustomButton
                    text="Sign Up"
                    color="yellow"
                    containerClassName="flex w-full cursor-pointer text-nowrap"
                    loading={isLoading}
                    type="submit"
                  />
                </div>
              </form>

              {/* Login link */}

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-center text-xs text-stone-400 sm:text-sm dark:text-[#75634E]">
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
          </div>
        </motion.div>
      </section>

      {/* Desktop visual section */}

      <aside className="relative hidden h-[100dvh] min-h-0 min-w-0 overflow-hidden p-6 lg:block xl:p-8">
        <div className="group/slider relative h-full min-h-0 overflow-hidden rounded-[28px] border border-[#E7C9A5]/20 bg-[#252019] shadow-[0_25px_80px_rgba(0,0,0,0.3)] transition-all duration-500 dark:border-[#B88A4B]/25 dark:bg-[#252019] dark:shadow-[0_25px_80px_rgba(120,85,35,0.10)]">
          {/* Main background image */}

          <AnimatePresence mode="wait">
            <motion.div
              key={`main-${activeSlide}`}
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={sliderImages[activeSlide]}
                alt={`BookWise reading image ${activeSlide + 1}`}
                fill
                priority
                sizes="(min-width: 1280px) 60vw, 55vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Image overlays */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/90 via-[#17130F]/25 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#17130F]/30 via-transparent to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-br from-[#E7C9A5]/15 via-transparent to-[#A87938]/15" />

          {/* Top information */}

          <div className="absolute left-8 right-8 top-8 z-20 flex items-center justify-between xl:left-12 xl:right-12 xl:top-12">
            <div className="flex items-center gap-3 rounded-full border border-white/20 bg-black/20 px-4 py-2.5 backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#E7C9A5]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/90">
                The BookWise Experience
              </span>
            </div>

            <div className="font-serif text-2xl italic text-white/70">
              BookWise<span className="text-[#E7C9A5]">.</span>
            </div>
          </div>

          {/* Decorative circles */}

          <div className="pointer-events-none absolute -right-24 top-28 h-80 w-80 rounded-full border border-white/20" />

          <div className="pointer-events-none absolute -right-12 top-40 h-56 w-56 rounded-full border border-white/15" />

          <div className="pointer-events-none absolute right-10 top-52 h-32 w-32 rounded-full border border-[#E7C9A5]/30" />

          {/* Floating secondary image */}

          <AnimatePresence mode="wait">
            <motion.div
              key={`secondary-${activeSlide}`}
              initial={{ opacity: 0, x: 45, y: 25, rotate: 8 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 4 }}
              exit={{ opacity: 0, x: 35, y: -15, rotate: 8 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute right-10 top-[24%] z-10 hidden h-52 w-36 overflow-hidden rounded-2xl border-[5px] border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.4)] xl:block"
            >
              <Image
                src={sliderImages[(activeSlide + 1) % sliderImages.length]}
                alt="BookWise preview"
                fill
                sizes="144px"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Main content */}

          <div className="absolute inset-x-0 bottom-0 z-20 p-8 xl:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeSlide}`}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#E7C9A5]" />

                  <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#E7C9A5] sm:text-xs">
                    {slides[activeSlide].subtitle}
                  </span>
                </div>

                <h2 className="max-w-xl font-serif text-4xl font-medium leading-[1.2] text-white xl:text-6xl">
                  {slides[activeSlide].title}

                  <br />

                  <span className="italic text-[#E7C9A5]">
                    {slides[activeSlide].highlight}
                  </span>
                </h2>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/75 xl:text-base">
                  {slides[activeSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Bottom controls */}

            <div className="mt-9 flex items-center justify-between gap-5 border-t border-white/20 pt-6">
              {/* Progress indicators */}

              <div className="flex flex-1 items-center gap-3">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={activeSlide === index ? "true" : undefined}
                    className="group/progress relative h-1.5 max-w-20 flex-1 overflow-hidden rounded-full bg-white/30 transition-all duration-300 hover:bg-white/50"
                  >
                    {activeSlide === index && (
                      <motion.span
                        layoutId="active-slider-progress"
                        className="absolute inset-0 rounded-full bg-[#E7C9A5]"
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Slide number */}

              <div className="flex shrink-0 items-center gap-2 font-serif text-sm text-white/70">
                <span className="text-xl text-[#E7C9A5]">
                  0{activeSlide + 1}
                </span>

                <span>/</span>

                <span>0{slides.length}</span>
              </div>

              {/* Navigation */}

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous slide"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-lg transition-all duration-300 hover:border-[#E7C9A5] hover:bg-[#A87938] hover:text-white"
                >
                  <ArrowLeft />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E7C9A5]/60 bg-[#E7C9A5] text-[#17130F] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>

          {/* Four-sided gold border */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 rounded-[28px]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-[28px] bg-gradient-to-r from-transparent via-[#E7C9A5] to-transparent dark:via-[#B88A4B]" />

            <div className="absolute inset-y-0 left-0 w-[2px] rounded-l-[28px] bg-gradient-to-b from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />

            <div className="absolute inset-y-0 right-0 w-[2px] rounded-r-[28px] bg-gradient-to-b from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />

            <div className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-[28px] bg-gradient-to-r from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />
          </div>

          {/* Decorative glow */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 z-10 h-40 w-40 rounded-full bg-[#E7C9A5]/[0.06] blur-3xl dark:bg-[#B88A4B]/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 left-1/2 z-10 h-48 w-2/3 -translate-x-1/2 rounded-full bg-[#B88A4B]/20 blur-[90px]"
          />
        </div>
      </aside>
    </main>
  );
};

export default SignUp;
