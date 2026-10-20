'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';

import AdminTable, { Column } from '../../_components/AdminTable';
import imagesAddresses from '@/utils/imageAddresses';
import SiteUrls from '@/utils/routs';
import DeleteAdminModal from '../../_components/DeleteAdminModal';

type Book = {
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
    __v?: number;
};

interface Props {
    data: Book[];
    totalPages?: number;
}

const AllBooksTableClient = ({ data, totalPages = 1 }: Props) => {
    const [books, setBooks] = useState<Book[]>(data);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [id, setId] = useState<string>('');

    const router = useRouter();

    const handlePageClick = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected + 1;
        router.push(`?page=${page}`);
    };

    const handleDelete = () => {
        setBooks((prev) => prev.filter((book) => book._id !== id));
        setShowDeleteModal(false);
        setId('');
    };

    const columns: Column<Book>[] = [
        {
            key: 'title',
            label: 'Book Title',
        },
        {
            key: 'author',
            label: 'Author',
        },
        {
            key: 'genre',
            label: 'Genre',
        },
        {
            key: 'createdAt',
            label: 'Date Created',
            render: (row: Book) =>
                new Date(row.createdAt).toLocaleDateString('en-GB'),
        },
        {
            key: '_id',
            label: '',
            render: (row: Book) => (
                <div className="flex gap-2">
                    <Image
                        src={imagesAddresses.icons.edit}
                        alt="Edit"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                        onClick={() =>
                            router.push(`${SiteUrls.adminEditBook}?id=${row._id}`)
                        }
                    />

                    <Image
                        src={imagesAddresses.icons.delete}
                        alt="Delete"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                        onClick={() => {
                            setId(row._id);
                            setShowDeleteModal(true);
                        }}
                    />

                    <Image
                        src={imagesAddresses.icons.eye}
                        alt="View"
                        width={16}
                        height={16}
                        className="cursor-pointer dark:hidden"
                        onClick={() =>
                            router.push(`${SiteUrls.adminDetailBook}?id=${row._id}`)
                        }
                    />

                    <Image
                        src={imagesAddresses.icons.eyeWhite}
                        alt="View"
                        width={16}
                        height={16}
                        className="hidden cursor-pointer dark:block"
                        onClick={() =>
                            router.push(`${SiteUrls.adminDetailBook}?id=${row._id}`)
                        }
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            {showDeleteModal && (
                <DeleteAdminModal
                    setShowDeleteModal={setShowDeleteModal}
                    onDelete={handleDelete}
                    isBook
                />
            )}

            <AdminTable columns={columns} data={books} />

            {totalPages > 1 && (
                <div className="mt-7 flex justify-center overflow-x-auto dark:!text-white">
                    <ReactPaginate
                        previousLabel="‹"
                        nextLabel="›"
                        breakLabel="…"
                        pageCount={totalPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName="flex items-center gap-1 text-xs sm:text-sm cursor-pointer select-none whitespace-nowrap"
                        pageClassName="px-2 sm:px-3 py-1 border rounded-md border-gray-300 dark:border-dark-400 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-400 transition"
                        activeClassName="bg-primary-admin text-white border-primary-admin"
                        previousClassName="px-2 sm:px-3 py-1 border rounded-md border-gray-300 dark:border-dark-400 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-400 transition"
                        nextClassName="px-2 sm:px-3 py-1 border rounded-md border-gray-300 dark:border-dark-400 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-400 transition"
                        disabledClassName="opacity-40 cursor-not-allowed"
                        breakClassName="dark:text-white text-gray-700"
                    />
                </div>
            )}
        </>
    );
};

export default AllBooksTableClient;