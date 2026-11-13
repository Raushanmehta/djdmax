import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaStar, FaRegStar, FaStarHalfAlt, FaTrash } from "react-icons/fa";
import { reviewAPI } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const StarDisplay = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-500" />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    else stars.push(<FaRegStar key={i} className="text-yellow-500" />);
  }
  return <div className="flex gap-1">{stars}</div>;
};

const ReviewCard = ({ eventId }) => {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = () => {
    if (!eventId) { setLoading(false); return; }
    reviewAPI.getEventReviews(eventId)
      .then((data) => setReviews(data.data || []))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) { toast.error("Please write a comment"); return; }
    try {
      setSubmitting(true);
      await reviewAPI.addReview({ eventId, rating, comment });
      toast.success("Review submitted! ⭐");
      setComment("");
      setRating(5);
      fetchReviews();
    } catch (err) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await reviewAPI.deleteReview(reviewId);
      toast.success("Review deleted");
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch {
      toast.error("Failed to delete review");
    }
  };

  if (loading) {
    return <div className="flex py-4"><Loader2 className="animate-spin text-orange-500" size={20} /></div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-3">
        Review this event
      </h3>
      {/* Add Review Form */}
      {isAuthenticated && (
        <Card className="p-4 bg-transparent border border-orange-100">
          <p className="font-semibold text-sm mb-3">Add Your Review</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Star Rating */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-2xl"
                >
                  {star <= rating
                    ? <FaStar className="text-yellow-500" />
                    : <FaRegStar className="text-yellow-300" />
                  }
                </button>
              ))}
            </div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={3}
            />
            <Button
              type="submit"
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={submitting}
            >
              {submitting && <Loader2 className="animate-spin mr-1" size={14} />}
              Submit Review
            </Button>
          </form>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm">No reviews yet. Be the first!</p>
      ) : (
        reviews.map((review) => (
          <Card key={review.id} className="p-4 bg-transparent">
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-4 flex-1">
                <Avatar className="h-10 w-10 bg-orange-500 text-white font-bold">
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    {review.user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <div>
                    <p className="font-medium">{review.user?.name || "User"}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <StarDisplay rating={review.rating} />
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              </div>

              {/* Delete only own review or admin */}
              {(user?.id === review.userId || user?.role === "ADMIN") && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 shrink-0 cursor-pointer"
                  onClick={() => handleDelete(review.id)}
                >
                  <FaTrash size={16} />
                </Button>
              )}
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ReviewCard;