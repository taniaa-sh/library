"use client";

import React from "react";

const AdminHeader = () => {
    return (
        <div className="flex items-center justify-between w-full !p-6">
            <div className="flex flex-col gap-[6px]">
                <p className="font-semibold text-2xl">Welcome, Adrian</p>
                <p className="font-normal text-base text-slate-500">Monitor all of your projects and tasks here</p>
            </div>
        </div>
    );
};

export default AdminHeader;
