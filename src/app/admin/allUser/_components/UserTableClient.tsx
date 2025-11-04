'use client';

import Image from 'next/image';
import { useState } from 'react';
import AdminTable, { Column } from '../../components/AdminTable';
import CustomStatusAllUser from './CustomStatusAllUser';
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
    email?: string;
    id?: string
};

interface Props {
    data: User[];
}

const UserTableClient = ({ data }: Props) => {
    const [users, setUsers] = useState<User[]>(data);

    const handleDelete = (id: string) => {
        setUsers((prev) =>
            prev.filter((user) => user.id !== id)
        );
    };

    const columns: Column<User>[] = [
        {
            key: 'name',
            label: 'Name',
            render: (row: User) => (
                <div className='flex gap-2'>
                    <Image
                        src={row.avatar || '/avatar1.png'}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold text-sm leading-[20px] text-dark-400'>{row.name}</p>
                        <p className='font-semibold text-sm leading-[20px] text-[#64748B]'>{row.email}</p>
                    </div>
                </div>
            ),
        },
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
                    onClick={() => setTimeout(() => handleDelete(row.id || ''), 500)}
                />
            ),
        },
    ];

    return <AdminTable columns={columns} data={users} />;
};

export default UserTableClient;
