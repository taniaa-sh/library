'use client';

import imagesAddresses from '@/utils/imageAddresses';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SiteUrls from '@/utils/routs';
import { useRef, useState } from 'react';
import CustomButton from '@/components/CustomButton';
import PdfPreviewModal from '@/components/PdfPreviewModal';

interface Book {
    _id: string;
    id: number;
    title: string;
    author: string;
    genre: string;
    bookVideo: string;
    bookPrimaryColor: string;
    bookImage: string;
    totalNumberOfBooks: number;
    description: string;
    bookPdf: string;
    createdAt: string;
    updatedAt: string;
}

interface Props {
    data: Book;
}

const DetailBookPage = ({ data }: Props) => {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState<boolean>(false)

    const handleViewPdf = () => {
        setShowPdfModal(true)
    }

    const togglePlay = async () => {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            try {
                await video.play();
            } catch (error) {
                console.error('Video playback failed:', error);
            }
        } else {
            video.pause();
        }
    };

    const formattedDate = data.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-GB')
        : '-';

    return (
        <>
            {
                showPdfModal && (
                    <PdfPreviewModal
                        setShowPdfModal={setShowPdfModal}
                        pdfUrl={data.bookPdf || ""}
                        isAdmin
                    />
                )
            }
            <div className="mx-auto mt-[90px] flex h-full w-full flex-col gap-10 p-4 sm:p-6 dark:bg-gray-900">
                <div className="flex w-full flex-col gap-6 sm:gap-[35px] lg:flex-row">
                    <div
                        className="flex items-center justify-center rounded-xl px-6 py-4 sm:py-6 sm:pr-18 sm:pl-8 dark:bg-[#C4214C33]"
                        style={{
                            backgroundColor: `${data.bookPrimaryColor}1A`,
                        }}
                    >
                        {data.bookImage ? (
                            <Image
                                src={data.bookImage}
                                alt={data.title}
                                width={180}
                                height={190}
                                className="max-h-[240px] w-auto object-contain"
                                unoptimized
                            />
                        ) : (
                            <Image
                                src={imagesAddresses.images.book2}
                                alt="Book"
                                width={180}
                                height={190}
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-[18px]">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <p className="text-sm font-normal text-dark-50 dark:text-gray-400 sm:text-base">
                                Created at:
                            </p>

                            <div className="flex items-center gap-1">
                                <Image
                                    src={imagesAddresses.icons.calendar}
                                    alt="Calendar"
                                    width={16}
                                    height={16}
                                    className="dark:invert"
                                />
                                <p className="text-sm font-normal text-dark-200 dark:text-gray-300 sm:text-base">
                                    {formattedDate}
                                </p>
                            </div>
                        </div>

                        <p className="text-lg font-semibold leading-snug text-dark-400 dark:text-gray-100 sm:text-2xl">
                            {data.title}
                        </p>

                        <p className="text-base font-semibold text-dark-200 dark:text-gray-300 sm:text-lg">
                            By {data.author}
                        </p>

                        <p className="text-sm font-normal text-dark-50 dark:text-gray-400 sm:text-base">
                            {data.genre}
                        </p>

                        <p className="text-sm text-dark-200 dark:text-gray-300">
                            Available copies: {data.totalNumberOfBooks}
                        </p>

                        <CustomButton
                            text="Edit Book"
                            iconAddress={imagesAddresses.icons.whiteEdit}
                            iconPosition="right"
                            color="blue"
                            containerClassName="cursor-pointer !w-full"
                            onClick={() =>
                                router.push(`${SiteUrls.adminEditBook}?id=${data.id}`)
                            }
                        />

                        {data.bookPdf && (
                            // <a
                            //   href={data.bookPdf}
                            //   target="_blank"
                            //   rel="noopener noreferrer"
                            //   className="text-sm text-blue-600 underline dark:text-blue-400"
                            // >
                            //   View Book PDF
                            // </a>
                            <p
                                className="text-sm text-blue-600 underline dark:text-blue-400 cursor-pointer"
                                onClick={handleViewPdf}
                            >
                                View Book PDF
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex w-full flex-col gap-8 sm:gap-10 lg:flex-row">
                    <div className="flex w-full flex-col gap-3 sm:gap-4">
                        <p className="text-base font-semibold text-dark-400 dark:text-gray-100 sm:text-lg">
                            Summary
                        </p>

                        <p className="text-justify text-sm font-normal leading-relaxed text-slate-500 dark:text-gray-300 sm:text-base">
                            {data.description || 'No description available.'}
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-4">
                        <p className="text-base font-semibold text-dark-400 dark:text-gray-100 sm:text-lg">
                            Video
                        </p>

                        <div className="relative w-full overflow-hidden rounded-lg border border-gray-500 shadow-lg dark:border-gray-700">
                            {data.bookVideo ? (
                                <>
                                    <video
                                        ref={videoRef}
                                        poster={data.bookImage || undefined}
                                        src={data.bookVideo}
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                        onEnded={() => setIsPlaying(false)}
                                        onClick={togglePlay}
                                        className="h-[200px] w-full cursor-pointer object-cover md:h-[300px]"
                                        controls={isPlaying}
                                    />

                                    {!isPlaying && (
                                        <button
                                            type="button"
                                            onClick={togglePlay}
                                            aria-label="Play video"
                                            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20"
                                        >
                                            <Image
                                                src={imagesAddresses.icons.playWhite}
                                                alt="Play"
                                                width={64}
                                                height={64}
                                                className="rounded-full border-4 border-white p-4"
                                            />
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="flex h-[200px] items-center justify-center text-sm text-gray-500 md:h-[300px]">
                                    No video available.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailBookPage;