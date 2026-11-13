import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";

// --- Rating Helpers ---
function avgRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0);
  return parseFloat((sum / reviews.length).toFixed(2));
}

function distributeCategories(reviews) {
  const buckets = {
    Excellent: 0,
    "Very Good": 0,
    Good: 0,
    Average: 0,
    Poor: 0,
  };

  reviews.forEach((r) => {
    const rating = Number(r.rating) || 0;
    if (rating >= 5) buckets.Excellent++;
    else if (rating >= 4) buckets["Very Good"]++;
    else if (rating >= 3) buckets.Good++;
    else if (rating >= 2) buckets.Average++;
    else buckets.Poor++;
  });

  return buckets;
}

const CalculateReviewCard = ({ reviews = [] }) => {
  const count = reviews.length;
  const buckets = distributeCategories(reviews);
  const average = avgRating(reviews);

  const percent = (n) =>
    count === 0 ? 0 : Math.round((n / count) * 100);

  const ratingData = [
    { label: "Excellent", color: "bg-green-500", value: buckets.Excellent },
    { label: "Very Good", color: "bg-lime-500", value: buckets["Very Good"] },
    { label: "Good", color: "bg-teal-500", value: buckets.Good },
    { label: "Average", color: "bg-orange-500", value: buckets.Average },
    { label: "Poor", color: "bg-red-500", value: buckets.Poor },
  ];

  return (
    <Card className="max-w-3xl p-4">
      <CardContent className="space-y-6">

        {/* Average Rating */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold">{average}</span>
          <FaStar className="text-yellow-500 text-xl" />
          <span className="text-muted-foreground text-sm">
            ({count} Reviews)
          </span>
        </div>

        {/* Rating Bars */}
        <div className="space-y-3">
          {ratingData.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4"
            >
              <span className="w-24 text-sm">
                {item.label}
              </span>

              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-full`}
                  style={{
                    width: `${percent(item.value)}%`,
                  }}
                />
              </div>

              <span className="w-8 text-sm text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
};

export default CalculateReviewCard;