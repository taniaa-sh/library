"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");
  const bgColor = isAdmin ? "" : "bg-black dark:bg-gray-200";

  return <div className={`${bgColor} min-h-screen`}>{children}</div>;
};

export default BackgroundWrapper;
