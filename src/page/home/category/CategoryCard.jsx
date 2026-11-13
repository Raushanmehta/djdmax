

const CategoryCard = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-2 sm:gap-3 cursor-pointer group">
      <div className="h-[100px] w-[100px] sm:h-[80px] sm:w-[80px] md:h-[150px] md:w-[150px] 
      rounded-full overflow-hidden">
        <img
          src="https://images-cdn.ubuy.co.id/66187461036c894c914a804a-cooking-utensils-set-35-pcs-kitchen.jpg"
          alt="Shop by category - Kitchen"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-sm  sm:text-base md:text-lg font-semibold 
      text-center">Sadi</h1>
    </div>
  )
}

export default CategoryCard