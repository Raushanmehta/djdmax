import { useState, useEffect, useCallback } from "react";
import ReviewList from "./ReviewList";
import ReviewCard from "../review/ReviewCard";
import { reviewAPI } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function ReviewsTable({ eventId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    if (!eventId) return;
    try {
      const data = await reviewAPI.getEventReviews(eventId);
      setReviews(data.data || []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  const handleDelete = async (reviewId) => {
    try {
      await reviewAPI.deleteReview(reviewId);
      toast.success("Review deleted successfully");
      fetchReviews(); // Refresh list
    } catch (error) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 items-start">

      {/* Left side: Reviews list (8 columns) */}
      <div className="lg:col-span-8 order-2 lg:order-1">
        <ReviewList 
          reviews={reviews} 
          loading={false} 
          currentUser={user}
          onDelete={handleDelete}
        />
      </div>

      {/* Right side: Write Review Card (4 columns) */}
      <div className="lg:col-span-4 order-1 lg:order-2">
        <ReviewCard
          eventId={eventId}
          onReviewAdded={fetchReviews}
          showList={false}
        />
      </div>

    </div>
  );
}