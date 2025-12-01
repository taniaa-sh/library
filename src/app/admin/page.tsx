"use client"

import imagesAddresses from "@/utils/imageAddresses"
import SiteUrls from "@/utils/routs"
import Image from "next/image"
import { useRouter } from "next/navigation"

const AdminPage = () => {
    const router = useRouter()

    return (
        <div className="w-full flex flex-col gap-6 mt-[100px] md:mt-[110px] p-4 md:p-6 bg-[#F8F8FF] dark:bg-[#0F172A]">
            {/* Summary Boxes */}
            <div className="flex flex-col md:flex-row gap-4">
                {[
                    { title: "Barrowed Books", value: "150" },
                    { title: "Total Users", value: "200" },
                    { title: "Total Books", value: "348" },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-[#020817] w-full md:w-[356px] p-4 md:p-5 rounded-lg flex flex-col gap-3 md:gap-5"
                    >
                        <p className="font-medium text-sm sm:text-base text-[#64748B] dark:text-gray-400">
                            {item.title}
                        </p>
                        <p className="font-semibold text-2xl sm:text-[28px] text-[#1E293B] dark:text-white">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 !max-w-[1440px]">
                {/* Left Column */}
                <div className=" flex flex-col gap-[22px]">
                    {/* Borrow Requests */}
                    <div className="flex flex-col gap-[14px] rounded-2xl bg-white dark:bg-[#020817] p-4 md:w-[540px]">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-base sm:text-lg text-dark-400 dark:text-white">Borrow Requests</p>
                            <p className="font-semibold text-sm sm:text-lg text-dark-400 dark:text-white">View All</p>
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="p-2 rounded-lg flex gap-3 bg-[#f8f8ff] dark:bg-[#1e1e2d]">
                                <Image
                                    src={imagesAddresses.images.book1}
                                    alt="user"
                                    width={55}
                                    height={76}
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-base text-dark-400 dark:text-gray-200">
                                        The Great Reclamation: A Novel by Rachel Heng
                                    </p>
                                    <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">
                                        By Rachel Heng
                                    </p>
                                    <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">
                                        By Rachel Heng
                                    </p>
                                </div>
                            </div>

                            <div className="p-2 rounded-lg flex gap-3 bg-[#f8f8ff] dark:bg-[#1e1e2d]">
                                <Image
                                    src={imagesAddresses.images.book2}
                                    alt="user"
                                    width={55}
                                    height={76}
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-base text-dark-400 dark:text-gray-200">
                                        The Great Reclamation: A Novel by Rachel Heng
                                    </p>
                                    <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">
                                        By Rachel Heng
                                    </p>
                                    <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">
                                        By Rachel Heng
                                    </p>
                                </div>
                            </div>

                            <div className="p-2 rounded-lg flex gap-3 bg-[#f8f8ff] dark:bg-[#1e1e2d]">
                                <Image
                                    src={imagesAddresses.images.book3}
                                    alt="user"
                                    width={55}
                                    height={76}
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-base text-dark-400 dark:text-gray-200">
                                        The Great Reclamation: A Novel by Rachel Heng
                                    </p>
                                    <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">
                                        By Rachel Heng
                                    </p>
                                    <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">
                                        By Rachel Heng
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Empty Brrow Requests */}
                        {/* <div className="flex flex-col items-center justify-center gap-4">
                        <Image
                            src={imagesAddresses.images.emptyBorrowRequests}
                            alt="emptyBorrowRequests"
                            width={193}
                            height={144}
                        />
                        <p className="text-base font-semibold text-[#1E293B] dark:text-white">No Pending Book Requests</p>
                        <p className="text-sm font-normal text-[#64748B] dark:text-gray-400">There are no borrow book requests awaiting your review at this time.</p>
                       </div> */}
                    </div>

                    {/* Account Requests */}
                    <div className="flex flex-col gap-[14px] rounded-2xl bg-white dark:bg-[#020817] p-4">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-base sm:text-lg text-dark-400 dark:text-white">Account Requests</p>
                            <p className="font-semibold text-sm sm:text-lg text-dark-400 dark:text-white">View All</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] dark:bg-[#1e1e2d] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar1}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400 dark:text-white">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">marcnine@gmai.com</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] dark:bg-[#1e1e2d] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar2}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400 dark:text-white">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">marcnine@gmai.com</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] dark:bg-[#1e1e2d] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar3}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400 dark:text-white">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">marcnine@gmai.com</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] dark:bg-[#1e1e2d] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar1}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400 dark:text-white">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">marcnine@gmai.com</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] dark:bg-[#1e1e2d] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar2}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400 dark:text-white">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">marcnine@gmai.com</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-[#f8f8ff] dark:bg-[#1e1e2d] !p-[14px]">
                                <Image
                                    src={imagesAddresses.images.avatar3}
                                    alt="user"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-semibold text-base text-dark-400 dark:text-white">Marc Atenson</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">marcnine@gmai.com</p>
                            </div>
                        </div>
                        {/* Empty Account  Requests */}
                        {/* <div className="flex flex-col items-center justify-center gap-4">
                            <Image
                                src={imagesAddresses.images.emptyAccountRequests}
                                alt="emptyBorrowRequests"
                                width={193}
                                height={144}
                            />
                            <p className="text-base font-semibold text-[#1E293B] dark:text-white">No Pending Account Requests</p>
                            <p className="text-sm font-normal text-[#64748B] dark:text-gray-400">There are currently no account requests awaiting approval.</p>
                        </div> */}
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full flex flex-col gap-[14px] rounded-2xl bg-white dark:bg-[#020817]  p-4">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-base sm:text-lg text-dark-400 dark:text-white">Recently Added Books</p>
                        <p className="font-semibold text-sm sm:text-lg text-dark-400 dark:text-white">View All</p>
                    </div>

                    <div
                        className="px-3 py-2 sm:px-4 sm:py-[14px] flex gap-2 sm:gap-[14px] rounded-lg border border-light-300 dark:border-[#1E293B] bg-[#f8f8ff] dark:bg-[#1e1e2d] cursor-pointer"
                        onClick={() => router.push(SiteUrls.adminAddBook)}
                    >
                        <Image
                            src={imagesAddresses.icons.plus2}
                            alt="add"
                            width={20}
                            height={20}
                            className="dark:hidden"
                        />
                        <Image
                            src={imagesAddresses.icons.plus}
                            alt="add"
                            width={20}
                            height={20}
                            className="hidden dark:block"
                        />
                        <p className="font-medium text-sm sm:text-[18px] text-dark-400 dark:text-white">
                            Add New Book
                        </p>
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
                                <p className="font-semibold text-base text-dark-400 dark:text-white">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
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
                                <p className="font-semibold text-base text-dark-400 dark:text-white">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
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
                                <p className="font-semibold text-base text-dark-400 dark:text-white">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
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
                                <p className="font-semibold text-base text-dark-400 dark:text-white">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
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
                                <p className="font-semibold text-base text-dark-400 dark:text-white">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
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
                                <p className="font-semibold text-base text-dark-400 dark:text-white">The Great Reclamation: A Novel by Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
                                <p className="font-normal text-[14px] text-[#64748B] dark:text-gray-400">By Rachel Heng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
