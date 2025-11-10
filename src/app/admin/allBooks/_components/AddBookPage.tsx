'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BookFormInputs } from '@/utils/type';
import DragAndDropUpload from './DragAndDropUpload';
import { ChromePicker, ColorResult } from 'react-color';
import AdminButton from '../../components/AdminButton';
import imagesAddresses from '@/utils/imageAddresses';
import { useRouter } from 'next/navigation';

const schema = yup.object({
    title: yup.string().required('title is required'),
    author: yup.string().required('author is required'),
    genre: yup.string().required('genre is required'),
    bookVideo: yup.string().required('book video is required'),
    bookPrimaryColor: yup.string().required('book primary color is required'),
    bookImage: yup.string().required('book image is required'),
    totalNumberOfBooks: yup.string().required('total number of books is required'),
    description: yup.string().required('description is required'),
}).required();

const AddBookPage = () => {
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
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

    const handleColorChange = (newColor: ColorResult) => {
        setColor(newColor.hex);
        setShowPicker(false);
    };

    return (
        <div className="w-full flex flex-col gap-10 mx-auto p-6 rounded-xl shadow-lg !mt-[140px]">
            <Toaster />
            <AdminButton
                text="Go back"
                iconAddress={imagesAddresses.icons.arrowLeft}
                iconPosition="right"
                color="white"
                containerClassName="cursor-pointer !w-fit !-mt-10"
                onClick={() => router.back()}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                {/*title*/}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                        Book Title
                    </label>
                    <input
                        {...register('title')}
                        type="text"
                        className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 !bg-[#F9FAFB]"
                        placeholder="Enter the book title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs !mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/*author*/}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                        Author
                    </label>
                    <input
                        {...register('author')}
                        type="text"
                        className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 !bg-[#F9FAFB]"
                        placeholder="Enter the author name"
                    />
                    {errors.author && (
                        <p className="text-red-500 text-xs !mt-1">{errors.author.message}</p>
                    )}
                </div>

                {/*genre*/}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                        Genre
                    </label>
                    <input
                        {...register('genre')}
                        type="text"
                        className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 !bg-[#F9FAFB]"
                        placeholder="Enter the genre of the book"
                    />
                    {errors.genre && (
                        <p className="text-red-500 text-xs !mt-1">{errors.genre.message}</p>
                    )}
                </div>

                {/*book count*/}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                        Total number of books
                    </label>
                    <input
                        {...register('totalNumberOfBooks')}
                        type="number"
                        className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 !bg-[#F9FAFB]"
                        placeholder="Enter the total number of books"
                    />
                    {errors.totalNumberOfBooks && (
                        <p className="text-red-500 text-xs !mt-1">
                            {errors.totalNumberOfBooks.message}
                        </p>
                    )}
                </div>

                {/*image*/}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                        Book Image
                    </label>
                    <DragAndDropUpload
                        type="image"
                        onChange={(file) => setValue('bookImage', URL.createObjectURL(file))}
                    />
                    {errors.bookImage && (
                        <p className="text-red-500 text-xs !mt-1">{errors.bookImage.message}</p>
                    )}
                </div>

                {/*color*/}
                <div className="relative">
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                        Book Primary Color
                    </label>
                    <input
                        {...register('bookPrimaryColor')}
                        type="text"
                        value={color}
                        onClick={() => setShowPicker(!showPicker)}
                        readOnly
                        className="w-full border rounded-lg p-4 !pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 !bg-[#F9FAFB] cursor-pointer"
                        placeholder="Enter the primary color"
                    />
                    <div
                        style={{ backgroundColor: color }}
                        className="absolute top-1/2 left-3 -translate-y-1/2 w-6 h-6 rounded border border-gray-300 cursor-pointer"
                        onClick={() => setShowPicker(!showPicker)}
                    />
                    {errors.bookPrimaryColor && (
                        <p className="text-red-500 text-xs !mt-1">{errors.bookPrimaryColor.message}</p>
                    )}
                    {showPicker && (
                        <ChromePicker
                            color={color}
                            onChange={handleColorChange}
                            disableAlpha
                        />
                    )}
                </div>

                {/*video*/}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                        Book Video
                    </label>
                    <DragAndDropUpload
                        type="video"
                        onChange={(file) => setValue('bookVideo', URL.createObjectURL(file))}
                    />
                    {errors.bookVideo && (
                        <p className="text-red-500 text-xs !mt-1">{errors.bookVideo.message}</p>
                    )}
                </div>

                {/*summary*/}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        Book Summary
                    </label>
                    <textarea
                        {...register('description')}
                        rows={4}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 !bg-[#F9FAFB]"
                        placeholder="Write a brief summary of the book"
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-xs !mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg text-white font-medium transition ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary-admin hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Uploading...' : 'Upload Book'}
                </button>
            </form>
        </div>
    );
};

export default AddBookPage;
