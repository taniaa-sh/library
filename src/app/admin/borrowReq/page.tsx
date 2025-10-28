import BorrowReqClient from "./_components/BorrowReqClient";

const fetchUsers = async () => {
    await new Promise((r) => setTimeout(r, 500));
    return [
        {
            book: 'The Great Reclamation: A Novel by',
            userRequested: 'Darrell Steward',
            status: 'Borrowed',
            borrowedDate: 'Dec 19 2023',
            returnDate: 'Dec 29 2023',
            dueDate: 'Dec 31 2023',
            receipt: 'Receipt',
        },
        {
            book: 'Inside Evil: Inside Evil Series, Book 1',
            userRequested: 'Darrell Steward',
            status: 'Returned',
            borrowedDate: 'Dec 19 2023',
            returnDate: 'Dec 29 2023',
            dueDate: 'Dec 31 2023',
            receipt: 'Receipt',
        },
        {
            book: 'Jayne Castle - People in Glass Houses',
            userRequested: 'Darrell Steward',
            status: 'Late Return',
            borrowedDate: 'Dec 19 2023',
            returnDate: 'Dec 29 2023',
            dueDate: 'Dec 31 2023',
            receipt: 'Receipt',
        },
    ];
};

const AllUsersPage = async () => {
    const data = await fetchUsers();

    return (
        <div className="bg-[#F8F8FF] px-6 py-6">
            <div className="flex flex-col gap-6 bg-white py-6 px-5 rounded-lg">
                <p className="font-medium text-xl">Borrow Book Requests</p>
                <BorrowReqClient data={data} />
            </div>
        </div>
    );
};

export default AllUsersPage;
