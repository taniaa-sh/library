"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

type PropsType = {
    isAdmin?: boolean
};

export default function ScrollProgressBar(props: PropsType) {
    const { scrollYProgress } = useScroll();
    const [isScrollable, setIsScrollable] = useState(false);

    useEffect(() => {
        setIsScrollable(document.body.scrollHeight > window.innerHeight);
        const handleResize = () => setIsScrollable(document.body.scrollHeight > window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isScrollable) return null;

    return (
        <motion.div
            style={{ scaleX: scrollYProgress }}
            className={`fixed top-0 left-0 right-0 h-[4px] origin-left z-[9999] ${props.isAdmin ? "bg-[#25388C]" : "bg-light-200 dark:bg-[#996c32]"}`}
        />
    );
}
