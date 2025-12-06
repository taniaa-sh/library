export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    const saved = localStorage.getItem('themeAdmin');
                                        if (saved === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    }
                                } catch (_) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body> {children} </body>
        </html>
    );
}