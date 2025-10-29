'use client';

import Image from 'next/image';
import { useState } from 'react';
import AdminTable, { Column } from '../../components/AdminTable';
import imagesAddresses from '@/utils/imageAddresses';

type AcountReq = {
    name: string;
    dateJoined: string;
    universityIDNumber: string;
    action: string;
    delete: string;
};

interface Props {
    data: AcountReq[];
}

const AccountRwqTableClient = ({ data }: Props) => {
    const [acountReq, setAcountReq] = useState<AcountReq[]>(data);

    const columns: Column<AcountReq>[] = [
        { key: 'name', label: 'Name',},
        { key: 'dateJoined', label: 'Date Joined' },
        { key: 'universityIDNumber', label: 'University ID No' },
        {
            key: 'action',
            label: 'Action',
            render: (row: AcountReq) => (
                <button
                    className="bg-[#ECFDF3] text-[#027A48] !py-2 !px-3 rounded-lg"
                >
                    Approve Account
                </button>
            ),
        },
        {
            key: 'delete',
            label: '',
            render: (row: AcountReq) => (
                <Image
                    src={imagesAddresses.icons.close}
                    alt="Avatar"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                />
            ),
        },
    ];

    return <AdminTable columns={columns} data={acountReq} />;
};

export default AccountRwqTableClient;
