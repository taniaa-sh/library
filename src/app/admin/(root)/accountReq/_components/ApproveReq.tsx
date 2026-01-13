"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ApproveReqProps {
    setShowApproveModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ApproveReq = (props: ApproveReqProps) => {

    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            props.setShowApproveModal(false)
            setIsClosing(false)
        }, 250);
    };

    useEffect(() => {
        document.body.style.overflowY = 'hidden'
        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [])

    return (
        <>
            {/* desktop */}
            <div className="hidden md:flex items-center justify-center fixed inset-0 w-full h-full bg-black/40 z-50">
                <div className="w-[500px] z-10 flex flex-col gap-1 bg-white dark:bg-gray-900 rounded-xl !p-6 !ml-60">
                    <Image
                        src={imagesAddresses.icons.modalClose}
                        alt="close"
                        width={24}
                        height={24}
                        className="!cursor-pointer self-end dark:hidden"
                        onClick={() => props.setShowApproveModal(false)}
                    />
                    <Image
                        src={imagesAddresses.icons.modalCloseWhite}
                        alt="close"
                        width={24}
                        height={24}
                        className="!cursor-pointer self-end hidden dark:flex"
                        onClick={() => props.setShowApproveModal(false)}
                    />
                    <div className="flex flex-col items-center gap-[22px]">
                        <Image
                            src={imagesAddresses.icons.approve}
                            alt="deny"
                            width={80}
                            height={80}
                        />
                        <div className="flex flex-col items-center gap-[10px] px-4">
                            <p className="font-semibold text-[20px] text-dark-400 dark:text-white">Approve Book Request</p>
                            <p className="font-normal text-base text-dark-50 dark:text-gray-400 text-center">
                                Approve the student’s account request and grant access. A confirmation email will be sent upon approval.
                            </p>
                        </div>
                        <CustomButton
                            text="Approve & Send Confirmation"
                            color="green"
                            containerClassName="w-full cursor-pointer flex text-nowrap"
                            onClick={() => { }}
                        />
                    </div>

                </div>
                <div
                    className="inset-0 absolute"
                    onClick={() => props.setShowApproveModal(false)}
                />
            </div>
            {/* mobile */}
            <div className="flex md:hidden items-center justify-center fixed inset-0 bg-black/40 z-50 w-full h-full">
                <div className={`
            z-10 p-5 rounded-t-[20px] bg-white dark:bg-gray-900 w-full flex flex-col gap-5 items-start bottom-0 fixed
            ${isClosing ? 'animate-slideDown' : 'animate-slideUp'}
                `}>
                    <Image
                        className='cursor-pointer self-center -mt-5'
                        src={imagesAddresses.icons.handle}
                        alt='close'
                        width={24}
                        height={24}
                        onClick={handleClose}
                    />
                    <span className='w-screen h-[0.5px] bg-gray300 dark:bg-gray400 -mx-5 -mt-4' />

                    <div className="w-full flex items-center justify-start gap-4">
                        <Image
                            className='cursor-pointer self-center'
                            src={imagesAddresses.icons.approve}
                            alt='close'
                            width={50}
                            height={50}
                        />
                        <p className="text-[20px] font-semibold leading-8 text-dark-400 dark:text-white text-center">
                            Approve Book Request
                        </p>
                    </div>

                    <p className='text-base leading-6 font-normal text-dark-50 dark:text-gray-400 text-start'>
                        Approve the student’s account request and grant access. A confirmation email will be sent upon approval.
                    </p>
                    <CustomButton
                        text="Approve & Send Confirmation"
                        color="green"
                        containerClassName="w-full cursor-pointer flex text-nowrap"
                        onClick={() => { }}
                    />
                </div>
                <div
                    className='absolute inset-0'
                    onClick={() => props.setShowApproveModal(false)}
                />
            </div>
        </>
    );
};

export default ApproveReq;
