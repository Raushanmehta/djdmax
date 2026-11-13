import React from "react";
import { Separator } from "@/components/ui/separator";
import ReviewCard from "./ReviewCard";
import CalculateReviewCard from "./CalculateReviewCard";

const Review = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-20 p-5 lg:px-20">

      <section>
        <img
          src="https://helloedits.com/wp-content/uploads/2023/03/Use-Models-for-product-Photography.webp"
          alt="review-product"
          className="rounded-md border"
        />

        <div className="space-y-2">
          <div>
            <p className="font-bold text-xl">
              Bonker Clothing
            </p>
            <p className="text-lg text-muted-foreground">
              Women T-Shirt
            </p>
          </div>

          <div className="flex items-center gap-3 mt-3 text-lg">
            <span className="font-semibold text-black">
              ₹ 499
            </span>

            <span className="line-through text-gray-400">
              ₹ 999
            </span>

            <span className="text-cyan-500 font-semibold">
              60% Off
            </span>
          </div>
        </div>

      </section>
      <section className="w-full max-w-3xl mx-auto space-y-10">

        <div>
          <h2 className="text-lg font-semibold pb-4">
            Review & Ratings
          </h2>

          <CalculateReviewCard />
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4].map((item, index) => (
            <div key={index}>
              <ReviewCard />
              <Separator className="my-4" />
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};

export default Review;