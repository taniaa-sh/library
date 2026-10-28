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
import { motion } from "framer-motion";
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

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const passwordValue = watch("password");

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShakeTrigger((prev) => prev + 1);
    }
  }, [errors]);

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
    `w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-sm
        text-white outline-none transition-all duration-300
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
    <main className="relative grid min-h-screen overflow-hidden bg-[#0D0D0C] text-white dark:bg-[#F8F2E6] dark:text-[#17130F] lg:grid-cols-2">

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 z-0 h-96 w-96 rounded-full bg-[#A87938]/15 blur-[120px] dark:bg-[#E7C9A5]/35"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/3 z-0 h-96 w-96 rounded-full bg-[#E7C9A5]/10 blur-[120px] dark:bg-[#B88A4B]/15"
      />

      {/* Login section */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">

        {/* Gold top line */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/80 to-transparent lg:hidden"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center lg:items-start">
            <Image
              src={imagesAddresses.images.logo}
              alt="BookWise"
              width={280}
              height={80}
              priority
              className="mb-3 h-auto w-[190px] object-contain sm:w-[220px] dark:hidden"
            />

            <Image
              src={imagesAddresses.icons.FrameWhite}
              alt="BookWise"
              width={280}
              height={80}
              priority
              className="mb-3 hidden h-auto w-[190px] object-contain sm:w-[220px] dark:block"
            />

            <p className="text-[9px] tracking-[0.42em] text-[#E7C9A5] sm:text-[10px] sm:tracking-[0.55em] dark:text-[#A87938]">
              MORE BOOKS. BETTER YOU.
            </p>
          </div>

          {/* Form card */}
          <div className="relative overflow-hidden rounded-3xl border border-[#E7C9A5]/20 bg-[#171614]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-9 dark:border-[#B88A4B]/25 dark:bg-white/85 dark:shadow-[0_25px_80px_rgba(120,85,35,0.10)]">

            {/* Card top decoration */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#E7C9A5] to-transparent dark:via-[#B88A4B]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E7C9A5]/[0.06] blur-3xl dark:bg-[#B88A4B]/10"
            />

            {/* Heading */}
            <div className="relative mb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-px w-7 bg-[#E7C9A5] dark:bg-[#B88A4B]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E7C9A5] dark:text-[#A87938]">
                  Your reading journey
                </span>
              </div>

              <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                Welcome Back
              </h1>

              <p className="mt-3 text-sm leading-7 text-stone-400 dark:text-[#75634E]">
                Sign in to discover new stories, explore fresh ideas,
                and continue your reading journey.
              </p>
            </div>

            {/* Login form */}
            <form
              className="relative flex flex-col gap-5"
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

                <motion.input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "email-error" : undefined
                  }
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
                  <p
                    id="email-error"
                    role="alert"
                    className="text-xs leading-5 text-red-400 dark:text-red-600"
                  >
                    {errors.email.message}
                  </p>
                )}
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
                  <motion.input
                    {...register("password")}
                    id="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    maxLength={20}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password
                        ? "password-error"
                        : undefined
                    }
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
                    <>
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
                    </>
                  )}
                </div>

                {errors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="text-xs leading-5 text-red-400 dark:text-red-600"
                  >
                    {errors.password.message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() =>
                    router.push(SiteUrls.forgetPass)
                  }
                  className="mt-1 self-end text-xs text-[#E7C9A5] transition-colors duration-300 hover:text-white hover:underline dark:text-[#A87938] dark:hover:text-[#6C4B21]"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Submit */}
              <div className="mt-2">
                <CustomButton
                  text="Login"
                  color="yellow"
                  containerClassName="mt-1 flex w-full cursor-pointer text-nowrap"
                  loading={loading}
                  type="submit"
                />
              </div>
            </form>

            {/* Register */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 border-t border-[#E7C9A5]/15 pt-6 text-center text-xs text-stone-400 sm:text-sm dark:border-[#B88A4B]/20 dark:text-[#75634E]">
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
        </motion.div>
      </section>

      {/* Visual section — desktop */}
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

          {/* Floating decorative ring */}
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
                A world between the pages
              </span>
            </div>

            <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight text-white xl:text-5xl xl:leading-[1.2]">
              Find your next
              <br />
              <span className="italic text-[#E7C9A5]">
                favorite story.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/75 xl:text-base">
              A good book opens a thousand doors. Discover
              knowledge, find inspiration, and let every page
              take you somewhere new.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-1.5 w-8 rounded-full bg-[#E7C9A5]" />
              <span className="h-1.5 w-2 rounded-full bg-white/50" />
              <span className="h-1.5 w-2 rounded-full bg-white/50" />
            </div>
          </div>

          {/* Gold border accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-[20px] border border-white/10"
          />
        </div>
      </aside>
    </main>
  );
};

export default SignIn;