"use client";

import { useEffect, useState } from "react";
import RootNotFound from "./(root)/_components/NotFound";
import AdminNotFound from "./admin/components/AdminNotFound";

export default function NotFound() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const pathName = window.location.pathname;
        setIsAdmin(pathName.startsWith("/admin"));
    }, []);

    if (isAdmin === null) return null;

    return isAdmin ? <AdminNotFound /> : <RootNotFound />;
}
