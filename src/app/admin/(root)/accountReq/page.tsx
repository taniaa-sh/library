import AccountRwqTableClient from "./_components/AccountRwqTableClient";

const fetchUsers = async () => {
    await new Promise((r) => setTimeout(r, 500));
    return [
        {
            name: 'Tania',
            dateJoined: 'Dec 19 2023',
            universityIDNumber: '123456789',
            action: 'deny',
            delete: '',
        },
        {
            name: 'Ali',
            dateJoined: 'Dec 20 2023',
            universityIDNumber: '987654321',
            action: 'deny',
            delete: '',
        },
        {
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            universityIDNumber: '112233445',
            action: 'approve',
            delete: '',
        },
    ];
};

const AccountReqPage = async () => {
    const data = await fetchUsers();

    return (
        <div className="bg-[#F8F8FF] dark:bg-dark-900 px-8 py-10 !mt-[100px] w-full min-h-dvh">
            <div className="flex flex-col gap-6 bg-white dark:bg-dark-900 py-6 px-5 rounded-lg min-h-dvh">
                <p className="font-medium text-xl">Account Registration Requests</p>
                <AccountRwqTableClient data={data} />
            </div>
        </div>
    );
};

export default AccountReqPage;