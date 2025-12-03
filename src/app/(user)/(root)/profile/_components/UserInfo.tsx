"use client";

import AdminButton from "@/app/admin/(root)/components/AdminButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DragAndDropUpload from "@/app/admin/(root)/allBooks/_components/DragAndDropUpload";

const UserInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [profileImage, setProfileImage] = useState<string>(imagesAddresses.images.profile);

    const changeProfileImage = () => {
        if (isEditing) inputRef.current?.click();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col gap-6 md:gap-9 rounded-lg bg-[url('/images/loginBg.png')] bg-cover dark:bg-gray-50 h-auto p-6 md:p-10 relative"
        >

            {!isEditing && (
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <AdminButton
                        text="Edit"
                        color="yellow"
                        containerClassName="md:hidden w-fit self-end cursor-pointer dark:hidden"
                        onClick={() => setIsEditing(!isEditing)}
                        iconPosition="right"
                        iconAddress={imagesAddresses.icons.blackEdit}
                    />
                </motion.div>
            )}

            <div className="flex flex-col gap-6 md:gap-8 mt-1">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 md:gap-7 items-center">
                        {/* Profile Image */}
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
                                if (file) {
                                    const url = URL.createObjectURL(file);
                                    setProfileImage(url);
                                }
                            }}
                        />

                        {/* Name + Verify */}
                        <div className="py-1 flex flex-col gap-1 md:gap-2">
                            {!isEditing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-1"
                                >
                                    <Image
                                        src={imagesAddresses.icons.verify}
                                        alt="verify"
                                        width={16}
                                        height={16}
                                        className="rounded-full"
                                    />
                                    <p className="text-light-100 dark:text-gray-900 font-normal text-xs md:text-sm">
                                        Verified Student
                                    </p>
                                </motion.div>
                            )}

                            {!isEditing && (
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="font-semibold text-xl md:text-2xl text-white dark:text-gray-900"
                                >
                                    Adrian
                                </motion.p>
                            )}
                        </div>
                    </div>

                    {/* Edit Button Desktop */}
                    {!isEditing && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <AdminButton
                                text="Edit"
                                color="yellow"
                                containerClassName="hidden md:flex cursor-pointer !w-30 dark:hidden"
                                onClick={() => setIsEditing(!isEditing)}
                                iconPosition="right"
                                iconAddress={imagesAddresses.icons.blackEdit}
                            />
                        </motion.div>
                    )}
                </div>

                {/* Input Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`flex flex-col md:flex-row gap-10 justify-between ${isEditing && "!flex-col"}`}
                >
                    {/* Left fields */}
                    <div className="flex flex-col gap-4 w-full">
                        {/* Name */}
                        <AnimatePresence>
                            {isEditing && (
                                <div className="flex flex-col">
                                    <p className="text-light-100 dark:text-gray-900 text-sm md:text-[18px]">name :</p>
                                    <input
                                        className="w-full bg-[#232839] dark:bg-gray-200 rounded-lg py-2 px-4 text-light-100 dark:text-gray-900 font-semibold"
                                        type="text"
                                        placeholder="enter your name"
                                    />
                                </div>
                            )}
                        </AnimatePresence>

                        {/* University */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`${isEditing ? "flex flex-col" : "flex justify-between items-center gap-6"}`}
                        >
                            <p className="text-light-100 dark:text-gray-900 font-medium">University :</p>
                            {isEditing ? (
                                <input
                                    className="w-full bg-[#232839] dark:bg-gray-200 rounded-lg py-2 px-4 font-semibold text-light-100 dark:text-gray-900"
                                    type="text"
                                    placeholder="enter your university"
                                />
                            ) : (
                                <p className="font-semibold text-base md:text-2xl text-white dark:text-gray-900">
                                    JS Mastery Pro
                                </p>
                            )}
                        </motion.div>

                        {/* Student ID */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`${isEditing ? "flex flex-col" : "flex justify-between items-center gap-6"}`}
                        >
                            <p className="text-light-100 dark:text-gray-900">Student ID :</p>
                            {isEditing ? (
                                <input
                                    className="w-full bg-[#232839] dark:bg-gray-200 rounded-lg py-2 px-4 font-semibold text-light-100 dark:text-gray-900"
                                    type="text"
                                    placeholder="enter your student ID"
                                />
                            ) : (
                                <p className="font-semibold text-base md:text-2xl text-white dark:text-gray-900">
                                    234567856
                                </p>
                            )}
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`${isEditing ? "flex flex-col" : "flex justify-between items-center gap-6"}`}
                        >
                            <p className="text-light-100 dark:text-gray-900">email :</p>
                            {isEditing ? (
                                <input
                                    className="w-full bg-[#232839] dark:bg-gray-200 rounded-lg py-2 px-4 font-semibold text-light-100 dark:text-gray-900"
                                    type="text"
                                    placeholder="enter your email"
                                />
                            ) : (
                                <p className="font-semibold text-base md:text-2xl text-white dark:text-gray-900">
                                    contact@jsmastery.pro
                                </p>
                            )}
                        </motion.div>
                    </div>

                    {/* Upload Image */}
                    <AnimatePresence>
                        {isEditing ? (
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
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-40 md:h-64 bg-amber-100 rounded-lg relative"
                            >
                                <Image
                                    src={imagesAddresses.images.loginPic}
                                    alt="profile"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Save Button */}
                <AnimatePresence>
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="self-end"
                        >
                            <AdminButton
                                text="Save"
                                color="yellow"
                                containerClassName="flex cursor-pointer md:!w-30 dark:hidden"
                                onClick={() => setIsEditing(!isEditing)}
                                iconPosition="right"
                                iconAddress={imagesAddresses.icons.save}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default UserInfo;
