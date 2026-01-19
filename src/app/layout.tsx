import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import BackgroundWrapper from "@/components/BackgroundWrapperProps ";

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "Library App",
  description: "an university app",
  icons: {
    icon: "./favicon.ico",
  }
};


export default function RootLayout({
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
                                    const saved2 = localStorage.getItem('themeAdmin');
                                    const saved = localStorage.getItem('theme');
                                    if (saved2 === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    }
                                        if (saved === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    }
                                } catch (_) {}
                            })();
                        `,
          }}
        />
      </head>
      <body className={`${ibmPlexSans.className} ${bebasNeue.variable}`}>
          <BackgroundWrapper>
            {children}
          </BackgroundWrapper>
      </body>
    </html>
  );
}
