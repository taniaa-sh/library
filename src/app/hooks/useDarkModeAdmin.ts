"use client";

import { useEffect, useState } from "react";

export default function useDarkMode() {
    const [isDarkAdmin, setIsDarkAdmin] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const saved2 = localStorage.getItem("themeAdmin");

        if (saved === "dark") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDark(false);
            document.documentElement.classList.remove("dark");
        }

        if (saved2 === "dark") {
            setIsDarkAdmin(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkAdmin(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(prev => {
            const newTheme = !prev;

            if (newTheme) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }

            return newTheme;
        });
    };

    const toggleTheme2 = () => {
        setIsDarkAdmin(prev => {
            const newTheme = !prev;

            if (newTheme) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("themeAdmin", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("themeAdmin", "light");
            }

            return newTheme;
        });
    }

    return { isDark, toggleTheme, isDarkAdmin, toggleTheme2 };
}
