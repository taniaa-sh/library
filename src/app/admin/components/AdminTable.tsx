"use client";
import React from "react";

export type Column<T> = {
    key: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
};

export type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
};

function AdminTable<T>({ columns, data }: TableProps<T>) {
    return (
        <div className="w-full bg-white flex flex-col justify-start items-center max-h-screen overflow-x-auto rounded-lg">
            <table className="w-full border border-gray-200">
                <thead className="bg-[#F8F8FF]">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="border-b border-gray-200 text-left px-4 py-3 text-sm font-medium text-gray-700"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4 text-gray-400">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="border-b border-gray-200 px-4 py-3 text-sm text-gray-600">
                                        {col.render ? col.render(row) : String(row[col.key])}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminTable;
