
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import imagesAddresses from "@/utils/imageAddresses";
import { useRouter } from "next/navigation";
import SiteUrls from "@/utils/routs";
import CustomButton from "@/components/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import showToast from "@/utils/toast";
import { fetchData } from "@/utils/utils";
import { Axios_Route } from "@/utils/axiosRoutes";
import { AxiosMethodEnum } from "@/utils/type";

type Props = {
  resetPasswordToken: string | null;
};

const schema = yup
  .object({
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

    confirmPass: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();

type ResetPasswordFormData = {
  password: string;
  confirmPass: string;
};

const slides = [
  {
    id: 1,
    subtitle: "A world between the pages",
    title: "A new password.",
    highlight: "A fresh chapter.",
    description:
      "Keep your account secure and return to the stories waiting to be discovered. Your next chapter starts here.",
  },
  {
    id: 2,
    subtitle: "Explore endless possibilities",
    title: "Protect your",
    highlight: "reading journey.",
    description:
      "A secure account gives you peace of mind. Create a strong password and keep exploring everything BookWise has to offer.",
  },
  {
    id: 3,
    subtitle: "Your next chapter starts here",
    title: "Stay secure.",
    highlight: "Read more.",
    description:
      "Your books, your inspiration, and your next favorite story are waiting. Get back to reading with confidence.",
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

const ResetPasswordContent = ({ resetPasswordToken }: Props) => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const passwordValue = watch("password");
  const confirmPassValue = watch("confirmPass");

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

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShakeTrigger((prev) => prev + 1);
    }
  }, [errors]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!resetPasswordToken) {
      showToast("Invalid or missing reset password token.", "error");
      return;
    }

    setLoading(true);

    try {
      const result = await fetchData<unknown, { message: string }>({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        apiRoute: Axios_Route.resetPassword,
        method: AxiosMethodEnum.post,
        queryParams: {
          newPassword: data.password,
          resetPasswordToken,
        },
        isFormData: false,
      });

      if (result) {
        showToast("Password updated successfully", "success");
        router.push(SiteUrls.signIn);
      }
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to reset password",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 pr-12 text-sm
    text-white outline-none transition-all duration-300
    placeholder:text-stone-500
    focus:border-[#E7C9A5] focus:bg-white/[0.07]
    focus:ring-4 focus:ring-[#E7C9A5]/10
    dark:bg-[#F8F2E6] dark:text-[#17130F]
    dark:placeholder:text-[#9C8B76]
    dark:focus:bg-white
    ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
        : "border-[#E7C9A5]/20 dark:border-[#B88A4B]/30"
    }`;

  const errorClass =
    "text-xs leading-5 text-red-400 dark:text-red-600";

  return (
    <main className="relative grid h-[100dvh] w-full grid-cols-1 overflow-hidden overscroll-none bg-[#0D0D0C] text-white dark:bg-[#F8F2E6] dark:text-[#17130F] lg:grid-cols-[minmax(420px,40%)_minmax(0,1fr)]">

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 z-0 h-96 w-96 rounded-full bg-[#A87938]/15 blur-[120px] dark:bg-[#E7C9A5]/35"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/3 z-0 h-96 w-96 rounded-full bg-[#E7C9A5]/10 blur-[120px] dark:bg-[#B88A4B]/15"
      />

      {/* Decorative golden orbs and curved rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[430px] -right-64 z-0 h-[700px] w-[700px] rounded-full border border-[#E7C9A5]/15 bg-[radial-gradient(circle_at_35%_25%,rgba(168,121,56,0.16),transparent_68%)] dark:border-[#B88A4B]/20 dark:bg-[radial-gradient(circle_at_35%_25%,rgba(184,138,75,0.14),transparent_68%)]"
      >
        <div className="absolute -left-8 top-8 h-[82%] w-[82%] rounded-full border border-[#E7C9A5]/10 dark:border-[#B88A4B]/10" />
      </div>

      {/* Reset password section */}
      <section className="relative z-10 flex h-[100dvh] min-h-0 w-full flex-col items-center overflow-hidden px-4 py-4 sm:px-8 sm:py-6 lg:px-8 xl:px-12">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/80 to-transparent lg:hidden"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex min-h-0 w-full max-w-md flex-1 flex-col"
        >

          {/* Logo */}
          <div className="flex shrink-0 flex-col items-center pb-4 pt-2 sm:pb-5">
            <Image
              src={imagesAddresses.images.logoNew}
              alt="BookWise"
              width={280}
              height={80}
              priority
              className="mb-2 h-auto w-[150px] object-contain sm:w-[190px] dark:hidden"
            />

            <Image
              src={imagesAddresses.icons.FrameWhite2}
              alt="BookWise"
              width={280}
              height={80}
              priority
              className="mb-2 hidden h-auto w-[150px] object-contain sm:w-[190px] dark:block"
            />

            <p className="text-[9px] tracking-[0.42em] text-[#E7C9A5] sm:text-[10px] sm:tracking-[0.55em] dark:text-[#A87938]">
              MORE BOOKS. BETTER YOU.
            </p>
          </div>

          {/* Form card */}
          <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-3xl border border-[#E7C9A5]/20 bg-[#171614]/95 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl dark:border-[#B88A4B]/25 dark:bg-white/85 dark:shadow-[0_25px_80px_rgba(120,85,35,0.10)]">

            {/* Four-sided gold border */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 rounded-3xl"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#E7C9A5] to-transparent dark:via-[#B88A4B]" />

              <div className="absolute inset-y-0 left-0 w-[2px] rounded-l-3xl bg-gradient-to-b from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />

              <div className="absolute inset-y-0 right-0 w-[2px] rounded-r-3xl bg-gradient-to-b from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />

              <div className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-3xl bg-gradient-to-r from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />
            </div>

            {/* Decorative glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E7C9A5]/[0.06] blur-3xl dark:bg-[#B88A4B]/10"
            />

            {/* Heading */}
            <div className="relative z-10 shrink-0 px-5 pb-4 pt-6 sm:px-8 sm:pb-5 sm:pt-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-[#E7C9A5] dark:bg-[#B88A4B]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E7C9A5] dark:text-[#A87938]">
                  Account Security
                </span>
              </div>

              <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                Reset Password
              </h1>

              <p className="mt-3 text-sm leading-6 text-stone-400 dark:text-[#75634E]">
                Create a new, secure password for your account and continue
                your reading journey.
              </p>
            </div>

            {/* Scrollable form */}
            <div
              className="relative z-10 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-5 pb-5 sm:px-8 sm:pb-8"
              style={{ scrollbarGutter: "stable" }}
            >
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >

                {/* New Password */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-stone-200 dark:text-[#403326]"
                  >
                    New Password
                  </label>

                  <div className="relative">
                    <motion.input
                      {...register("password")}
                      id="password"
                      type={showPass ? "text" : "password"}
                      autoComplete="new-password"
                      maxLength={30}
                      placeholder="Enter new password"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      className={inputClass(!!errors.password)}
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
                        aria-label={showPass ? "Hide password" : "Show password"}
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
                    <p
                      id="password-error"
                      role="alert"
                      className={errorClass}
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="confirmPass"
                    className="text-sm font-medium text-stone-200 dark:text-[#403326]"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <motion.input
                      {...register("confirmPass")}
                      id="confirmPass"
                      type={showConfirmPass ? "text" : "password"}
                      autoComplete="new-password"
                      maxLength={30}
                      placeholder="Repeat new password"
                      aria-invalid={!!errors.confirmPass}
                      aria-describedby={errors.confirmPass ? "confirm-password-error" : undefined}
                      className={inputClass(!!errors.confirmPass)}
                      animate={
                        errors.confirmPass
                          ? { x: [0, -5, 5, -5, 5, 0] }
                          : { x: 0 }
                      }
                      key={`confirm-${shakeTrigger}`}
                      transition={{ duration: 0.35 }}
                    />

                    {confirmPassValue?.length > 0 && (
                      <button
                        type="button"
                        aria-label={
                          showConfirmPass ? "Hide password" : "Show password"
                        }
                        onClick={() =>
                          setShowConfirmPass((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg transition-colors hover:bg-[#E7C9A5]/10"
                      >
                        <Image
                          src={
                            showConfirmPass
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
                            showConfirmPass
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

                  {errors.confirmPass && (
                    <p
                      id="confirm-password-error"
                      role="alert"
                      className={errorClass}
                    >
                      {errors.confirmPass.message}
                    </p>
                  )}
                </div>

                {/* Password requirements */}
                <div className="rounded-xl border border-[#E7C9A5]/15 bg-[#E7C9A5]/[0.04] p-4 dark:border-[#B88A4B]/25 dark:bg-[#B88A4B]/[0.06]">
                  <p className="mb-2 text-xs font-semibold text-[#E7C9A5] dark:text-[#A87938]">
                    Password requirements
                  </p>

                  <ul className="space-y-1 text-xs leading-5 text-stone-400 dark:text-[#75634E]">
                    <li>• At least 8 characters</li>
                    <li>• One uppercase and one lowercase letter</li>
                    <li>• At least one number</li>
                    <li>• At least one special character (@$!%*?&)</li>
                  </ul>
                </div>

                {/* Submit */}
                <div className="mt-2">
                  <CustomButton
                    type="submit"
                    text="Reset Password"
                    color="yellow"
                    containerClassName="mt-1 flex w-full cursor-pointer text-nowrap"
                    loading={loading}
                  />
                </div>
              </form>

              {/* Back to login */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 border-t border-[#E7C9A5]/15 pt-5 text-center text-xs text-stone-400 sm:text-sm dark:border-[#B88A4B]/20 dark:text-[#75634E]">
                <span>Remember your password?</span>

                <button
                  type="button"
                  onClick={() => router.push(SiteUrls.signIn)}
                  className="font-semibold text-[#E7C9A5] transition-colors duration-300 hover:text-white hover:underline dark:text-[#A87938] dark:hover:text-[#6C4B21]"
                >
                  Login here
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Visual section — desktop */}
      <aside className="relative hidden h-[100dvh] min-h-0 min-w-0 overflow-hidden p-6 lg:block xl:p-8">
        <div className="group/slider relative h-full min-h-0 overflow-hidden rounded-[28px] border border-[#E7C9A5]/20 bg-[#252019] shadow-[0_25px_80px_rgba(0,0,0,0.3)] transition-all duration-500 dark:border-[#B88A4B]/25 dark:bg-[#252019] dark:shadow-[0_25px_80px_rgba(120,85,35,0.10)]">

          {/* Main background image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`main-${activeSlide}`}
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
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
                    aria-current={
                      activeSlide === index ? "true" : undefined
                    }
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

export default ResetPasswordContent;