import UserInfo from "./_components/UserInfo";
import BorrowedBooks from "./_components/BorrowedBooks";
import { cookies } from "next/headers";

interface User {
    _id: string;
    id: number;
    email: string;
    fullName: string;
    universityId: string;
    university?: string | null;
    profileImage?: string | null;
    role: "ADMIN" | "USER";
    createdAt: string;
    updatedAt: string;
}

interface ProfileResponse {
    success?: boolean;
    message?: string;
    data?: User;
}

const fetchUserDetails = async (): Promise<User> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        throw new Error("Unauthorized: accessToken cookie not found");
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not configured");
    }
    const response = await fetch(
        `${baseUrl.replace(/\/+$/, "")}/api/auth/profile`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    const result: User | ProfileResponse = await response.json();

    if (!response.ok) {
        const message =
            "message" in result ? result.message : undefined;

        throw new Error(message || "Failed to fetch profile");
    }

    const user =
        "data" in result && result.data
            ? result.data
            : (result as User);

    if (!user?._id || !user?.email) {
        throw new Error("Invalid user profile response");
    }

    return user;
};

const Profile = async () => {
    const data = await fetchUserDetails();

    return (
        <div className="flex w-full flex-col gap-10 px-4 pt-30 pb-10 md:gap-20 md:px-10">
            <UserInfo data={data} />
            <BorrowedBooks />
        </div>
    );
};

export default Profile;