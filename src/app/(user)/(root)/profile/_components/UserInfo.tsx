"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type FormValues = {
    name: string;
    university: string;
    studentId: string;
    email: string;
};

const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "university", label: "University", type: "text" },
    { name: "studentId", label: "Student ID", type: "text" },
    { name: "email", label: "Email", type: "email" },
] as const;

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState<string>(
        imagesAddresses.images.profile
    );
    const inputRef = useRef<HTMLInputElement | null>(null);
    const shouldReduceMotion = useReducedMotion();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: "Adrian Hajdin",
            university: "JS Mastery",
            studentId: "23456789",
            email: "contact@jsmastery.pro",
        },
    });

    const onSave = (data: FormValues) => {
        // Connect your profile update API here.
        reset(data);
        setIsEditing(false);
    };

    const onCancel = () => {
        reset();
        setAvatar(imagesAddresses.images.profile);
        setIsEditing(false);
        if (inputRef.current) inputRef.current.value = "";
    };

    const changeProfileImage = () => {
        if (isEditing) inputRef.current?.click();
    };

    const fadeUp = {
        initial: shouldReduceMotion ? false : { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: shouldReduceMotion ? 0 : 0.5 },
    };

    const inputClass =
        "w-full rounded-xl border border-white/10 bg-[#0D0D0C]/70 px-4 py-3 text-sm text-[#F8F2E6] outline-none transition duration-200 placeholder:text-[#807464] hover:border-[#E7C9A5]/40 focus:border-[#E7C9A5] focus:ring-4 focus:ring-[#E7C9A5]/10 dark:border-[#A87938]/20 dark:bg-white/70 dark:text-[#17130F] dark:placeholder:text-[#9A8873] dark:hover:border-[#A87938]/50 dark:focus:border-[#A87938] dark:focus:ring-[#A87938]/10";

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                ease: "easeOut",
            }}
            className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-[#A87938]/20 bg-[#0D0D0C] p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.18)] dark:border-[#A87938]/20 dark:bg-[#F8F2E6] dark:text-[#17130F] md:rounded-3xl md:p-8"
        >
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#E7C9A5]/10 blur-3xl dark:bg-[#A87938]/10"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#A87938]/10 blur-3xl"
            />

            <div className="relative z-10 space-y-8 md:space-y-10">
                {/* Header */}
                <motion.div
                    {...fadeUp}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-6 dark:border-[#A87938]/20"
                >
                    <div>
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7C9A5]/25 bg-[#E7C9A5]/10 px-3 py-1.5 text-xs font-medium tracking-wide text-[#E7C9A5] dark:border-[#A87938]/25 dark:bg-[#A87938]/10 dark:text-[#A87938]">
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            YOUR ACCOUNT
                        </span>

                        <h2 className="text-xl font-semibold tracking-tight text-[#F8F2E6] dark:text-[#17130F] md:text-3xl">
                            Profile{" "}
                            <span className="text-[#E7C9A5] dark:text-[#A87938]">
                                Information
                            </span>
                        </h2>

                        <p className="mt-2 text-xs leading-6 text-[#B8AA98] dark:text-[#75634E] md:text-sm">
                            Manage your personal details and account information.
                        </p>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                        {!isEditing ? (
                            <motion.div
                                key="edit-actions"
                                initial={
                                    shouldReduceMotion
                                        ? false
                                        : { opacity: 0, scale: 0.9 }
                                }
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="shrink-0"
                            >
                                <div className="hidden dark:block">
                                    <CustomButton
                                        text="Edit Profile"
                                        iconAddress={imagesAddresses.icons.whiteEdit}
                                        iconPosition="center"
                                        color="yellow"
                                        containerClassName="!w-fit cursor-pointer"
                                        onClick={() => setIsEditing(true)}
                                    />
                                </div>

                                <div className="dark:hidden">
                                    <CustomButton
                                        text="Edit Profile"
                                        iconAddress={imagesAddresses.icons.blackEdit}
                                        iconPosition="center"
                                        color="yellow"
                                        containerClassName="!w-fit cursor-pointer"
                                        onClick={() => setIsEditing(true)}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="save-actions"
                                initial={
                                    shouldReduceMotion
                                        ? false
                                        : { opacity: 0, scale: 0.9 }
                                }
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="flex shrink-0 flex-col gap-2 sm:flex-row"
                            >
                                <CustomButton
                                    text="Cancel"
                                    color="gray"
                                    containerClassName="!w-fit cursor-pointer"
                                    onClick={onCancel}
                                />

                                <div className="hidden dark:block">
                                    <CustomButton
                                        text="Save"
                                        color="yellow"
                                        iconAddress={imagesAddresses.icons.saveWhite}
                                        iconPosition="center"
                                        containerClassName="!w-fit cursor-pointer"
                                        onClick={handleSubmit(onSave)}
                                    />
                                </div>

                                <div className="dark:hidden">
                                    <CustomButton
                                        text="Save"
                                        color="yellow"
                                        iconAddress={imagesAddresses.icons.save}
                                        iconPosition="center"
                                        containerClassName="!w-fit cursor-pointer"
                                        onClick={handleSubmit(onSave)}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Profile content */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[190px_minmax(0,1fr)] md:gap-10">
                    {/* Avatar card */}
                    <motion.div
                        {...fadeUp}
                        transition={{
                            duration: shouldReduceMotion ? 0 : 0.5,
                            delay: shouldReduceMotion ? 0 : 0.08,
                        }}
                        className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#171614]/70 p-5 dark:border-[#A87938]/15 dark:bg-[#F2E9DA]/70 md:items-center md:py-7"
                    >
                        <motion.div
                            whileHover={
                                shouldReduceMotion
                                    ? undefined
                                    : { scale: isEditing ? 1.04 : 1.02 }
                            }
                            whileTap={
                                shouldReduceMotion
                                    ? undefined
                                    : { scale: 0.97 }
                            }
                            className="relative"
                        >
                            <div className="absolute -inset-1 rounded-full border border-[#E7C9A5]/50 dark:border-[#A87938]/50" />

                            <Image
                                src={avatar}
                                alt="Profile avatar"
                                width={150}
                                height={150}
                                onClick={changeProfileImage}
                                className={`relative h-[120px] w-[120px] rounded-full border-4 border-[#0D0D0C] object-cover shadow-[0_8px_30px_rgba(0,0,0,0.25)] dark:border-[#F8F2E6] ${
                                    isEditing ? "cursor-pointer" : ""
                                }`}
                            />

                            {isEditing && (
                                <motion.label
                                    htmlFor="avatarInput"
                                    initial={
                                        shouldReduceMotion
                                            ? false
                                            : { opacity: 0, scale: 0.7 }
                                    }
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={
                                        shouldReduceMotion
                                            ? undefined
                                            : { scale: 1.08 }
                                    }
                                    className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#0D0D0C] bg-[#E7C9A5] shadow-lg dark:border-[#F8F2E6] dark:bg-[#A87938]"
                                >
                                    <Image
                                        src={imagesAddresses.icons.camera}
                                        alt="Change profile image"
                                        width={22}
                                        height={22}
                                    />
                                </motion.label>
                            )}

                            <input
                                id="avatarInput"
                                type="file"
                                accept="image/*"
                                ref={inputRef}
                                className="hidden"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];

                                    if (file) {
                                        setAvatar(URL.createObjectURL(file));
                                    }
                                }}
                            />
                        </motion.div>

                        <div className="text-center">
                            <p className="text-base font-semibold text-[#F8F2E6] dark:text-[#17130F]">
                                Adrian Hajdin
                            </p>
                            <p className="mt-1 text-xs text-[#B8AA98] dark:text-[#75634E]">
                                Library Member
                            </p>
                        </div>

                        {isEditing && (
                            <motion.p
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center text-xs leading-5 text-[#E7C9A5] dark:text-[#A87938]"
                            >
                                Click the camera icon to update your photo.
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        {...fadeUp}
                        transition={{
                            duration: shouldReduceMotion ? 0 : 0.5,
                            delay: shouldReduceMotion ? 0 : 0.15,
                        }}
                        onSubmit={handleSubmit(onSave)}
                        className="grid grid-cols-1 content-start gap-5 sm:grid-cols-2 sm:gap-6"
                    >
                        {fields.map((field, index) => {
                            const fieldName = field.name;
                            const error = errors[fieldName];

                            return (
                                <motion.div
                                    key={field.name}
                                    initial={
                                        shouldReduceMotion
                                            ? false
                                            : { opacity: 0, y: 12 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 0.35,
                                        delay: shouldReduceMotion
                                            ? 0
                                            : 0.2 + index * 0.07,
                                    }}
                                    className="flex min-w-0 flex-col gap-2"
                                >
                                    <label
                                        htmlFor={field.name}
                                        className="text-sm font-medium text-[#B8AA98] dark:text-[#75634E]"
                                    >
                                        {field.label}
                                    </label>

                                    <AnimatePresence mode="wait" initial={false}>
                                        {isEditing ? (
                                            <motion.div
                                                key="input"
                                                initial={
                                                    shouldReduceMotion
                                                        ? false
                                                        : { opacity: 0, y: 5 }
                                                }
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -5,
                                                }}
                                                transition={{ duration: 0.18 }}
                                            >
                                                <input
                                                    id={field.name}
                                                    type={field.type}
                                                    autoComplete={
                                                        field.name === "email"
                                                            ? "email"
                                                            : field.name === "name"
                                                              ? "name"
                                                              : "off"
                                                    }
                                                    {...register(fieldName, {
                                                        required: `${field.label} is required`,
                                                        ...(field.name === "email"
                                                            ? {
                                                                  pattern: {
                                                                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                      message:
                                                                          "Please enter a valid email address",
                                                                  },
                                                              }
                                                            : {}),
                                                    })}
                                                    className={`${inputClass} ${
                                                        error
                                                            ? "!border-red-500 focus:!ring-red-500/10"
                                                            : ""
                                                    }`}
                                                />

                                                {error && (
                                                    <p
                                                        role="alert"
                                                        className="mt-2 text-xs text-red-400 dark:text-red-600"
                                                    >
                                                        {error.message}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="value"
                                                initial={
                                                    shouldReduceMotion
                                                        ? false
                                                        : { opacity: 0, y: 5 }
                                                }
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -5,
                                                }}
                                                transition={{ duration: 0.18 }}
                                                className="flex min-h-[48px] items-center rounded-xl border border-white/10 bg-[#171614]/70 px-4 py-3 dark:border-[#A87938]/15 dark:bg-[#F2E9DA]/70"
                                            >
                                                <p className="break-all text-sm font-medium text-[#F8F2E6] dark:text-[#17130F] md:text-base">
                                                    {field.name === "name"
                                                        ? "Adrian Hajdin"
                                                        : field.name === "university"
                                                          ? "JS Mastery"
                                                          : field.name === "studentId"
                                                            ? "23456789"
                                                            : "contact@jsmastery.pro"}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.form>
                </div>

                {/* Footer note */}
                <motion.div
                    {...fadeUp}
                    className="flex items-start gap-3 rounded-xl border border-[#E7C9A5]/15 bg-[#E7C9A5]/5 p-4 dark:border-[#A87938]/20 dark:bg-[#A87938]/5"
                >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E7C9A5]/10 text-[#E7C9A5] dark:bg-[#A87938]/10 dark:text-[#A87938]">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path
                                d="M12 11v5m0-8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>

                    <div>
                        <p className="text-sm font-medium text-[#F8F2E6] dark:text-[#17130F]">
                            Keep your information up to date
                        </p>
                        <p className="mt-1 text-xs leading-6 text-[#B8AA98] dark:text-[#75634E]">
                            Your profile helps us provide a more personalized
                            library experience.
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default UserProfile;