import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar } from 'lucide-react'

const FALLBACK_IMAGE = "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00312421-mzmjfachrd-portrait.jpg";

const UpcomingEventCard = ({ booking }) => {
    const navigate = useNavigate();

    if (!booking) return null;

    const event = booking.event;
    const address = booking.address;

    const title = event?.title || "Upcoming Show";
    const coverImage = (event?.images && event.images.length > 0) ? event.images[0] : FALLBACK_IMAGE;

    const eventDate = new Date(booking.eventDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    const handleClick = () => {
        if (event?.id && event?.category?.id) {
            navigate(`/events-details/${event.category.id}/${event.category.name}/${event.id}`);
        }
    };

    return (
        <div
            className="relative shadow-lg rounded-xl w-full h-[370px] overflow-hidden group cursor-pointer border border-gray-100"
            onClick={handleClick}
        >
            <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            <div className="absolute top-4 left-4">
                <span className="text-[10px] bg-green-500 text-white px-2 py-1 rounded-md font-bold uppercase tracking-widest shadow-lg">
                    Confirmed
                </span>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                <h3 className="font-bold text-xl truncate mb-2 group-hover:text-orange-400 transition-colors">
                    {title}
                </h3>

                <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-200">
                        <Calendar size={14} className="text-orange-400" />
                        <span>{eventDate}</span>
                        <span className="mx-1">&bull;</span>
                        <span>{booking.startTime}</span>
                    </div>

                    {/* <div className="flex items-center gap-2 text-xs text-gray-200">
                        <MapPin size={14} className="text-orange-400" />
                        <span className="truncate">{address?.venueName}, {address?.city}</span>
                    </div> */}
                </div>

                {/* <div className="mt-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">
                        View Details &rarr;
                    </p>
                </div> */}
            </div>
        </div>
    )
}

export default UpcomingEventCard