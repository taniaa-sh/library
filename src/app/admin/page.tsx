"use client"

import imagesAddresses from "@/utils/imageAddresses"
import SiteUrls from "@/utils/routs"
import Image from "next/image"
import { useRouter } from "next/navigation"

const AdminPage = () => {

    const router = useRouter()

    return (
        <div className="w-full flex flex-col gap-6 !mt-7 !p-6 !bg-[#F8F8FF]">
            <div className="flex gap-4">
                <div className="!bg-white !w-[356px] !p-5 rounded-lg flex flex-col gap-5">
                    <p className="font-medium text-base text-[#64748B]">Barrowed Books</p>
                    <p className="font-semibold text-[28px] text-[#1E293B]">150</p>
                </div>
                <div className="!bg-white !w-[358px] !p-5 rounded-lg flex flex-col gap-5">
                    <p className="font-medium text-base text-[#64748B]">Total Users</p>
                    <p className="font-semibold text-[28px] text-[#1E293B]">200</p>
                </div>
                <div className="!bg-white !w-[356px] !p-5 rounded-lg flex flex-col gap-5">
                    <p className="font-medium text-base text-[#64748B]">Total Books</p>
                    <p className="font-semibold text-[28px] text-[#1E293B]">348</p>
                </div>
            </div>
            <div className="w-full flex gap-4">
                <div className="w-full flex flex-col gap-[22px]">
                    <div className="flex flex-col gap-[14px] !rounded-2xl !bg-white !p-4">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-lg text-dark-400">Borrow Requests</p>
                            <p className="font-semibold text-lg text-dark-400">View All</p>
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="!p-2 rounded-lg flex gap-3 !bg-[#f8f8ff]">
                                <Image
                                    src={imagesAddresses.images.book1}
                                    alt="user"
                                    width={55}
                                    height={76}
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-base text-dark-400">The Great Reclamation: A Novel by Rachel Heng</p>
                                    <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                    <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                </div>
                            </div>
                            <div className="!p-2 rounded-lg flex gap-3 !bg-[#f8f8ff]">
                                <Image
                                    src={imagesAddresses.images.book2}
                                    alt="user"
                                    width={55}
                                    height={76}
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-base text-dark-400">The Great Reclamation: A Novel by Rachel Heng</p>
                                    <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                    <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                </div>
                            </div>
                            <div className="!p-2 rounded-lg flex gap-3 !bg-[#f8f8ff]">
                                <Image
                                    src={imagesAddresses.images.book3}
                                    alt="user"
                                    width={55}
                                    height={76}
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-base text-dark-400">The Great Reclamation: A Novel by Rachel Heng</p>
                                    <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                    <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[14px] !rounded-2xl !bg-white !p-4">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-lg text-dark-400">Account Requests</p>
                            <p className="font-semibold text-lg text-dark-400">View All</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar1}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B]">marcnine@gmai.com</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar2}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B]">marcnine@gmai.com</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar3}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B]">marcnine@gmai.com</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar1}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B]">marcnine@gmai.com</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar2}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B]">marcnine@gmai.com</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar3}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B]">marcnine@gmai.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[14px] !rounded-2xl !bg-white !p-4">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg text-dark-400">Recently Added Books</p>
                        <p className="font-semibold text-lg text-dark-400">View All</p>
                    </div>
                    <div
                        className="!px-4 !py-[14px] flex gap-[14px] rounded-lg border border-light-300 bg-[#f8f8ff] cursor-pointer"
                        onClick={() => router.push(SiteUrls.adminAddBook)}
                    >
                        <Image
                            src={imagesAddresses.icons.plus2}
                            alt="user"
                            width={20}
                            height={20}
                        />
                        <p className="text-bold font-medium text-[18px] text-dark-400">Add New Book</p>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-3">
                            <Image
                                src={imagesAddresses.images.book1}
                                alt="user"
                                width={55}
                                height={76}
                            />
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-base text-dark-400">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Image
                                src={imagesAddresses.images.book2}
                                alt="user"
                                width={55}
                                height={76}
                            />
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-base text-dark-400">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Image
                                src={imagesAddresses.images.book3}
                                alt="user"
                                width={55}
                                height={76}
                            />
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-base text-dark-400">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Image
                                src={imagesAddresses.images.book4}
                                alt="user"
                                width={55}
                                height={76}
                            />
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-base text-dark-400">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Image
                                src={imagesAddresses.images.book5}
                                alt="user"
                                width={55}
                                height={76}
                            />
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-base text-dark-400">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Image
                                src={imagesAddresses.images.book6}
                                alt="user"
                                width={55}
                                height={76}
                            />
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-base text-dark-400">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B]">By Rachel Heng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage