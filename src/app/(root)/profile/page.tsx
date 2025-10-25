import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"

const Profile = async () => {
    async function fakeFetch() {
        return new Promise((resolve) => setTimeout(resolve, 3000));
    }
    await fakeFetch();

    return (
        <div className="w-full mt-4 flex flex-col md:flex-row gap-10 md:gap-20 px-4 md:px-10">
            {/* Left Column: Profile Info */}
            <div className="w-full md:w-[50%] flex flex-col gap-6 md:gap-9 rounded-lg bg-[#232839] h-auto md:h-[730px] p-6 md:p-10 relative">
                {/* Decorative Top */}
                <div className="absolute z-10 rounded-b-full w-[59px] h-[80px] bg-[#464F6F] -top-3 left-1/2 md:left-60 transform -translate-x-1/2 md:translate-x-0">
                    <div className="absolute z-20 top-14 left-2.5 rounded-2xl w-10 h-[10px] bg-[#1E2230]" />
                </div>

                {/* Profile Info */}
                <div className="flex flex-col gap-6 md:gap-8 mt-14 md:mt-18">
                    <div className="flex gap-4 md:gap-7 items-center">
                        <Image
                            src={imagesAddresses.images.profile}
                            alt="profile"
                            width={80}
                            height={80}
                            className="rounded-full border-6 md:border-8 border-[#363e58]"
                        />
                        <div className="py-1 flex flex-col gap-1 md:gap-2">
                            <div className="flex items-center gap-1">
                                <Image
                                    src={imagesAddresses.icons.verify}
                                    alt="verify"
                                    width={16}
                                    height={16}
                                    className="rounded-full"
                                />
                                <p className="text-light-100 font-normal text-xs md:text-sm leading-[18px] md:leading-[20px]">
                                    Verified Student
                                </p>
                            </div>
                            <p className="font-semibold text-xl md:text-2xl leading-6 md:leading-[30px] text-white">
                                Adrian
                            </p>
                            <p className="text-light-100 font-normal text-sm md:text-[18px] leading-4 md:leading-[20px]">
                                contact@jsmastery.pro
                            </p>
                        </div>
                    </div>

                    {/* University */}
                    <div className="flex flex-col gap-1">
                        <p className="text-light-100 font-normal text-sm md:text-[18px] leading-5 md:leading-7">
                            University
                        </p>
                        <p className="font-semibold text-xl md:text-2xl leading-6 md:leading-8 text-white">
                            JS Mastery Pro
                        </p>
                    </div>

                    {/* Student ID */}
                    <div className="flex flex-col gap-1">
                        <p className="text-light-100 font-normal text-sm md:text-[18px] leading-5 md:leading-7">
                            Student ID
                        </p>
                        <p className="font-semibold text-xl md:text-2xl leading-6 md:leading-8 text-white">
                            234567856
                        </p>
                    </div>

                    {/* Profile Image */}
                    <div className="w-full h-40 md:h-64 bg-amber-100 rounded-lg relative">
                        <Image
                            src={imagesAddresses.images.loginPic}
                            alt="profile"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Right Column: Borrowed Books */}
            <div className="w-full md:w-[50%] flex flex-col gap-4 md:gap-6">
                <p className="text-light-100 font-semibold text-2xl md:text-3xl">Borrowed books</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-5">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="p-4 md:p-5 flex flex-col gap-3 md:gap-5 bg-[#12141D] rounded-lg">
                            <div className="bg-amber-200/60 rounded-lg px-8 py-4 md:px-12 md:py-6 flex justify-center">
                                <Image
                                    src={imagesAddresses.images.book1}
                                    alt="book"
                                    width={120}
                                    height={120}
                                    className="-ml-2 md:-ml-4"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white font-semibold text-lg md:text-xl leading-5 md:leading-6">The Origin</p>
                                <p className="text-white font-semibold text-lg md:text-xl leading-5 md:leading-6">By Dan Brown</p>
                            </div>
                            <p className="text-light-100 font-normal text-base md:text-xl leading-4 md:leading-5">Thriller / Mystery</p>
                            <div className="flex gap-1">
                                <Image
                                    src={imagesAddresses.icons.greenBook}
                                    alt="star"
                                    width={16}
                                    height={16}
                                />
                                <p className="text-light-100 font-normal text-sm md:text-base">Borrowed on Dec 31</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1">
                                    <Image
                                        src={imagesAddresses.icons.calender}
                                        alt="calendar"
                                        width={16}
                                        height={16}
                                    />
                                    <p className="text-light-100 font-normal text-sm md:text-base">04 days left to due</p>
                                </div>
                                <Image
                                    src={imagesAddresses.icons.list}
                                    alt="list"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile