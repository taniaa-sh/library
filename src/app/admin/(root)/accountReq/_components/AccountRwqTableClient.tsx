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
            <div className="flex justify-center mt-7">
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName="flex space-x-2 cursor-pointer"
                    pageClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                    activeClassName="bg-primary-admin text-white cursor-pointer"
                    previousClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer select-none"
                    nextClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer select-none"
                />
            </div>
        </>
    );
};

export default AccountRwqTableClient;
