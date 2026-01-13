'use client';

import Image from 'next/image';
import { useState } from 'react';
import imagesAddresses from '@/utils/imageAddresses';
import AdminTable, { Column } from '../../_components/AdminTable';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import DeleteAdminModal from '../../_components/DeleteAdminModal';

type Admin = {
    name: string;
    dateJoined: string;
    action: string;
    avatar?: string;
    email?: string;
    id?: string;
};

interface Props {
    data: Admin[];
}

const AdminTableClient = ({ data }: Props) => {
    const [Admins, setAdmins] = useState<Admin[]>(data);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [id, setId] = useState("")

    const isMobile = useMediaQuery('(max-width:768px)');
    const router = useRouter();
    const totalPages = 10;

    const handlePageClick = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected + 1;
        router.push(`?page=${page}`);
    };

    const handleDelete = () => {
        setAdmins((prev) => prev.filter((user) => user.id !== id));
        setShowDeleteModal(false)
    };

    const columns: Column<Admin>[] = [
        { key: 'name', label: 'Name', },
        { key: 'dateJoined', label: 'Date Joined' },
        { key: 'email', label: 'Email', },
        {
            key: 'avatar', label: 'Avatar',
            render: (row: Admin) => (
                <Image
                    src={row.avatar || '/avatar1.png'}
                    alt="Avatar"
                    width={isMobile ? 30 : 40}
                    height={isMobile ? 30 : 40}
                    className="rounded-full object-cover"
                />
            ),
        },
        {
            key: 'action',
            label: 'Action',
            render: (row: Admin) => (
                <Image
                    src={imagesAddresses.icons.delete}
                    alt="Delete"
                    width={isMobile ? 16 : 20}
                    height={isMobile ? 16 : 20}
                    className="cursor-pointer"
                    onClick={() => {
                        setShowDeleteModal(true)
                        setId(row.id || "")
                    }
                    }
                />
            ),
        },
    ];

    return (
        <>
            {
                showDeleteModal && (
                    <DeleteAdminModal
                        setShowDeleteModal={setShowDeleteModal}
                        onDelete={() => handleDelete()}
                        isAdmin
                    />
                )
            }
            <AdminTable columns={columns} data={Admins} />
            {Admins.length > 0 && (
                <>
                    {totalPages > 1 && (
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
                                breakClassName="dark:text-white text-gray-700"
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default AdminTableClient;