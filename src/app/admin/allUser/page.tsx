import imagesAddresses from "@/utils/imageAddresses";
import UserTableClient from "./_components/UserTableClient";

const fetchUsers = async () => {
    await new Promise((r) => setTimeout(r, 500));
    return [
        {
            name: 'Tania',
            dateJoined: 'Dec 19 2023',
            role: 'Admin',
            booksBorrowed: '3',
            universityIDNumber: '123456789',
            universityIDCard: '123456789',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar1,
        },
        {
            name: 'Ali',
            dateJoined: 'Dec 20 2023',
            role: 'User',
            booksBorrowed: '1',
            universityIDNumber: '987654321',
            universityIDCard: '987654321',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar2,
        },
        {
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            role: 'User',
            booksBorrowed: '0',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
        },
    ];
};

const AllUsersPage = async () => {
    const data = await fetchUsers();

    return (
        <div className="bg-[#F8F8FF] px-6 py-6">
            <div className="flex flex-col gap-6 bg-white py-6 px-5 rounded-lg">
                <p className="font-medium text-xl">All Users</p>
                <UserTableClient data={data} />
            </div>
        </div>
    );
};

export default AllUsersPage;
