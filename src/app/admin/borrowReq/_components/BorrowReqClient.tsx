'use client';

import Image from 'next/image';
import { useState } from 'react';
import AdminTable, { Column } from '../../components/AdminTable';

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

const BorrowReqClient = ({ data }: Props) => {
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
        { key: 'role', label: 'Role' },
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
                <button
                    className="text-red-500"
                    onClick={() =>
                        setUsers(users.filter((u) => u.universityIDNumber !== row.universityIDNumber))
                    }
                >
                    {row.action}
                </button>
            ),
        },
    ];

    return <AdminTable columns={columns} data={users} />;
};

export default BorrowReqClient;
