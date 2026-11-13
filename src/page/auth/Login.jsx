import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await loginUser(values.email, values.password);
        toast.success("Login successful! Welcome back 🎉");
        navigate(from, { replace: true });
      } catch (error) {
        toast.error(error.message || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md border border-gray-200 bg-transparent ">
        <CardContent className="p-8">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-orange-500">DJDMAX</h1>
            <h2 className="text-xl font-semibold mt-2">Welcome Back</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/register")}
                className="text-orange-500 cursor-pointer hover:underline">
                Register here
              </span>
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <Label>Email *</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "focus-visible:ring-orange-500"
                }
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label>Password *</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "focus-visible:ring-orange-500"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Checkbox />
                <span>Remember me</span>
              </div>
              <span onClick={() => navigate("/forgot-password")} className="text-orange-500 cursor-pointer hover:underline">
                Forgot Password
              </span>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-lg text-white font-semibold shadow-md 
              bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] hover:bg-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 flex items-center justify-center 
              gap-2 cursor-pointer"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Logging In..." : "LOGIN"}
            </Button>
          </form>

          <Separator className="my-6" />

          {/* Google Auth */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 cursor-pointer "
            type="button"
            onClick={() => toast.info("Google authentication is not configured yet")}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

export default Login;