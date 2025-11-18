"use client";

import imagesAddresses from "@/utils/imageAddresses";
import { Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

interface DenyAccountModalProps {
    setShowDenyModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DenyAccountModal = (props: DenyAccountModalProps) => {

    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
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
                <div className="w-[500px] z-10 flex flex-col gap-1 bg-white rounded-xl !p-6">
                    <Image
                        src={imagesAddresses.icons.modalClose}
                        alt="close"
                        width={24}
                        height={24}
                        className="cursor-pointer self-start"
                        onClick={() => props.setShowDenyModal(false)}
                    />
                    <div className="flex flex-col items-center gap-[22px]">
                        <Image
                            src={imagesAddresses.icons.deny}
                            alt="deny"
                            width={80}
                            height={80}
                        />
                        <div className="flex flex-col items-center gap-[10px] px-4">
                            <p className="font-semibold text-[20px] text-[#1E293B]">Deny Account Request</p>
                            <p className="font-normal text-base text-[#64748B] text-center">
                                Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification.
                            </p>
                        </div>
                        <Button
                            onClick={() => { }}
                            variant="contained"
                            sx={{
                                backgroundColor: '#F46F70',
                                color: '#fff',
                                textTransform: 'none',
                                fontWeight: 700,
                                borderRadius: '12px',
                                px: 3,
                                py: 1.5,
                                width: '100%',
                                fontSize: '14px',
                                '&:hover': {
                                    backgroundColor: '#C24E55',
                                },
                            }}
                        >
                            Deny & Notify Student
                        </Button>
                    </div>

                </div>
                <div
                    className="inset-0 absolute"
                    onClick={() => props.setShowDenyModal(false)}
                />
            </div>
            {/* mobile */}
            <div className="flex md:hidden items-center justify-center fixed inset-0 bg-black/40 z-50 w-full h-full">
                <div className={`
            z-10 p-5 rounded-t-[20px] bg-white w-full flex flex-col gap-5 items-start bottom-0 fixed
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
                            src={imagesAddresses.icons.deny}
                            alt='close'
                            width={50}
                            height={50}
                        />
                        <p className="text-[20px] font-semibold leading-8 text-[#1E293B] text-center">
                            Deny Account Request
                        </p>
                    </div>

                    <p className='text-base leading-6 font-normal text-[#64748B] text-start'>
                        Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification.
                    </p>
                    <Button
                        onClick={() => { }}
                        variant="contained"
                        sx={{
                            backgroundColor: '#F46F70',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '12px',
                            px: 3,
                            py: 1,
                            width: '100%',
                            fontSize: '14px',
                            '&:hover': {
                                backgroundColor: '#C24E55',
                            },
                        }}
                    >
                        Deny & Notify Student
                    </Button>
                </div>
                <div
                    className='absolute inset-0'
                    onClick={() => props.setShowDenyModal(false)}
                />
            </div>
        </>
    );
};

export default DenyAccountModal;
