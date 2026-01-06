"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

interface BorrowBookModalProps {
    setShowBorrowModal: React.Dispatch<React.SetStateAction<boolean>>;
    bookImg: string;
    title: string;
    author: string;
    Genre: string;
    availableBooks: number;
}

interface FormValues {
    name: string;
    email: string;
    quantity: number;
}

const BorrowBookModal = ({
    setShowBorrowModal,
    bookImg,
    title,
    author,
    Genre,
    availableBooks,
}: BorrowBookModalProps) => {

    const router = useRouter();
    const [isClosing, setIsClosing] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        quantity: yup
            .number()
            .transform((value, originalValue) => {
                return originalValue === "" || isNaN(value)
                    ? undefined
                    : value;
            })
            .typeError("Quantity is required")
            .required("Quantity is required")
            .min(1, "Minimum 1 book")
            .max(availableBooks, `Maximum ${availableBooks} books`),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: { name: "", email: "", quantity: 1 },
        mode: "onChange",
    });

    const onSubmit = async (data: FormValues) => {
        await new Promise((res) => setTimeout(res, 1000));

        toast.success("Book borrowed successfully");
        reset();
        setShowBorrowModal(false);
        router.push("/");
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => setShowBorrowModal(false), 250);
    };

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, []);

    const ModalContent = (
        <div
            className={`w-full md:w-[600px] bg-gray-900 dark:bg-white rounded-t-[20px] md:rounded-xl p-5 flex flex-col gap-4 z-50 ${isClosing ? "animate-slideDown" : "animate-slideUp"
                }`}
        >
            <div className="self-end hidden md:flex gap-2">
                <Image
                    src={imagesAddresses.icons.modalClose}
                    alt="close"
                    className="cursor-pointer hidden dark:block w-6 h-6"
                    onClick={handleClose}
                    width={24}
                    height={24}
                />
                <Image
                    src={imagesAddresses.icons.modalCloseWhite}
                    alt="close"
                    className="cursor-pointer dark:hidden w-6 h-6"
                    onClick={handleClose}
                    width={24}
                    height={24}
                />
            </div>

            {/* Book Info */}
            <div className="flex gap-6 items-center mb-4 rounded-xl shadow-md transition-all duration-300
                            bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300
                            hover:scale-105 hover:shadow-xl"
            >
                <Image
                    src={bookImg}
                    alt={title}
                    width={150}
                    height={100}
                    className="object-cover"
                />
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold text-white dark:text-gray-900 line-clamp-2">{title}</p>
                    <p className="text-gray-300 dark:text-gray-600 text-sm">{author}</p>
                    <p className="text-gray-300 dark:text-gray-600 text-sm">{Genre}</p>
                    <p className="text-gray-300 dark:text-gray-600 text-sm">
                        Available: <span className="font-semibold text-green-400 dark:text-green-600">{availableBooks}</span>
                    </p>
                </div>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2">
                    <div className="flex flex-col w-full">
                        <input
                            type="text"
                            placeholder="Your Name"
                            {...register("name")}
                            className="w-full px-3 py-2 rounded-md bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 placeholder-gray-400 focus:outline-none"
                        />
                        <p className="text-red-400 text-xs min-h-[16px] mt-1">
                            {errors.name?.message}
                        </p>
                    </div>

                    <div className="flex flex-col w-full">
                        <input
                            type="number"
                            min={1}
                            max={availableBooks}
                            placeholder="Quantity"
                            {...register("quantity", {
                                onChange: (e) => {
                                    const value = Number(e.target.value);
                                    if (value > availableBooks) {
                                        e.target.value = availableBooks.toString();
                                    }
                                },
                            })}
                            className="w-full px-3 py-2 rounded-md bg-gray-800 dark:bg-gray-200
               text-white dark:text-gray-900 placeholder-gray-400 focus:outline-none"
                        />
                        <p className="text-red-400 text-xs min-h-[16px] mt-1">
                            {errors.quantity?.message}
                        </p>
                    </div>
                </div>

                <input
                    type="email"
                    placeholder="Your Email"
                    {...register("email")}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

                <div className="flex justify-end gap-2 mt-2 w-full md:w-fit flex-col md:flex-row">
                    <CustomButton
                        text="Cancel"
                        color="secondary"
                        containerClassName="w-full md:w-fit cursor-pointer flex md:px-6"
                        onClick={handleClose}
                    />
                    <CustomButton
                        text="Submit"
                        color="yellow"
                        type="submit"
                        containerClassName="w-full md:w-fit cursor-pointer flex md:!px-8"
                    />
                </div>
            </form>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/70"
                onClick={handleClose}
            />

            {/* Modal */}
            {ModalContent}
        </div>

    );
};

export default BorrowBookModal;
