import { Star } from "lucide-react";
import { IoStar } from "react-icons/io5";

const TestimonialCard = ({ testimonial }) => {
  const { name, role, image, review } = testimonial;

  return (
    <div>
      <div className="flex h-[260px] flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-orange-500 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5 flex gap-1">
          {[...Array(5)].map((_, index) => (
            <IoStar
              key={index}
              size={20}
              className="fill-orange-500 text-orange-500"
            />
          ))}
        </div>

        <p className="italic leading-7 text-gray-600 dark:text-gray-300">
          "{review}"
        </p>

        <div className="mt-8 flex items-center gap-4">
          <img
            src={image}
            alt={name}
            className="h-14 w-14 rounded-full border-2 border-orange-500"
          />

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;