import { Card, CardContent } from "@/components/ui/card"
import { FiUsers, FiBox, FiDollarSign, FiCalendar } from "react-icons/fi"

const iconMap = {
  users: <FiUsers size={22} />,
  orders: <FiBox size={22} />,
  revenue: <FiDollarSign size={22} />,
  event: <FiCalendar size={22} />,
}


const StatCard = ({ title, value, percent, type, icon }) => {
  return (
    <Card className="rounded-3xl shadow-sm border-none " style={{
      backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #f59e0b 100%)
      `,
      backgroundSize: "100% 100%",
    }}>
      <CardContent className=" flex flex-col gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center 
        justify-center text-gray-600">
          {iconMap[icon]}
        </div>

        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-center justify-between mt-2">
            <h2 className="text-3xl font-bold">{value}</h2>

            <span
              className={`text-sm px-2 py-1 rounded-full ${type === "up"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
                }`}
            >
              {percent}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard