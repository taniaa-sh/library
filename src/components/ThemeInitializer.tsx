"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ThemeInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");

      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );

      console.log(savedTheme === "dark" ? "dark" : "light");
    } catch (error) {
      console.error("Theme initialization failed:", error);
    }
  }, [pathname]);

  return null;
}
