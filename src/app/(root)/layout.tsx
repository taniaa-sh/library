import Header from "@/app/(root)/_components/Header";
import { ReactNode } from "react";
import ShowSopportModal from "./_components/ShowSopportModal";
import ScrollProgressBar from "../../components/ScrollProgressBar";
import ProgressBar from "@/components/ProgressBar";

const Layout = async ({ children }: { children: ReactNode }) => {

    return (
        <>
            <ProgressBar />
            <ScrollProgressBar />
            <Header />
            <div className="max-w-[1440px] mx-auto px-[10px]">{children}</div>
            <ShowSopportModal />
        </>

    );
};

export default Layout;