import type { Metadata } from "next";
import { Toaster } from "sonner";
import ProgressBar from "@/components/ProgressBar";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

// const ibmPlexSans = localFont({
//     src: [
//         { path: "../../public/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
//         { path: "../../public/fonts/IBMPlexSans-Regular.ttf", weight: "500", style: "normal" },
//         { path: "../../public/fonts/IBMPlexSans-Regular.ttf", weight: "600", style: "normal" },
//         { path: "../../public/fonts/IBMPlexSans-Regular.ttf", weight: "700", style: "normal" },
//     ],
// });

// const bebasNeue = localFont({
//     src: [
//         { path: "../../public/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
//     ],
//     variable: "--bebas-neue",
// });

export const metadata: Metadata = {
    title: "Library App Admin",
    description: "an university app admin",
    icons: {
        icon: "./favicon.ico",
    }
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-white">
            <body className="bg-white min-h-screen">
                <div className="max-w-[1440px] mx-auto">
                    <ProgressBar />
                    <div className="flex">
                        <AdminSidebar />
                        <div className="flex flex-col gap-10 !bg-[#F8F8FF] w-full">
                            <AdminHeader />
                            {children}
                        </div>
                    </div>
                    <Toaster position="top-right" richColors />
                </div>
            </body>
        </html>
    );
}
