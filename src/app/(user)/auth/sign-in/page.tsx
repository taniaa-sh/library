
"use client";

import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import showToast from "@/utils/toast";
import { fetchData } from "@/utils/utils";
import { Axios_Route } from "@/utils/axiosRoutes";
import { AxiosMethodEnum } from "@/utils/type";

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
  })
  .required();

type SignInFormData = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: number;
  error?: string;
  accessToken: string;
  isAdmin: boolean;
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

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const passwordValue = watch("password");

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

  const handleLogin = async (data: SignInFormData) => {
    setLoading(true);

    try {
      const result = await fetchData<unknown, LoginResponse>({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        apiRoute: Axios_Route.login,
        method: AxiosMethodEnum.post,
        queryParams: {
          email: data.email,
          password: data.password,
        },
        isFormData: false,
      });

      const accessToken = result?.accessToken;

      if (!accessToken) {
        showToast("Access token not received", "error");
        return;
      }

      const cookieResponse = await fetch("/api/auth/set-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!cookieResponse.ok) {
        throw new Error("Failed to set access token");
      }

      const profileResponse = await fetch("/api/auth/profile", {
        method: "GET",
        cache: "no-store",
      });

      const profileResult = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(
          profileResult.message || "Failed to get user profile"
        );
      }

      showToast("Login successfully", "success");
      router.push(SiteUrls.dashbord);
    } catch (err) {
      console.log(err);

      showToast(
        err instanceof Error ? err.message : "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
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

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#0D0D0C] text-white dark:bg-[#F8F2E6] dark:text-[#17130F] lg:grid lg:min-h-[100dvh] lg:grid-cols-[minmax(400px,40%)_minmax(0,1fr)] lg:overflow-hidden">

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

      {/* Login section */}

      <section className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center px-5 pb-8 pt-5 sm:px-8 sm:py-8 lg:h-[100dvh] lg:min-h-0 lg:overflow-y-auto lg:px-8 lg:py-6 xl:px-12">

        {/* Top decoration */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/80 to-transparent lg:hidden"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full max-w-[440px] flex-1 flex-col"
        >

          {/* Logo */}

          <div className="flex shrink-0 flex-col items-center pb-6 pt-3 sm:pb-8 lg:pb-6">

            <Image
              src={imagesAddresses.images.logoNew}
              alt="BookWise"
              width={280}
              height={80}
              priority
              className="mb-2 h-auto w-[145px] object-contain sm:w-[175px] dark:hidden"
            />

            <Image
              src={imagesAddresses.icons.FrameWhite2}
              alt="BookWise"
              width={280}
              height={80}
              priority
              className="mb-2 hidden h-auto w-[145px] object-contain sm:w-[175px] dark:block"
            />

            <p className="text-[9px] tracking-[0.42em] text-[#E7C9A5] sm:text-[10px] sm:tracking-[0.55em] dark:text-[#A87938]">
              MORE BOOKS. BETTER YOU.
            </p>
          </div>

          {/* Form card */}

          <div className="relative w-full overflow-hidden rounded-[26px] border border-[#E7C9A5]/20 bg-[#171614]/95 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:border-[#B88A4B]/25 dark:bg-white/85 dark:shadow-[0_20px_60px_rgba(120,85,35,0.10)]">

            {/* Gold border */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 rounded-[26px]"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-[26px] bg-gradient-to-r from-transparent via-[#E7C9A5] to-transparent dark:via-[#B88A4B]" />

              <div className="absolute inset-y-0 left-0 w-[2px] rounded-l-[26px] bg-gradient-to-b from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />

              <div className="absolute inset-y-0 right-0 w-[2px] rounded-r-[26px] bg-gradient-to-b from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />

              <div className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-[26px] bg-gradient-to-r from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />
            </div>

            {/* Glow */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E7C9A5]/[0.06] blur-3xl dark:bg-[#B88A4B]/10"
            />

            {/* Heading */}

            <div className="relative z-10 px-5 pb-5 pt-7 sm:px-8 sm:pb-6 sm:pt-9">

              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-[#E7C9A5] dark:bg-[#B88A4B]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E7C9A5] dark:text-[#A87938]">
                  Your reading journey
                </span>
              </div>

              <h1 className="font-serif text-[26px] font-semibold tracking-tight sm:text-3xl">
                Welcome Back
              </h1>

              <p className="mt-3 text-[13px] leading-6 text-stone-400 sm:text-sm dark:text-[#75634E]">
                Sign in to discover new stories, explore fresh ideas,
                and continue your reading journey.
              </p>
            </div>

            {/* Form */}

            <div className="relative z-10 px-5 pb-6 sm:px-8 sm:pb-8">

              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(handleLogin)}
                noValidate
              >

                {/* Email */}

                <div className="flex flex-col gap-2">

                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-stone-200 dark:text-[#403326]"
                  >
                    Email address
                  </label>

                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass(!!errors.email)}
                  />

                  <AnimatePresence initial={false}>
                    {errors.email && (
                      <motion.p
                        id="email-error"
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden text-xs leading-5 text-red-400 dark:text-red-600"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>

                </div>

                {/* Password */}

                <div className="flex flex-col gap-2">

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-stone-200 dark:text-[#403326]"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <input
                      {...register("password")}
                      id="password"
                      type={showPass ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      maxLength={20}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      className={`${inputClass(!!errors.password)} pr-12`}
                    />

                    {passwordValue?.length > 0 && (
                      <button
                        type="button"
                        aria-label={showPass ? "Hide password" : "Show password"}
                        onClick={() => setShowPass((prev) => !prev)}
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg transition-colors hover:bg-[#E7C9A5]/10"
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

                  <AnimatePresence initial={false}>
                    {errors.password && (
                      <motion.p
                        id="password-error"
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden text-xs leading-5 text-red-400 dark:text-red-600"
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => router.push(SiteUrls.forgetPass)}
                    className="mt-1 self-end text-xs text-[#E7C9A5] transition-colors duration-300 hover:text-white hover:underline dark:text-[#A87938] dark:hover:text-[#6C4B21]"
                  >
                    Forgot your password?
                  </button>

                </div>

                {/* Submit */}

                <div className="mt-1">
                  <CustomButton
                    text="Login"
                    color="yellow"
                    containerClassName="flex w-full cursor-pointer text-nowrap"
                    loading={loading}
                    type="submit"
                  />
                </div>

              </form>

              {/* Register */}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 border-t border-[#E7C9A5]/15 pt-5 text-center text-xs text-stone-400 sm:text-sm dark:border-[#B88A4B]/20 dark:text-[#75634E]">

                <span>New to BookWise?</span>

                <button
                  type="button"
                  onClick={() => router.push(SiteUrls.signUp)}
                  className="font-semibold text-[#E7C9A5] transition-colors duration-300 hover:text-white hover:underline dark:text-[#A87938] dark:hover:text-[#6C4B21]"
                >
                  Create an account
                </button>

              </div>

            </div>
          </div>

          {/* Mobile footer */}

          <div className="mt-6 flex items-center justify-center gap-2 pb-2 text-[10px] tracking-wider text-stone-500 lg:hidden dark:text-[#9C8B76]">
            <span>BOOKWISE</span>
            <span className="h-1 w-1 rounded-full bg-[#B88A4B]" />
            <span>MORE BOOKS. BETTER YOU.</span>
          </div>

        </motion.div>
      </section>

      {/* Desktop visual section */}

      <aside className="relative hidden h-[100dvh] min-h-0 min-w-0 overflow-hidden p-6 lg:block xl:p-8">

        <div className="group/slider relative h-full min-h-0 overflow-hidden rounded-[28px] border border-[#E7C9A5]/20 bg-[#252019] shadow-[0_25px_80px_rgba(0,0,0,0.3)] dark:border-[#B88A4B]/25 dark:shadow-[0_25px_80px_rgba(120,85,35,0.10)]">

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

          {/* Overlays */}

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

          {/* Floating image */}

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

            {/* Controls */}

            <div className="mt-9 flex items-center justify-between gap-5 border-t border-white/20 pt-6">

              {/* Progress */}

              <div className="flex flex-1 items-center gap-3">

                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={activeSlide === index ? "true" : undefined}
                    className="relative h-1.5 max-w-20 flex-1 overflow-hidden rounded-full bg-white/30 transition-all duration-300 hover:bg-white/50"
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-lg transition-all duration-300 hover:border-[#E7C9A5] hover:bg-[#A87938]"
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

          {/* Gold border */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 rounded-[28px]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-[28px] bg-gradient-to-r from-transparent via-[#E7C9A5] to-transparent" />

            <div className="absolute inset-y-0 left-0 w-[2px] rounded-l-[28px] bg-gradient-to-b from-transparent via-[#E7C9A5]/70 to-transparent" />

            <div className="absolute inset-y-0 right-0 w-[2px] rounded-r-[28px] bg-gradient-to-b from-transparent via-[#E7C9A5]/70 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-[28px] bg-gradient-to-r from-transparent via-[#E7C9A5]/70 to-transparent" />
          </div>

          {/* Glow */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 z-10 h-40 w-40 rounded-full bg-[#E7C9A5]/[0.06] blur-3xl"
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

export default SignIn;
