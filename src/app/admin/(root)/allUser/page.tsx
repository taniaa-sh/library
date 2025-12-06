import imagesAddresses from "@/utils/imageAddresses";
import UserTableClient from "./_components/UserTableClient";

const fetchUsers = async () => {
    await new Promise((r) => setTimeout(r, 500));
    return [
        {
            id: '1',
            name: 'Tania',
            dateJoined: 'Dec 19 2023',
            role: 'Admin',
            booksBorrowed: '3',
            universityIDNumber: '123456789',
            universityIDCard: '123456789',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar1,
            email: 'tania@university',
        },
        {
            id: '2',
            name: 'Ali',
            dateJoined: 'Dec 20 2023',
            role: 'User',
            booksBorrowed: '1',
            universityIDNumber: '987654321',
            universityIDCard: '987654321',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar2,
            email: 'ali@university',
        },
        {
            id: '3',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            role: 'User',
            booksBorrowed: '10',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        },
        {
            id: '4',
            name: 'melika',
            dateJoined: 'Jan 05 2024',
            role: 'Admin',
            booksBorrowed: '8',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        },
        {
            id: '5',
            name: 'mona',
            dateJoined: 'Jan 05 2024',
            role: 'User',
            booksBorrowed: '9',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        },
        {
            id: '6',
            name: 'arefeh',
            dateJoined: 'Jan 05 2024',
            role: 'Admin',
            booksBorrowed: '1',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        },
        {
            id: '7',
            name: 'negar',
            dateJoined: 'Jan 05 2024',
            role: 'Admin',
            booksBorrowed: '11',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        },
        {
            id: '8',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            role: 'User',
            booksBorrowed: '5',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        },
        {
            id: '9',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            role: 'User',
            booksBorrowed: '9',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        },
                {
            id: '9',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            role: 'User',
            booksBorrowed: '9',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        },
                {
            id: '9',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            role: 'User',
            booksBorrowed: '9',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        },
                {
            id: '9',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            role: 'User',
            booksBorrowed: '9',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        },
                {
            id: '9',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            role: 'User',
            booksBorrowed: '9',
            universityIDNumber: '112233445',
            universityIDCard: '112233445',
            action: 'Delete',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
        }
    ];
};

const AllUsersPage = async () => {
    const data = await fetchUsers();

    return (
      <div className="bg-light-300 dark:bg-dark-900 px-8 py-10 !mt-[100px] w-full min-h-dvh">
            <div className="flex flex-col gap-6 bg-white dark:bg-dark-900 py-6 px-5 rounded-lg min-h-dvh">
                <p className="font-medium text-xl">All Users</p>
                <UserTableClient data={data} />
            </div>
        </div>
    );
};

export default AllUsersPage;
