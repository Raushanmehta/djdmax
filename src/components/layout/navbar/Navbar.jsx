import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaShoppingCart,
  FaTwitter,
  FaVimeoV,
} from "react-icons/fa";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { mainCategory } from "@/data/category/mainCategory";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import blackLogo from "@/assets/logo/djdmax-logo-black-6.png";
import whiteLogo from "@/assets/logo/djdmax-logo-white-6.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ThemeToggle from "@/components/them/ThemeToggle";
import CategorySheet from "./CategorySheet";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MotionLink = motion(Link);

export default function Navbar() {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryEnter = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowCategorySheet(true);
  };

  const handleCategoryLeave = () => {
    setShowCategorySheet(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm px-4  ">
        <nav className="flex justify-between items-center max-w-[1330px] mx-auto h-20 ">
          <Link to="/" aria-label="DJ DMAX home" className="shrink-0">
            <img
              src={blackLogo}
              alt=""
              className="h-20 w-auto object-contain dark:hidden"
            />
            <img
              src={whiteLogo}
              alt=""
              className="hidden h-20 w-auto object-contain dark:block"
            />
          </Link>

          <div className="hidden lg:flex ">
            <NavigationMenu className="hover:bg-none">
              <NavigationMenuList className="gap-8">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className="hover:text-orange-500 transition 
                    font-semibold "
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {mainCategory.map((item) => (
                  <NavigationMenuItem
                    key={item.categoryId}
                    onMouseEnter={() => handleCategoryEnter(item.categoryId)}>
                    <span className="cursor-pointer hover:text-orange-500 transition font-semibold">
                      {item.name}
                    </span>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/about"
                      className="hover:text-orange-500 transition 
                    font-semibold"
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/gallary"
                      className="hover:text-orange-500 transition
                    font-semibold"
                    >
                      Gallary
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/blog"
                      className="hover:text-orange-500 transition
                    font-semibold"
                    >
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/portfolio"
                      className="hover:text-orange-500 transition
                    font-semibold"
                    >
                      Portfolio
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/contact"
                      className="hover:text-orange-500 transition
                    font-semibold"
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4 text-lg">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <FaShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-orange-500 text-white 
                text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-background"
                >
                  {cartItems.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer border-2 border-orange-200 hover:border-orange-500 transition">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-2">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/account/booking")}
                  >
                    My Booking
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logoutUser}
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <MotionLink
                to="/login"
                aria-label="Login"
                
               
                className="group flex items-center gap-2 px-2 md:px-8 py-2 rounded-full text-black font-semibold text-lg transition-colors duration-300 ease-in-out bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] hover:bg-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                <CiUser size={22} className="transition-transform duration-300  motion-reduce:transition-none motion-reduce:transform-none" />
                <span className="hidden sm:inline">Login</span>
              </MotionLink>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  className="rounded-md cursor-pointer lg:hidden"
                >
                  <Menu size={28} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] max-w-xs bg-white">
                <SheetHeader>
                  <SheetTitle>
                    <img
                      src={blackLogo}
                      alt="DJ DMAX"
                      className="h-20 w-auto object-contain dark:hidden"
                    />
                    <img
                      src={whiteLogo}
                      alt="DJ DMAX"
                      className="hidden h-20 w-auto object-contain dark:block"
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4">
                  {[
                    { name: "Home", to: "/" },
                    { name: "Events", to: "/events" },
                    { name: "About", to: "/about" },
                    { name: "Gallery", to: "/gallary" },
                    { name: "Portfolio", to: "/portfolio" },
                    { name: "Blog", to: "/blog" },
                  ].map((item) => (
                    <SheetClose asChild key={item.to}>
                      <Link
                        to={item.to}
                        className="rounded-md px-3 py-3 font-semibold transition hover:bg-orange-50 hover:text-orange-500 dark:hover:bg-gray-800"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto border-t px-4 pt-5">
                  <SheetClose asChild>
                    <Link
                      to="/contact"
                      className="block w-full bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] px-4 py-3 text-center font-semibold text-black transition-colors duration-300 hover:bg-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                    >
                      Contact Us
                    </Link>
                  </SheetClose>
                  <div
                    aria-hidden="true"
                    className="flex justify-center gap-3 py-5 text-muted-foreground"
                  >
                    {[FaFacebookF, FaTwitter, FaLinkedinIn, FaVimeoV].map(
                      (Icon, index) => (
                        <span
                          key={index}
                          className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                        >
                          <Icon size={16} />
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {showCategorySheet && selectedCategory && (
        <div
          onMouseEnter={() => setShowCategorySheet(true)}
          onMouseLeave={handleCategoryLeave}
          className="absolute top-18 left-0 right-0 z-40 animate-slide-down origin-top"
        >
          <div className="max-w-7xl mx-auto px-10">
            <CategorySheet
              selectedCategory={selectedCategory}
              setShowSheet={setShowCategorySheet}
            />
          </div>
        </div>
      )}
    </>
  );
};

