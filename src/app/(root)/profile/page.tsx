import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import UserInfo from "./_components/UserInfo";

const Profile = async () => {

    async function fakeFetch() {
        return new Promise((resolve) => setTimeout(resolve, 3000));
    }
    await fakeFetch();

    return (
        <div className="w-full mt-4 flex flex-col gap-10 md:gap-20 px-4 md:px-10 pt-30 pb-10">
            <UserInfo />

            {/* Right Column: Borrowed Books */}
            <div className="w-full mt-4 flex flex-col gap-4 md:gap-5">
                <p className="text-light-100 dark:text-gray-900 font-semibold text-2xl md:text-3xl">Borrowed books</p>
                <div className="grid grid-cols-1 gap-4 sm:flex sm:overflow-x-auto sm:gap-4 md:gap-5 py-2 custom-scrollbar1">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div
                            key={item}
                            className="flex-shrink-0 w-full sm:w-64 p-4 md:p-5 flex flex-col gap-3 md:gap-5 bg-[#12141D] dark:bg-gray-400 rounded-lg"
                        >
                            <div className="bg-[#936F4A]/60 rounded-lg px-8 py-4 md:px-12 md:py-6 flex justify-center">
                                <Image
                                    src={imagesAddresses.images.book1}
                                    alt="book"
                                    width={120}
                                    height={120}
                                    className="-ml-2 md:-ml-4"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white dark:text-gray-900 font-semibold text-lg md:text-xl leading-5 md:leading-6">
                                    The Origin
                                </p>
                                <p className="text-white dark:text-gray-900 font-semibold text-lg md:text-xl leading-5 md:leading-6">
                                    By Dan Brown
                                </p>
                            </div>
                            <p className="text-light-100 dark:text-gray-900 font-normal text-base md:text-xl leading-4 md:leading-5">
                                Thriller / Mystery
                            </p>
                            <div className="flex gap-1">
                                <Image
                                    src={imagesAddresses.icons.greenBook}
                                    alt="star"
                                    width={16}
                                    height={16}
                                />
                                <p className="text-light-100 dark:text-gray-900 font-normal text-sm md:text-base">
                                    Borrowed on Dec 31
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1">
                                    <Image
                                        src={imagesAddresses.icons.calender}
                                        alt="calendar"
                                        width={16}
                                        height={16}
                                    />
                                    <p className="text-light-100 dark:text-gray-900 font-normal text-sm md:text-base">
                                        04 days left to due
                                    </p>
                                </div>
                                <Image src={imagesAddresses.icons.list} alt="list" width={24} height={24} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Profile