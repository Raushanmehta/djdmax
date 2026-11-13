import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { FaLock } from "react-icons/fa"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { authAPI } from "@/lib/api"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { token } = useParams()

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },

        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm password is required"),
        }),

        onSubmit: async (values) => {
            try {
                setLoading(true)

                const response = await authAPI.resetPassword(token, { password: values.password })
                toast.success(response.message || "Password reset successfully 🚀")
                navigate("/login")

            } catch (error) {
                toast.error(error.message || "Failed to reset password")
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
                        Reset Password
                    </h1>

                    <p className="text-gray-500 mb-8 text-center text-sm">
                        Enter your new password
                    </p>

                    <form onSubmit={formik.handleSubmit}>

                        {/* Password */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">
                                New Password
                            </label>

                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="New Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>

                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm mt-2">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">
                                Confirm Password
                            </label>

                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-2">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-6 rounded-lg text-white font-semibold shadow-md 
        bg-gradient-to-tl from-[#c2410c] via-[#f97316] to-[#fdba74] 
        hover:opacity-90 transition bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] hover:bg-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="animate-spin" size={18} />}
                            {loading ? "Resetting..." : "RESET PASSWORD"}
                        </Button>

                    </form>

                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPassword
