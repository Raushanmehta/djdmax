import {LayoutDashboard,ChevronDown,MessageCircleMore,MailIcon,LogOut} from "lucide-react"
import {Sidebar,SidebarContent,SidebarFooter,SidebarGroup,SidebarGroupContent,SidebarGroupLabel,SidebarHeader,SidebarMenu,SidebarMenuButton,SidebarMenuItem,} from "../../components/ui/sidebar"
import {Collapsible,CollapsibleContent,CollapsibleTrigger,} from "../../components/ui/collapsible"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"




const AppSidebar = () => {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logoutAdmin } = useAuth()

  const handleLogout = (e) => {
    e.preventDefault()
    logoutAdmin()
    navigate("/admin/login")
  }

  const activeClass = "bg-orange-500 text-white font-semibold"
  const inactiveClass = "text-gray-300 hover:text-orange-400 hover:bg-white/5"

  const dashboardRoutes = [
    { path: "/admin/dashboard", label: "Dashboard" },
  ]

  const eventsRoutes = [
    { path: "/admin/events", label: "All Events" },
    { path: "/admin/create-event", label: "Create Event" },
    { path: "/admin/update-event", label: "Update Event" },
    { path: "/admin/event-details", label: "Event Details" },
    { path: "/admin/categories", label: "Categories" },
    { path: "/admin/featured-events", label: "Featured Events" },
 
  ]

  const bookingRoutes = [
    { path: "/admin/bookings-orders", label: "All Bookings" },
    { path: "/admin/booking-pending", label: "Pending" },
    { path: "/admin/booking-confirmed", label: "Confirmed" },
    { path: "/admin/booking-ongoing", label: "Ongoing" },
    { path: "/admin/booking-completed", label: "Completed" },
    { path: "/admin/booking-cancelled", label: "Cancelled" },
    { path: "/admin/booking-details", label: "Booking Details" },
  ]

  const websiteRoutes = [
    { path: "/admin/hero-banner", label: "Hero Banner" },
    { path: "/admin/about", label: "About" },
    { path: "/admin/services", label: "Services" },
    { path: "/admin/why-choose-us", label: "Why Choose Us" },
    { path: "/admin/process", label: "Process" },
    { path: "/admin/gallary", label: "Gallary" },
    { path: "/admin/trusted", label: "Trusted" },
    { path: "/admin/testimonial", label: "Testimonial" },
  ]

  const customersRoutes = [
    { path: "/admin/customers", label: "All Customers" },
    { path: "/admin/customer-details", label: "Customer Details" },
  ]

  const paymentsRoutes = [
    { path: "/admin/payments", label: "All Payments" },
    { path: "/admin/payment-pending", label: "Transactions" },
    { path: "/admin/payment-details", label: "Successful" },
    { path: "/admin/payment-pending", label: "Pending" },
    { path: "/admin/payment-failed", label: "Failed" }
  ]

  const ReviewRoutes = [
    { path: "/admin/reviews", label: "All Reviews" },
    { path: "/admin/pending-reviews", label: "Pending" },
    { path: "/admin/published-reviews", label: "Published" }
  ]

  const accountRoutes = [
    { path: "/admin/account/profile", label: "Profile" },
    { path: "/admin/update-profile", label: "Update Profile" },
    { path: "/admin/update-password", label: "Change Password" },
  ]

  return (
    <Sidebar className="w-64">
      <SidebarHeader className="h-16 flex items-center justify-center bg-[#1f1f1f]">
        <h1 className="text-3xl font-bold text-white">DJ DMAX</h1>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden bg-[#1f1f1f]">
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-xs tracking-wide text-gray-500">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              {/* Dashboard */}
              <Collapsible>
                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={`flex items-center gap-4 px-6 py-6 rounded-lg 
                        transition text-white/80
                      ${pathname === "/admin/dashboard" ? "bg-orange-500" : ""}`}
                    >
                      <LayoutDashboard size={24} />
                      <span className="text-sm font-medium flex-1">
                        Dashboard
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-1 mt-1overflow-hidden pl-9 mt-1
                   transition-all duration-300 ease-in-out
                    data-[state=closed]:animate-collapsible-up
                    data-[state=open]:animate-collapsible-down">
                    {dashboardRoutes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        className={`block px-5 py-2 text-sm rounded ${pathname === route.path
                          ? activeClass
                          : inactiveClass
                          }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>

              {/* Events */}
              <Collapsible>
                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={`flex items-center gap-4 px-6 py-6 rounded-lg transition text-white/80
                      ${pathname.startsWith("/admin/events") ? "bg-orange-500" : ""}`}
                    >
                      <LayoutDashboard size={24} />
                      <span className="text-sm font-medium flex-1">
                        Events
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden pl-9 space-y-1 mt-1
                   transition-all duration-300 ease-in-out
                    data-[state=closed]:animate-collapsible-up
                    data-[state=open]:animate-collapsible-down">
                    {eventsRoutes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        className={`block px-5 py-2 text-sm rounded ${pathname === route.path
                          ? activeClass
                          : inactiveClass
                          }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>

              {/* Bookings */}
              <Collapsible>
                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={`flex items-center gap-4 px-6 py-6 rounded-lg 
                        transition text-white/80
                      ${pathname.startsWith("/admin/bookings-orders") ?
                          "bg-orange-500" : ""}`}
                    >
                      <LayoutDashboard size={24} />
                      <span className="text-sm font-medium flex-1">
                        Bookings
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden pl-9 space-y-1 mt-1
                   transition-all duration-300 ease-in-out
                    data-[state=closed]:animate-collapsible-up
                    data-[state=open]:animate-collapsible-down">
                    {bookingRoutes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        className={`block px-5 py-2 text-sm rounded ${pathname === route.path
                          ? activeClass
                          : inactiveClass
                          }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>

              {/* Website */}
              <Collapsible>
                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-4 
                    px-6 py-6 rounded-lg transition text-white/80">
                      <LayoutDashboard size={24} />
                      <span className="text-sm font-medium flex-1">
                        Website
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden pl-9 space-y-1 mt-1
                   transition-all duration-300 ease-in-out
                    data-[state=closed]:animate-collapsible-up
                    data-[state=open]:animate-collapsible-down">
                    {websiteRoutes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        className={`block px-5 py-2 text-sm rounded ${pathname === route.path
                          ? activeClass
                          : inactiveClass
                          }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>

             {/* Customers */}
              <Collapsible>
                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-4 
                    px-6 py-6 rounded-lg transition text-white/80">
                      <LayoutDashboard size={24} />
                      <span className="text-sm font-medium flex-1">
                        Customers
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden pl-9 space-y-1 mt-1
                   transition-all duration-300 ease-in-out
                    data-[state=closed]:animate-collapsible-up
                    data-[state=open]:animate-collapsible-down">
                    {customersRoutes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        className={`block px-5 py-2 text-sm rounded ${pathname === route.path
                          ? activeClass
                          : inactiveClass
                          }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>
     
             {/* Payments */}
              <Collapsible>
                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-4 
                    px-6 py-6 rounded-lg transition text-white/80">
                      <LayoutDashboard size={24} />
                      <span className="text-sm font-medium flex-1">
                        Payments
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden pl-9 space-y-1 mt-1
                   transition-all duration-300 ease-in-out
                    data-[state=closed]:animate-collapsible-up
                    data-[state=open]:animate-collapsible-down">
                    {paymentsRoutes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        className={`block px-5 py-2 text-sm rounded ${pathname === route.path
                          ? activeClass
                          : inactiveClass
                          }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>
              
             {/* Reviews */}
              <Collapsible>
                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-4 
                    px-6 py-6 rounded-lg transition text-white/80">
                      <LayoutDashboard size={24} />
                      <span className="text-sm font-medium flex-1">
                        Reviews
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden pl-9 space-y-1 mt-1
                   transition-all duration-300 ease-in-out
                    data-[state=closed]:animate-collapsible-up
                    data-[state=open]:animate-collapsible-down">
                    {ReviewRoutes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        className={`block px-5 py-2 text-sm rounded ${pathname === route.path
                          ? activeClass
                          : inactiveClass
                          }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>
              
              
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Support */}
          <SidebarGroupLabel className="uppercase text-xs tracking-wide text-gray-500">
            Support
          </SidebarGroupLabel>

          {/* Account */}
              <Collapsible>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex items-center gap-4 px-6 
                    py-6 rounded-lg transition text-white/80">
                      <LayoutDashboard size={24} />
                      <span className="text-sm font-medium flex-1">
                        Account Settings
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden pl-9 space-y-1 mt-1
                   transition-all duration-300 ease-in-out
                    data-[state=closed]:animate-collapsible-up
                    data-[state=open]:animate-collapsible-down">
                    {accountRoutes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        className={`block px-5 py-2 text-sm rounded ${pathname === route.path
                          ? activeClass
                          : inactiveClass
                          }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>

          {/* Calendar */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/calender")}
                  className="flex items-center gap-4 px-6 py-6 rounded-lg 
                  transition text-white/80"
                >
                  <MessageCircleMore size={24} />
                  <span className="text-sm font-medium flex-1">
                    Calendar
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

          {/* Email Support */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/email")}
                  className="flex items-center gap-4 px-6 py-6 rounded-lg 
                  transition text-white/80"
                >
                  <MailIcon size={24} />
                  <span className="text-sm font-medium flex-1">
                    Email Support
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="h-16 flex px-4 bg-[#1f1f1f]">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer hover:text-orange-400">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar