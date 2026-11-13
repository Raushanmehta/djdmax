import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FaBox, FaUser, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from "@/context/AuthContext"
import UserDetails from "./UserDetails"
import Address from "./Address"
import BookingDetails from "./BookingDetails"
import Booking from "./Booking"

const menu = [
  { name: "Profile", path: "/account", icon: <FaUser /> },
  { name: "Booking", path: "/account/booking", icon: <FaBox /> },
  { name: "Addresses", path: "/account/addresses", icon: <FaMapMarkerAlt /> },
  { name: "Logout", path: "/", icon: <FaSignOutAlt /> },
]

const Account = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logoutUser } = useAuth()

  const handleClick = (item) => {
    if (item.name === "Logout") {
      logoutUser()
      navigate("/")
    } else {
      navigate(item.path)
    }
  }

  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10">
      <h1 className="text-2xl font-bold pb-5">My Account</h1>
      <Separator />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        <Card className="lg:col-span-1 bg-transparent">
          <CardContent className="p-4 space-y-2">
            {menu.map((item, index) => {
              const isActive = location.pathname.startsWith(item.path)

              return (
                <div
                  key={index}
                  onClick={() => handleClick(item)}
                  className={`flex items-center gap-3 p-3 rounded-lg 
                    cursor-pointer transition-all
                  ${isActive
                      ? ""
                      : "hover:bg-muted text-muted-foreground"
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-transparent">
          <CardContent className="p-6">
            <Routes>
              <Route path="/" element={<UserDetails />} />
              <Route path="/booking" element={<Booking />} />
              <Route
                path="/booking/:id"
                element={<BookingDetails />}
              />
              <Route path="/addresses" element={<Address />} />
            </Routes>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Account