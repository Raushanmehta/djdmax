import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UpcomingEventCard from "../components/cards/UpcomingEventCard";
import { bookingAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const UpcomingEventSection = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        setLoading(true);
        const data = await bookingAPI.getUpcomingPublic();
        setBookings(data.data || []);
      } catch (error) {
        console.error("Error fetching upcoming confirmed bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  const settings = {
    dots: true,
    infinite: bookings.length > 5,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: "20px"
        }
      }
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  if (bookings.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[1350px] mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <span className="text-4xl font-bold text-orange-400">|</span>
          <h2 className="font-bold text-2xl sm:text-3xl">
            Live Upcoming Shows
          </h2>
        </div>

        <div className="overflow-hidden">
          <Slider {...settings}>
            {bookings.map((booking) => (
              <div key={booking.id} className="px-2 sm:px-2 pb-8">
                <UpcomingEventCard booking={booking} />
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
};

export default UpcomingEventSection;