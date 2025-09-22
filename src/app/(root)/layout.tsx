import Header from "@/components/Header";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {

      return (
            <div className="max-w-[1440px] mx-auto px-[100px]">
                  <Header />
                  <div>{children}</div>
            </div>

      );
};

export default Layout;