import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { categoryAPI } from "@/lib/api"

const featuredImages = [
  {
    id: "featured-1",
    title: "The Night Comes Alive",
    category: "Live DJ",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "featured-2",
    title: "Moments on the Dance Floor",
    category: "Celebration",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "featured-3",
    title: "Lights, Music, Memories",
    category: "Live Music",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "featured-4",
    title: "Feel Every Beat",
    category: "DJ Night",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "featured-5",
    title: "A Crowd Full of Energy",
    category: "The DMAX Experience",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "featured-6",
    title: "Made for the Moment",
    category: "Live Show",
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "featured-7",
    title: "Sound and Soul",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "featured-8",
    title: "Celebrate Together",
    category: "Special Moments",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "featured-9",
    title: "One Unforgettable Night",
    category: "DJ DMAX",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85",
  },
]

const tileLayouts = [
  "col-span-1 row-span-2",
  "col-span-1 row-span-2 md:col-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1 md:col-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
]

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState(featuredImages)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadGalleryImages = async () => {
      try {
        const categoryResponse = await categoryAPI.getAll()
        const categories = Array.isArray(categoryResponse.data)
          ? categoryResponse.data
          : []
        const categoryResults = await Promise.all(
          categories.map(async (category) => ({
            category,
            response: await categoryAPI.getOne(category.id),
          }))
        )

        const eventImages = categoryResults.flatMap(({ category, response }) =>
          (Array.isArray(response.data?.events) ? response.data.events : []).flatMap(
            (event) => {
              const images = Array.isArray(event.images)
                ? event.images
                : event.image
                  ? [event.image]
                  : []

              return images
                .filter((image) => typeof image === "string" && image.trim())
                .map((image, index) => ({
                  id: `${event.id || event.title || category.id}-${index}`,
                  title: event.title || "DJ DMAX Event",
                  category: category.name || "Live Event",
                  image,
                }))
            }
          )
        )

        if (isMounted && eventImages.length > 0) {
          setGalleryImages(eventImages)
        }
      } catch (error) {
        console.error("Unable to load gallery images:", error)
        if (isMounted) setLoadError(true)
      }
    }

    loadGalleryImages()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="overflow-hidden bg-gray-50 py-10 md:py-16 lg:py-20 px-4  transition-colors duration-300 dark:bg-gray-950">
      <div className="mx-auto max-w-[1330px]">
        <div className="mx-auto mb-7 md:mb-10 max-w-3xl text-center">
          <span className=" inline-flex items-center gap-2  px-4 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
            The DMAX Experience
          </span>
           {/* Heading */}
        <div className="text-center ">
          <h2 className="testimonial-display text-gray-900 dark:text-white text-[clamp(2rem,4vw,5.75rem)] leading-[0.92]">
            <span className="block">Every Beat has a Story</span>
            <span className="mx-auto mt-2.5 block w-fit -rotate-2 origin-left bg-orange-500 px-4 py-2 text-[clamp(1.1rem,3.5vw,2rem)] leading-none text-white shadow-[7px_7px_0_rgba(249,115,22,0.2)] dark:shadow-[7px_7px_0_rgba(249,115,22,0.35)] sm:px-5">
              Every Moment
              </span>
          </h2>
        </div>
        </div>

        <div className="relative overflow-hidden ">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
          />
          <div className="relative grid auto-rows-[88px] grid-cols-2 gap-2 sm:auto-rows-[108px] sm:grid-cols-3 sm:gap-3 md:auto-rows-[125px] md:grid-cols-4 lg:auto-rows-[145px]">
            {galleryImages.map((item, index) => (
              <article
                key={item.id}
                className={`group relative min-h-0 min-w-0 overflow-hidden rounded-xl border border-white/10 bg-slate-800 sm:rounded-2xl ${
                  tileLayouts[index % tileLayouts.length]
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4">
                  <p className="mb-1 truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-orange-300 sm:text-[10px]">
                    {item.category}
                  </p>
                  <h3 className="line-clamp-2 break-words text-xs font-bold leading-snug text-white sm:text-sm md:text-base">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        {loadError && (
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Showing featured moments while live event photos are unavailable.
          </p>
        )}

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:text-left md:mt-14 md:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
              Your moment starts here
            </p>
            <h3 className="mt-2 text-xl font-bold text-gray-950 dark:text-white sm:text-2xl">
              Let&apos;s make your next event unforgettable.
            </h3>
          </div>
          <Link
            to="/contact"
            className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] px-7 py-3 font-semibold text-black transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            Plan Your Event
          </Link>
        </div>
      </div>
    </section>
  )
}
