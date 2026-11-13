import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
    CONFIRMED: "bg-green-100 text-green-700 border-green-300",
    CANCELLED: "bg-red-100 text-red-700 border-red-300",
    COMPLETED: "bg-blue-100 text-blue-700 border-blue-300",
}

const RecentBookings = ({ bookings }) => {
    return (
        <Card className="rounded-2xl border-none bg-white">
            <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                    Latest customer interactions and requests
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {bookings?.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No recent bookings</p>
                    ) : (
                        bookings?.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {booking.user?.name || "Guest"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {booking.event?.title || "Unknown Event"}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <Badge variant="outline" className={`text-[10px] ${statusColors[booking.status]}`}>
                                        {booking.status}
                                    </Badge>
                                    <p className="text-[10px] text-muted-foreground mt-1">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentBookings
