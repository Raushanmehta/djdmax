import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa"
import { Link } from "react-router-dom"
import blackLogo from "@/assets/logo/djdmax-logo-black-6.png"
import whiteLogo from "@/assets/logo/djdmax-logo-white-6.png"
import { IoMdMail } from "react-icons/io"
import { IoLocationSharp } from "react-icons/io5"
import { RiInstagramFill } from "react-icons/ri"

const footerData = {
  description:
    "We are a dynamic team of full stack developers and designers crafting high-quality web applications",
  socialLinks: [
    { name: "Facebook", icon: FaFacebookF },
    { name: "Instagram", icon: RiInstagramFill },
    { name: "LinkedIn", icon: FaLinkedinIn },
    { name: "YouTube", icon: FaYoutube },
  ],
  sections: [
    {
      title: "Services",
      items: [
        { label: "Events", path: "/events" },
        { label: "My Account", path: "/account" },
        { label: "Booking History", path: "/account/booking" },
        { label: "Booking Cancellation", path: "/account/booking" },
      ],
    },
    {
      title: "Quick Links",
      items: [
        { label: "Home", path: "/" },
       
        { label: "About Us", path: "/about" },
        { label: "Gallery", path: "/gallery" },
        { label: "Portfolio", path: "/portfolio" },
        { label: "Blogs", path: "/blogs" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "FAQs", path: "/faqs" },
        { label: "Refund Policy", path: "/refund-policy" },
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Cancellation Policy", path: "/cancellation-policy" },
        { label: "Terms & Conditions", path: "/terms-and-conditions" },
      ],
    },
  ],
  contact: {
    title: "Contact Us",
    phone: "+91 9852242500",
    email: "djdmax8055@gmail.com",
    locationTitle: "Headbranch",
    address:
      "Kamaldah Path, Bypass Road, Navnit Nagar, deepnagar, Jogi colony, Patna, Bihar 800008",
  },
  copyright: {
    year: 2026,
    site: "djdmax.in",
    developer: "raushanmehta.in",
  },
  paymentMethods: [
    {
      name: "PayPal",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
  ],
};

const Footer = () => {
  return (
    <footer className="shadow pt-14 px-4 border-t border-gray-200 dark:border-gray-800 ">
      <div className="max-w-[1330px] mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-6">
          <div>
            <Link to="/" aria-label="DJ DMAX home" className=" inline-block">
              <img
                src={blackLogo}
                alt=""
                className="h-20 w-auto object-contain dark:hidden"
              />
              <img
                src={whiteLogo}
                alt=""
                className="hidden h-20 w-auto object-contain dark:block"
              />
            </Link>

            <p className="text-gray-500 leading-7 mb-6 dark:text-gray-300">
              {footerData.description}
            </p>

            <div className="flex gap-3">
              {footerData.socialLinks.map(({ icon: Icon, name }) => (
                <div
                  key={name}
                  className="w-10 h-10 border border-gray-300  flex items-center justify-center dark:text-gray-300 
                   text-gray-500 hover:bg-black hover:text-white dark:hover:bg-orange-500 dark:hover:text-white cursor-pointertransition"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {footerData.sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-md lg:text-lg font-semibold uppercase mb-6 dark:text-orange-500">
                {section.title}
              </h4>
              <ul className="space-y-3 text-gray-500 dark:text-gray-300">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="hover:text-orange-500"
                    >
                      <span className="text-orange-500">•</span> {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-md lg:text-lg font-semibold uppercase mb-6 dark:text-orange-500">
              {footerData.contact.title}
            </h4>

            <h3 className="mb-4 flex items-center gap-3 ">
              <span className="flex w-5 shrink-0 justify-center text-orange-500">
                <FaPhoneAlt size={18} />
              </span>
              <span className="text-gray-500 dark:text-gray-300">
                {footerData.contact.phone}
              </span>
            </h3>

            <div className="flex items-center gap-3 text-gray-600 mb-4">
              <span className="flex w-5 shrink-0 justify-center text-orange-500">
                <IoMdMail size={18} />
              </span>
              <span className="text-gray-500 dark:text-gray-300">
                {footerData.contact.email}
              </span>
            </div>

            <div className="flex items-start gap-3 text-gray-600">
              <span className="flex w-5 shrink-0 justify-center text-orange-500">
                <IoLocationSharp size={24} />
              </span>
              <span className="leading-6 dark:text-gray-300">
                {footerData.contact.locationTitle}
                <br />
                {footerData.contact.address}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800  mt-8"></div>

        <div className="flex flex-col md:flex-row  md:justify-between items-center
        py-6 text-gray-500 text-sm">

          <p className="text-center md:text-left">
            © {footerData.copyright.year} All Rights Reserved by{" "}
            {footerData.copyright.site}{" "}
            <span>Developed by {footerData.copyright.developer}</span>
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">

            {footerData.paymentMethods.map((method) => (
              <img
                key={method.name}
                src={method.image}
                alt={method.name}
                className="h-6"
              />
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer