import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEnvelope } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "@/lib/api";
import { toast } from "sonner";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);
        setSuccess(false);

        const response = await adminAPI.forgotPassword({ email: values.email });
        toast.success(response.message || "Reset link sent successfully 🚀");
        setSuccess(true);
      } catch (error) {
        toast.error(error.message || "Failed to send reset link");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-100 via-orange-50 to-orange-200">
      {/* LEFT SIDE */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center 
            px-8 py-12  z-10"
      >
        <div className="w-full max-w-md">
          <h1 className="text-4xl text-center font-bold text-orange-500 mb-3">
            Forget Password
          </h1>

          <p className="text-gray-500 mb-8 text-center">
            Enter your email to receive reset link
          </p>

          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Email</label>

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full pl-10 pr-4 py-3 border
                                     border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-lg text-white font-semibold shadow-md 
              bg-gradient-to-tl from-[#c2410c] via-[#f97316] to-[#fdba74] 
              hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Sending..." : "SEND RESET LINK"}
            </Button>
          </form>

          {/* Success Message */}
          {success && (
            <p className="text-green-600 text-center mt-6 font-medium">
              Reset link sent successfully 🚀
            </p>
          )}

          <p className="text-center text-gray-500 mt-6">
            Back to{" "}
            <span
              onClick={() => navigate("/admin/login")}
              className="text-orange-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <img
            src="https://i.pinimg.com/736x/fd/73/06/fd7306a508638fabdc81342b0ad7b256.jpg"
            alt="reset"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
