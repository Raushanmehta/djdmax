import { useEffect, useState } from "react";
import "./EventCard.css";
import { Button } from "@/components/ui/button";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGES = [
    "https://upload.wikimedia.org/wikipedia/commons/e/eb/Alfie%27s_DJ_Setup.jpg",
    "https://www.myoneofakindevent.com/wp-content/uploads/2024/04/creative-dj-setup.jpg",
    "https://cdn11.bigcommerce.com/s-r9zkgbz1w3/images/stencil/790x790/uploaded_images/image266.jpg?t=1727245397"
];

const EventCard = ({ event }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    // Use real event images or fallback to demo images
    const images = (event?.images?.length > 0) ? event.images : FALLBACK_IMAGES;
    const title = event?.title || "Event Title";
    const category = event?.category?.name || "";
    const bookingPrice = event?.bookingPrice || 499;
    const mrpPrice = event?.mrpPrice || 999;
    const discount = mrpPrice > bookingPrice
        ? Math.round(((mrpPrice - bookingPrice) / mrpPrice) * 100)
        : 0;

    useEffect(() => {
        let interval = null;

        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % images.length);
            }, 1000);
        } else {
            setCurrentImage(0);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovered, images.length]);

    const handleCardClick = () => {
        if (event?.id && event?.category?.id) {
            navigate(`/events-details/${event.category.id}/${event.category.name}/${event.id}`);
        }
    };

    return (
        <div className="group px-4 relative cursor-pointer" onClick={handleCardClick}>
            <div
                className="card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {images.map((item, index) => (
                    <img
                        key={index}
                        src={item}
                        alt={`${title}-${index}`}
                        className="card-media object-top"
                        style={{
                            transform: `translateX(${(index - currentImage) * 100}%)`
                        }}
                    />
                ))}
                {isHovered && (
                    <div className="indicator absolute inset-0 flex items-center 
                    justify-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-3">
                            <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full"
                            >
                                <FaHeart className="text-red-500" />
                            </Button>

                            <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (event?.id && event?.category?.id) {
                                        navigate(`/events-details/${event.category.id}/${event.category.name}/${event.id}`);
                                    }
                                }}
                            >
                                <FaCommentDots className="text-blue-500" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <div className="details pt-3 space-y-1 group-hover-effect rounded-md border border-gray-500">
                <div className="name">
                    <h1 className="font-medium text-sm truncate">{title}</h1>
                    <p className="text-xs text-muted-foreground">{category}</p>
                </div>
                <div className="price flex items-center gap-3">
                    <span className="font-semibold text-black">
                        ₹ {bookingPrice.toLocaleString()}
                    </span>
                    {discount > 0 && (
                        <>
                            <span className="line-through text-gray-400 text-sm">
                                ₹ {mrpPrice.toLocaleString()}
                            </span>
                            <span className="text-primary-color font-semibold text-sm text-orange-500">
                                {discount}% Off
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
