import UserInfo from "./_components/UserInfo";
import BorrowedBooks from "./_components/BorrowedBooks";

const Profile = async () => {

    async function fakeFetch() {
        return new Promise((resolve) => setTimeout(resolve, 3000));
    }
    await fakeFetch();

    return (
        <div className="w-full mt-4 flex flex-col gap-10 md:gap-20 px-4 md:px-10 pt-30 pb-10">
            <UserInfo />
            <BorrowedBooks />
        </div>
    )
}

export default Profile