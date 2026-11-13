import { Separator } from "@/components/ui/separator";


const PricingCart = ({ items = [] }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.mrpPrice || item.bookingPrice || 0), 0);
  const totalAmount = items.reduce((acc, item) => acc + (item.bookingPrice || 0), 0);
  const discount = subtotal - totalAmount;

  return (
    <>
      <div className="space-y-3 p-5 text-sm font-medium text-gray-500 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <span>Subtotal ({items.length} items)</span>
          <span>₹ {subtotal.toLocaleString()}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span>Discount</span>
            <span className="text-green-600">- ₹ {discount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span>Platform Fee</span>
          <span className="text-orange-500 font-bold italic">FREE</span>
        </div>
      </div>

      <div className="flex justify-between items-center p-5 font-bold text-xl text-gray-900">
        <span>Total Amount</span>
        <span>₹ {totalAmount.toLocaleString()}</span>
      </div>
    </>
  );
};

export default PricingCart;