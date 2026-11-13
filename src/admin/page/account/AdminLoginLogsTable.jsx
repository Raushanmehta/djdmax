import React, { useState } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const ITEMS_PER_PAGE = 5

const AdminLoginLogsTable = ({ logs = [] }) => {

    const [page, setPage] = useState(1)
    const [loading] = useState(false)

    // Sort logs descending by date
    const sortedLogs = [...logs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const totalPages = Math.ceil(sortedLogs.length / ITEMS_PER_PAGE)

    const paginated = sortedLogs.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    return (
        <div className="w-full bg-white">
            <Card className="border border-gray-200 shadow-none">

                {/* HEADER */}
                <CardHeader className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Login Logs</h2>
                </CardHeader>

                {/* TABLE */}
                <CardContent className="p-0 border-none">

                    <div className="max-h-[500px] overflow-auto">
                        <Table>
                            <TableHeader className="sticky top-0 z-20">
                                <TableRow className="bg-slate-50 border-b border-gray-200">
                                    <TableHead>IP Address</TableHead>
                                    <TableHead>Device</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>

                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-16 text-center">
                                            Loading logs...
                                        </TableCell>
                                    </TableRow>
                                ) : paginated.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-16 text-center">
                                            No Logs Found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginated.map((log, index) => {
                                        const d = new Date(log.createdAt);
                                        const dateStr = d.toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' });
                                        const timeStr = d.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', hour12: true });
                                        return (
                                            <TableRow key={log.id || index}>
                                                <TableCell className="font-medium text-xs font-mono">{log.ipAddress || "Unknown"}</TableCell>
                                                <TableCell className="max-w-[200px] truncate" title={log.deviceInfo}>{log.deviceInfo || "Unknown Device"}</TableCell>
                                                <TableCell>{dateStr}</TableCell>
                                                <TableCell>{timeStr}</TableCell>
                                                <TableCell className="text-right">
                                                    <Badge
                                                        variant={
                                                            log.loginStatus === "SUCCESS"
                                                                ? "default"
                                                                : "destructive"
                                                        }
                                                        className={log.loginStatus === "SUCCESS" ? "bg-green-500 hover:bg-green-600" : ""}
                                                    >
                                                        {log.loginStatus}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}

                            </TableBody>
                        </Table>
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                            <p className="text-sm font-medium">
                                Page {page} of {totalPages}
                            </p>

                            <Pagination>
                                <PaginationContent>

                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => page > 1 && setPage(page - 1)}
                                            className="cursor-pointer"
                                        />
                                    </PaginationItem>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                isActive={page === index + 1}
                                                onClick={() => setPage(index + 1)}
                                                className="cursor-pointer"
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() =>
                                                page < totalPages && setPage(page + 1)
                                            }
                                            className="cursor-pointer"
                                        />
                                    </PaginationItem>

                                </PaginationContent>
                            </Pagination>

                        </div>
                    )}

                </CardContent>
            </Card>
        </div>
    )
}

export default AdminLoginLogsTable