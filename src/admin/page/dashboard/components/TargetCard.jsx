import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"


const chartData = [
  { name: "progress", value: 75.55, fill: "hsl(var(--primary))" },
]

const chartConfig = {
  progress: {
    label: "Progress",
    color: "hsl(var(--primary))",
  },
}

export default function TargetCard({ stats }) {
  const displayValue = stats?.bookingCount || 0;

  return (
    <Card className="rounded-2xl border-none bg-white">
      <CardHeader>
        <CardTitle>Total Performance</CardTitle>
        <CardDescription>
          Overview of bookings and engagement
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div className="text-center mt-4">
          <h3 className="text-3xl font-bold">{displayValue}</h3>
          <p className="text-muted-foreground text-sm">Active Bookings</p>
          <p className="text-green-600 text-sm mt-1">Live from database</p>
        </div>

        <div className="grid grid-cols-3 w-full text-center pt-6 border-t border-gray-200 mt-6 text-xs uppercase tracking-wider">
          <div>
            <p className="text-muted-foreground">Total Users</p>
            <p className="font-semibold">{stats?.userCount || 0}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Events</p>
            <p className="font-semibold">{stats?.eventCount || 0}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Recent</p>
            <p className="font-semibold">{stats?.recentBookings?.length || 0}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}