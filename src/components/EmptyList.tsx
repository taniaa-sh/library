"use client";

import animationData from "../../public/lottie/emtyList.json";
import dynamic from "next/dynamic";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import SiteUrls from "@/utils/routs";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
});

const EmptyList = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center !py-10-">
      <Lottie
        animationData={animationData}
        loop
        className="w-[250px] sm:w-[400px] md:w-[500px]"
      />
      <p className="!mt-4 text-gray-600 dark:text-gray-300 text-lg sm:text-xl font-medium">
        No Data Found
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 !mt-1">
        Try adjusting your filters or adding new items.
      </p>
      <CustomButton
        color="blue"
        text="back to home"
        containerClassName="!mt-4 cursor-pointer"
        onClick={() => router.push(SiteUrls.admin)}
      />
    </div>
  );
};

export default EmptyList;
