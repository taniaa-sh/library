import type { Metadata } from "next";
import { Toaster } from "sonner";
import ProgressBar from "@/components/ProgressBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export const metadata: Metadata = {
    title: "Library App Admin",
    description: "an university app admin",
    icons: {
        icon: "./favicon.ico",
    }
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-dvh bg-white dark:bg-[#0d1b3b] transition-colors">
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
