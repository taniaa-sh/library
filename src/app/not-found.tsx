"use client";

import { useEffect, useState } from "react";
import SiteUrls from "@/utils/routs";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const pathName = window.location.pathname;
        setIsAdmin(pathName.startsWith("/admin"));
    }, []);

    if (isAdmin === null) return null;

    return isAdmin ? router.push(SiteUrls.adminNotFound) : router.push(SiteUrls.rootNotFound);
}
