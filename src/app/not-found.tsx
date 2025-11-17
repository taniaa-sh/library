"use client";

import RootNotFound from "./(root)/_components/NotFound";
import AdminNotFound from "./admin/components/AdminNotFound";

export default function NotFound() {
    const pathName = window.location.pathname;

    if (pathName.startsWith("/admin")) {
        return <AdminNotFound />;
    } else {
        return <RootNotFound />;
    }
}
