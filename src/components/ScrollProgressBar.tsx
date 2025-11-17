"use client";

import { motion, useScroll } from "framer-motion";

type PropsType = {
    isAdmin?: boolean
};

export default function ScrollProgressBar(props: PropsType) {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            style={{ scaleX: scrollYProgress }}
            className={`fixed top-0 left-0 right-0 h-[4px] origin-left  z-[9999] ${props.isAdmin ? "bg-[#25388C]" : "bg-light-200"}`}
        />
    );
}