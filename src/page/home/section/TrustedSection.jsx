import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TrustedCard from "../components/cards/TrustedCard";

const videos = [
  {
    title: "Sample Video 01",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    title: "Sample Video 02",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    title: "Sample Video 03",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    title: "Sample Video 04",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
];

export default function TrustedSection() {
  return (
    <section className="bg-gray-50 py-10 md:py-16 lg:py-20 px-4  transition-colors duration-300 dark:bg-gray-950 md:py-24">
      <div className="mx-auto max-w-[1330px]">
        <div className="mb-7 md:mb-10">
          <div>
            <h2 className="testimonial-display flex flex-col items-center gap-y-2 text-center text-[clamp(2rem,4vw,4.5rem)] leading-[0.95] text-gray-900 dark:text-white sm:flex-row sm:justify-start sm:gap-x-4 sm:text-left">
              <span>Our Successful</span>
              <span className="inline-block w-fit -rotate-2 origin-left bg-orange-500 px-4 py-2 text-[clamp(1.5rem,4vw,3rem)] leading-none text-white shadow-[7px_7px_0_rgba(249,115,22,0.2)] dark:shadow-[7px_7px_0_rgba(249,115,22,0.35)] sm:px-5">
                Events
              </span>
            </h2>
          </div>
        </div>

        <Carousel
          aria-label="DJ DMAX video highlights"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem
                key={video.title}
                className="basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <TrustedCard video={video} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center gap-2">
            <CarouselPrevious className="static translate-y-0 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white" />
            <CarouselNext className="static translate-y-0 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}