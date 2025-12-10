"use client";

import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DragAndDropUpload from "@/components/DragAndDropUpload";
import CustomButton from "@/components/CustomButton";

import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValues {
    name: string;
    university: string;
    studentId: string;
    email: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    university: Yup.string().required("University is required"),
    studentId: Yup.string()
        .required("Student ID is required")
        .matches(/^\d+$/, "Student ID must be numbers only"),
    email: Yup.string().email("Invalid email").required("Email is required"),
});

const UserInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [profileImage, setProfileImage] = useState<string>(imagesAddresses.images.profile);

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "Adrian",
            university: "JS Mastery Pro",
            studentId: "234567856",
            email: "contact@jsmastery.pro",
        },
    });

    const changeProfileImage = () => {
        if (isEditing) inputRef.current?.click();
    };

    const onSubmit = (data: FormValues) => {
        console.log("Saved data:", data);
        setIsEditing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col gap-6 md:gap-9 rounded-lg bg-[url('/images/loginBg.png')] bg-cover dark:bg-gray-50 h-auto p-6 md:p-10 relative"
        >
            {!isEditing && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                    <CustomButton
                        text="Edit"
                        color="yellow"
                        containerClassName="md:hidden !w-fit self-end cursor-pointer dark:hidden"
                        onClick={() => setIsEditing(!isEditing)}
                        iconPosition="right"
                        iconAddress={imagesAddresses.icons.blackEdit}
                    />
                    <CustomButton
                        text="Edit"
                        color="yellow"
                        containerClassName="dark:md:hidden !w-fit self-end cursor-pointer hidden dark:flex"
                        onClick={() => setIsEditing(!isEditing)}
                        iconPosition="right"
                        iconAddress={imagesAddresses.icons.whiteEdit}
                    />
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 md:gap-9">
                <div className="flex justify-between items-center gap-6 md:gap-7">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className={`relative w-[100px] h-[100px] ${isEditing ? "cursor-pointer md:w-[150px] md:h-[150px]" : "md:w-[200px] md:h-[200px]"}`}
                    >
                        <Image
                            src={profileImage}
                            alt="profile"
                            fill
                            className="rounded-full border-6 md:border-8 border-[#363e58] dark:border-gray-500 object-cover"
                            onClick={changeProfileImage}
                        />

                        {/* Camera Icon */}
                        <AnimatePresence>
                            {isEditing && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute rounded-full flex items-center justify-center cursor-pointer top-18 left-16 md:top-28 md:left-28"
                                    onClick={changeProfileImage}
                                >
                                    <Image
                                        src={imagesAddresses.icons.camera}
                                        alt="camera"
                                        width={25}
                                        height={30}
                                        className="opacity-90 md:w-30"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setProfileImage(URL.createObjectURL(file));
                        }}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-10 justify-between">
                    <div className="flex flex-col gap-4 w-full">
                        {/* Name */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => isEditing ? (
                                <div className="flex flex-col">
                                    <p className="text-light-100 dark:text-gray-900 text-sm md:text-[18px]">Name:</p>
                                    <input
                                        {...field}
                                        className={`w-full bg-dark-300 dark:bg-gray-200 rounded-lg py-2 px-4 text-light-100 dark:text-gray-900 font-semibold ${errors.name ? "border border-red-500" : ""}`}
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                            ) : (
                                <p className="font-semibold text-xl md:text-2xl text-white dark:text-gray-900">{field.value}</p>
                            )}
                        />

                        {/* University */}
                        <Controller
                            name="university"
                            control={control}
                            render={({ field }) => isEditing ? (
                                <div className="flex flex-col">
                                    <p className="text-light-100 dark:text-gray-900 text-sm md:text-[18px]">University:</p>
                                    <input
                                        {...field}
                                        className={`w-full bg-dark-300 dark:bg-gray-200 rounded-lg py-2 px-4 font-semibold text-light-100 dark:text-gray-900 ${errors.university ? "border border-red-500" : ""}`}
                                        placeholder="Enter your university"
                                    />
                                    {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university.message}</p>}
                                </div>
                            ) : (
                                <p className="font-semibold text-base md:text-2xl text-white dark:text-gray-900">{field.value}</p>
                            )}
                        />

                        {/* Student ID */}
                        <Controller
                            name="studentId"
                            control={control}
                            render={({ field }) => isEditing ? (
                                <div className="flex flex-col">
                                    <p className="text-light-100 dark:text-gray-900 text-sm md:text-[18px]">Student ID:</p>
                                    <input
                                        {...field}
                                        className={`w-full bg-dark-300 dark:bg-gray-200 rounded-lg py-2 px-4 font-semibold text-light-100 dark:text-gray-900 ${errors.studentId ? "border border-red-500" : ""}`}
                                        placeholder="Enter your student ID"
                                    />
                                    {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId.message}</p>}
                                </div>
                            ) : (
                                <p className="font-semibold text-base md:text-2xl text-white dark:text-gray-900">{field.value}</p>
                            )}
                        />

                        {/* Email */}
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => isEditing ? (
                                <div className="flex flex-col">
                                    <p className="text-light-100 dark:text-gray-900 text-sm md:text-[18px]">Email:</p>
                                    <input
                                        {...field}
                                        className={`w-full bg-dark-300 dark:bg-gray-200 rounded-lg py-2 px-4 font-semibold text-light-100 dark:text-gray-900 ${errors.email ? "border border-red-500" : ""}`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                            ) : (
                                <p className="font-semibold text-base md:text-2xl text-white dark:text-gray-900">{field.value}</p>
                            )}
                        />
                    </div>

                    {/* Upload Image */}
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-1"
                        >
                            <p className="text-light-100 dark:text-gray-900 font-medium">Upload your University card :</p>
                            <DragAndDropUpload type="image" onChange={() => { }} />
                        </motion.div>
                    )}
                </div>

                {/* Save Button */}
                {isEditing && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="self-end">
                        <CustomButton
                            text="Save"
                            color="yellow"
                            containerClassName="flex cursor-pointer md:!w-30 dark:hidden"
                            onClick={handleSubmit(onSubmit)}
                            iconPosition="right"
                            iconAddress={imagesAddresses.icons.save}
                        />
                        <CustomButton
                            text="Save"
                            color="yellow"
                            containerClassName="cursor-pointer md:!w-30 hidden dark:flex"
                            onClick={handleSubmit(onSubmit)}
                            iconPosition="right"
                            iconAddress={imagesAddresses.icons.saveWhite}
                        />
                    </motion.div>
                )}
            </form>
        </motion.div>
    );
};

export default UserInfo;
