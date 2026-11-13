import React, { useState, useEffect } from "react"
import { Search, Plus, Trash2, Pencil } from "lucide-react"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useNavigate } from "react-router-dom"
import { adminAPI } from "@/lib/api"

const ITEMS_PER_PAGE = 8

const EventTable = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [deletingId, setDeletingId] = useState(null)
  const navigate = useNavigate()

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const data = await adminAPI.getEvents()
      setEvents(data.data || [])
    } catch (err) {
      toast.error("Failed to load events")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleDelete = async (id) => {
    try {
      setDeletingId(id)
      await adminAPI.deleteEvent(id)
      toast.success("Event deleted successfully")
      setEvents(prev => prev.filter(e => e.id !== id))
    } catch (err) {
      toast.error("Failed to delete event")
    } finally {
      setDeletingId(null)
    }
  }

  // Filter by search
  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
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
                Events
              </h2>

              <div className="relative w-full max-w-sm">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Search events..."
                  className="pl-9 border border-orange-400"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                />
              </div>
            </div>

            <Button
              onClick={() => navigate("/admin/create-event")}
              className="flex items-center gap-2 border border-orange-400 hover:bg-orange-500 transition duration-300"
            >
              <Plus size={16} />
              Create Event
            </Button>
          </div>
        </CardHeader>

        {/* TABLE */}
        <CardContent className="p-0 border-none">
          <div className="max-h-[500px] overflow-auto">
            <Table className="w-full">
              <TableHeader className="sticky top-0 z-20">
                <TableRow className="bg-slate-50 border-b border-gray-200">
                  <TableHead className="h-12">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Booking Price</TableHead>
                  <TableHead>MRP Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-16 text-center text-muted-foreground">
                      Loading events...
                    </TableCell>
                  </TableRow>
                ) : paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-16 text-center text-muted-foreground">
                      {search ? "No events match your search." : "No Events Found"}
                    </TableCell>
                  </TableRow>
                ) : paginated.map((event) => (
                  <TableRow key={event.id} className="hover:bg-slate-50 transition">
                    <TableCell>
                      {event.images?.[0] ? (
                        <img
                          src={event.images[0]}
                          alt={event.title}
                          className="w-12 h-12 rounded-md object-cover border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-md bg-gray-100 border flex items-center justify-center text-xs text-gray-400">
                          No img
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {event.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-orange-500 border-orange-300">
                        {event.category?.name || "—"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ₹{event.bookingPrice?.toLocaleString()}
                    </TableCell>
                    <TableCell className="line-through text-gray-400">
                      ₹{event.mrpPrice?.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => navigate(`/admin/create-event?edit=${event.id}`)}
                        >
                          <Pencil size={15} />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                              disabled={deletingId === event.id}
                            >
                              <Trash2 size={15} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Event?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete &quot;{event.title}&quot;. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleDelete(event.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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
                Page {page} of {totalPages} &mdash; {filtered.length} events
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

export default EventTable