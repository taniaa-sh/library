
import ProgressBar from "@/components/ProgressBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Header from "./_components/Header";
import ShowSopportModal from "./_components/ShowSopportModal";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ProgressBar />
                <ScrollProgressBar />
                <Header />
                <div className="max-w-[1440px] mx-auto px-[10px]">{children}</div>
                <ShowSopportModal />
            </body>
        </html>
    );
}
