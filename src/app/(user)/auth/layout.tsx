import ThemeInitializer from "@/components/ThemeInitializer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
