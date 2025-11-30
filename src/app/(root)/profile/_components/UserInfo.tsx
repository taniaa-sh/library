"use client";

import DragAndDropUpload from "@/app/admin/allBooks/_components/DragAndDropUpload";
import AdminButton from "@/app/admin/components/AdminButton";
import imagesAddresses from "@/utils/imageAddresses";;
import Image from "next/image";
import { useRef, useState } from "react";

const UserInfo = () => {

    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [profileImage, setProfileImage] = useState<string>(imagesAddresses.images.profile);

    const changeProfileImage = () => {
        if (isEditing) inputRef.current?.click();
    };

    return (
        <div className="w-full  flex flex-col gap-6 md:gap-9 rounded-lg bg-[url('/images/loginBg.png')] bg-cover dark:bg-gray-50 h-auto p-6 md:p-10 relative">
            <div className="absolute md:hidden z-10 rounded-b-full md:w-[60px] md:h-[80px] w-[30px] h-[40px] bg-gray-200 dark:bg-gray-500 -top-3 left-1/2 md:left-80 lg:left-140 transform -translate-x-1/2 md:translate-x-0">
                {/* <div className="hidden md:block absolute z-20 top-14 left-2.5 rounded-2xl md:w-10 md:h-[10px] bg-[#1E2230] dark:bg-gray-500" /> */}
            </div>

            {/* Edit Button Mobile */}
            <AdminButton
                text={isEditing ? "Save" : "Edit"}
                color='yellow'
                containerClassName="md:hidden w-fit self-end cursor-pointer dark:hidden"
                onClick={() => setIsEditing(!isEditing)}
                iconPosition="right"
                iconAddress={isEditing ? imagesAddresses.icons.save : imagesAddresses.icons.blackEdit}
            />
            <AdminButton
                text={isEditing ? "Save" : "Edit"}
                color='yellow'
                containerClassName="dark:hidden w-fit self-end cursor-pointer hidden dark:flex"
                onClick={() => setIsEditing(!isEditing)}
                iconPosition="right"
                iconAddress={isEditing ? imagesAddresses.icons.saveWhite : imagesAddresses.icons.whiteEdit}
            />

            <div className="flex flex-col gap-6 md:gap-8 mt-1">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 md:gap-7 items-center">

                        {/* Profile Image */}
                        <div className={`relative w-[100px] h-[100px]  ${isEditing ? "cursor-pointer md:w-[150px] md:h-[150px]" : "md:w-[200px] md:h-[200px]"}`}>
                            <Image
                                src={profileImage}
                                alt="profile"
                                fill
                                className="rounded-full border-6 md:border-8 border-[#363e58] dark:border-gray-500 object-cover"
                                onClick={changeProfileImage}
                            />

                            {isEditing && (
                                <div
                                    className="absolute  rounded-full flex items-center justify-center cursor-pointer top-18 left-16 md:top-28 md:left-28"
                                    onClick={changeProfileImage}
                                >
                                    <Image
                                        src={imagesAddresses.icons.camera}
                                        alt="camera"
                                        width={25}
                                        height={30}
                                        className="opacity-90 md:w-30"
                                    />
                                </div>
                            )}
                        </div>

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
                        <div className="py-1 flex flex-col gap-1 md:gap-2">
                            {
                                !isEditing &&
                                <div className="flex items-center gap-1">
                                    <Image
                                        src={imagesAddresses.icons.verify}
                                        alt="verify"
                                        width={16}
                                        height={16}
                                        className="rounded-full"
                                    />
                                    <p className="text-light-100 dark:text-gray-900 font-normal text-xs md:text-sm leading-[18px] md:leading-[20px]">
                                        Verified Student
                                    </p>
                                </div>
                            }
                            {
                                !isEditing &&
                                <p className="font-semibold text-xl md:text-2xl leading-6 md:leading-[30px] text-white dark:text-gray-900">
                                    Adrian
                                </p>
                            }
                        </div>
                    </div>

                    {/* Edit Button Desktop */}
                    <AdminButton
                        text={isEditing ? "Save" : "Edit"}
                        color='yellow'
                        containerClassName="hidden md:flex cursor-pointer !w-30 dark:hidden"
                        onClick={() => setIsEditing(!isEditing)}
                        iconPosition="right"
                        iconAddress={isEditing ? imagesAddresses.icons.save : imagesAddresses.icons.blackEdit}
                    />
                    <AdminButton
                        text={isEditing ? "Save" : "Edit"}
                        color='yellow'
                        containerClassName="!w-30 hidden cursor-pointer dark:flex"
                        onClick={() => setIsEditing(!isEditing)}
                        iconPosition="right"
                        iconAddress={isEditing ? imagesAddresses.icons.saveWhite : imagesAddresses.icons.whiteEdit}
                    />
                </div>

                <div className={`flex flex-col md:flex-row gap-10 justify-between ${isEditing && "!flex-col"}`}>
                    <div className="flex flex-col gap-4 w-full">

                        {/* Edit Name */}
                        {isEditing &&
                            <div className={`${isEditing ? "!flex flex-col" : "flex justify-between items-center gap-6 "}`}>
                                <p className="text-light-100 dark:text-gray-900 font-medium text-sm md:text-[18px] leading-5 md:leading-7 text-nowrap">
                                    name :
                                </p>
                                <input
                                    className="w-full bg-[#232839] dark:bg-gray-200 rounded-lg py-2 px-4 text-light-100 dark:text-gray-900 font-semibold text-sm md:text-[18px] leading-5 md:leading-7"
                                    type="text"
                                    placeholder="enter your name"
                                />
                            </div>
                        }

                        {/* University */}
                        <div className={`${isEditing ? "!flex flex-col" : "flex justify-between items-center gap-6 "}`}>
                            <p className="text-light-100 dark:text-gray-900 font-medium text-sm md:text-[20px] leading-5 md:leading-7 text-nowrap">
                                University :
                            </p>
                            {
                                isEditing ?
                                    <input
                                        className="w-full bg-[#232839] dark:bg-gray-200 rounded-lg py-2 px-4 text-light-100 dark:text-gray-900 font-semibold text-sm md:text-[18px] leading-5 md:leading-7"
                                        type="text"
                                        placeholder="enter your university"
                                    />
                                    :
                                    <p className="font-semibold text-base md:text-2xl leading-6 md:leading-8 text-white dark:text-gray-900">
                                        JS Mastery Pro
                                    </p>
                            }
                        </div>

                        {/* Student ID */}
                        <div className={`${isEditing ? "!flex flex-col" : "flex justify-between items-center gap-6 "}`}>
                            <p className="text-light-100 dark:text-gray-900 font-normal text-sm md:text-[20px] leading-5 md:leading-7 text-nowrap">
                                Student ID :
                            </p>
                            {
                                isEditing ?
                                    <input
                                        className="w-full bg-[#232839] dark:bg-gray-200 rounded-lg py-2 px-4 text-light-100 dark:text-gray-900 font-semibold text-sm md:text-[18px] leading-5 md:leading-7"
                                        type="text"
                                        placeholder="enter your student ID"
                                        maxLength={11}
                                    />
                                    :
                                    <p className="font-semibold text-base md:text-2xl leading-6 md:leading-8 text-white dark:text-gray-900">
                                        234567856
                                    </p>
                            }
                        </div>

                        {/* email */}
                        <div className={`${isEditing ? "!flex flex-col" : "flex justify-between items-center gap-6 "}`}>
                            <p className="text-light-100 dark:text-gray-900 font-medium text-sm md:text-[20px] leading-5 md:leading-7 text-nowrap">
                                email :
                            </p>
                            {
                                isEditing ?
                                    <input
                                        className="w-full bg-[#232839] dark:bg-gray-200 rounded-lg py-2 px-4 text-light-100 dark:text-gray-900 font-semibold text-sm md:text-[18px] leading-5 md:leading-7"
                                        type="text"
                                        placeholder="enter your student ID"
                                        maxLength={11}
                                    />
                                    :
                                    <p className="font-semibold text-base md:text-2xl leading-6 md:leading-8 text-white dark:text-gray-900">
                                        contact@jsmastery.pro
                                    </p>
                            }
                        </div>
                    </div>

                    {/* UniversityCard Image */}
                    {
                        isEditing ?
                            <div className="flex flex-col gap-1">
                                <p className="text-light-100 dark:text-gray-900 font-medium text-sm md:text-[18px] leading-5 md:leading-7 !-mt-4">
                                    upload your University card :
                                </p>
                                <DragAndDropUpload
                                    type="image"
                                    onChange={() => { }}
                                />
                            </div>
                            :
                            <div className="w-full h-40 md:h-64 bg-amber-100 rounded-lg relative">
                                <Image
                                    src={imagesAddresses.images.loginPic}
                                    alt="profile"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
