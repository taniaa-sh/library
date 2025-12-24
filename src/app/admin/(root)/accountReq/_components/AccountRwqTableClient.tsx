'use client';

import Image from 'next/image';
import { useState } from 'react';
import AdminTable, { Column } from '../../_components/AdminTable';
import imagesAddresses from '@/utils/imageAddresses';
import DenyAccountModal from './DenyAccountModal';
import ApproveReq from './ApproveReq';
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

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
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showDenyModal, setShowDenyModal] = useState(false);
    const router = useRouter();
    const totalPages = 10;

    const handlePageClick = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected + 1;
        router.push(`?page=${page}`);
    };

    const columns: Column<AcountReq>[] = [
        { key: 'name', label: 'Name', },
        { key: 'dateJoined', label: 'Date Joined' },
        { key: 'universityIDNumber', label: 'University ID No' },
        {
            key: 'action',
            label: 'Action',
            render: (row: AcountReq) => (
                <button
                    onClick={() => {
                        if (row.action === 'approve') {
                            setShowApproveModal(true)
                        } else {
                            setShowDenyModal(true)
                        }
                    }}
                    className={`!py-2 !px-3 rounded-lg cursor-pointer ${row.action === 'approve' ? 'bg-[#ECFDF3] dark:bg-[#064e3b] text-[#027A48] dark:text-[#86efac]' : 'bg-[#FFF1F3] dark:bg-[#5c0d2b] text-[#C01048] dark:text-[#fca5a5]'}`}
                >
                    {row.action === 'approve' ? ' Approve Account' : 'Deny Account'}
                </button>
            ),
        },
        {
            key: 'delete',
            label: '',
            render: () => (
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

    return (
        <>
            {
                showDenyModal && (
                    <DenyAccountModal
                        setShowDenyModal={setShowDenyModal}
                    />
                )
            }
            {
                showApproveModal && (
                    <ApproveReq
                        setShowApproveModal={setShowApproveModal}
                    />
                )
            }
            <AdminTable columns={columns} data={acountReq} />
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
        </>
    );
};

export default AccountRwqTableClient;
