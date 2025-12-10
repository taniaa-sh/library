'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BookFormInputs } from '@/utils/type';
import DragAndDropUpload from '../../../../../components/DragAndDropUpload';
import { ChromePicker, ColorResult } from 'react-color';
import imagesAddresses from '@/utils/imageAddresses';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CustomButton from '@/components/CustomButton';

const schema = yup.object({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    genre: yup.string().required('Genre is required'),
    bookVideo: yup.string().required('Book video is required'),
    bookPrimaryColor: yup.string().required('Book primary color is required'),
    bookImage: yup.string().required('Book image is required'),
    totalNumberOfBooks: yup.string().required('Total number of books is required'),
    description: yup.string().required('Description is required'),
}).required();

const EditBookPage = () => {
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const router = useRouter();

    const [shakeTrigger, setShakeTrigger] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<BookFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<BookFormInputs> = async (data) => {
        try {
            setLoading(true);
            await axios.post('/api/books', data);
            toast.success('Book added successfully');
            reset();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Something went wrong');
            } else {
                toast.error('Unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setShakeTrigger((prev) => prev + 1);
        }
    }, [errors]);

    const handleColorChange = (newColor: ColorResult) => {
        setColor(newColor.hex);
        setShowPicker(false);
    };

    return (
        <div className="!max-w-[1440px] flex flex-col gap-8 sm:gap-10 p-4 sm:p-6 rounded-xl shadow-lg mt-[90px] dark:bg-dark-500">
            <Toaster />
            <CustomButton
                text="Go back"
                iconAddress={imagesAddresses.icons.arrowLeft}
                iconPosition="right"
                color="white"
                containerClassName="cursor-pointer !w-fit dark:hidden"
                onClick={() => router.back()}
            />
            <CustomButton
                text="Go back"
                iconAddress={imagesAddresses.icons.arrowLeftWhite}
                iconPosition="right"
                color="white"
                containerClassName="cursor-pointer !w-fit hidden dark:flex text-nowrap"
                onClick={() => router.back()}
            />

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-6">
                {/* Title */}
                <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium mb-1 text-gray-900 dark:text-white">
                        Book Title
                    </label>
                    <motion.input
                        {...register('title')}
                        type="text"
                        placeholder="Enter the book title"
                        className="w-full border rounded-lg p-3 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-light-600 dark:bg-dark-400 dark:!text-white text-sm sm:text-base"
                        animate={errors.title ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                        key={shakeTrigger}
                        transition={{ duration: 0.4 }}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Author */}
                <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium mb-1 text-gray-900 dark:text-white">
                        Author
                    </label>
                    <motion.input
                        {...register('author')}
                        type="text"
                        className="w-full border rounded-lg p-3 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-light-600 dark:bg-dark-400 dark:!text-white text-sm sm:text-base"
                        placeholder="Enter the author name"
                        animate={errors.author ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                        key={shakeTrigger}
                        transition={{ duration: 0.4 }}
                    />
                    {errors.author && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.author.message}</p>
                    )}
                </div>

                {/* Genre */}
                <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium mb-1 text-gray-900 dark:text-white">
                        Genre
                    </label>
                    <motion.input
                        {...register('genre')}
                        type="text"
                        className="w-full border rounded-lg p-3 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-light-600 dark:bg-dark-400 dark:!text-white text-sm sm:text-base"
                        placeholder="Enter the genre of the book"
                        animate={errors.genre ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                        key={shakeTrigger}
                        transition={{ duration: 0.4 }}
                    />
                    {errors.genre && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.genre.message}</p>
                    )}
                </div>

                {/* Total Books */}
                <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium mb-1 text-gray-900 dark:text-white">
                        Total number of books
                    </label>
                    <motion.input
                        {...register('totalNumberOfBooks')}
                        type="number"
                        className="w-full border rounded-lg p-3 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-light-600 dark:bg-dark-400 dark:!text-white text-sm sm:text-base"
                        placeholder="Enter the total number of books"
                        animate={errors.totalNumberOfBooks ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                        key={shakeTrigger}
                        transition={{ duration: 0.4 }}
                    />
                    {errors.totalNumberOfBooks && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.totalNumberOfBooks.message}</p>
                    )}
                </div>

                {/* Book Image */}
                <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium !mb-3 text-gray-900 dark:text-white">
                        Book Image
                        <DragAndDropUpload
                            type="image"
                            onChange={(file) => setValue('bookImage', URL.createObjectURL(file as File))}
                            error={errors.bookImage?.message}
                            shakeTrigger={shakeTrigger}
                        />
                    </label>
                </div>

                {/* Book Primary Color */}
                <div className="relative">
                    <label className="block text-xs sm:text-sm md:text-base font-medium mb-1 text-gray-900 dark:text-white">
                        Book Primary Color
                    </label>
                    <motion.input
                        {...register('bookPrimaryColor')}
                        type="text"
                        value={color}
                        onClick={() => setShowPicker(!showPicker)}
                        readOnly
                        className="w-full border rounded-lg p-3  pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-light-600 dark:bg-dark-400 dark:!text-white text-sm sm:text-base cursor-pointer"
                        placeholder="Enter the primary color"
                        animate={errors.bookPrimaryColor ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                        key={shakeTrigger}
                        transition={{ duration: 0.4 }}
                    />
                    <div
                        style={{ backgroundColor: color }}
                        className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded border border-gray-300 cursor-pointer"
                        onClick={() => setShowPicker(!showPicker)}
                    />
                    {errors.bookPrimaryColor && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.bookPrimaryColor.message}</p>
                    )}
                    {showPicker && <ChromePicker color={color} onChange={handleColorChange} disableAlpha />}
                </div>

                {/* Book Video */}
                <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium mb-1 text-gray-900 dark:text-white">
                        Book Video
                    </label>
                    <DragAndDropUpload
                        type="video"
                        onChange={(file) => setValue('bookVideo', URL.createObjectURL(file as File))}
                        error={errors.bookVideo?.message}
                        shakeTrigger={shakeTrigger}
                    />
                </div>

                {/* Book Summary */}
                <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium mb-1 text-gray-900 dark:text-white">
                        Book Summary
                    </label>
                    <motion.textarea
                        {...register('description')}
                        rows={4}
                        className="w-full border rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-light-600 dark:bg-dark-400 dark:!text-white text-sm sm:text-base"
                        placeholder="Write a brief summary of the book"
                        animate={errors.description ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                        key={shakeTrigger}
                        transition={{ duration: 0.4 }}
                    ></motion.textarea>
                    {errors.description && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>
                <CustomButton
                    text={loading ? 'Updating...' : 'Update Book'}
                    width="w-fit py-2 sm:py-3 cursor-pointer"
                    color="blue"
                    type="submit"
                    onClick={() => { }}
                    loading={loading}
                />
            </form>
        </div>
    );
};

export default EditBookPage;
