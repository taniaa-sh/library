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
            <div className="flex justify-center mt-7">
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName="flex space-x-2 cursor-pointer"
                    pageClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                    activeClassName="bg-primary-admin text-white cursor-pointer"
                    previousClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer select-none"
                    nextClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer select-none"
                />
            </div>
        </>
    );
};

export default AllBooksTableClient;
