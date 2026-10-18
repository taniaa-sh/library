import { AxiosMethodEnum } from "@/utils/type";
import UserTableClient from "./_components/UserTableClient";
import { fetchData } from "@/utils/utils";
import { Axios_Route } from "@/utils/axiosRoutes";

interface User {
    _id: string;
    id: number;
    email: string;
    fullName: string;
    universityId: string;
    role: "ADMIN" | "USER";
    createdAt: string;
    updatedAt: string;
}

const fetchUsers = async (): Promise<User[]> => {
    return await fetchData<undefined, User[]>({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
        apiRoute: Axios_Route.allUser,
        method: AxiosMethodEnum.get,
    });
};

const AllUsersPage = async () => {
    const data = await fetchUsers();

    return (
        <div className="bg-light-300 dark:bg-dark-900 px-8 py-10 !mt-[130px] md:!mt-[70px] w-full min-h-dvh">
            <div className="flex flex-col gap-6 bg-white dark:bg-dark-900 py-6 px-5 rounded-lg min-h-dvh">
                <p className="font-medium text-md md:text-xl dark:text-white">
                    All Users
                </p>

                <UserTableClient data={data} />
            </div>
        </div>
    );
};

export default AllUsersPage;