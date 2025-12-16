export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
            <div className="min-h-dvh bg-white dark:bg-[#0d1b3b] transition-colors">
                {children}
            </div>
    );
}