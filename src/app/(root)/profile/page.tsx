import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"

const Profile = () => {
    return (
        <div className="w-full mt-2 flex gap-20 px-10">
            <div className="w-full flex flex-col gap-9 rounded-lg bg-[#232839] h-[730px] p-10 relative">
                <div className="absolute z-10 rounded-b-full w-[59px] h-[80px] bg-[#464F6F] -top-3 left-60">
                    <div className="absolute z-20 top-14 left-2.5 rounded-2xl w-10 h-[10px] bg-[#1E2230]" />
                </div>
                <div className="flex flex-col gap-8 mt-18">
                    <div className="flex gap-7">
                        <Image
                            src={imagesAddresses.images.profile}
                            alt="prfile"
                            width={100}
                            height={100}
                            className="rounded-full border-8 border-[#363e58]"
                        />
                        <div className="py-1 flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <Image
                                    src={imagesAddresses.icons.verify}
                                    alt="verify"
                                    width={18}
                                    height={18}
                                    className="rounded-full"
                                />
                                <p className="text-light-100 font-normal text-sm leading-[20px]">Verified Student</p>
                            </div>
                            <p className="font-semibold text-2xl leading-[30px] text-white">Adrian</p>
                            <p className="text-light-100 font-normal text-[18px] leading-[20px]">contact@jsmastery.pro</p>
                        </div>
                    </div>
                    <div className="flex flex-col fap-2">
                        <p className="text-light-100 font-normal text-[18px] leading-7">University</p>
                        <p className="font-semibold text-2xl leading-8 text-white">JS Mastery Pro</p>
                    </div>
                    <div className="flex flex-col fap-2">
                        <p className="text-light-100 font-normal text-[18px] leading-7">Student ID</p>
                        <p className="font-semibold text-2xl leading-8 text-white">234567856</p>
                    </div>
                    <div className="w-full bg-amber-100 rounded-lg relative h-64">
                        <Image
                            src={imagesAddresses.images.loginPic}
                            alt="profile"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-3">
                <p className="text-light-100 font-semibold text-3xl">Borrowed books</p>
                <div className="grid grid-cols-2 gap-5">
                    <div className="p-5 flex flex-col gap-5 bg-[#12141D] rounded-lg">
                        <div className="bg-amber-200/60 rounded-lg px-12 py-6">
                            <Image
                                src={imagesAddresses.images.book1}
                                alt="book"
                                width={150}
                                height={150}
                                className="-ml-4"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white font-semibold text-xl leading-6">The Origin</p>
                            <p className="text-white font-semibold text-xl leading-6">By Dan Brown</p>
                        </div>
                        <p className="text-light-100 font-normal text-xl leading-5">Thriller / Mystery</p>
                        <div className="flex gap-1">
                            <Image
                                src={imagesAddresses.icons.greenBook}
                                alt="star"
                                width={18}
                                height={18}
                            />
                            <p className="text-light-100 font-normal text-base">Borrowed on Dec 31</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-1">
                                <Image
                                    src={imagesAddresses.icons.calender}
                                    alt="star"
                                    width={18}
                                    height={18}
                                />
                                <p className="text-light-100 font-normal text-base">04 days left to due</p>
                            </div>
                            <Image
                                src={imagesAddresses.icons.list}
                                alt="star"
                                width={26}
                                height={26}
                            />
                        </div>
                    </div>
                    <div className="p-5 flex flex-col gap-5 bg-[#12141D] rounded-lg">
                        <div className="bg-amber-200/60 rounded-lg px-12 py-6">
                            <Image
                                src={imagesAddresses.images.book1}
                                alt="book"
                                width={150}
                                height={150}
                                className="-ml-4"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white font-semibold text-xl leading-6">The Origin</p>
                            <p className="text-white font-semibold text-xl leading-6">By Dan Brown</p>
                        </div>
                        <p className="text-light-100 font-normal text-xl leading-5">Thriller / Mystery</p>
                        <div className="flex gap-1">
                            <Image
                                src={imagesAddresses.icons.greenBook}
                                alt="star"
                                width={18}
                                height={18}
                            />
                            <p className="text-light-100 font-normal text-base">Borrowed on Dec 31</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-1">
                                <Image
                                    src={imagesAddresses.icons.calender}
                                    alt="star"
                                    width={18}
                                    height={18}
                                />
                                <p className="text-light-100 font-normal text-base">04 days left to due</p>
                            </div>
                            <Image
                                src={imagesAddresses.icons.list}
                                alt="star"
                                width={26}
                                height={26}
                            />
                        </div>
                    </div>
                    <div className="p-5 flex flex-col gap-5 bg-[#12141D] rounded-lg">
                        <div className="bg-amber-200/60 rounded-lg px-12 py-6">
                            <Image
                                src={imagesAddresses.images.book1}
                                alt="book"
                                width={150}
                                height={150}
                                className="-ml-4"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white font-semibold text-xl leading-6">The Origin</p>
                            <p className="text-white font-semibold text-xl leading-6">By Dan Brown</p>
                        </div>
                        <p className="text-light-100 font-normal text-xl leading-5">Thriller / Mystery</p>
                        <div className="flex gap-1">
                            <Image
                                src={imagesAddresses.icons.greenBook}
                                alt="star"
                                width={18}
                                height={18}
                            />
                            <p className="text-light-100 font-normal text-base">Borrowed on Dec 31</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-1">
                                <Image
                                    src={imagesAddresses.icons.calender}
                                    alt="star"
                                    width={18}
                                    height={18}
                                />
                                <p className="text-light-100 font-normal text-base">04 days left to due</p>
                            </div>
                            <Image
                                src={imagesAddresses.icons.list}
                                alt="star"
                                width={26}
                                height={26}
                            />
                        </div>
                    </div>
                    <div className="p-5 flex flex-col gap-5 bg-[#12141D] rounded-lg">
                        <div className="bg-amber-200/60 rounded-lg px-12 py-6">
                            <Image
                                src={imagesAddresses.images.book1}
                                alt="book"
                                width={150}
                                height={150}
                                className="-ml-4"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white font-semibold text-xl leading-6">The Origin</p>
                            <p className="text-white font-semibold text-xl leading-6">By Dan Brown</p>
                        </div>
                        <p className="text-light-100 font-normal text-xl leading-5">Thriller / Mystery</p>
                        <div className="flex gap-1">
                            <Image
                                src={imagesAddresses.icons.greenBook}
                                alt="star"
                                width={18}
                                height={18}
                            />
                            <p className="text-light-100 font-normal text-base">Borrowed on Dec 31</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-1">
                                <Image
                                    src={imagesAddresses.icons.calender}
                                    alt="star"
                                    width={18}
                                    height={18}
                                />
                                <p className="text-light-100 font-normal text-base">04 days left to due</p>
                            </div>
                            <Image
                                src={imagesAddresses.icons.list}
                                alt="star"
                                width={26}
                                height={26}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile