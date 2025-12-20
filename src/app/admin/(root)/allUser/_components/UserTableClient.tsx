'use client';

import Image from 'next/image';
import { useState } from 'react';
import CustomStatusAllUser from './CustomStatusAllUser';
import imagesAddresses from '@/utils/imageAddresses';
import { Popover, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from '@mui/material';
import AdminTable, { Column } from '../../_components/AdminTable';
import CustomStatus from '../../_components/CustomStatus';
import CustomButton from '@/components/CustomButton';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';

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

    const isMobile = useMediaQuery('(max-width:768px)');
    const router = useRouter();
    const totalPages = 10;

    const handlePageClick = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected + 1;
        router.push(`?page=${page}`);
    };

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
                <div className="flex gap-2 items-center">
                    <Image
                        src={row.avatar || '/avatar1.png'}
                        alt="Avatar"
                        width={isMobile ? 30 : 40}
                        height={isMobile ? 30 : 40}
                        className="rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                        <p className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'} text-dark-400 dark:text-white`}>{row.name}</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-dark-50 dark:text-gray-400 break-words`}>{row.email}</p>
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
            render: (row: User) => <span className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>{row.booksBorrowed}</span>,
        },
        { key: 'universityIDNumber', label: 'University ID No' },
        {
            key: 'action',
            label: 'Action',
            render: (row: User) => (
                <Image
                    src={imagesAddresses.icons.delete}
                    alt="Delete"
                    width={isMobile ? 16 : 20}
                    height={isMobile ? 16 : 20}
                    className="cursor-pointer"
                    onClick={() => handleDelete(row.id || '')}
                />
            ),
        },
    ];

    return (
        <>
            <AdminTable columns={columns} data={users} />
            {users.length > 0 && (
                <>
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
                        />
                    </div>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        PaperProps={{
                            className: `p-3 sm:p-4 rounded-xl shadow-lg dark:!bg-black ${isMobile ? 'w-40' : 'w-52'}`
                        }}
                    >
                        {selectedUser && (
                            <div className="flex flex-col gap-2">
                                {['User', 'Admin'].map((roleOption) => (
                                    <div
                                        key={roleOption}
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => handleRoleChange(roleOption)}
                                    >
                                        <CustomStatus
                                            text={roleOption}
                                            color={roleOption === 'User' ? 'red' : 'lightGreen'}
                                            size="medium"
                                            width=""
                                        />
                                        {selectedUser.role === roleOption && (
                                            <>
                                                <Image
                                                    src={imagesAddresses.icons.check}
                                                    alt="check"
                                                    width={isMobile ? 16 : 20}
                                                    height={isMobile ? 16 : 20}
                                                    className='dark:hidden'
                                                />
                                                <Image
                                                    src={imagesAddresses.icons.checkWhite}
                                                    alt="check"
                                                    width={isMobile ? 16 : 20}
                                                    height={isMobile ? 16 : 20}
                                                    className='hidden dark:block'
                                                />
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Popover>
                    <Dialog
                        open={confirmOpen}
                        onClose={() => setConfirmOpen(false)}
                        fullWidth={isMobile}
                        maxWidth={isMobile ? 'xs' : 'sm'}
                        PaperProps={{
                            sx: {
                                borderRadius: '16px',
                                padding: isMobile ? '8px 6px' : '12px 8px',
                                backgroundColor: '#fff',
                                color: '#1e293b',
                                boxShadow: '0 8px 32px rgba(37, 56, 140, 0.2)',
                            },
                        }}
                    >
                        <DialogTitle
                            sx={{
                                fontSize: isMobile ? '16px' : '18px',
                                fontWeight: 700,
                                color: '#25388C',
                                textAlign: 'start',
                                pb: 1,
                            }}
                        >
                            Change User Role
                        </DialogTitle>

                        <Dialog
                            open={confirmOpen}
                            onClose={() => setConfirmOpen(false)}
                            fullWidth={isMobile}
                            maxWidth={isMobile ? 'xs' : 'sm'}
                            PaperProps={{
                                sx: {
                                    borderRadius: '16px',
                                    padding: isMobile ? '8px 6px' : '12px 8px',
                                    backgroundColor: 'white',
                                    color: '#1e293b',
                                    boxShadow: '0 8px 32px rgba(37, 56, 140, 0.2)',
                                    '.MuiDialogTitle-root, .MuiDialogContent-root, .MuiDialogActions-root': {
                                        color: '#1e293b',
                                    },
                                    '.MuiButton-root.MuiOutlinedButton-root': {
                                        borderColor: '#cbd5e1',
                                        color: '#475569',
                                        '&:hover': {
                                            borderColor: '#25388C',
                                            color: '#25388C',
                                            backgroundColor: 'rgba(37, 56, 140, 0.05)',
                                        },
                                    },
                                    '.MuiButton-root.MuiContainedButton-root': {
                                        backgroundColor: '#25388C',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#1d2e74',
                                        },
                                    },
                                    // Dark mode
                                    '.dark &': {
                                        backgroundColor: '#1f2937',
                                        color: '#f1f5f9',
                                        '.MuiDialogTitle-root, .MuiDialogContent-root, .MuiDialogActions-root': {
                                            color: '#f1f5f9',
                                        },
                                        '.MuiButton-root.MuiOutlinedButton-root': {
                                            borderColor: '#475569',
                                            color: '#f1f5f9',
                                            '&:hover': {
                                                borderColor: '#e0e7ff',
                                                color: '#e0e7ff',
                                                backgroundColor: 'rgba(255,255,255,0.05)',
                                            },
                                        },
                                        '.MuiButton-root.MuiContainedButton-root': {
                                            backgroundColor: '#3b82f6',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: '#2563eb',
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            <DialogTitle
                                sx={{
                                    fontSize: isMobile ? '16px' : '18px',
                                    fontWeight: 700,
                                    color: 'inherit',
                                    textAlign: 'start',
                                    pb: 1,
                                }}
                            >
                                Change User Role
                            </DialogTitle>

                            <DialogContent
                                sx={{
                                    fontSize: isMobile ? '13px' : '15px',
                                    color: 'inherit',
                                    textAlign: 'start',
                                    lineHeight: 1.6,
                                    mt: 1,
                                }}
                            >
                                Are you sure you want to change this user role to{' '}
                                <strong className="text-blue-600 dark:text-blue-400">{pendingRole}</strong> ?
                            </DialogContent>

                            <DialogActions
                                sx={{
                                    justifyContent: 'start',
                                    gap: 2,
                                    pb: 2,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <CustomButton
                                    text="No"
                                    color="white"
                                    containerClassName="cursor-pointer w-20 flex text-nowrap !border !!border-gray-200 dark:border-gray-600"
                                    onClick={() => setConfirmOpen(false)}
                                />
                                <CustomButton
                                    text="Yes, I'm sure"
                                    color="blue"
                                    containerClassName="cursor-pointer flex text-nowrap"
                                    onClick={confirmRoleChange}
                                />
                            </DialogActions>

                        </Dialog>

                    </Dialog>
                </>
            )}
        </>
    );
};

export default UserTableClient;
