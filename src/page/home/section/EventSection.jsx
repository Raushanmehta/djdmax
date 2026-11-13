import React, { useEffect, useState } from "react";
import SimilerEventCard from "@/page/eventDetails/SimilarEventCard"
import { useNavigate } from "react-router-dom";
import { categoryAPI } from "@/lib/api";
import { Loader2 } from "lucide-react";

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const catData = await categoryAPI.getAll();
        const cats = catData.data || [];

        let allEvents = [];
        // Just take the first few categories to avoid too many requests on home page
        for (const cat of cats.slice(0, 4)) {
          const catDetail = await categoryAPI.getOne(cat.id);
          const evts = catDetail.data?.events || [];
          allEvents = [...allEvents, ...evts.map(e => ({ ...e, category: cat }))];
        }
        // Shuffle or just sort by newest
        allEvents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEvents(allEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  if (events.length === 0) return null;

  return (
     <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[1350px] mx-auto">


        {/* Heading + View All */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-orange-400">|</span>
            <h2 className="font-bold text-3xl uppercase">
              All Events
            </h2>
          </div>

          <div
            onClick={() => navigate("/events")}
            className="cursor-pointer uppercase font-medium text-orange-500 hover:text-orange-600 transition-colors"
          >
            View All Events
          </div>
        </div>

        {/* Show Only First 10 Events (or 5 per row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {events.slice(0, 4).map((event) => (
            <SimilerEventCard key={event.id} event={event} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default EventSection