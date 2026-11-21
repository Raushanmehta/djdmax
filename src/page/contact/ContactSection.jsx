import { createElement, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF },
  { name: "Instagram", icon: RiInstagramFill },
  { name: "LinkedIn", icon: FaLinkedinIn },
  { name: "YouTube", icon: FaYoutube },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    gdpr: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.gdpr) newErrors.gdpr = "You must accept all policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        console.log("Form submitted:", formData);
        setSuccess("Your message has been sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          gdpr: false,
        });
        setIsLoading(false);
      }, 2000);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-10 md:py-16 lg:py-20 px-4">
      <div className="max-w-[1330px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10 ">
        <div className="space-y-4">
          <p className="text-md font-semibold uppercase text-orange-500 dark:text-white">
            Get in Touch
          </p>
          {/* Heading */}
          <div className="">
            <h1 className="testimonial-display text-gray-900 dark:text-white text-[clamp(2rem,4vw,5.75rem)] leading-[0.92]">
              We’ love to hear from
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Chat with our sales & support team for quick answers on product
            features, pricing, and more.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Chat with our sales & support team for quick answers on product
            features, pricing, and more.
          </p>
          <div className="space-y-4 pt-2">
            <a
              href="tel:+919852242500"
              className="flex items-center gap-3 text-gray-700 transition-colors hover:text-orange-500 dark:text-gray-300"
            >
              <FaPhoneAlt className="h-10 w-10 shrink-0 rounded-full bg-orange-100 p-2.5 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 md:h-12 md:w-12" />
              <span>+91 9852242500</span>
            </a>
            <a
              href="mailto:djdmax8055@gmail.com"
              className="flex items-center gap-3 text-gray-700 transition-colors hover:text-orange-500 dark:text-gray-300"
            >
              <MdEmail className="h-10 w-10 shrink-0 rounded-full bg-orange-100 p-2.5 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 md:h-12 md:w-12" />
              <span>djdmax8055@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <IoLocationSharp className="h-10 w-10 shrink-0 rounded-full bg-orange-100 p-2.5 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 md:h-12 md:w-12" />
              <address className=" not-italic">
                Headbranch, Kamaldah Path, Bypass Road, Navnit Nagar, Deepnagar,
                Jogi Colony, Patna, Bihar 800008
              </address>
            </div>
          </div>
          <div className="pt-2">
            <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(({ name, icon }) => (
                <div
                  key={name}
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-500 transition-colors hover:bg-black hover:text-white dark:text-gray-300 dark:hover:bg-orange-500 dark:hover:text-white"
                >
                  {createElement(icon, { size: 18 })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className=" bg-transparent relative backdrop-blur-md ">
          <CardContent className=" space-y-5">
            <h2 className="text-xl text-center uppercase font-semibold">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                  />
                </div>
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
                className="w-full  bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] px-8 py-3 text-lg font-semibold text-black transition-colors duration-300 ease-in-out hover:bg-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                disabled={isLoading}
                variant="ghost"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Sending..." : "Send Message"}
              </Button>

              {success && <p className="text-green-600 text-sm">{success}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
