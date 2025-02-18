import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa6";
import { z } from "zod";
import Button from "../ui-custom/Button";

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required"),
  review: z.string().min(10, "Review must be at least 10 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  const onSubmit = (data: ReviewFormData) => {
    console.log("Review submitted:", data);
    // Add your submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingSelect(rating)}
              className={`w-7 h-7 ${
                rating <= selectedRating
                  ? "text-primary fill-primary"
                  : "text-gray-300 fill-gray-100"
              }`}
            >
              <FaStar className="w-full h-full" />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your Review</label>
        <textarea
          {...register("review")}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary outline-none"
          rows={4}
        />
        {errors.review && (
          <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
        )}
      </div>

      <Button type="submit" className="px-8 py-3">
        Submit Review
      </Button>
    </form>
  );
};
