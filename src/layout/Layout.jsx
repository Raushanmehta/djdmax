import AnnouncementBar from "@/components/common/AnnouncementBar";
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <AnnouncementBar />
      <Navbar />
      <main > 
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;