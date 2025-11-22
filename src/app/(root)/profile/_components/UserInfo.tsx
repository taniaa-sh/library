"use client";

import DragAndDropUpload from "@/app/admin/allBooks/_components/DragAndDropUpload";
import AdminButton from "@/app/admin/components/AdminButton";
import imagesAddresses from "@/utils/imageAddresses";
import { Button } from "@mui/material";
import { Admin } from "mongodb";
import Image from "next/image";
import { useRef, useState } from "react";

const UserInfo = () => {

    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [profileImage, setProfileImage] = useState(imagesAddresses.images.profile);

    const changeProfileImage = () => {
        if (isEditing) inputRef.current?.click();
    };

    return (
        <div className="w-full  md:w-[50%] flex flex-col gap-6 md:gap-9 rounded-lg bg-[#232839] h-auto md:h-[800px] p-6 md:p-10 relative">
            <div className="absolute z-10 rounded-b-full md:w-[59px] md:h-[80px] w-[30px] h-[40px] bg-[#464F6F] -top-3 left-1/2 md:left-60 transform -translate-x-1/2 md:translate-x-0">
                <div className="hidden md:block absolute z-20 top-14 left-2.5 rounded-2xl md:w-10 md:h-[10px] bg-[#1E2230]" />
            </div>

            <div className="flex flex-col gap-6 md:gap-8 mt-14 md:mt-18">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 md:gap-7 items-center">
                        <Image
                            src={isEditing ? profileImage : imagesAddresses.images.profile}
                            alt="profile"
                            width={80}
                            height={80}
                            className={`rounded-full border-6 md:border-8 border-[#363e58] ${isEditing && "cursor-pointer"}`}
                            onClick={changeProfileImage}
                        />
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
                            <div className="flex items-center gap-1">
                                <Image
                                    src={imagesAddresses.icons.verify}
                                    alt="verify"
                                    width={16}
                                    height={16}
                                    className="rounded-full"
                                />
                                <p className="text-light-100 font-normal text-xs md:text-sm leading-[18px] md:leading-[20px]">
                                    Verified Student
                                </p>
                            </div>
                            {
                                isEditing ?
                                    <input
                                        className="w-full bg-[#12141D] rounded-lg py-2 px-4 text-light-100 font-semibold text-sm md:text-[18px] leading-5 md:leading-7"
                                        type="text"
                                        placeholder="enter your name"
                                    />
                                    :
                                    <p className="font-semibold text-xl md:text-2xl leading-6 md:leading-[30px] text-white">
                                        Adrian
                                    </p>
                            }
                            {
                                isEditing ?
                                    <input
                                        className="w-full bg-[#12141D] rounded-lg py-2 px-4 text-light-100 font-semibold text-sm md:text-[18px] leading-5 md:leading-7"
                                        type="text"
                                        placeholder="enter your email"
                                    />
                                    :
                                    <p className="text-light-100 font-normal text-sm md:text-[18px] leading-4 md:leading-[20px]">
                                        contact@jsmastery.pro
                                    </p>
                            }
                        </div>
                    </div>
                               <AdminButton
                        text= {isEditing ? "Save" : "Edit"}
                        color='yellow'
                        containerClassName="cursor-pointer"
                        onClick={() => setIsEditing(!isEditing)}
                        iconPosition="right"
                        iconAddress={isEditing ? imagesAddresses.icons.save : imagesAddresses.icons.blackEdit}
                    />
                </div>

                {/* University */}
                <div className="flex flex-col gap-1">
                    <p className="text-light-100 font-normal text-sm md:text-[18px] leading-5 md:leading-7">
                        University
                    </p>
                    {
                        isEditing ?
                            <input
                                className="w-full bg-[#12141D] rounded-lg py-2 px-4 text-light-100 font-semibold text-sm md:text-[18px] leading-5 md:leading-7"
                                type="text"
                                placeholder="enter your university"
                            />
                            :
                            <p className="font-semibold text-xl md:text-2xl leading-6 md:leading-8 text-white">
                                JS Mastery Pro
                            </p>
                    }
                </div>

                {/* Student ID */}
                <div className="flex flex-col gap-1">
                    <p className="text-light-100 font-normal text-sm md:text-[18px] leading-5 md:leading-7">
                        Student ID
                    </p>
                    {
                        isEditing ?
                            <input
                                className="w-full bg-[#12141D] rounded-lg py-2 px-4 text-light-100 font-semibold text-sm md:text-[18px] leading-5 md:leading-7"
                                type="text"
                                placeholder="enter your student ID"
                                maxLength={11}
                            />
                            :
                            <p className="font-semibold text-xl md:text-2xl leading-6 md:leading-8 text-white">
                                234567856
                            </p>
                    }
                </div>

                {/* Profile Image */}
                {
                    isEditing ?
                        <div className="flex flex-col gap-1">
                            <p className="text-light-100 font-normal text-sm md:text-[18px] leading-5 md:leading-7">
                                upload your University card
                            </p>
                            <DragAndDropUpload
                                type="image"
                                onChange={(file) => { }}
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
    );
};

export default UserInfo;
