import React from 'react'
import { useNavigate } from 'react-router-dom';

const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/e/eb/Alfie%27s_DJ_Setup.jpg";

const SimilerEventCard = ({ event }) => {
  const navigate = useNavigate();

  if (!event) return null;

  const title = event.title || "Event Name";
  const categoryName = event.category?.name || "Category";
  const image = (event.images && event.images.length > 0) ? event.images[0] : FALLBACK_IMAGE;
  const bookingPrice = event.bookingPrice || 0;
  const mrpPrice = event.mrpPrice || 0;
  const discount = mrpPrice > bookingPrice
    ? Math.round(((mrpPrice - bookingPrice) / mrpPrice) * 100)
    : 0;

  const handleClick = () => {
    if (event.id && event.category?.id) {
      navigate(`/events-details/${event.category.id}/${event.category.name}/${event.id}`);
    }
  };

  return (
    <div
      className="group px-2 relative w-full cursor-pointer "
      onClick={handleClick}
    >
      <div className="relative w-full rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow ">
        <div className="w-full h-76 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <div className="details group-hover-effect pt-3 space-y-1 rounded-md w-full border border-gray-200">
        <div className="name">
          <h1 className="font-semibold text-sm truncate">{title}</h1>
          <p className="text-gray-500 text-xs">{categoryName}</p>
        </div>

        <div className="price flex items-center gap-3 text-sm">
          <span className="text-black font-bold">₹ {bookingPrice.toLocaleString()}</span>
          {discount > 0 && (
            <>
              <span className="line-through text-gray-400 text-xs">₹ {mrpPrice.toLocaleString()}</span>
              <span className="text-orange-600 font-semibold text-xs">{discount}% Off</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimilerEventCard;
