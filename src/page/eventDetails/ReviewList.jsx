import { FaStar, FaTrash } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export default function ReviewList({ 
    reviews = [], 
    loading = false, 
    currentUser = null, 
    onDelete = null 
}) {
    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-orange-500" size={30} />
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                Customer Reviews
                <span className="text-sm font-normal text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
                    {reviews.length}
                </span>
            </h3>

            {reviews.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg bg-gray-50">
                    <p className="text-muted-foreground">No reviews yet for this event.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map((r, i) => (
                        <div key={r.id || i} className="flex gap-4 p-5 rounded-lg hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100 pb-6 relative group">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm text-lg">
                                {r.user?.name?.[0]?.toUpperCase() || "U"}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-lg">{r.user?.name || "Anonymous User"}</p>
                                        <p className="text-xs text-gray-400 mb-2">
                                            {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            }) : "Recent"}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
                                            <span className="text-sm font-bold text-orange-600">{r.rating}</span>
                                            <FaStar className="text-orange-500" size={14} />
                                        </div>
                                        
                                        {/* Delete Button for Owner or Admin */}
                                        {currentUser && (currentUser.id === r.userId || currentUser.role === "ADMIN") && onDelete && (
                                            <button 
                                                onClick={() => onDelete(r.id)}
                                                className="text-red-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                                                title="Delete Review"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            size={14}
                                            className={index < r.rating ? "text-yellow-500" : "text-gray-200"}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-700 leading-relaxed italic text-base">"{r.review || r.comment}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}