import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { bookingAPI } from "@/lib/api"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FaMoneyBillWave } from "react-icons/fa"
import BookingStepper from "./BookingStepper"

const BookingDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetchBookingDetails()
  }, [id])

  const fetchBookingDetails = async () => {
    try {
      setLoading(true)
      const data = await bookingAPI.getDetails(id)
      setBooking(data.data)
    } catch (err) {
      toast.error(err.message || "Failed to load booking details")
      navigate("/account/booking")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return

    try {
      setActionLoading(true)
      await bookingAPI.cancel(id)
      toast.success("Booking cancelled successfully")
      fetchBookingDetails()
    } catch (err) {
      toast.error(err.message || "Failed to cancel booking")
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    )
  }

  if (!booking) return null

  const isCancelled = booking.status === "CANCELLED"
  const canCancel = booking.status === "PENDING"

  return (
    <div className="space-y-4">
      {/* Event Info Card */}
      <Card className="bg-transparent">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center 
          sm:justify-between gap-6">
            <div className="flex gap-4 items-start">
              <img
                src={booking.event?.images?.[0] || "https://hpdjeventmanagement.com/wp-content/uploads/2025/07/dj-image-1.png"}
                alt={booking.event?.title}
                className="w-[90px] h-[90px] object-cover rounded-md border"
              />

              <div className="text-sm space-y-1">
                <h1 className="font-semibold text-base">
                  {booking.event?.title}
                </h1>
                <p className="text-muted-foreground line-clamp-2">
                  {booking.event?.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  Booked on {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div>
              <Button
                variant="outline"
                onClick={() => {
                  const event = booking.event;
                  if (event) {
                    navigate(`/events-details/${event.categoryId || 'null'}/${event.title || 'event'}/${booking.eventId}`);
                  }
                }}
              >
                Write a Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stepper Card */}
      <Card className="bg-transparent overflow-hidden">
        <CardContent className="p-6">
          <BookingStepper orderStatus={booking.status} />
        </CardContent>
      </Card>

      {/* Venue Address Card */}
      <Card className="bg-transparent">
        <CardContent className="p-6 space-y-3">
          <h1 className="font-semibold">Event Details & Venue</h1>

          <div className="text-sm space-y-3">
            <div className="flex gap-3 font-medium items-center">
              <p className="w-20 text-muted-foreground">Date</p>
              <Separator orientation="vertical" className="h-4" />
              <p>{new Date(booking.eventDate).toLocaleDateString("en-IN")}</p>
            </div>

            <div className="flex gap-3 font-medium items-center">
              <p className="w-20 text-muted-foreground">Time</p>
              <Separator orientation="vertical" className="h-4" />
              <p>{booking.startTime} {booking.endTime ? `– ${booking.endTime}` : ''}</p>
            </div>

            <div className="flex gap-3 font-medium items-center">
              <p className="w-20 text-muted-foreground">Venue</p>
              <Separator orientation="vertical" className="h-4" />
              <p>{booking.address?.venueName}</p>
            </div>

            <div className="flex gap-3 font-medium items-start">
              <p className="w-20 text-muted-foreground shrink-0">Address</p>
              <Separator orientation="vertical" className="h-4 mt-1" />
              <p>
                {booking.address?.venueAddress}, {booking.address?.city}, {booking.address?.state} - {booking.address?.pincode}
              </p>
            </div>

            <div className="flex gap-3 font-medium items-center">
              <p className="w-20 text-muted-foreground">Contact</p>
              <Separator orientation="vertical" className="h-4" />
              <p>{booking.address?.phone || booking.user?.phone || '—'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details Card */}
      <Card className="bg-transparent">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Total Amount</p>
            <p className="font-semibold text-lg">₹ {booking.event?.bookingPrice?.toLocaleString()}</p>
          </div>

          <div className="bg-orange-50 rounded-md px-4 py-3 text-sm 
          font-medium flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-orange-500" />
              <p className="capitalize">
                {booking.payment?.paymentMethod === 'razorpay' ? 'Paid Online' : 'Cash on Delivery'}
              </p>
            </div>
            <p className={`text-xs px-2 py-0.5 rounded-full border ${booking.payment?.paymentStatus === 'COMPLETED'
              ? 'bg-green-100 text-green-700 border-green-200'
              : 'bg-yellow-100 text-yellow-700 border-yellow-200'
              }`}>
              {booking.payment?.paymentStatus || 'PENDING'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="px-2">
        <p className="text-xs font-medium text-muted-foreground">
          <span className="font-bold text-orange-600">Djdmax :</span>{" "}
          Thank you for booking with us. We hope you have a great event!
        </p>
      </div>

      <div className="pb-10 pt-4">
        <Button
          variant="destructive"
          className="w-full h-12"
          disabled={!canCancel || actionLoading}
          onClick={handleCancelBooking}
        >
          {actionLoading && <Loader2 className="animate-spin mr-2" size={16} />}
          {isCancelled ? "Booking Cancelled" : "Cancel Booking"}
        </Button>
        {!canCancel && !isCancelled && (
          <p className="text-[10px] text-center text-muted-foreground mt-2">
            Only pending bookings can be cancelled.
          </p>
        )}
      </div>
    </div>
  )
}

export default BookingDetails