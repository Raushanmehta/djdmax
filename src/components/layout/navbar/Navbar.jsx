import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { mainCategory } from "@/data/category/mainCategory";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const MotionLink = motion(Link);

export default function Navbar() {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

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
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm ">
        <nav className="flex justify-between items-center px-6 lg:px-24 h-20 ">
          <Link
            to="/"
            className="text-4xl font-bold text-[#FF7E29] tracking-wide"
          >
            DJ DMAX
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
            <ThemeToggle />

            <Link
              to="/cart"
              className="relative p-3 rounded-full hover:bg-gray-100 transition"
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
                <DropdownMenuContent align="end" className="w-56 mt-2">
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
                whileHover={shouldReduceMotion ? undefined : {
    
                  boxShadow: "0 10px 24px rgba(255, 90, 31, 0.3)",
                }}
               
                className="group flex items-center gap-2 px-8 py-2 rounded-full text-black font-semibold text-lg transition-colors duration-300 ease-in-out bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] hover:bg-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                <CiUser size={22} className="transition-transform duration-300  motion-reduce:transition-none motion-reduce:transform-none" />
                Login
              </MotionLink>
            )}
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

