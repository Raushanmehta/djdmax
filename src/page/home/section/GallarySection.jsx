"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GallarySection.css";
import Gallerycard from "../components/cards/Gallerycard";

export default function GallerySection() {
  // Slick Slider Settings with Auto-Scroll (Autoplay)
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Portfolio items with different sizes / layout styles
  const portfolioSlides = [
    {
      id: 1,
      brand: "StudioDADO",
      subTitle: "FORM FOLLOWS FEELING",
      cardNumber: "1",
      image:
        "https://i.pinimg.com/736x/a8/3f/97/a83f975010e8f14038a37fcf9640cf99.jpg", // Replace with your image
      cardSize: "h-[260px]",
    },
    {
      id: 2,
      brand: "The Lookback",
      subTitle: "THE PARTICULARS OF EACH PROJECT...",
      cardNumber: "2",
      image:
        "https://i.pinimg.com/1200x/1d/a7/d9/1da7d93ad41ed44b2e0a2ab06152d782.jpg",
      cardSize: "h-[340px]",
    },
    {
      id: 3,
      brand: "StudioDADO",
      subTitle: "PARTNERS IN CREATION",
      cardNumber: "3",
      image:
        "https://i.pinimg.com/1200x/4d/bd/a7/4dbda7ae910f2e62b24e993bab0912f6.jpg",
      cardSize: "h-[280px]",
    },
    {
      id: 4,
      brand: "The Lookback",
      subTitle: "BO&S/2025",
      cardNumber: "4",
      image:
        "https://i.pinimg.com/1200x/78/d7/93/78d793cae7a68525bb6882bf8fe57061.jpg",
      cardSize: "h-[380px]",
    },
    {
      id: 5,
      brand: "StudioDADO",
      subTitle: "TLB/2024",
      cardNumber: "5",
      image:
        "https://i.pinimg.com/1200x/0f/12/21/0f122190af91e3caa086b7af106cd4ae.jpg",
      cardSize: "h-[320px]",
    },
  ];

  return (
    <section className="py-10 md:py-16 lg:py-20 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[1330px] mx-auto ">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="testimonial-display text-gray-900 dark:text-white text-[clamp(2rem,4vw,5.75rem)] leading-[0.92]">
            <span className="block">Our Gallery</span>
            <span className="mx-auto mt-2.5 block w-fit -rotate-2 origin-left bg-orange-500 px-5 py-2 text-[clamp(1.35rem,3.5vw,2rem)] leading-none text-white shadow-[7px_7px_0_rgba(249,115,22,0.2)] dark:shadow-[7px_7px_0_rgba(249,115,22,0.35)]">
              Our Work
            </span>
          </h2>
        </div>

        {/* Slick Slider Container */}
        <div className=" overflow-hidden">
          <Slider {...settings} className="gallery-carousel">
            {portfolioSlides.map((slide) => (
              <Gallerycard key={slide.id} slide={slide} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
