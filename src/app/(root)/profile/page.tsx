import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"

const Profile = () => {
    return (
        <div className="w-full mt-2 flex gap-20 px-10">
            <div className="w-full rounded-lg bg-[#232839] h-[768px] p-10">hhh</div>
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