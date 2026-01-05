import { useState } from "react";
import CustomButton from "@/components/CustomButton";

const ratingLabels = ["", "Terrible", "Bad", "Average", "Good", "Very Good", "Excellent"];
const maxCommentLength = 300;

const dummyReviews = [
  { id: 1, name: "Tania", rating: 5, comment: "This book was amazing! Highly recommended." },
  { id: 2, name: "Reza", rating: 4, comment: "Pretty good, but some parts felt a bit slow." },
  { id: 3, name: "Sara", rating: 3, comment: "It was average, not bad but not great either." },
];

const BookReviews = () => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [reviews, setReviews] = useState(dummyReviews);
  const [comment, setComment] = useState("");
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !comment.trim()) return;

    const newReview = {
      id: reviews.length + 1,
      name: "You",
      rating: selected,
      comment: comment.trim(),
    };

    setReviews([newReview, ...reviews]);
    setComment("");
    setSelected(0);
  };

  const toggleExpand = (id: number) => {
    setExpandedComments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8 mt-8">
      {/* Average Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={i <= Math.round(averageRating) ? "#E7C9A5" : "none"}
              stroke={i <= Math.round(averageRating) ? "#E7C9A5" : "#888888"}
              strokeWidth={2}
              className="w-5 h-5"
            >
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
            </svg>
          ))}
        </div>
        <p className="text-sm md:text-base text-gray-300 dark:text-gray-900">
          {averageRating.toFixed(1)} / 5 ({reviews.length} reviews)
        </p>
      </div>

      {/* User Rating Form */}
      <div className="w-full flex flex-col gap-4 p-4 rounded-lg border-2 border-primary dark:border-[#7a6233]">
        <div className="h-8 flex items-center gap-2">
          <p className="text-xs md:text-base text-white dark:text-gray-900">What do you rate?</p>
          <p className="text-lg md:text-2xl text-primary dark:text-[#7a6233]">
            {ratingLabels[hovered || selected]}
          </p>
        </div>

        <div className="flex gap-2 self-end">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={hovered >= i || selected >= i ? "#E7C9A5" : "none"}
              stroke={hovered >= i || selected >= i ? "#E7C9A5" : "#888888"}
              strokeWidth={2}
              className="w-6 h-6 cursor-pointer dark:stroke-gray-400"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setSelected(i)}
            >
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
            </svg>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-2 rounded-lg border dark:border-gray-300 border-gray-600 dark:bg-white bg-gray-800 dark:text-black text-gray-100"
            maxLength={maxCommentLength}
          />
          <p className="text-xs text-gray-400">{comment.length} / {maxCommentLength}</p>
          <CustomButton
            color="yellow"
            text="Submit"
            containerClassName="cursor-pointer w-full md:w-fit self-end"
          />
        </form>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg md:text-2xl font-semibold text-light-100 dark:text-gray-900">
          Reviews
        </h3>

        {reviews.map((r) => (
          <div
            key={r.id}
            className="p-4 rounded-lg border dark:border-gray-300 border-gray-700 dark:bg-white bg-gray-800"
          >
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-sm md:text-base text-primary dark:text-[#7a6233]">{r.name}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i <= r.rating ? "#E7C9A5" : "none"}
                    stroke={i <= r.rating ? "#E7C9A5" : "#888888"}
                    strokeWidth={2}
                    className="w-3 h-3"
                  >
                    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            <p className="text-sm md:text-base text-light-100 dark:text-gray-800">
              {r.comment.length > 150 && !expandedComments.includes(r.id)
                ? r.comment.slice(0, 150) + "..."
                : r.comment}
            </p>

            {r.comment.length > 150 && (
              <button
                className="text-xs text-primary dark:text-[#7a6233] mt-1"
                onClick={() => toggleExpand(r.id)}
              >
                {expandedComments.includes(r.id) ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReviews;
