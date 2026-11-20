const Gallerycard = ({ slide }) => (
  <div className=" outline-none">
    <div className="group space-y-3 cursor-pointer">
      <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-black dark:text-white sm:text-sm">
        <span>{slide.brand}</span>
        <span className="text-gray-400">{slide.cardNumber}</span>
      </div>

      <div
        className={`relative ${slide.cardSize} flex w-full flex-col justify-between overflow-hidden rounded-xl bg-white shadow-2xl transition-transform duration-500 `}
      >
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-900">
          <img
            src={slide.image}
            alt={slide.brand}
            className="h-full w-full object-cover object-center transition-transform duration-500 "
          />
        </div>
      </div>
    </div>
  </div>
);

export default Gallerycard;