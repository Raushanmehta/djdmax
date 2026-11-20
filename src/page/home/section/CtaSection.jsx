import { useState } from "react";
import {
  Drum,
  Flame,
  Headphones,
  Music2,
  SlidersHorizontal,
  Zap,
} from "lucide-react";

const genres = [
  {
    name: "Bollywood",
    icon: Music2,
    description:
      "Desi Bollywood & Retro Remixes jo har age group ko dance floor par le aaye!",
  },
  {
    name: "Bhojpuri",
    icon: Flame,
    description:
      "High-energy Bhojpuri hits jo dance floor ko nonstop lively rakhein!",
  },
  {
    name: "Afro",
    icon: Drum,
    description:
      "Afrobeats aur global rhythms for a vibrant, feel-good dance floor!",
  },
  {
    name: "Tech House",
    icon: SlidersHorizontal,
    description:
      "Driving beats aur deep grooves for a late-night club vibe.",
  },
  {
    name: "Deep House",
    icon: Headphones,
    description:
      "Smooth melodies aur steady bass for a laid-back, immersive vibe.",
  },
  {
    name: "Punjabi",
    icon: Zap,
    description:
      "Punjabi beats aur high-energy tracks jo sabko dance floor par le aaye!",
  },
];

export default function CtaSection() {
  const [activeGenreIndex, setActiveGenreIndex] = useState(0);
  const activeGenre = genres[activeGenreIndex];

  return (
    <section className="bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] px-4 py-8 text-center transition-colors duration-300 ">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="testimonial-display text-gray-900 dark:text-black text-[clamp(2rem,4vw,5.75rem)] leading-[0.92]">
            <span className="block"> Music Genres We Spin</span>
            
          </h2>
        <p className="mx-auto mt-3 max-w-3xl text-base text-white/90 sm:text-lg">
          Har tarah ke crowd ka mood samajhkar live track selection — click
          karke vibe check karein!
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {genres.map((genre, index) => {
            const Icon = genre.icon;
            const isActive = activeGenreIndex === index;

            return (
              <button
                key={genre.name}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveGenreIndex(index)}
                className={`group inline-flex items-center gap-2 rounded-full border border-white/60 bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] px-5 py-3 font-semibold text-black transition-colors duration-300 ease-in-out hover:bg-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                  isActive
                    ? "ring-2 ring-white"
                    : ""
                }`}
              >
                <Icon aria-hidden="true" size={18} />
                {genre.name}
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="mt-4 text-lg font-medium text-white sm:text-xl"
        >
          {activeGenre.description}
        </p>
      </div>
    </section>
  );
}
