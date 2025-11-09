'use client';

import imagesAddresses from "@/utils/imageAddresses";
import AdminButton from "../../components/AdminButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SiteUrls from "@/utils/routs";

const DetailBookPage = () => {
    const router = useRouter();

    return (
        <div className="w-full flex flex-col gap-10 mx-auto p-6">
            <AdminButton
                text="Go back"
                iconAddress={imagesAddresses.icons.arrowLeft}
                iconPosition="right"
                color="white"
                containerClassName="cursor-pointer !w-fit !-mt-10"
                onClick={() => router.back()}
            />
            <div className="w-[723px] flex gap-[35px]">
                <div className="flex justify-center items-center rounded-xl bg-[#C4214C1A] !py-6 !pr-18 !pl-8">
                    <Image
                        src={imagesAddresses.images.book2}
                        alt="book"
                        width={180}
                        height={190}
                    />
                </div>
                <div className="flex flex-col gap-[18px]">
                    <div className="flex gap-3 items-center">
                        <p className="font-normal text-[18px] text-[#64748B]">Created at:</p>
                        <div className="flex gap-1 items-center">
                            <Image
                                src={imagesAddresses.icons.calendar}
                                alt="calendar"
                                width={16}
                                height={16}
                            />
                            <p className="font-normal text-base text-dark-200">12/12/2023</p>
                        </div>
                    </div>
                    <p className="font-semibold text-2xl text-dark-400">Jayne Castle - People in Glass Houses</p>
                    <p className="font-semibold text-[18px] text-dark-200">By Jayne Ann Krentz</p>
                    <p className="font-normal text-base text-[#64748B]">Strategic, Fantasy</p>
                    <AdminButton
                        text="Edit Book"
                        iconAddress={imagesAddresses.icons.whiteEdit}
                        iconPosition="right"
                        color="blue"
                        containerClassName="cursor-pointer !w-full"
                        onClick={() => router.push(SiteUrls.adminEditBook)}
                    />
                </div>
            </div>
            <div className="w-full flex gap-10">
                <div className="w-[620px] flex flex-col gap-4">
                    <p className="font-semibold text-base text-dark-400">Summary</p>
                    <div className="flex flex-col gap-8">
                        <p className="font-normal text-base text-slate-500">
                            People in Glass Houses by Jayne Castle (a pseudonym for Jayne Ann Krentz) is a science fiction romance set in a future world where people with psychic abilities live in harmony with advanced technology. The story follows the main characters, Harriet and Sam, who are drawn together under unusual circumstances.
                        </p>
                        <p className="font-normal text-base text-slate-500">
                            Harriet, a talented psychic, works for a company that offers psychic services in a futuristic society. When she finds herself tangled in a dangerous situation involving a mysterious conspiracy, she enlists the help of Sam, a former investigator with a dark past. As they uncover the secrets surrounding a glass house—a mysterious structure tied to their investigation—they must navigate their growing attraction while facing hidden dangers.
                        </p>
                        <p className="font-normal text-base text-slate-500">
                            The novel combines elements of mystery, suspense, and romance, with a focus on psychic abilities, futuristic technology, and the complexities of relationships. The title People in Glass Houses, symbolizes the fragile nature of the world the characters inhabit and the vulnerabilities they face in their personal and professional lives.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="font-semibold text-base text-dark-400">Video</p>
                    hjj
                </div>
            </div>
        </div>
    );
};

export default DetailBookPage;
