import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaVimeoV,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa"
import { Link } from "react-router-dom"
import blackLogo from "@/assets/logo/djdmax-logo-black-6.png"
import whiteLogo from "@/assets/logo/djdmax-logo-white-6.png"

const Footer = () => {
  return (
    <footer className="shadow  pt-14 px-4 ">
      <div className="max-w-[1330px] mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-6">
          <div>
            <Link to="/" aria-label="DJ DMAX home" className="mb-6 inline-block">
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

            <p className="text-gray-600 leading-7 mb-6">
              We are a dynamic team of full stack developers and
              designers crafting high-quality web applications
            </p>

            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaVimeoV].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 border flex items-center justify-center
                   text-gray-600 hover:bg-black hover:text-white 
                   transition cursor-pointer"
                >
                  <Icon size={14} />
                </div>
              ))}
            </div>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-xl font-semibold mb-6">My Account</h4>
            <ul className="space-y-3 text-gray-600">
              {[
                "Events",
                "Track Booking",
                "My Account",
                "Booking History",
                "Booking Cancellation",
              ].map((item, i) => (
                <li key={i} className="hover:text-orange-500 cursor-pointer">
                  <span className="text-orange-500">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Information</h4>
            <ul className="space-y-3 text-gray-600">
              {[
                "Our Story",
                "Careers",
                "Privacy Policy",
                "Terms & Conditions",
                "Contact Us",
              ].map((item, i) => (
                <li key={i} className="hover:text-orange-500 cursor-pointer">
                 <span className="text-orange-500"> • </span>{item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Talk To Us</h4>

            <p className="text-gray-500 mb-2">Got Questions? Call us</p>

            <h3 className="text-2xl font-bold mb-4">+966 595 035 008</h3>

            <div className="flex items-center gap-3 text-gray-600 mb-4">
              <FaEnvelope />
              <span>djdmax@gmail.com</span>
            </div>

            <div className="flex items-start gap-3 text-gray-600">
              <FaMapMarkerAlt className="mt-1" />
              <span>
                Headbranch
                <br />
                patna bihar
              </span>
            </div>
          </div>
        </div>

        <div className="border-t mt-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center
        py-6 text-gray-500 text-sm">

          <p>
            © 2026 All Rights Reserved by djdmax.in  <span>Developed by raushanmehta.in</span>
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">

            {/* PayPal SVG */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-6"
            />



          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer