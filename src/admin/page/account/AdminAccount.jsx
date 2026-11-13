import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPen, FaTwitter } from "react-icons/fa"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { adminAPI } from "@/lib/api"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"
import AdminLoginLogsTable from "./AdminLoginLogsTable"

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-400 mb-1">{label}</p>
    <p className="font-medium text-gray-700">{value || "—"}</p>
  </div>
)

const SocialIcon = ({ icon }) => (
  <div className="w-9 h-9 flex items-center justify-center 
  rounded-full border border-gray-200 text-gray-600 
  hover:bg-gray-100 cursor-pointer transition">
    {icon}
  </div>
)

const AdminAccount = () => {
  const { admin } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminAPI.getProfile()
      .then((data) => setProfile(data.data))
      .catch(() => toast.error("Failed to load admin profile"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    )
  }

  const initials = admin?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "A"

  return (
    <div className="">
      <div className="mx-auto space-y-6">
        <h2 className="text-2xl font-semibold mb-6">Profile</h2>

        <Card className="bg-white border border-gray-200">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {profile?.profile?.avatar ? (
                <img
                  src={profile.profile.avatar}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg font-semibold bg-orange-100 text-orange-600">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {admin?.name || profile?.name || "Admin"}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  {profile?.profile?.bio || "Admin | DJDMAX"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <SocialIcon icon={<FaFacebookF />} />
                <SocialIcon icon={<FaTwitter />} />
                <SocialIcon icon={<FaLinkedinIn />} />
                <SocialIcon icon={<FaInstagram />} />
              </div>

              <Button
                className="rounded-full flex items-center gap-2 border
                border-orange-400 hover:bg-orange-500"
              >
                <FaPen size={12} />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
            <h3 className="font-semibold">Personal Information</h3>
            <Button
              size="sm"
              className="rounded-full flex items-center gap-2 border
                border-orange-400 hover:bg-orange-500"
            >
              <FaPen size={12} />
              Edit
            </Button>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 pt-4 text-sm">
            <Info label="Full Name" value={admin?.name || profile?.name} />
            <Info label="Email address" value={admin?.email || profile?.email} />
            <Info label="Phone" value={profile?.profile?.phoneNumber} />
            <Info label="Bio" value={profile?.profile?.bio} />
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
            <h3 className="font-semibold">Address</h3>
            <Button
              size="sm"
              className="rounded-full flex items-center gap-2 border
                border-orange-400 hover:bg-orange-500"
            >
              <FaPen size={12} />
              Edit
            </Button>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 pt-4 text-sm">
            <Info label="Address" value={profile?.profile?.address} />
          </CardContent>
        </Card>

        <AdminLoginLogsTable logs={profile?.loginLogs || []} />
      </div>
    </div>
  )
}

export default AdminAccount
