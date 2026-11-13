"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams, useNavigate } from "react-router-dom";
import { categoryAPI } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  FaStar,
  FaShoppingCart,
  FaRegHeart,
  FaShieldAlt,
  FaWallet,
} from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import SimilerEvent from "./SimilerEvent";
import ReviewCard from "../review/ReviewCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddressForm from "../chekout/AddressForm";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import EventReviewSection from "./EventReviewSection";


const EventDetails = () => {
  const { eventId, categoryId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (!categoryId) return;
    categoryAPI.getOne(categoryId)
      .then((data) => {
        const events = data.data?.events || [];
        const found = events.find(e => e.id === eventId);
        if (found) {
          setEvent({ ...found, category: data.data });
        }
      })
      .catch(() => toast.error("Failed to load event"))
      .finally(() => setLoading(false));
  }, [categoryId, eventId]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-24 text-muted-foreground">
        <p className="text-xl font-semibold">Event not found</p>
      </div>
    );
  }

  const images = event.images?.length > 0 ? event.images : [
    "https://beaweddingdj.com/wp-content/uploads/2020/01/what-events-can-djs-do-scaled-e1582069874762.jpg"
  ];

  const discount = event.mrpPrice > event.bookingPrice
    ? Math.round(((event.mrpPrice - event.bookingPrice) / event.mrpPrice) * 100)
    : 0;

  const avgRating = event.avgRating || 0;

  const handleAddToCart = () => {
    addToCart({
      id: event.id,
      title: event.title,
      description: event.description,
      bookingPrice: event.bookingPrice,
      mrpPrice: event.mrpPrice,
      images: event.images,
      categoryId: categoryId
    });
    toast.success("Event added to cart!");
    navigate("/cart");
  };

  const handleBookClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book this event");
      navigate("/login");
      return;
    }
    setBookingOpen(true);
  };

  return (
    <div className="px-5 lg:px-24 pt-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:pb-10">

        {/* Image gallery */}
        <section className="flex flex-col lg:flex-row gap-5 sticky top-0">
          <div className="w-full lg:w-[20%] flex flex-wrap lg:flex-col gap-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                className={`lg:w-full w-[48%] rounded-md cursor-pointer border-2 transition ${mainImage === index ? "border-orange-500" : "border-transparent"
                  }`}
                alt={`event-thumb-${index}`}
                onClick={() => setMainImage(index)}
              />
            ))}
          </div>

          <div className="w-full lg:w-[85%]">
            <img
              src={images[mainImage]}
              alt={event.title}
              className="w-full rounded-md object-cover border"
            />
          </div>
        </section>

        {/* Info */}
        <section>
          <h1 className="text-2xl font-medium">{event.title}</h1>

          <p className="text-muted-foreground font-semibold mt-1">
            {event.description}
          </p>

          {/* Rating Box */}
          {avgRating > 0 && (
            <div className="flex justify-between items-center py-2 border border-gray-500
            rounded-md w-[150px] px-3 mt-5">
              <div className="flex gap-1 items-center">
                <span>{avgRating.toFixed(1)}</span>
                <FaStar className="text-orange-500 text-sm" />
              </div>
              <Separator orientation="vertical" />
              <span className="text-sm">{event.totalReviews} Ratings</span>
            </div>
          )}

          {/* Price */}
          <div className="mt-5">
            <div className="flex items-center gap-3 text-xl">
              <span className="font-semibold">₹ {event.bookingPrice?.toLocaleString()}</span>
              {discount > 0 && (
                <>
                  <span className="line-through text-gray-500">₹ {event.mrpPrice?.toLocaleString()}</span>
                  <span className="text-red-500 font-semibold">{discount}% Off</span>
                </>
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              Inclusive of all taxes.
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-7 space-y-3 text-muted-foreground">
            <div className="flex items-center gap-4">
              <FaShieldAlt className="text-orange-500" />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <MdWorkspacePremium className="text-orange-500" />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <FiTruck className="text-orange-500" />
              <p>On-time Service Guaranteed</p>
            </div>
            <div className="flex items-center gap-4">
              <FaWallet className="text-orange-500" />
              <p>Multiple payment options available</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-12 flex flex-col items-center gap-5">
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
              <Button
                className="w-full py-6 bg-gradient-to-tl from-[#c2410c] via-[#f97316] to-[#fdba74] text-white font-semibold"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="mr-2" />
                ADD TO CART
              </Button>
              <DialogContent className="w-full max-w-2xl bg-white/90 backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle className="text-center">Book Event: {event.title}</DialogTitle>
                  <DialogDescription className="text-center">
                    Please provide the venue and timing details to proceed with your booking.
                  </DialogDescription>
                </DialogHeader>
                <AddressForm eventId={event.id} onSuccess={() => setBookingOpen(false)} />
              </DialogContent>
            </Dialog>

            <Button 
                className="w-full py-6 bg-black text-orange-500 hover:text-white hover:bg-orange-500"
                onClick={handleBookClick}
            >
              <h1 className="mr-2" />
              CHECK NOW
            </Button>
          </div>
          <div>

          </div>
          {/* Rich text details */}
          {/* {event.details && (
            <div className="mt-8">
              <h3 className="font-semibold mb-2 text-gray-700">Event Details</h3>
              <div
                className="text-muted-foreground prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: event.details }}
              />
            </div>
          )} */}

          {/* Reviews */}
          {/* <div className="mt-12 space-y-5">
            <h3 className="font-semibold text-gray-700">Customer Reviews</h3>
            <ReviewCard eventId={event.id} />
            <Separator />
          </div> */}
        </section>
      </div>


      <div className="w-full mt-20 border-t border-gray-200">
        <EventReviewSection event={event} />
      </div>

      {/* Similar Events */}
      <div className="mt-20">
        <h1 className="text-gray-700 text-lg font-semibold mt-5">
          SIMILAR EVENTS
        </h1>
        <div className="my-5">
          <SimilerEvent categoryId={categoryId} currentEventId={eventId} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;