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
        <div className="w-full flex flex-col gap-4">
            {/* Desktop */}
            <div className="hidden md:block w-full bg-white overflow-x-auto rounded-lg">
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
                                        <td
                                            key={colIndex}
                                            className="border-b border-gray-200 px-4 py-3 text-sm text-gray-600"
                                        >
                                            {col.render ? col.render(row) : String(row[col.key])}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex flex-col gap-4">
                {data.length === 0 ? (
                    <div className="text-center text-gray-400">No data available</div>
                ) : (
                    data.map((row, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-3 transform transition hover:scale-[1.01] duration-200"
                        >
                            {columns.map((col, cIdx) =>
                                col.key !== "action" ? (
                                    <div key={cIdx} className="grid grid-cols-[1fr_1.2fr] gap-2">
                                        <span className="text-gray-400 font-medium">{col.label}</span>
                                        <span className="text-gray-800 font-semibold break-words">
                                            {col.render ? col.render(row) : String(row[col.key])}
                                        </span>
                                    </div>
                                ) : null
                            )}

                            {/* Action buttons */}
                            {columns.find(c => c.key === "action") && (
                                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                                    {columns.find(c => c.key === "action")!.render!(row)}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default AdminTable;
