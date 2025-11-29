import type { Metadata } from "next";
import { Toaster } from "sonner";
import ProgressBar from "@/components/ProgressBar";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import ScrollProgressBar from "@/components/ScrollProgressBar";

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
        <html lang="en">
            <body className="min-h-dvh">
                <div className="mx-auto">
                    <ProgressBar isAdmin />
                    <ScrollProgressBar isAdmin />
                    <div className="flex gap-10">
                        <AdminSidebar />
                        <div className="flex flex-col gap-20 w-full lg:!ml-[280px]">
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
