import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { reviewAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ReviewForm({ eventId, onReviewAdded }) {
    const { isAuthenticated } = useAuth();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            toast.error("Please login to write a review");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please provide a review message");
            return;
        }

        try {
            setLoading(true);
            await reviewAPI.addReview({
                eventId,
                rating,
                comment
            });
            toast.success("Review submitted successfully!");
            setComment("");
            setRating(5);
            if (onReviewAdded) onReviewAdded();
        } catch (error) {
            toast.error(error.message || "Failed to submit review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-6 rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
            <p className="text-sm text-gray-500 mb-4">
                Share your experience with others. Your feedback helps us improve!
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={24}
                            onClick={() => setRating(star)}
                            className={`cursor-pointer transition-colors ${rating >= star ? "text-yellow-500" : "text-gray-300"
                                }`}
                        />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 self-center">
                        ({rating} / 5)
                    </span>
                </div>

                <Textarea
                    placeholder="Describe your experience at this event..."
                    className="mb-4 min-h-[120px]"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />

                <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6"
                    disabled={loading}
                >
                    {loading ? (
                        <><Loader2 className="animate-spin mr-2" size={20} /> Submitting...</>
                    ) : (
                        "Submit Review"
                    )}
                </Button>
            </form>
        </div>
    );
}