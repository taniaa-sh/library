'use client';

import Image from 'next/image';
import { useState } from 'react';
import AdminTable, { Column } from '../../components/AdminTable';
import CustomStatusAllUser from './CustomStatusAllUser';
import imagesAddresses from '@/utils/imageAddresses';
import { Popover, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CustomStatus from '../../components/CustomStatus';

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
    id?: string;
};

interface Props {
    data: User[];
}

const UserTableClient = ({ data }: Props) => {
    const [users, setUsers] = useState<User[]>(data);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [pendingRole, setPendingRole] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const open = Boolean(anchorEl);

    const handleDelete = (id: string) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    };

    const handleRoleChange = (newRole: string) => {
        if (!selectedUser) return;
        setPendingRole(newRole);
        setConfirmOpen(true);
    };

    const confirmRoleChange = () => {
        if (!selectedUser || !pendingRole) return;

        setUsers((prev) =>
            prev.map((user) =>
                user.id === selectedUser.id ? { ...user, role: pendingRole } : user
            )
        );

        setSelectedUser((prev) =>
            prev ? { ...prev, role: pendingRole } : prev
        );

        setConfirmOpen(false);
        setPendingRole(null);
        handleClose();
    };

    const columns: Column<User>[] = [
        {
            key: 'name',
            label: 'Name',
            render: (row: User) => (
                <div className="flex gap-2">
                    <Image
                        src={row.avatar || '/avatar1.png'}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold text-sm text-dark-400">{row.name}</p>
                        <p className="text-sm text-[#64748B]">{row.email}</p>
                    </div>
                </div>
            ),
        },
        { key: 'dateJoined', label: 'Date Joined' },
        {
            key: 'role',
            label: 'Role',
            render: (row: User) => (
                <div className="cursor-pointer" onClick={(e) => handleClick(e, row)}>
                    <CustomStatusAllUser isColor state={row.role === 'User' ? 1 : 2} />
                </div>
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
                    alt="Delete"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={() => handleDelete(row.id || '')}
                />
            ),
        },
    ];

    return (
        <>
            <AdminTable columns={columns} data={users} />
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{ className: 'p-4 rounded-xl shadow-lg' }}
            >
                {selectedUser && (
                    <div className="!w-[132px] flex flex-col gap-3">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => handleRoleChange('User')}
                        >
                            <CustomStatus text="User" color="red" size="medium" width="" />
                            {selectedUser.role === 'User' && (
                                <Image src={imagesAddresses.icons.check} alt="check" width={20} height={20} />
                            )}
                        </div>

                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => handleRoleChange('Admin')}
                        >
                            <CustomStatus text="Admin" color="lightGreen" size="medium" width="" />
                            {selectedUser.role === 'Admin' && (
                                <Image src={imagesAddresses.icons.check} alt="check" width={20} height={20} />
                            )}
                        </div>
                    </div>
                )}
            </Popover>

            <Dialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        padding: '12px 8px',
                        width: '480px',
                        backgroundColor: '#fff',
                        color: '#1e293b',
                        boxShadow: '0 8px 32px rgba(37, 56, 140, 0.2)',
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#25388C',
                        textAlign: 'start',
                        pb: 1,
                    }}
                >
                    Change User Role
                </DialogTitle>

                <DialogContent
                    sx={{
                        fontSize: '15px',
                        color: '#475569',
                        textAlign: 'start',
                        lineHeight: 1.8,
                        mt: 1,
                    }}
                >
                    Are you sure you want to change this user role to{' '}
                    <strong style={{ color: '#25388C' }}>{pendingRole}</strong> ?
                </DialogContent>

                <DialogActions
                    sx={{
                        justifyContent: 'start',
                        gap: 2,
                        pb: 2,
                    }}
                >
                    <Button
                        onClick={() => setConfirmOpen(false)}
                        variant="outlined"
                        sx={{
                            borderColor: '#cbd5e1',
                            color: '#475569',
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '10px',
                            px: 3,
                            '&:hover': {
                                borderColor: '#25388C',
                                color: '#25388C',
                                backgroundColor: 'rgba(37, 56, 140, 0.05)',
                            },
                        }}
                    >
                        No
                    </Button>
                    <Button
                        onClick={confirmRoleChange}
                        variant="contained"
                        sx={{
                            backgroundColor: '#25388C',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '10px',
                            px: 3,
                            '&:hover': {
                                backgroundColor: '#1d2e74',
                            },
                        }}
                    >
                        {`Yes, I'm sure`}
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default UserTableClient;
