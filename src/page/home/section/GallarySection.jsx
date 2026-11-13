"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
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

  // Portfolio items with different sizes / layout styles
  const portfolioSlides = [
    {
      id: 1,
      brand: "StudioDADO",
      subTitle: "FORM FOLLOWS FEELING",
      cardNumber: "1",
      image: "https://i.pinimg.com/736x/a8/3f/97/a83f975010e8f14038a37fcf9640cf99.jpg", // Replace with your image
      cardSize: "w-[380px] h-[260px]", // Wide landscape size
    },
    {
      id: 2,
      brand: "The Lookback",
      subTitle: "THE PARTICULARS OF EACH PROJECT...",
      cardNumber: "2",
      image: "https://i.pinimg.com/1200x/1d/a7/d9/1da7d93ad41ed44b2e0a2ab06152d782.jpg",
      cardSize: "w-[320px] h-[340px]", // Medium portrait size
    },
    {
      id: 3,
      brand: "StudioDADO",
      subTitle: "PARTNERS IN CREATION",
      cardNumber: "3",
      image: "https://i.pinimg.com/1200x/4d/bd/a7/4dbda7ae910f2e62b24e993bab0912f6.jpg",
      cardSize: "w-[420px] h-[280px]", // Extra wide size
    },
    {
      id: 4,
      brand: "The Lookback",
      subTitle: "BO&S/2025",
      cardNumber: "4",
      image: "https://i.pinimg.com/1200x/78/d7/93/78d793cae7a68525bb6882bf8fe57061.jpg",
      cardSize: "w-[300px] h-[380px]", // Tall vertical size
    },
    {
      id: 5,
      brand: "StudioDADO",
      subTitle: "TLB/2024",
      cardNumber: "5",
      image: "https://i.pinimg.com/1200x/0f/12/21/0f122190af91e3caa086b7af106cd4ae.jpg",
      cardSize: "w-[350px] h-[320px]", // Standard box size
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-3">
        {/* Slick Slider Container */}
        <div className=" overflow-hidden">
          <Slider {...settings}>
            {portfolioSlides.map((slide, index) => (
              <div key={index} className="px-3 outline-none">
                {/* Individual Card Wrapper */}
                <div className="space-y-3 group cursor-pointer">
                  {/* Brand Header & Number on top */}
                  <div className="flex items-center justify-between text-white text-xs sm:text-sm font-semibold tracking-wider">
                    <span>{slide.brand}</span>
                    <span className="text-gray-400">{slide.cardNumber}</span>
                  </div>

                  {/* Card Box with Different Sizes */}
                  <div
                    className={`relative ${slide.cardSize} w-full bg-white rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] flex flex-col justify-between `}>
            
                    {/* Background / Thumbnail Image Preview */}
                    <div className="relative h-auto w-full rounded-lg overflow-hidden bg-gray-900 ">
                      <img
                        src={slide.image}
                        alt={slide.brand}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
