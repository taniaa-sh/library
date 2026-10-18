'use client';

import Image from 'next/image';
import { useState } from 'react';
import imagesAddresses from '@/utils/imageAddresses';
import AdminTable, { Column } from '../../_components/AdminTable';
import ReactPaginate from 'react-paginate';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import DeleteAdminModal from '../../_components/DeleteAdminModal';

interface Admin {
    _id: string;
    id: number;
    email: string;
    fullName: string;
    universityId: string;
    role: 'ADMIN' | 'USER';
    createdAt: string;
    updatedAt: string;
}

interface Props {
    data: Admin[];
}

const AdminTableClient = ({ data }: Props) => {
    const [admins, setAdmins] = useState<Admin[]>(data);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [id, setId] = useState('');

    const isMobile = useMediaQuery('(max-width:768px)');
    const router = useRouter();
    const searchParams = useSearchParams();

    const itemsPerPage = 5;
    const totalPages = Math.ceil(admins.length / itemsPerPage);

    const pageFromUrl = Number(searchParams.get('page')) || 1;
    const currentPage = Math.min(
        Math.max(pageFromUrl, 1),
        Math.max(totalPages, 1)
    );

    const currentAdmins = admins.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageClick = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected + 1;
        router.push(`?page=${page}`);
    };

    const handleDelete = () => {
        setAdmins((prev) => {
            const updatedAdmins = prev.filter((admin) => admin._id !== id);
            const updatedTotalPages = Math.ceil(
                updatedAdmins.length / itemsPerPage
            );

            if (currentPage > Math.max(updatedTotalPages, 1)) {
                router.push(`?page=${Math.max(updatedTotalPages, 1)}`);
            }

            return updatedAdmins;
        });

        setShowDeleteModal(false);
        setId('');
    };

    const columns: Column<Admin>[] = [
        {
            key: 'fullName',
            label: 'Name',
        },
        {
            key: 'createdAt',
            label: 'Date Joined',
            render: (row) => (
                <span>
                    {new Date(row.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    })}
                </span>
            ),
        },
        {
            key: 'email',
            label: 'Email',
        },
        {
            key: 'universityId',
            label: 'University ID No',
        },
        {
            key: 'role',
            label: 'Role',
        },
        {
            key: 'id',
            label: '',
            render: (row) => (
                <Image
                    src={imagesAddresses.icons.delete}
                    alt="Delete"
                    width={isMobile ? 16 : 20}
                    height={isMobile ? 16 : 20}
                    className="cursor-pointer"
                    onClick={() => {
                        setShowDeleteModal(true);
                        setId(row._id);
                    }}
                />
            ),
        },
    ];

    return (
        <>
            {showDeleteModal && (
                <DeleteAdminModal
                    setShowDeleteModal={setShowDeleteModal}
                    onDelete={handleDelete}
                    isAdmin
                />
            )}

            <AdminTable columns={columns} data={currentAdmins} />

            {totalPages > 1 && (
                <div className="flex justify-center mt-7 overflow-x-auto dark:!text-white">
                    <ReactPaginate
                        previousLabel="‹"
                        nextLabel="›"
                        breakLabel="…"
                        pageCount={totalPages}
                        forcePage={currentPage - 1}
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
    );
};

export default AdminTableClient;