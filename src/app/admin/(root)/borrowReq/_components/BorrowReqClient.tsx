'use client';

import Image from 'next/image';
import { useState } from 'react';
import AdminTable, { Column } from '../../_components/AdminTable';
import imagesAddresses from '@/utils/imageAddresses';
import CustomStatusBorrowReq from './CustomStatusBorrowReq';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';

type Borrow = {
    book: string;
    userRequested: string;
    status: string;
    borrowedDate: string;
    returnDate: string;
    dueDate: string;
    receipt: string;
};

interface Props {
    data: Borrow[];
}

const BorrowReqClient = ({ data }: Props) => {
    const [borrowReq, setBorrowReq] = useState<Borrow[]>(data);
    const router = useRouter();
    const totalPages = 10;

    const handlePageClick = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected + 1;
        router.push(`?page=${page}`);
    };

    const columns: Column<Borrow>[] = [
        { key: 'book', label: 'Book' },
        { key: 'userRequested', label: 'User Requested' },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (

                <CustomStatusBorrowReq
                    isColor
                    state={row.status === 'Borrowed' ? 1 : row.status === 'Late Return' ? 2 : 3}
                />
            ),
        },
        { key: 'borrowedDate', label: 'Borrowed date' },
        { key: 'returnDate', label: 'Return date' },
        { key: 'dueDate', label: 'Due Date' },
        {
            key: 'receipt',
            label: 'Receipt',
            render: () => (
                <div className='flex gap-2 !p-2 rounded-lg bg-light-300 dark:bg-dark-900'>
                    <Image
                        src={imagesAddresses.icons.receipt}
                        alt="Avatar"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                    <p className='text-sm font-medium text-primary-admin'>Generate</p>
                </div>
            ),
        },
    ];

    return (
        <>
            <AdminTable columns={columns} data={borrowReq} />;
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
    )
};

export default BorrowReqClient;
