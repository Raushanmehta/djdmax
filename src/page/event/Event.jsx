import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import FilterSection from "./FilterSection";
import { FiSearch } from "react-icons/fi";
import { categoryAPI } from "@/lib/api";
import { toast } from "sonner";
import { useParams, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

const ITEMS_PER_PAGE = 8;

const Event = () => {
  const isMobile = useIsMobile();
  const { category: categorySlug } = useParams();
  const [searchParams] = useSearchParams();

  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const catData = await categoryAPI.getAll();
        const cats = catData.data || [];
        console.log("Categories found:", cats.length);
        setCategories(cats);

        let allEvents = [];
        for (const cat of cats) {
          try {
            const catDetail = await categoryAPI.getOne(cat.id);
            const evts = catDetail.data?.events || [];
            console.log(`Cat: ${cat.name}, Events: ${evts.length}`);
            allEvents = [...allEvents, ...evts.map(e => ({ ...e, category: cat }))];
          } catch (err) {
            console.error("Error fetching cat details:", err);
          }
        }
        console.log("Total events loaded:", allEvents.length);
        setEvents(allEvents);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  // Filter Logic — two-pass: exact innerCategory match first, then fallback to subCategory
  const categorySlugLower = categorySlug?.toLowerCase();

  // Helper: does an event match at any level?
  const matchesAtAnyLevel = (e, slug) => {
    if (!slug) return true;
    return (
      e.category?.slug?.toLowerCase() === slug ||
      e.category?.name?.toLowerCase() === slug ||
      e.category?.name?.toLowerCase().replace(/\s+/g, '-') === slug ||

      e.subCategory?.slug?.toLowerCase() === slug ||
      e.subCategory?.name?.toLowerCase() === slug ||
      e.subCategory?.name?.toLowerCase().replace(/\s+/g, '-') === slug ||

      e.innerCategory?.slug?.toLowerCase() === slug ||
      e.innerCategory?.name?.toLowerCase() === slug ||
      e.innerCategory?.name?.toLowerCase().replace(/\s+/g, '-') === slug
    );
  };

  // Determine if ANY event directly matches the slug (innerCategory exact match)
  const hasExactInnerMatch = categorySlug
    ? events.some(e =>
      e.innerCategory?.slug?.toLowerCase() === categorySlugLower ||
      e.innerCategory?.name?.toLowerCase() === categorySlugLower ||
      e.innerCategory?.name?.toLowerCase().replace(/\s+/g, '-') === categorySlugLower
    )
    : true;

  // If no exact innerCategory match found, find which subCategory the slug belongs to
  // by looking at the frontend category data (the slug IS a subCategory slug or innerCategory slug)
  // Fallback: show events of the parent subCategory
  const getSubCategorySlugForInner = (innerSlug) => {
    // Map from innerCategory slug prefix patterns to subCategory slugs
    const innerToSubMap = {
      event_wedding_dj: 'event_dj_service', event_party_dj: 'event_dj_service',
      event_club_dj: 'event_dj_service', event_corporate_dj: 'event_dj_service',
      event_birthday_dj: 'event_dj_service', event_sangeet_dj: 'event_dj_service',
      event_bollywood_dj: 'event_dj_service', event_punjabi_dj: 'event_dj_service',
      event_edm_dj: 'event_dj_service', event_live_mixing_dj: 'event_dj_service',

      event_dance_group: 'event_stage_performers', event_anchor_host: 'event_stage_performers',
      event_standup_comedian: 'event_stage_performers', event_magic_show: 'event_stage_performers',
      event_live_band: 'event_stage_performers', event_folk_dance: 'event_stage_performers',
      event_celebrity: 'event_stage_performers', event_fire_show: 'event_stage_performers',
      event_acrobat_show: 'event_stage_performers', event_mime_artist: 'event_stage_performers',

      event_male_singer: 'event_singers', event_female_singer: 'event_singers',
      event_bollywood_singer: 'event_singers', event_classical_singer: 'event_singers',
      event_sufi_singer: 'event_singers', event_punjabi_singer: 'event_singers',
      event_folk_singer: 'event_singers', event_rock_band: 'event_singers',
      event_jazz_singer: 'event_singers', event_acoustic_singer: 'event_singers',

      event_sound_operator: 'event_operators', event_light_operator: 'event_operators',
      event_stage_operator: 'event_operators', event_dj_console_operator: 'event_operators',
      event_led_operator: 'event_operators', event_power_technician: 'event_operators',
      event_truss_operator: 'event_operators', event_camera_operator: 'event_operators',
      event_audio_technician: 'event_operators', event_lighting_technician: 'event_operators',

      event_dj_sound_system: 'event_sound_lighting', event_concert_sound: 'event_sound_lighting',
      event_led_lighting: 'event_sound_lighting', event_laser_lights: 'event_sound_lighting',
      event_moving_head_lights: 'event_sound_lighting', event_fog_machine: 'event_sound_lighting',
      event_cold_pyro: 'event_sound_lighting', event_follow_spot: 'event_sound_lighting',
      event_line_array: 'event_sound_lighting', event_wireless_mic: 'event_sound_lighting',
    };
    return innerToSubMap[innerSlug] || null;
  };

  const fallbackSubSlug = !hasExactInnerMatch && categorySlug
    ? getSubCategorySlugForInner(categorySlugLower)
    : null;

  let filtered = events.filter(e => {
    // 1. Search filter
    const matchesSearch = !search || String(e.title || "").toLowerCase().includes(search.toLowerCase());

    // 2. Category/Sub/Inner slug filter (from URL path)
    let matchesCategorySlug;
    if (!categorySlug) {
      matchesCategorySlug = true;
    } else if (fallbackSubSlug) {
      // No events directly tagged to this innerCategory → show parent subCategory events
      matchesCategorySlug = e.subCategory?.slug?.toLowerCase() === fallbackSubSlug;
    } else {
      matchesCategorySlug = matchesAtAnyLevel(e, categorySlugLower);
    }


    // 3. Price Filter
    const priceRanges = (searchParams.get("price")?.split(",") || []).filter(Boolean);
    const matchesPrice = priceRanges.length > 0
      ? priceRanges.some(range => {
        const parts = range.split("-").map(Number);
        if (parts.length < 2) return false;
        const [min, max] = parts;
        const price = e.bookingPrice || 0;
        return price >= min && price <= max;
      })
      : true;

    // 4. Discount Filter
    const minDiscounts = (searchParams.get("discount")?.split(",") || []).filter(Boolean).map(Number);
    const mrp = e.mrpPrice || 0;
    const booking = e.bookingPrice || 0;
    const discountVal = mrp > booking ? ((mrp - booking) / mrp) * 100 : 0;
    const matchesDiscount = minDiscounts.length > 0
      ? minDiscounts.some(min => discountVal >= min)
      : true;

    return matchesSearch && matchesCategorySlug && matchesPrice && matchesDiscount;
  });



  // Reset page if filters change
  useEffect(() => {
    setPage(1);
    console.log("Filters changed. Matches:", filtered.length, "/", events.length);
    if (events.length > 0 && filtered.length === 0) {
      const categoryMatches = events.filter(e => {
        return categorySlug
          ? (e.category?.name?.toLowerCase() === categorySlug.toLowerCase() ||
            e.category?.name?.toLowerCase().replace(/\s+/g, '-') === categorySlug.toLowerCase() ||
            e.category?.slug?.toLowerCase() === categorySlug.toLowerCase())
          : true;
      }).length;

      console.log(`No matches. ${categoryMatches}/${events.length} match the category "${categorySlug}"`);
    }
  }, [searchParams, search, categorySlug, events.length]);



  // Sort
  if (sort === "low-high") filtered = [...filtered].sort((a, b) => a.bookingPrice - b.bookingPrice);
  if (sort === "high-low") filtered = [...filtered].sort((a, b) => b.bookingPrice - a.bookingPrice);
  if (sort === "newest") filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  return (
    <div className="-z-10 mt-10">
      <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase">
        Events
      </h1>

      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection categories={categories} />
        </section>

        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex items-center justify-between gap-4 px-6 h-[50px]">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative w-full max-w-md">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search Event..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-9 pl-9 pr-4 rounded-md border bg-background 
                  text-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {isMobile && (
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              )}
            </div>

            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px] text-sm">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low-high">Price: Low to High</SelectItem>
                <SelectItem value="high-low">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-orange-500" size={36} />
            </div>
          ) : (
            <>
              <section className="p-5 grid grid-cols-2 sm:grid-cols-2 
              md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center border-t">
                {events.length === 0 ? (
                  <div className="col-span-full text-center py-20 space-y-4">
                    <p className="text-xl font-semibold text-gray-500">No events found in the database.</p>
                    <p className="text-sm text-muted-foreground">Please check if your backend is running and has events created.</p>
                  </div>
                ) : paginated.length > 0 ? (
                  paginated.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 space-y-4">
                    <p className="text-xl font-semibold text-gray-500">No events match your current filters.</p>
                    <Button
                      variant="link"
                      onClick={() => setSearchParams({})}
                      className="text-orange-500 underline"
                    >
                      Clear all filters to see all events
                    </Button>
                  </div>
                )}

              </section>

              {totalPages > 1 && (
                <div className="flex justify-center items-center py-10 space-x-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={i + 1 === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;