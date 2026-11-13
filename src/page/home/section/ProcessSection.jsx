import { FaCalendarCheck } from "react-icons/fa"
import { IoShieldCheckmark } from "react-icons/io5";
import { LuBadgePercent } from "react-icons/lu";
import { FaHeadphonesAlt } from "react-icons/fa";

export default function ProcessSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-3">

        <div className="border border-gray-500">
          <div className="p-4">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
            divide-y md:divide-y-0 md:divide-x divide-gray-500">

              {/* 1 */}
              <div className="flex items-center gap-4 px-6 py-6">
                <FaCalendarCheck size={40} className="text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">
                    Easy Booking
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Book your event in just a few clicks
                  </p>
                </div>
              </div>

              {/* 2 */}
              <div className="flex items-center gap-4 px-6 py-6">
                <IoShieldCheckmark size={40} className="text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">
                    Verified Djdmax
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Trusted and professional service providers
                  </p>
                </div>
              </div>

              {/* 3 */}
              <div className="flex items-center gap-4 px-6 py-6">
                <LuBadgePercent size={40} className="text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">
                    Best Price Guarantee
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Affordable packages for every event
                  </p>
                </div>
              </div>

              {/* 4 */}
              <div className="flex items-center gap-4 px-6 py-6">
                <FaHeadphonesAlt size={40} className="text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">
                    24/7 Event Support
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our team is always here to help you
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
