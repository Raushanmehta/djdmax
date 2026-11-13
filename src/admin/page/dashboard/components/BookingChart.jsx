import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart } from "lucide-react"
import { Bar, XAxis } from "recharts"



const data = [
  { month: "Jan", sales: 150 },
  { month: "Feb", sales: 380 },
  { month: "Mar", sales: 200 },
  { month: "Apr", sales: 290 },
  { month: "May", sales: 180 },
  { month: "Jun", sales: 190 },
]

const config = {
  sales: {
    label: "Booking",
    color: "hsl(var(--primary))",
  },
}

export function BookingChart() {
  return (
    <Card className="rounded-2xl border-none bg-white">
      <CardHeader>
        <CardTitle>Monthly Booking</CardTitle>
      </CardHeader>

      <CardContent>
        {/* <ChartContainer config={config} className="h-64 w-full">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <Bar dataKey="sales" radius={6} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer> */}
      </CardContent>
    </Card>
  )
}