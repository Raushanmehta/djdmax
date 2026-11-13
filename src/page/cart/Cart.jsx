import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

import { FiTag, FiX, FiHeart, FiShoppingCart } from "react-icons/fi";
import PricingCart from "./PricingCart";
import CartItem from "./CartItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  const navigate = useNavigate();

  const handleApply = () => {
    if (couponCode.trim() !== "") {
      setIsApplied(true);
    }
  };

  const handleRemoveCoupon = () => {
    setIsApplied(false);
    setCouponCode("");
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4 px-5">
        <div className="bg-orange-50 p-6 rounded-full">
          <FiShoppingCart className="text-orange-500 h-16 w-16" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
        <p className="text-gray-500 text-center max-w-sm">
          Looks like you haven't added any events yet. Explore our top DJs and events to get started!
        </p>
        <Button onClick={() => navigate("/events")} className="px-10 py-6 text-lg">
          Browse Events
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
            />
          ))}
        </div>


        <div className="space-y-4 text-sm">
          <Card className="shadow-sm bg-white/50 backdrop-blur-sm border-gray-200">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <FiTag className="text-orange-500" size={18} />
                <span>Apply Coupon</span>
              </div>

              {!isApplied ? (
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon Code"
                    className="focus:ring-orange-500"
                  />
                  <Button onClick={handleApply}>
                    Apply
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-md px-3 py-2">
                  <span className="text-green-700 font-medium">
                    {couponCode} Applied
                  </span>
                  <button onClick={handleRemoveCoupon}>
                    <FiX className="text-orange-500 hover:text-orange-600" size={18} />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-white/50 backdrop-blur-sm border-gray-200 overflow-hidden">
            <CardContent className="p-0">
              <PricingCart items={cartItems} />

              <div className="p-5 bg-gray-50/50">
                <Button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-7 text-lg shadow-md bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </CardContent>
          </Card>


          {/* <Card className="shadow-sm bg-white/50 backdrop-blur-sm border-gray-200 hover:border-orange-200 transition">
            <CardContent className="flex justify-between items-center p-5 cursor-pointer group">
              <p className="text-gray-600 font-medium group-hover:text-orange-600 transition">
                Add from wishlist
              </p>
              <FiHeart className="text-orange-500 group-hover:fill-orange-500 transition" size={18} />
            </CardContent>
          </Card> */}

        </div>
      </div>
    </div>
  );
};

export default Cart;