import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import ProgressBar from "@/components/ProgressBar";
import BackgroundWrapper from "@/components/BackgroundWrapperProps ";
import ReactQueryProvider from "./providers/ReactQueryProvider";

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
      <body className={`${ibmPlexSans.className} ${bebasNeue.variable}`}>
        <ReactQueryProvider>
          <BackgroundWrapper>
            <div className="max-w-[1440px] mx-auto">
              <ProgressBar />
              {children}
              <Toaster position="top-right" richColors />
            </div>
          </BackgroundWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
