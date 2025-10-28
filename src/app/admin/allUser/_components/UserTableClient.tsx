'use client';

import Image from 'next/image';
import { useState } from 'react';
import AdminTable, { Column } from '../../components/AdminTable';
import CustomStatusAllUser from './CustomStatusAllUser';
import SiteUrls from '@/utils/routs';
import imagesAddresses from '@/utils/imageAddresses';

type User = {
    name: string;
    dateJoined: string;
    role: string;
    booksBorrowed: string;
    universityIDNumber: string;
    universityIDCard: string;
    action: string;
    avatar?: string;
    status?: 'Active' | 'Inactive';
};

interface Props {
    data: User[];
}

const UserTableClient = ({ data }: Props) => {
    const [users, setUsers] = useState<User[]>(data);

    const columns: Column<User>[] = [
        {
            key: 'avatar',
            label: 'Avatar',
            render: (row: User) => (
                <Image
                    src={row.avatar || '/avatar1.png'}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />
            ),
        },
        { key: 'name', label: 'Name' },
        { key: 'dateJoined', label: 'Date Joined' },
        {
            key: 'role',
            label: 'Role',
            render: (row: User) => (

                <CustomStatusAllUser
                    isColor
                    state={row.role === 'User' ? 1 : 2}
                />
            ),
        },
        {
            key: 'booksBorrowed',
            label: 'Books Borrowed',
            render: (row: User) => <span className="font-semibold">{row.booksBorrowed}</span>,
        },
        { key: 'universityIDNumber', label: 'University ID No' },
        {
            key: 'action',
            label: 'Action',
            render: (row: User) => (
                <Image
                    src={imagesAddresses.icons.delete}
                    alt="Avatar"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                />
            ),
        },
    ];

    return <AdminTable columns={columns} data={users} />;
};

export default UserTableClient;
