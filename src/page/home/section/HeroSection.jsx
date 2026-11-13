import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg",
  "https://images.pexels.com/photos/1845537/pexels-photo-1845537.jpeg",
  "https://images.pexels.com/photos/32596426/pexels-photo-32596426.jpeg",
];


const HeroSection = () => {
  const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  pauseOnHover: false,
};
  return (
    <div className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-[calc(100vh-100px)] object-cover object-center"
            />
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 px-6 text-center">
        <div className="max-w-4xl text-white">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            DJ Dmax – Bihar’s Premier DJ &amp; Pro Sound Production
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg sm:text-xl">
            Weddings, Concerts, Club Nights &amp; Mega Events ke liye Zabardast
            Sound aur Lighting Setup. 12+ Saal ka Anubhav, Har Event Ko Banaye
            Yaadgar!
          </p>
          <a
            href="https://wa.me/919876543210?text=Hello%20DJ%20Dmax!%20Mujhe%20sound%20setup%20booking%20ke%20baare%20mein%20jaankari%20chahiye."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-3 font-semibold text-black transition-colors hover:bg-amber-400"
          >
            Book Your Date Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;