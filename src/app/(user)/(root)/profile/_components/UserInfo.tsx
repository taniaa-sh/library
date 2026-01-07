"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";

type FormValues = {
    name: string;
    university: string;
    studentId: string;
    email: string;
};

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState<string>(imagesAddresses.images.profile);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const changeProfileImage = () => {
        if (isEditing) inputRef.current?.click();
    };

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
        setIsEditing(false);
    };

    const onCancel = () => {
        reset();
        setIsEditing(false);
    };

    return (
        <div
            className="w-full max-w-5xl mx-auto bg-gray-900 dark:bg-gray-50 rounded-xl p-5 md:p-8 space-y-8"
            style={{
                boxShadow: "0 14px 16px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.15)"
            }}
        >

            {/* HEADER ACTIONS */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-2xl font-bold text-white dark:text-gray-900">
                    Profile Information
                </h2>

                {!isEditing ? (
                    <>
                        <CustomButton
                            text=""
                            iconAddress={imagesAddresses.icons.whiteEdit}
                            iconPosition="center"
                            color="yellow"
                            containerClassName="!w-fit cursor-pointer hidden"
                            onClick={() => setIsEditing(true)}
                        />
                        <CustomButton
                            text=""
                            iconAddress={imagesAddresses.icons.blackEdit}
                            iconPosition="center"
                            color="yellow"
                            containerClassName="!w-fit cursor-pointer"
                            onClick={() => setIsEditing(true)}
                        />
                    </>
                ) : (
                    <div className="flex flex-col-reverse sm:flex-row gap-2">
                        <CustomButton
                            text="Cancel"
                            color="gray"
                            containerClassName="!w-fit cursor-pointer"
                            onClick={onCancel}
                        />
                        <>
                            <CustomButton
                                text=""
                                color="yellow"
                                iconAddress={imagesAddresses.icons.saveWhite}
                                iconPosition="center"
                                containerClassName="!w-fit cursor-pointer !px-[27px] hidden"
                                onClick={handleSubmit(onSave)}
                            />
                            <CustomButton
                                text=""
                                iconAddress={imagesAddresses.icons.save}
                                iconPosition="center"
                                color="yellow"
                                containerClassName="!w-fit cursor-pointer !px-[27px]"
                                onClick={handleSubmit(onSave)}
                            />
                        </>
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* AVATAR */}
                <div className="relative shrink-0">
                    <Image
                        src={avatar}
                        alt="avatar"
                        width={150}
                        height={150}
                        className="rounded-full object-cover border-4 border-gray-700 dark:border-gray-300"
                    />

                    {isEditing && (
                        <>
                            {/* Camera Icon */}
                            <label
                                htmlFor="avatarInput"
                                className="absolute bottom-1 right-2 flex items-center justify-center cursor-pointer bg-gray-700 dark:bg-[#99a1af] rounded-full p-2 hover:scale-105 transition"
                            >
                                <Image
                                    src={imagesAddresses.icons.camera}
                                    alt="camera"
                                    width={30}
                                    height={30}
                                />
                            </label>
                            <input
                                id="avatarInput"
                                type="file"
                                accept="image/*"
                                ref={inputRef}
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setAvatar(URL.createObjectURL(file));
                                }}
                            />
                        </>
                    )}
                </div>

                {/* FORM */}
                <form className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* NAME */}
                    <div className="!w-full flex flex-col gap-1">
                        <label className="text-sm text-gray-400 dark:text-gray-600">
                            Full Name
                        </label>

                        {isEditing ? (
                            <>
                                <input
                                    {...register("name", { required: true })}
                                    className="bg-gray-800 dark:bg-gray-200 rounded-lg px-4 py-2 text-white dark:text-gray-900"
                                />
                                {errors.name && (
                                    <span className="text-xs text-red-500">Name is required</span>
                                )}
                            </>
                        ) : (
                            <p className="text-lg font-semibold text-white dark:text-gray-900">
                                Adrian Hajdin
                            </p>
                        )}
                    </div>

                    {/* UNIVERSITY */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400 dark:text-gray-600">
                            University
                        </label>

                        {isEditing ? (
                            <>
                                <input
                                    {...register("university", { required: true })}
                                    className="bg-gray-800 dark:bg-gray-200 rounded-lg px-4 py-2 text-white dark:text-gray-900"
                                />
                                {errors.university && (
                                    <span className="text-xs text-red-500">
                                        University is required
                                    </span>
                                )}
                            </>
                        ) : (
                            <p className="text-lg font-semibold text-white dark:text-gray-900">
                                JS Mastery
                            </p>
                        )}
                    </div>

                    {/* STUDENT ID */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400 dark:text-gray-600">
                            Student ID
                        </label>

                        {isEditing ? (
                            <>
                                <input
                                    {...register("studentId", { required: true })}
                                    className="bg-gray-800 dark:bg-gray-200 rounded-lg px-4 py-2 text-white dark:text-gray-900"
                                />
                                {errors.studentId && (
                                    <span className="text-xs text-red-500">
                                        Student ID is required
                                    </span>
                                )}
                            </>
                        ) : (
                            <p className="text-lg font-semibold text-white dark:text-gray-900">
                                23456789
                            </p>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400 dark:text-gray-600">
                            Email
                        </label>

                        {isEditing ? (
                            <>
                                <input
                                    {...register("email", { required: true })}
                                    className="bg-gray-800 dark:bg-gray-200 rounded-lg px-4 py-2 text-white dark:text-gray-900"
                                />
                                {errors.email && (
                                    <span className="text-xs text-red-500">
                                        Email is required
                                    </span>
                                )}
                            </>
                        ) : (
                            <p className="text-lg font-semibold text-white dark:text-gray-900">
                                contact@jsmastery.pro
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;