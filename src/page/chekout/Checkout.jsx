import { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCart from "../cart/PricingCart";
import { useCart } from "@/context/CartContext";
import { bookingAPI, paymentAPI } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const paymentGatewayList = [
  {
    value: "RAZORPAY",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
  },
  {
    value: "COD",
    image:
      "https://cdn-icons-png.flaticon.com/512/6491/6491490.png",
  },
];

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  // Event details for the whole order
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const { cartItems, clearCart } = useCart();

  const fetchAddresses = async () => {
    try {
      const res = await bookingAPI.getAddresses();
      setAddresses(res.data);
      if (res.data.length > 0 && !selectedAddress) {
        setSelectedAddress(res.data[0].id);
      }
    } catch (err) {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleCheckout = async () => {
    if (!selectedAddress) return toast.error("Please select an address");
    if (!eventDate || !startTime) return toast.error("Please provide event date and time");

    try {
      setCheckingOut(true);
      const res = await bookingAPI.createBulk({
        items: cartItems,
        addressId: selectedAddress,
        eventDate,
        startTime,
      });

      if (paymentGateway === "RAZORPAY") {
        // We'll just simulate/trigger razorpay for the total amount
        // In a real app, you'd probably create a single Payment record for the bulk order
        toast.info("Bulk payment integration pending - simulating success");
      }

      toast.success("Order placed successfully! 🎉");
      clearCart();
      // Redirect or show success
    } catch (err) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
      <div className="space-y-5 lg:grid lg:grid-cols-3 lg:gap-9">
        <div className="col-span-2 space-y-8">

          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl text-gray-800">
              Checkout
            </h1>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">Add New Address</Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-xl bg-white/95 backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle className="text-center">Add New Address</DialogTitle>
                  <DialogDescription className="text-center">
                    Fill in the details below to add a new booking address to your profile.
                  </DialogDescription>
                </DialogHeader>
                <AddressForm onSuccess={() => { setOpen(false); fetchAddresses(); }} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Address List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Select Booking Address</h2>
            {loading ? (
              <div className="flex justify-center p-10">
                <Loader2 className="animate-spin text-orange-500" />
              </div>
            ) : addresses.length === 0 ? (
              <div className="p-10 border-2 border-dashed rounded-lg text-center text-gray-500">
                No saved addresses found. Please add a new one.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {addresses.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    data={addr}
                    selectedId={selectedAddress}
                    onSelect={setSelectedAddress}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Order Preferences */}
          <div className="p-6 border rounded-xl space-y-4 bg-gray-50/50">
            <h2 className="font-semibold text-gray-800">Order Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Event Date</Label>
                <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Start Time</Label>
                <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-xl p-5 space-y-4 bg-white shadow-sm">
            <h3 className="text-center text-orange-600 font-bold text-sm uppercase tracking-wider">
              Payment Method
            </h3>

            <RadioGroup
              value={paymentGateway}
              onValueChange={setPaymentGateway}
              className="flex flex-col gap-3"
            >
              {paymentGatewayList.map((item) => (
                <div
                  key={item.value}
                  className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition ${paymentGateway === item.value ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}
                  onClick={() => setPaymentGateway(item.value)}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={item.value} id={item.value} />
                    <Label htmlFor={item.value} className="font-medium cursor-pointer">
                      {item.value === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
                    </Label>
                  </div>
                  <img src={item.image} alt={item.value} className="h-6 object-contain" />
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
            <PricingCart items={cartItems} />
            <div className="p-5 bg-gray-50/50">
              <Button
                onClick={handleCheckout}
                disabled={checkingOut || cartItems.length === 0}
                className="w-full py-7 text-lg bg-orange-500 hover:bg-orange-600 shadow-orange-200 shadow-lg"
              >
                {checkingOut ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Placing Order...
                  </>
                ) : (
                  `Pay ₹ ${cartItems.reduce((acc, i) => acc + (i.bookingPrice || 0), 0).toLocaleString()} `
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
