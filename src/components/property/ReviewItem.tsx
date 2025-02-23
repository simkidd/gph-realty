import { IReview } from "@/interfaces/review.interface";
import { StarHalfIcon, StarIcon } from "lucide-react";

export const ReviewItem = ({ review }: { review: IReview }) => {
  const fullStars = Math.floor(review.rating);
  const hasHalfStar = review.rating % 1 !== 0;

  return (
    <div className="mb-6 pb-6 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
          {review.author[0]}
        </div>
        <div>
          <h5 className="font-medium">{review.author}</h5>
          <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 fill-primary text-primary" />
            ))}
            {hasHalfStar && (
              <StarHalfIcon className="w-4 h-4 fill-primary text-primary" />
            )}
            {[...Array(5 - Math.ceil(review.rating))].map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 fill-gray-200 text-gray-200" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{review.content}</p>
      <span className="text-sm text-gray-400">
        {new Date(review.date).toLocaleDateString()}
      </span>
    </div>
  );
};
