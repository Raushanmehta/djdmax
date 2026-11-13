import ThemeToggle from "@/components/them/ThemeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"


const AppHeader = () => {
  const navigate = useNavigate()
  const { admin, logoutAdmin } = useAuth()

  const handleLogout = () => {
    logoutAdmin()
    navigate("/admin/login", { replace: true })
  }


  return (
    <header className="sticky top-0 z-50 flex items-center justify-between 
    px-4 py-3 border-b border-gray-200 bg-white">

      <div className="flex items-center gap-3 w-full max-w-lg">
        <SidebarTrigger className="rounded-md border border-gray-200" />

        <div className="flex items-center flex-1 relative">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search or type command..."
            className="pl-10 pr-20 rounded-lg border border-gray-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-4">
        <div className="relative cursor-pointer border border-gray-200 p-2 
        rounded-full hover:bg-orange-300 transition">
          <Bell className="h-6 w-6 text-gray-600 hover:text-black transition" />

          <Badge
            className="absolute -top-1 -right-1 h-5 min-w-[20px] 
           flex items-center justify-center
            rounded-full px-1 text-[10px]
            bg-red-500 hover:bg-red-500 text-white">
            3
          </Badge>
        </div>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage
                    src={admin?.profile?.avatar || "https://i.pravatar.cc/300"}
                    alt={admin?.name}
                  />
                  <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
                    {admin?.name?.charAt(0).toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3
                 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
              </div>

              <span className="text-sm font-medium ">{admin?.name || "Admin"}</span>

              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="shadow-md w-56 rounded-xl p-2 mt-2 border-none bg-white"
          >
            <DropdownMenuItem
              onClick={() => navigate("/admin/account/profile")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg
    cursor-pointer
    hover:bg-orange-50
    hover:text-orange-500
    focus:bg-orange-50
    focus:text-orange-500
    transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="font-medium">Account</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate("/admin/account")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg
    cursor-pointer
    hover:bg-orange-50
    hover:text-orange-500
    focus:bg-orange-50
    focus:text-orange-500
    transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="font-medium">Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg
    cursor-pointer
    hover:bg-orange-50
    hover:text-orange-500
    focus:bg-orange-50
    focus:text-orange-500
    transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default AppHeader