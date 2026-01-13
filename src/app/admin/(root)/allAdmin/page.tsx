import imagesAddresses from "@/utils/imageAddresses";
import AdminTableClient from "./_components/AdminTableClient";

const fetchUsers = async () => {
    await new Promise((r) => setTimeout(r, 500));
    return [
        {
            id: '1',
            name: 'Tania',
            dateJoined: 'Dec 19 2023',
            avatar: imagesAddresses.images.avatar2,
            email: 'tania@university',
            action: 'Delete',
        },
        {
            id: '2',
            name: 'Ali',
            dateJoined: 'Dec 20 2023',
            avatar: imagesAddresses.images.avatar2,
            email: 'ali@university',
            action: 'Delete',
        },
        {
            id: '3',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        },
        {
            id: '4',
            name: 'melika',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        },
        {
            id: '5',
            name: 'mona',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        },
        {
            id: '6',
            name: 'arefeh',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        },
        {
            id: '7',
            name: 'negar',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        },
        {
            id: '8',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        },
        {
            id: '9',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        },
        {
            id: '9',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        },
        {
            id: '9',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        },
        {
            id: '9',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        },
        {
            id: '9',
            name: 'Sara',
            dateJoined: 'Jan 05 2024',
            avatar: imagesAddresses.images.avatar3,
            email: 'sara@university',
            action: 'Delete',
        }
    ];
};

const AllAdminsPage = async () => {
    const data = await fetchUsers();

    return (
        <div className="bg-light-300 dark:bg-dark-900 px-8 py-10 !mt-[70px] w-full min-h-dvh">
            <div className="flex flex-col gap-6 bg-white dark:bg-dark-900 py-6 px-5 rounded-lg min-h-dvh">
                <p className="font-medium text-md md:text-xl dark:text-white">All Admins</p>
                <AdminTableClient data={data} />
            </div>
        </div>
    );
};

export default AllAdminsPage;
