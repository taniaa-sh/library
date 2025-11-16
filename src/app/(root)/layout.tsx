import Header from "@/components/Header";
import { ReactNode } from "react";
import ShowSopportModal from "./_components/ShowSopportModal";

const Layout = async ({ children }: { children: ReactNode }) => {

    return (
        <div className="max-w-[1440px] mx-auto px-[10px]">
            <Header />
            <div>{children}</div>
            <ShowSopportModal />
        </div>

    );
};

export default Layout;