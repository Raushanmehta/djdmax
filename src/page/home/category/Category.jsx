import CategoryCard from "./CategoryCard"



const Category = () => {
  return (
     <section className="py-10 px-4 sm:px-8 lg:px-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-16 text-center">
        EVENTS CATEGORY
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
      lg:grid-cols-6 gap-6 sm:gap-6 justify-items-center">
        {[1, 2, 3, 4, 5, 6,].map((item) => (
          <CategoryCard key={item} />
        ))}
      </div>
    </section>
  )
}

export default Category