import { createBrowserRouter } from "react-router-dom";
import { ProtectedAdminRoute, ProtectedUserRoute } from "./ProtectedRoute";
import Dashboard from "@/admin/page/dashboard/Dashboard";
import Events from "@/admin/page/event/Events";
import Layout from "@/layout/Layout";
import Account from "@/page/account/Account";
import Login from "@/page/auth/Login";
import Cart from "@/page/cart/Cart";
import Checkout from "@/page/chekout/Checkout";
import Event from "@/page/event/Event";
import EventDetails from "@/page/eventDetails/EventDetails";
import Home from "@/page/home/Home";
import AdminLayout from "@/layout/AdminLayout";
import BookingOrder from "@/admin/page/booking/BookingOrder";
import AdminLogin from "@/admin/page/auth/AdminLogin";
import ForgetPassword from "@/admin/page/auth/ForgetPassword";
import ResetPassword from "@/admin/page/auth/ResetPassword";
import Register from "@/page/auth/Register";
import UserForgetPassword from "@/page/auth/ForgetPassword";
import UserResetPassword from "@/page/auth/ResetPassword";
import AdminAccount from "@/admin/page/account/AdminAccount";
import Calendar from "@/admin/page/calender/Calender";
import AddEvent from "@/admin/page/event/AddEvent";
import Email from "@/admin/page/email/Email";
import AboutPage from "@/page/about/AboutPage";
import ContactPage from "@/page/contact/ContactPage";
import GalleryPage from "@/page/gallery/GalleryPage";
import BlogPage from "@/page/blog/BlogPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutPage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "blog", element: <BlogPage/>},
      { path: "events", element: <Event /> },
      { path: "events/:category", element: <Event /> },
      {path: "events-details/:categoryId/:name/:eventId", element: <EventDetails />},
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <UserForgetPassword /> },
      { path: "resetpassword/:token", element: <UserResetPassword /> },
      // Protected User Routes
      {
        element: <ProtectedUserRoute />,
        children: [
          { path: "cart", element: <Cart /> },
          { path: "checkout", element: <Checkout /> },
          { path: "account/*", element: <Account /> },
        ]
      }
    ],
  },

  // ADMIN ROUTES
  {
    path: "/admin",
    element: <ProtectedAdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "events", element: <Events /> },
          { path: "create-event", element: <AddEvent /> },
          { path: "bookings-orders", element: <BookingOrder /> },
          { path: "account/profile", element: <AdminAccount /> },
          { path: "calender", element: <Calendar /> },
          { path: "email", element: <Email /> },
        ]
      }
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/admin/resetpassword/:token",
    element: <ResetPassword />,
  },
]);

export default router;