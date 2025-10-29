import AccountRwqTableClient from "./_components/AccountRwqTableClient";

const fetchUsers = async () => {
    await new Promise((r) => setTimeout(r, 500));
    return [
        {
            name: 'Tania',
            dateJoined: 'Dec 19 2023',
            universityIDNumber: '123456789',
            action: 'Delete',
            delete: '',
        },
        {
            name: 'Ali',
            dateJoined: 'Dec 20 2023',
            universityIDNumber: '987654321',
            action: 'Delete',
            delete: '',
        },
        {
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            universityIDNumber: '112233445',
            action: 'Delete',
            delete: '',
        },
    ];
};

const AccountReqPage = async () => {
    const data = await fetchUsers();

    return (
        <div className="bg-[#F8F8FF] px-6 py-6">
            <div className="flex flex-col gap-6 bg-white py-6 px-5 rounded-lg">
                <p className="font-medium text-xl">Account Registration Requests</p>
                <AccountRwqTableClient data={data} />
            </div>
        </div>
    );
};

export default AccountReqPage;