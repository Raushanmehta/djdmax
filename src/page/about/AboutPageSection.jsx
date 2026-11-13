import { ArrowRight } from "lucide-react";

export default function AboutPageSection() {
  return (
    
      <div className="max-w-full mx-auto overflow-hidden rounded-3xl  ">

        <div className="grid lg:grid-cols-2 items-center">

          {/* Left Image */}
          <div className="flex justify-center items-end h-[350px]">
            <img
              src="https://themewagon.github.io/Djoz/img/about/about.png"
              alt="Fashion"
              className="h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="px-8 lg:px-16 py-12">

            <p className="uppercase tracking-[3px] text-gray-500 text-sm mb-5">
              About Us
            </p>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight text-black">
              Deepak 
              <br />
              Mehta
            </h1>

            <p className="mt-8 text-gray-500 text-lg leading-8 max-w-lg">
              Vel non viverra ligula odio ornare turpis mauris. Odio aliquam,
              tincidunt ut vitae elit risus. Tempor egestas condimentum et ac
              rutrum dui, odio.
            </p>

            <img
            className="mt-10 flex items-center gap-2 font-semibold text-black hover:gap-4 transition-all"
         
            src="https://themewagon.github.io/Djoz/img/about/signature.png" alt="" />

            {/* <button className="mt-10 flex items-center gap-2 font-semibold text-black hover:gap-4 transition-all">
              Shop Collection
              <ArrowRight size={20} />
            </button> */}

          </div>

        </div>
      </div>
    
  );
};