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
    </div>
  );
};

export default HeroSection;