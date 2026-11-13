import { useEffect, useState } from "react"
import { bookingAPI } from "@/lib/api"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  CONFIRMED: "bg-green-100 text-green-700 border-green-300",
  CANCELLED: "bg-red-100 text-red-700 border-red-300",
  COMPLETED: "bg-blue-100 text-blue-700 border-blue-300",
}

const Booking = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    bookingAPI.getMyBookings()
      .then((data) => setBookings(data.data || []))
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="animate-spin text-orange-500" size={28} />
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p className="text-lg font-medium">No bookings found</p>
        <p className="text-sm mt-1">You haven&apos;t booked any events yet.</p>
      </div>
    )
  }

  return (
    <div className="text-sm space-y-4">
      <div className="pb-2">
        <h1 className="font-semibold text-base">All Bookings ({bookings.length})</h1>
      </div>

      {bookings.map((booking) => (
        <Card
          key={booking.id}
          className="bg-transparent border border-gray-200 cursor-pointer hover:border-orange-200 transition-colors"
          onClick={() => navigate(`/account/booking/${booking.id}`)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                {booking.event?.images?.[0] && (
                  <img
                    src={booking.event.images[0]}
                    alt={booking.event.title}
                    className="w-16 h-16 rounded-md object-cover border"
                  />
                )}
                <div className="space-y-1">
                  <p className="font-semibold">{booking.event?.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {booking.event?.category?.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    📅 {new Date(booking.eventDate).toLocaleDateString("en-IN")} &bull; {booking.startTime} – {booking.endTime}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    📍 {booking.address?.venueName}, {booking.address?.city}, {booking.address?.state}
                  </p>
                </div>
              </div>

              <div className="text-right space-y-2">
                <p className="font-bold text-green-600">
                  ₹{booking.event?.bookingPrice?.toLocaleString()}
                </p>
                <Badge
                  variant="outline"
                  className={statusColors[booking.status] || ""}
                >
                  {booking.status}
                </Badge>
                {booking.payment && (
                  <p className="text-xs text-muted-foreground capitalize">
                    Payment: {booking.payment.paymentMethod} — {booking.payment.paymentStatus}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Booking