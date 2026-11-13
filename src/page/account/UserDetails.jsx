import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"

const UserDetails = () => {
  const { user, userLoading } = useAuth()

  if (userLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="animate-spin text-orange-500" size={28} />
      </div>
    )
  }

  const initials = user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"

  return (
    <div className="">
      <Card className="bg-transparent">
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-semibold bg-orange-100 text-orange-600">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h2 className="text-lg font-medium">{user?.name || "User"}</h2>
              <p className="text-sm font-medium text-muted-foreground">
                {user?.email || "—"}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                {user?.phone || "Phone not provided"}
              </p>
              <span className="inline-block text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
                {user?.role || "USER"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserDetails