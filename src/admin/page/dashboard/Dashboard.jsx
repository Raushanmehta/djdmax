import { useEffect, useState } from "react"
import { BookingChart } from "./components/BookingChart"
import StatCard from "./components/StatCard"
import TargetCard from "./components/TargetCard"
import RecentBookings from "./components/RecentBookings"
import { adminAPI } from "@/lib/api"

import { toast } from "sonner"



const Dashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    eventCount: 0,
    bookingCount: 0,
    recentBookings: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminAPI.getStats()
        setStats(res.data)
      } catch (error) {
        toast.error("Failed to load dashboard statistics")
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-6 py-8">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={loading ? "..." : stats.userCount?.toLocaleString()}
          percent="+0%"
          type="up"
          icon="users"
        />
        <StatCard
          title="Total Events"
          value={loading ? "..." : stats.eventCount?.toLocaleString()}
          percent="+0%"
          type="up"
          icon="event"
        />
        <StatCard
          title="Total Revenue"
          value={loading ? "..." : `₹${stats.totalRevenue?.toLocaleString()}`}
          percent="+0%"
          type="up"
          icon="revenue"
        />
        <StatCard
          title="Total Bookings"
          value={loading ? "..." : stats.bookingCount?.toLocaleString()}
          percent="+0%"
          type="up"
          icon="orders"
        />
      </div>


      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BookingChart />
        </div>
        <div className="space-y-6">
          <TargetCard stats={stats} />
          <RecentBookings bookings={stats.recentBookings} />
        </div>
      </div>


    </div>
  )
}

export default Dashboard