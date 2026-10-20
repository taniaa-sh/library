'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';

import AdminTable, { Column } from '../../_components/AdminTable';
import imagesAddresses from '@/utils/imageAddresses';
import SiteUrls from '@/utils/routs';
import DeleteAdminModal from '../../_components/DeleteAdminModal';
import showToast from '@/utils/toast';
import { fetchData } from '@/utils/utils';
import { Axios_Route } from '@/utils/axiosRoutes';
import { AxiosMethodEnum } from '@/utils/type';

type Book = {
    _id: string;
    id: number;
    title: string;
    author: string;
    genre: string;
    bookVideo: string;
    bookPrimaryColor: string;
    bookImage: string;
    totalNumberOfBooks: number;
    description: string;
    bookPdf: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
};

interface Props {
    data: Book[];
    totalPages?: number;
}

const AllBooksTableClient = ({ data, totalPages = 1 }: Props) => {
    const [books, setBooks] = useState<Book[]>(data);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState<string>('');

    const router = useRouter();

    const handlePageClick = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected + 1;
        router.push(`?page=${page}`);
    };

    const handleDelete = async () => {
        if (!id) {
            showToast('Book ID is required.', 'error', true, undefined, true);
            return;
        }

        setLoading(true);

        try {
            const result = await fetchData<
                undefined,
                { success?: boolean; message?: string }
            >({
                baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
                apiRoute: `${Axios_Route.deleteBook}/${id}`,
                method: AxiosMethodEnum.delete,
            });

            showToast(
                result.message || 'Book deleted successfully',
                'success',
                true,
                undefined,
                true
            );

            setBooks((prev) => prev.filter((book) => book.id.toString() !== id));
            setShowDeleteModal(false);
            setId('');

        } catch (error) {
            console.error('Delete book error:', error);

            showToast(
                error instanceof Error ? error.message : 'Failed to delete book',
                'error',
                true,
                undefined,
                true
            );
        } finally {
            setLoading(false);
        }
    };

    const columns: Column<Book>[] = [
        {
            key: 'title',
            label: 'Book Title',
        },
        {
            key: 'author',
            label: 'Author',
        },
        {
            key: 'genre',
            label: 'Genre',
        },
        {
            key: 'createdAt',
            label: 'Date Created',
            render: (row: Book) =>
                new Date(row.createdAt).toLocaleDateString('en-GB'),
        },
        {
            key: 'id',
            label: '',
            render: (row: Book) => (
                <div className="flex gap-2">
                    <Image
                        src={imagesAddresses.icons.edit}
                        alt="Edit"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                        onClick={() =>
                            router.push(`${SiteUrls.adminEditBook}?id=${row.id}`)
                        }
                    />

                    <Image
                        src={imagesAddresses.icons.delete}
                        alt="Delete"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                        onClick={() => {
                            setId(row.id.toString());
                            setShowDeleteModal(true);
                        }}
                    />

                    <Image
                        src={imagesAddresses.icons.eye}
                        alt="View"
                        width={16}
                        height={16}
                        className="cursor-pointer dark:hidden"
                        onClick={() =>
                            router.push(`${SiteUrls.adminDetailBook}?id=${row.id}`)
                        }
                    />

                    <Image
                        src={imagesAddresses.icons.eyeWhite}
                        alt="View"
                        width={16}
                        height={16}
                        className="hidden cursor-pointer dark:block"
                        onClick={() =>
                            router.push(`${SiteUrls.adminDetailBook}?id=${row.id}`)
                        }
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            {showDeleteModal && (
                <DeleteAdminModal
                    setShowDeleteModal={setShowDeleteModal}
                    onDelete={handleDelete}
                    loading={loading}
                    isBook
                />
            )}

            <AdminTable columns={columns} data={books} />

            {totalPages > 1 && (
                <div className="mt-7 flex justify-center overflow-x-auto dark:!text-white">
                    <ReactPaginate
                        previousLabel="‹"
                        nextLabel="›"
                        breakLabel="…"
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
    );
};

export default AllBooksTableClient;