import Slider from "react-slick";
import { Star } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Head of CX, Stripe",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "NexusAI reduced our support ticket volume by 78% in the first month. It's like hiring a 50-person support team overnight.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "CTO, Linear",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Response quality is genuinely better than most human agents. The Slack integration means our AI always has full context.",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "COO, Vercel",
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "$18K saved in the first month just from automated support. ROI was immediate.",
  },
  {
    id: 4,
    name: "David Miller",
    role: "Founder, Airbnb",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Amazing customer experience. Our response time dropped by more than half.",
  },
  {
    id: 5,
    name: "Emma Watson",
    role: "Marketing Lead",
    image: "https://i.pravatar.cc/150?img=5",
    review: "The UI is clean, fast and our customers absolutely love it.",
  },
  {
    id: 6,
    name: "James Smith",
    role: "CEO, Shopify",
    image: "https://i.pravatar.cc/150?img=20",
    review: "One of the best investments we've made this year.",
  },
  {
    id: 7,
    name: "Sophia Brown",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?img=25",
    review: "Fantastic support and outstanding automation capabilities.",
  },
  {
    id: 8,
    name: "Daniel Lee",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=18",
    review: "Integration took only a few minutes and worked perfectly.",
  },
  {
    id: 9,
    name: "Olivia Taylor",
    role: "UX Designer",
    image: "https://i.pravatar.cc/150?img=40",
    review: "Beautiful interface and incredible performance improvements.",
  },
  {
    id: 10,
    name: "Michael Scott",
    role: "Regional Manager",
    image: "https://i.pravatar.cc/150?img=60",
    review: "Highly recommended. Saved us countless hours every week.",
  },
];

const TestimonialsSection = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[1350px] mx-auto">
        {/* Heading */}

        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-6 mb-14">
            <div className="w-32 md:w-48 h-[2px] bg-orange-500"></div>

            <h1 className="text-2xl uppercase md:text-3xl font-bold text-gray-900 dark:text-white">
              Testimonial
            </h1>

            <div className="w-32 md:w-48 h-[2px] bg-orange-500"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Loved by <span className="text-orange-500">10,000+ Teams</span>
          </h2>
        </div>

        <Slider {...settings}>
          {testimonials.map((item) => (
            <div key={item.id} className="px-3">
              <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 h-auto flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-xl">
                {/* Stars */}

                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className="fill-orange-500 text-orange-500"
                    />
                  ))}
                </div>

                {/* Review */}

                <p className="text-gray-600 dark:text-gray-300 italic leading-7">
                  "{item.review}"
                </p>

                {/* User */}

                <div className="flex items-center gap-4 mt-8">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full border-2 border-orange-500"
                  />

                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {item.name}
                    </h4>

                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsSection;
