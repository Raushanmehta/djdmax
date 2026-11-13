import PageTopBar from "@/components/common/PageTopSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    gdpr: false,
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.message.trim()) newErrors.message = "Message is required"
    if (!formData.gdpr) newErrors.gdpr = "You must accept all policy"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess("")

    if (validate()) {
      setIsLoading(true)
      setTimeout(() => {
        console.log("Form submitted:", formData)
        setSuccess("Your message has been sent successfully!")
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          gdpr: false,
        })
        setIsLoading(false)
      }, 2000)
    }
  }

  return (
    <main className="w-full min-h-screen">
     <PageTopBar/>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 
      gap-20 relative z-10 ">
        <Card className="shadow-2xl   bg-transparent
        -mt-20 relative z-20 backdrop-blur-md ">
          <CardContent className="p-6 space-y-5">
            <h2 className="text-xl font-semibold">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div >
                <Label>Your Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <Label>Your Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <Label>Subject</Label>
                <Input
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Subject"
                />
              </div>

              <div>
                <Label>Your Message</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Write your message..."
                  rows={5}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gdpr"
                  checked={formData.gdpr}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, gdpr: !!checked })
                  }
                />
                <Label htmlFor="gdpr">
                  I consent to the processing of my personal data
                </Label>
              </div>

              {errors.gdpr && (
                <p className="text-red-500 text-sm">{errors.gdpr}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                variant="default"
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoading ? "Sending..." : "Send Message"}
              </Button>

              {success && (
                <p className="text-green-600 text-sm">{success}</p>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Get in Touch</h2>
          <h3 className="text-4xl font-bold">We’d love to hear from you</h3>
          <p className="text-gray-500">
            Chat with our sales & support team for quick answers on product
            features, pricing, and more.
          </p>
        </div>
      </div>
    </main>
  )
}