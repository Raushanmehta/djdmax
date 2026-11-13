import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookingAPI, paymentAPI } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const AddressForm = ({ eventId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const initialValues = {
    venueName: "",
    venueAddress: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    eventDate: "",
    startTime: "",
    endTime: "",
  };

  const validationSchema = Yup.object({
    venueName: Yup.string().required("Venue name is required"),
    venueAddress: Yup.string().required("Venue address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string().required("Pincode is required"),
    phone: eventId
      ? Yup.string().matches(/^[6-9]\d{9}$/, "Invalid mobile number").required("Mobile is required")
      : Yup.string(),
    eventDate: eventId
      ? Yup.date().required("Event date is required").min(new Date(), "Date must be in the future")
      : Yup.string().nullable(),
    startTime: eventId
      ? Yup.string().required("Start time is required")
      : Yup.string().nullable(),
  });

  const handleRazorpayPayment = async (bookingId, amount) => {
    try {
      const orderData = await paymentAPI.createRazorpayOrder({ bookingId });
      const order = orderData.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_IgsDqpDNmuUzNX",
        amount: order.amount,
        currency: order.currency,
        name: "DJDMAX",
        description: "Event Booking",
        order_id: order.id,
        handler: async (response) => {
          try {
            await paymentAPI.verifyRazorpay({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId,
            });
            toast.success("Payment successful! Booking confirmed 🎉");
            onSuccess?.();
          } catch {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Customer",
        },
        theme: { color: "#f97316" },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error("Razorpay not loaded. Please refresh the page.");
      }
    } catch (err) {
      toast.error(err.message || "Failed to initiate payment");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (!eventId) {
        // Just save address for the user (Checkout Page scenario)
        await bookingAPI.saveAddress({
          venueName: values.venueName,
          venueAddress: values.venueAddress,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
          phone: values.phone,
        });
        toast.success("Address saved successfully! 🎉");
        onSuccess?.();
        return;
      }

      // Full booking flow (Event Details Page scenario)
      // Create booking
      const bookingData = await bookingAPI.create({
        eventId,
        eventDate: values.eventDate,
        startTime: values.startTime,
        endTime: values.endTime || "",
        venueName: values.venueName,
        venueAddress: values.venueAddress,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        phone: values.phone,
      });

      const bookingId = bookingData.data.id;
      const amount = bookingData.amount;

      if (paymentMethod === "razorpay") {
        await handleRazorpayPayment(bookingId, amount);
      } else if (paymentMethod === "cod") {
        await paymentAPI.confirmCOD({ bookingId });
        toast.success("Booking confirmed with Cash on Delivery! 🎉");
        onSuccess?.();
      }
    } catch (err) {
      toast.error(err.message || "Action failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full bg-transparent shadow-none">
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-5">

                {/* Phone - ALWAYS shown as contact info */}
                <div>
                  <Field
                    as={Input}
                    name="phone"
                    placeholder="Contact Mobile Number"
                  />
                  <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
                </div>


                {/* Venue Details - ALWAYS shown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Field as={Input} name="venueName" placeholder="Venue Name" />
                    <ErrorMessage name="venueName" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <Field as={Input} name="city" placeholder="City" />
                    <ErrorMessage name="city" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <Field as={Input} name="state" placeholder="State" />
                    <ErrorMessage name="state" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <Field as={Input} name="pincode" placeholder="Pincode" />
                    <ErrorMessage name="pincode" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Field
                      as={Textarea}
                      name="venueAddress"
                      placeholder="Full Venue Address"
                    />
                    <ErrorMessage name="venueAddress" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                {/* Event Date & Time - Only for full booking */}
                {eventId && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Event Date</label>
                      <Field as={Input} type="date" name="eventDate" />
                      <ErrorMessage name="eventDate" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Start Time</label>
                      <Field as={Input} type="time" name="startTime" />
                      <ErrorMessage name="startTime" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">End Time (optional)</label>
                      <Field as={Input} type="time" name="endTime" />
                    </div>
                  </div>
                )}

                {/* Payment Method - Only for full booking */}
                {eventId && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Payment Method</label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Payment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="razorpay">Razorpay (Online)</SelectItem>
                        <SelectItem value="cod">Pay on Delivery (COD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full py-6 bg-gradient-to-tl from-[#c2410c] via-[#f97316] to-[#fdba74] text-white font-semibold"
                  disabled={loading}
                >
                  {loading && <Loader2 className="animate-spin mr-2" size={16} />}
                  {loading ? "Processing..." : (eventId ? "Confirm Booking" : "Save Address")}
                </Button>

              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressForm;