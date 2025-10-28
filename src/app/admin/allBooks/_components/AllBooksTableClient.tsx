'use client';

import Image from 'next/image';
import { useState } from 'react';
import AdminTable, { Column } from '../../components/AdminTable';
import imagesAddresses from '@/utils/imageAddresses';

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
            render: (row: Book) => (
                <div className='flex gap-2'>
                    <Image
                        src={imagesAddresses.icons.edit}
                        alt="Avatar"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                    <Image
                        src={imagesAddresses.icons.delete}
                        alt="Avatar"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                </div>
            ),
        },
    ];

    return <AdminTable columns={columns} data={books} />;
};

export default AllBooksTableClient;
