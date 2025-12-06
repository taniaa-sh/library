'use client';

import Image from 'next/image';
import { useState } from 'react';
import AdminTable, { Column } from '../../_components/AdminTable';
import imagesAddresses from '@/utils/imageAddresses';
import CustomStatusBorrowReq from './CustomStatusBorrowReq';

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
                <div className='flex gap-2 !p-2 rounded-lg bg-light-300'>
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

    return <AdminTable columns={columns} data={borrowReq} />;
};

export default BorrowReqClient;
