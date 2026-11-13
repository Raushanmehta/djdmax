import React, { useState } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

import { FaEye, FaTrash } from "react-icons/fa"

const ITEMS_PER_PAGE = 10

const dummyEmails = [
    { name: "Rahul Sharma", email: "rahul@gmail.com", date: "07 Mar 2026", time: "10:30 AM" },
    { name: "Amit Patel", email: "amit@gmail.com", date: "07 Mar 2026", time: "11:20 AM" },
    { name: "Neha Singh", email: "neha@gmail.com", date: "08 Mar 2026", time: "09:10 AM" },
    { name: "Riya Gupta", email: "riya@gmail.com", date: "08 Mar 2026", time: "12:45 PM" },
    { name: "Karan Verma", email: "karan@gmail.com", date: "09 Mar 2026", time: "02:00 PM" },
    { name: "Priya Mehta", email: "priya@gmail.com", date: "09 Mar 2026", time: "04:15 PM" },
]

const EmailTable = () => {

    const [page, setPage] = useState(1)
    const [loading] = useState(false)

    const filtered = dummyEmails

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

    const paginated = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    return (
        <div className="w-full bg-white">
            <Card className="border border-gray-200 shadow-none">

                <CardHeader className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Emails</h2>
                </CardHeader>

                <CardContent className="p-0 border-none">

                    <div className="max-h-[500px] overflow-auto">
                        <Table>

                            <TableHeader className="sticky top-0 z-20">
                                <TableRow className="bg-slate-50 border-b border-gray-200">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>

                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-16 text-center">
                                            Loading emails...
                                        </TableCell>
                                    </TableRow>
                                ) : paginated.map((email, index) => (

                                    <TableRow key={index}>
                                        <TableCell>{email.name}</TableCell>
                                        <TableCell>{email.email}</TableCell>
                                        <TableCell>{email.date}</TableCell>
                                        <TableCell>{email.time}</TableCell>

                                        <TableCell className="text-right flex justify-end gap-2">

                                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                                                <FaEye />
                                                View
                                            </Button>

                                            <Button size="sm" variant="destructive" className="flex items-center gap-1">
                                                <FaTrash />
                                                Delete
                                            </Button>

                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>
                        </Table>
                    </div>

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
                                        />
                                    </PaginationItem>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                isActive={page === index + 1}
                                                onClick={() => setPage(index + 1)}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => page < totalPages && setPage(page + 1)}
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

export default EmailTable