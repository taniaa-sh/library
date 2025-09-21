import Header from "@/components/Header";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {

      return (
            <div className="max-w-[1280px] mx-auto">
                  <Header />
                  <div>{children}</div>
            </div>

      );
};

export default Layout;