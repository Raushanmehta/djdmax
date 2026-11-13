import React, { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { bookingAPI } from "@/lib/api"

const ITEMS_PER_PAGE = 8

const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
    CONFIRMED: "bg-green-100 text-green-700 border-green-300",
    CANCELLED: "bg-red-100 text-red-700 border-red-300",
    COMPLETED: "bg-blue-100 text-blue-700 border-blue-300",
}

const BookingOrderTable = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [updatingId, setUpdatingId] = useState(null)

    const fetchBookings = async () => {
        try {
            setLoading(true)
            const data = await bookingAPI.getAllBookings()
            setBookings(data.data || [])
        } catch (err) {
            toast.error("Failed to load bookings")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [])

    const handleStatusChange = async (bookingId, status) => {
        try {
            setUpdatingId(bookingId)
            await bookingAPI.updateStatus(bookingId, { status })
            setBookings(prev =>
                prev.map(b => b.id === bookingId ? { ...b, status } : b)
            )
            toast.success(`Booking status updated to ${status}`)
        } catch (err) {
            toast.error("Failed to update status")
        } finally {
            setUpdatingId(null)
        }
    }

    const filtered = bookings.filter(b =>
        b.event?.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        b.user?.email?.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

    return (
        <div className="w-full bg-white">
            <Card className="border border-gray-200 shadow-none">

                {/* HEADER */}
                <CardHeader className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-4 flex-1">
                            <h2 className="text-lg font-semibold whitespace-nowrap">
                                Booking Orders
                            </h2>

                            <div className="relative w-full max-w-sm">
                                <Search
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    placeholder="Search by event or customer..."
                                    className="pl-9 border border-orange-400"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                        setPage(1)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>

                {/* TABLE */}
                <CardContent className="p-0 border-none">
                    <div className="max-h-[500px] overflow-auto">
                        <Table className="w-full">
                            <TableHeader className="sticky top-0 z-20">
                                <TableRow className="bg-slate-50 border-b border-gray-200">
                                    <TableHead className="h-12">Customer</TableHead>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Event Date</TableHead>
                                    <TableHead>Venue</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Update</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-16 text-center text-muted-foreground">
                                            Loading bookings...
                                        </TableCell>
                                    </TableRow>
                                ) : paginated.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-16 text-center text-muted-foreground">
                                            {search ? "No bookings match your search." : "No Bookings Found"}
                                        </TableCell>
                                    </TableRow>
                                ) : paginated.map((booking) => (
                                    <TableRow key={booking.id} className="hover:bg-slate-50 transition">
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{booking.user?.name}</p>
                                                <p className="text-xs text-muted-foreground">{booking.user?.email}</p>
                                                <p className="text-xs text-muted-foreground">{booking.user?.phone}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium max-w-[160px] truncate">
                                            {booking.event?.title}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {new Date(booking.eventDate).toLocaleDateString("en-IN")}
                                            <br />
                                            <span className="text-xs text-muted-foreground">
                                                {booking.startTime} - {booking.endTime}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-sm max-w-[140px] truncate">
                                            {booking.address?.venueName}, {booking.address?.city}
                                        </TableCell>
                                        <TableCell className="font-semibold text-green-600">
                                            ₹{booking.event?.bookingPrice?.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={statusColors[booking.status] || ""}
                                            >
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right ">
                                            <Select
                                                value={booking.status}
                                                onValueChange={(val) => handleStatusChange(booking.id, val)}
                                                disabled={updatingId === booking.id}
                                            >
                                                <SelectTrigger className="w-[130px] text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="PENDING">Pending</SelectItem>
                                                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                            <p className="text-sm font-medium">
                                Page {page} of {totalPages} &mdash; {filtered.length} bookings
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
                                            onClick={() => page < totalPages && setPage(page + 1)}
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

export default BookingOrderTable