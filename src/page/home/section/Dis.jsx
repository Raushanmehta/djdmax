import DiscCascadeCarousel from "@/components/ui/disc-cascade-carousel"

const imageUrl = (id) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=600&h=600&auto=format&fit=crop&ixlib=rb-4.1.0`

const records = [
  {
    title: "Bollywood",
    src: imageUrl("1774565784366-72db806a40f9"),
    credits: [
      { label: "Side A", value: "Ascent" },
      { label: "Year", value: "2018" },
      { label: "Length", value: "41 min" },
    ],
    reviews: [
      { source: "Low Fidelity", quote: "Climbs and never stops" },
      { source: "The Wax", quote: "A record for windows", stars: 4 },
    ],
  },
  {
    title: "Bhojpuri",
    src: imageUrl("1776031312164-f22c0edbdfb9"),
    labelStyle: "block",
    credits: [
      { label: "Side A", value: "Rooms" },
      { label: "Year", value: "2019" },
      { label: "Length", value: "38 min" },
    ],
    reviews: [
      { source: "Groove Notes", quote: "Sunlit and spare" },
      { source: "Low Fidelity", quote: "Every song a doorway" },
    ],
  },
  {
    title: "Punjabi",
    src: imageUrl("1777763517503-05d74f2e0008"),
    credits: [
      { label: "Side A", value: "Blossom" },
      { label: "Year", value: "2020" },
      { label: "Length", value: "44 min" },
    ],
    reviews: [
      { source: "The Wax", quote: "Soft as April" },
      { source: "Groove Notes", quote: "Pink noise, perfected" },
    ],
  },
  {
    title: "Classical",
    src: imageUrl("1774651458632-17df84bad45e"),
    credits: [
      { label: "Side A", value: "Last Call" },
      { label: "Year", value: "2021" },
      { label: "Length", value: "36 min" },
    ],
    reviews: [
      { source: "Low Fidelity", quote: "Fizzes from the first bar" },
      { source: "The Wax", quote: "Bright, sweet, gone", stars: 4 },
    ],
  },
  {
    title: "Folk",
    src: imageUrl("1778360508753-dcb2afbeadc2"),
    labelStyle: "block",
    credits: [
      { label: "Side A", value: "Mile One" },
      { label: "Year", value: "2022" },
      { label: "Length", value: "52 min" },
    ],
    reviews: [
      { source: "Groove Notes", quote: "Made for the long way home" },
      { source: "Low Fidelity", quote: "Shade and motion" },
    ],
  },
  {
    title: "Hip-Hop / Rap",
    src: imageUrl("1777221895589-2f81579e0dca"),
    credits: [
      { label: "Side A", value: "7A" },
      { label: "Year", value: "2023" },
      { label: "Length", value: "40 min" },
    ],
    reviews: [
      { source: "The Wax", quote: "The view does the talking" },
      { source: "Groove Notes", quote: "Gentle velocity" },
    ],
  },
  {
    title: "Pop",
    src: imageUrl("1777221895551-844a3c1243b3"),
    credits: [
      { label: "Side A", value: "Gulls" },
      { label: "Year", value: "2024" },
      { label: "Length", value: "47 min" },
    ],
    reviews: [
      { source: "Low Fidelity", quote: "Salt air on tape" },
      { source: "The Wax", quote: "Wide open, wind-blown" },
    ],
  },
]

export default function Dis() {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950 [--disc-foreground:#111827] dark:[--disc-foreground:#ecebe7]">
      <DiscCascadeCarousel
        items={records}
        height="85svh"
        discSize="clamp(150px, min(46vmin, 34vw), 380px)"
        frame={false}
        defaultIndex={1}
        loop
        autoplay={10000}
        background="transparent"
        color="var(--disc-foreground)"
        serif='"Anton", Impact, "Arial Black", sans-serif'
        display='"Anton", Impact, "Arial Black", sans-serif'
        fontHref="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;600;800&family=Oswald:wght@600;700&display=swap"
        hint="Drag · ← →"
        ariaLabel="Record catalogue"
      />
    </div>
  )
}