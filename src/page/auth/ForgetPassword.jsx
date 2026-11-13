import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { FaEnvelope } from "react-icons/fa"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { authAPI } from "@/lib/api"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

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
                setLoading(true)
                setSuccess(false)

                const response = await authAPI.forgotPassword({ email: values.email })
                toast.success(response.message || "Reset link sent successfully 🚀")
                setSuccess(true)

            } catch (error) {
                toast.error(error.message || "Failed to send reset link")
            } finally {
                setLoading(false)
            }
        },
    })

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md border border-gray-200 bg-transparent ">
                <CardContent className="p-8">

                    <h1 className="text-4xl text-center font-bold text-orange-500 mb-3">
                        Forget Password
                    </h1>

                    <p className="text-gray-500 mb-8 text-center text-sm mt-1">
                        Enter your email to receive reset link
                    </p>

                    <form onSubmit={formik.handleSubmit}>

                        {/* Email */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">
                                Email
                            </label>

                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg 
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
        bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] hover:bg-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 flex items-center justify-center gap-2"
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

                    <p className="text-center text-gray-500 mt-6 text-sm">
                        Back to{" "}
                        <span onClick={() => navigate("/login")} className="text-orange-500 cursor-pointer hover:underline">
                            Login
                        </span>
                    </p>

                </CardContent>
            </Card>
        </div>
    )
}

export default ForgetPassword
