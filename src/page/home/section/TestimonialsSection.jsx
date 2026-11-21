import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TestimonialCard from "../components/cards/TestimonialCard";

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
  const [carouselApi, setCarouselApi] = React.useState(null);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (!carouselApi || isPaused) return;

    const interval = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 3000);

    return () => window.clearInterval(interval);
  }, [carouselApi, isPaused]);

  return (
    <section className="py-10 md:py-16 lg:py-20 px-4  bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className=" max-w-[1330px] mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-7 md:mb-10">
          <h2 className="testimonial-display text-gray-900 dark:text-white text-[clamp(2rem,4vw,5.75rem)] leading-[0.92]">
            <span className="block">Testmonial</span>
            <span className="mx-auto mt-2.5 block w-fit -rotate-2 origin-left bg-orange-500 px-5 py-2 text-[clamp(1.35rem,3.5vw,2rem)] leading-none text-white shadow-[7px_7px_0_rgba(249,115,22,0.2)] dark:shadow-[7px_7px_0_rgba(249,115,22,0.35)]">
              Our Clients
              </span>
          </h2>
        </div>

        <Carousel
          aria-label="Client testimonials"
          opts={{ align: "start", loop: true }}
          setApi={setCarouselApi}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <CarouselContent>
            {testimonials.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <TestimonialCard testimonial={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
