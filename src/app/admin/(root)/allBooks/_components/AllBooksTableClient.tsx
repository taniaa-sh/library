'use client';

import Image from 'next/image';
import { useState } from 'react';
import AdminTable, { Column } from '../../_components/AdminTable';
import imagesAddresses from '@/utils/imageAddresses';
import SiteUrls from '@/utils/routs';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';

type Book = {
    bookTitle: string;
    author: string;
    genre: string;
    dateCreated: string;
    action: string;
};

interface Props {
    data: Book[];
}

const AllBooksTableClient = ({ data }: Props) => {
    const [books, setBooks] = useState<Book[]>(data);
    const router = useRouter();
    const totalPages = 10;

    const handlePageClick = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected + 1;
        router.push(`?page=${page}`);
    };

    const columns: Column<Book>[] = [
        {
            key: 'bookTitle',
            label: 'Book Title',
        },
        { key: 'author', label: 'Author' },
        { key: 'genre', label: 'Genre' },
        { key: 'dateCreated', label: 'Date Created' },
        {
            key: 'action',
            label: 'Action',
            render: () => (
                <div className='flex gap-2'>
                    <Image
                        src={imagesAddresses.icons.edit}
                        alt="Avatar"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => router.push(SiteUrls.adminEditBook)}
                    />
                    <Image
                        src={imagesAddresses.icons.delete}
                        alt="Avatar"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                    <Image
                        src={imagesAddresses.icons.eye}
                        alt="Avatar"
                        width={20}
                        height={20}
                        className="cursor-pointer dark:hidden"
                        onClick={() => router.push(SiteUrls.adminDetailBook)}
                    />
                    <Image
                        src={imagesAddresses.icons.eyeWhite}
                        alt="Avatar"
                        width={20}
                        height={20}
                        className="cursor-pointer hidden dark:block"
                        onClick={() => router.push(SiteUrls.adminDetailBook)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <AdminTable columns={columns} data={books} />
            {totalPages > 1 && (
                <div className="flex justify-center mt-7 overflow-x-auto dark:!text-white">
                    <ReactPaginate
                        previousLabel={"‹"}
                        nextLabel={"›"}
                        breakLabel={"…"}
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
