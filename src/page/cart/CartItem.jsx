import { Button } from "@/components/ui/button";
import { FiX } from "react-icons/fi";

const CartItem = ({ item, onRemove }) => {
  const images = item.images?.length > 0 ? item.images : [
    "https://beaweddingdj.com/wp-content/uploads/2020/01/what-events-can-djs-do-scaled-e1582069874762.jpg"
  ];

  return (
    <div className="border border-gray-500 rounded-md relative bg-white/50 backdrop-blur-sm">

      {/* Top Section */}
      <div className="p-5 flex gap-4 border-b border-gray-200">
        <div className="flex-shrink-0">
          <img
            className="w-[120px] h-[120px] rounded-md object-cover border"
            src={images[0]}
            alt={item.title}
          />
        </div>

        <div className="flex-1 space-y-1">
          <h1 className="font-semibold text-gray-800 text-lg">
            {item.title}
          </h1>
          <p className="text-gray-500 text-sm line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <p className="text-orange-600 font-bold text-xl">
              ₹ {item.bookingPrice?.toLocaleString()}
            </p>
            {item.mrpPrice > item.bookingPrice && (
              <p className="text-gray-400 line-through text-sm">
                ₹ {item.mrpPrice?.toLocaleString()}
              </p>
            )}
          </div>
          <p className="text-xs text-green-600 font-medium">Service protection available</p>
        </div>
      </div>

      <div className="flex justify-between items-center p-4">
        <div className="text-xs text-muted-foreground">
          Event ID: <span className="font-mono">{item.id?.slice(0, 8)}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 transition"
          onClick={() => onRemove(item.id)}
        >
          Remove Item
        </Button>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
      >
        <FiX size={18} />
      </button>
    </div>
  );
};

export default CartItem;