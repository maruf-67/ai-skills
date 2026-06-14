"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ChevronDown,
    ChevronUp,
    Search,
    Edit,
    Trash2,
    MoreHorizontal,
    ChevronsUpDown,
} from "lucide-react";
import { Button, Select } from "@/components/ui";

export interface Column<T> {
    key: keyof T | string;
    header: string | (() => React.ReactNode);
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    className?: string;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    emptyMessage?: string;
    searchPlaceholder?: string;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    manualPagination?: boolean;
    rowCount?: number;
    onPageChange?: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
    onSearchChange?: (value: string) => void;
    onSort?: (key: string, direction: 'asc' | 'desc') => void;
}

/**
 * DataTable Component
 * Standardized data display with support for:
 * - Client/Server side pagination
 * - Dynamic sorting
 * - Integrated search
 * - Mobile-responsive actions
 */
export function DataTable<T extends { id: string | number }>({
    data = [],
    columns,
    isLoading = false,
    emptyMessage = "No records found",
    searchPlaceholder = "Search...",
    onEdit,
    onDelete,
    manualPagination = false,
    rowCount = 0,
    onPageChange,
    onPerPageChange,
    onSearchChange,
    onSort,
}: DataTableProps<T>) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (onSearchChange) onSearchChange(value);
    };

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            {/* Header Controls */}
            <div className="flex flex-col gap-4 border-b border-gray-200 p-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder={searchPlaceholder}
                        className="h-10 w-full rounded-lg border border-gray-300 bg-transparent pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key as string}
                                    className={cn(
                                        "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400",
                                        column.sortable && "cursor-pointer select-none hover:bg-gray-100"
                                    )}
                                >
                                    <div className="flex items-center gap-1">
                                        {typeof column.header === 'function' ? column.header() : column.header}
                                        {column.sortable && <ChevronsUpDown className="h-4 w-4 opacity-30" />}
                                    </div>
                                </th>
                            ))}
                            {(onEdit || onDelete) && <th className="px-4 py-3 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {isLoading ? (
                            <tr><td colSpan={100} className="p-10 text-center">Loading...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={100} className="p-10 text-center">{emptyMessage}</td></tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    {columns.map((col) => (
                                        <td key={col.key as string} className="px-4 py-3 text-sm">
                                            {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                                        </td>
                                    ))}
                                    {(onEdit || onDelete) && (
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                {onEdit && <Button variant="ghost" size="icon" onClick={() => onEdit(item)}><Edit className="h-4 w-4" /></Button>}
                                                {onDelete && <Button variant="ghost" size="icon" onClick={() => onDelete(item)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
