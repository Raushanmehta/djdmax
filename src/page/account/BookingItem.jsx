import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MdElectricBolt } from "react-icons/md"

const BookingItem = () => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition bg-transparent">
      <CardContent className=" space-y-4">

        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="bg-orange-500 ">
              <MdElectricBolt size={18} />
            </AvatarFallback>
          </Avatar>

          <div>
            <Badge variant="secondary" className="bg-yellow-200">
              PENDING
            </Badge>
          </div>
        </div>

        <div className="p-2 shadow rounded-lg flex gap-4">
          <img
            src="https://hpdjeventmanagement.com/wp-content/uploads/2025/07/dj-image-1.png"
            alt="item"
            className="w-[70px] h-[70px] object-cover rounded-md"
          />

          <div className="space-y-1">
            <h1 className="font-semibold">Sadi waala </h1>
            <p className="text-sm font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, libero?
            </p>
            <p className="text-sm">
              <span className="font-medium">Date:</span> Mon, Dec 12
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default BookingItem