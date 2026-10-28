
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CustomButton from "@/components/CustomButton";
import showToast from "@/utils/toast";
import { Axios_Route } from "@/utils/axiosRoutes";
import { AxiosMethodEnum } from "@/utils/type";
import { useRouter } from "next/navigation";
import SiteUrls from "@/utils/routs";

const ratingLabels = ["", "Terrible", "Bad", "Average", "Good", "Very Good"];

const MAX_LINES = 20;
const LINE_HEIGHT = 24;
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT;
const MAX_COMMENT_LENGTH = 300;

interface Review {
  _id: string;
  bookId: string;
  userId:
  | {
    _id: string;
    fullName: string;
  }
  | string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface BookReviewsProps {
  bookId: string;
  data: Review[];
}

const Star = ({
  filled,
  size = "h-5 w-5",
}: {
  filled: boolean;
  size?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#E7C9A5" : "none"}
    stroke={filled ? "#E7C9A5" : "currentColor"}
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${size} shrink-0 transition-colors duration-200 ${filled
      ? "text-[#E7C9A5] dark:text-[#A87938]"
      : "text-stone-500 dark:text-[#9A856B]"
      }`}
    aria-hidden="true"
  >
    <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96L12 2.5z" />
  </svg>
);

const BookReviews = ({ bookId, data }: BookReviewsProps) => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(data ?? []);
  const [comment, setComment] = useState("");
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setReviews(data ?? []);
  }, [data]);

  const bookReviews = reviews.filter(
    (review) => String(review.bookId) === String(bookId)
  );

  const averageRating =
    bookReviews.length > 0
      ? bookReviews.reduce((total, review) => total + review.rating, 0) /
      bookReviews.length
      : 0;

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    if (value.length > MAX_COMMENT_LENGTH) return;

    setComment(value);

    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    if (textarea.scrollHeight > MAX_HEIGHT) {
      textarea.style.height = `${MAX_HEIGHT}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  };

  const resetForm = () => {
    setSelected(0);
    setHovered(0);
    setComment("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.overflowY = "hidden";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selected || !comment.trim()) {
      showToast("Please fill all fields (rating & review)", "error");
      return;
    }

    if (!bookId) {
      showToast("Book ID is missing", "error");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const obj = {
        apiRoute: Axios_Route.addReview,
        data: {
          bookId,
          rating: selected,
          comment: comment.trim(),
        },
      };

      const response = await fetch("/api/post", {
        method: AxiosMethodEnum.post,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const res = await response.json();

      const result = res?.response ?? res;

      if (
        !response.ok ||
        res?.success === false ||
        result?.success === false ||
        result?.error
      ) {
        showToast(
          result?.message ||
          result?.detail ||
          res?.message ||
          "Failed to submit review",
          "error"
        );
        return;
      }

      showToast("Review submitted successfully", "success");
      router.refresh();

      const createdReview = result?.data?.review ?? result?.data;

      if (Array.isArray(createdReview)) {
        setReviews(createdReview);
      } else if (createdReview?._id) {
        setReviews((previous) => {
          const existingIndex = previous.findIndex(
            (review) =>
              review._id === createdReview._id ||
              (
                String(review.bookId) === String(createdReview.bookId) &&
                String(
                  typeof review.userId === "object"
                    ? review.userId?._id
                    : review.userId
                ) ===
                String(
                  typeof createdReview.userId === "object"
                    ? createdReview.userId?._id
                    : createdReview.userId
                )
              )
          );

          if (existingIndex !== -1) {
            return previous.map((review, index) =>
              index === existingIndex
                ? (createdReview as Review)
                : review
            );
          }

          return [createdReview as Review, ...previous];
        });
      }

      resetForm();
    } catch (error) {
      console.error("Failed to submit review:", error);

      showToast(
        error instanceof Error
          ? error.message
          : "Failed to submit review",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedComments((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const panelClass =
    "rounded-2xl border border-[#E7C9A5]/15 bg-[#171614] dark:border-[#B88A4B]/25 dark:bg-[#F8F2E6]";

  const headingClass =
    "text-lg font-semibold tracking-tight text-[#F8F2E6] dark:text-[#17130F] md:text-2xl";

  const secondaryTextClass = "text-stone-400 dark:text-[#75634E]";

  const accentTextClass = "text-[#E7C9A5] dark:text-[#A87938]";

  const dividerClass =
    "border-[#E7C9A5]/15 dark:border-[#B88A4B]/25";

  return (
    <div className="mx-auto mt-6 flex w-full max-w-[1200px] flex-col gap-7 sm:gap-9">
      {/* Rating overview */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.4,
          ease: "easeOut",
        }}
        className={`${panelClass} relative overflow-hidden p-5 sm:p-7`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-[#E7C9A5]/[0.07] blur-3xl dark:bg-[#A87938]/[0.12]"
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <p
              className={`text-xs font-medium uppercase tracking-[0.18em] ${secondaryTextClass}`}
            >
              Community rating
            </p>

            <div className="flex items-end gap-2">
              <span className="text-4xl font-semibold tracking-tight text-[#F8F2E6] dark:text-[#17130F]">
                {averageRating.toFixed(1)}
              </span>
              <span className={`mb-1 text-sm ${secondaryTextClass}`}>
                / 5.0
              </span>
            </div>

            <p className={`text-sm ${secondaryTextClass}`}>
              Based on {bookReviews.length}{" "}
              {bookReviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  filled={i <= Math.round(averageRating)}
                  size="h-6 w-6 sm:h-7 sm:w-7"
                />
              ))}
            </div>

            <p className={`text-xs ${secondaryTextClass}`}>
              What did you think of this book?
            </p>
          </div>
        </div>
      </motion.section>

      {/* Review form */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.45,
          ease: "easeOut",
        }}
        className={`${panelClass} flex flex-col gap-5 p-4 sm:p-7`}
      >
        <div className="flex flex-col gap-1.5">
          <p
            className={`text-xs font-medium uppercase tracking-[0.18em] ${accentTextClass}`}
          >
            Your opinion matters
          </p>
          <h3 className={headingClass}>Write a review</h3>
          <p className={`text-sm leading-6 ${secondaryTextClass}`}>
            Tell other readers what you liked or what could be better.
          </p>
        </div>

        {/* Interactive rating */}
        <div className="flex flex-col gap-3 rounded-xl border border-[#E7C9A5]/15 bg-white/[0.02] p-4 dark:border-[#B88A4B]/25 dark:bg-[#A87938]/[0.06] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-h-10 flex-col justify-center gap-1">
            <span className={`text-xs ${secondaryTextClass}`}>
              Your rating
            </span>

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={hovered || selected}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion ? undefined : { opacity: 0, y: -4 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.15,
                }}
                className={`text-sm font-semibold ${accentTextClass}`}
              >
                {ratingLabels[hovered || selected] || "Select a rating"}
              </motion.p>
            </AnimatePresence>
          </div>

          <div
            className="flex items-center gap-1 self-start sm:self-auto"
            onMouseLeave={() => setHovered(0)}
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null
                )
              ) {
                setHovered(0);
              }
            }}
            role="group"
            aria-label="Choose a rating from one to five stars"
          >
            {[1, 2, 3, 4, 5].map((i) => {
              const active = (hovered || selected) >= i;

              return (
                <motion.button
                  key={i}
                  type="button"
                  aria-label={`${i} out of 5 stars`}
                  aria-pressed={selected === i}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onClick={() => setSelected(i)}
                  whileHover={
                    shouldReduceMotion ? undefined : { scale: 1.12, y: -2 }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.9 }
                  }
                  className="rounded-md p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#E7C9A5] dark:focus-visible:ring-[#A87938]"
                >
                  <Star filled={active} size="h-7 w-7 sm:h-8 sm:w-8" />
                </motion.button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label
            htmlFor="book-review-comment"
            className="text-sm font-medium text-[#F8F2E6] dark:text-[#17130F]"
          >
            Your review
          </label>

          <textarea
            id="book-review-comment"
            ref={textareaRef}
            rows={1}
            value={comment}
            onChange={handleCommentChange}
            maxLength={MAX_COMMENT_LENGTH}
            placeholder="Share your thoughts about this book..."
            disabled={isSubmitting}
            className="
              min-h-12 w-full resize-none overflow-hidden rounded-xl
              border border-[#E7C9A5]/20 bg-[#0D0D0C] px-4 py-3
              text-sm leading-6 text-[#F8F2E6]
              placeholder:text-stone-500
              outline-none transition-all duration-200
              focus:border-[#E7C9A5]/70 focus:ring-2 focus:ring-[#E7C9A5]/10
              disabled:cursor-not-allowed disabled:opacity-60
              dark:border-[#B88A4B]/30 dark:bg-white/60
              dark:text-[#17130F] dark:placeholder:text-[#8C7962]
              dark:focus:border-[#A87938]/70 dark:focus:ring-[#A87938]/10
            "
          />

          <div className="flex items-center justify-between gap-3">
            <p className={`text-xs ${secondaryTextClass}`}>
              Maximum {MAX_COMMENT_LENGTH} characters
            </p>

            <p
              aria-live="polite"
              className={`text-xs tabular-nums ${comment.length >= MAX_COMMENT_LENGTH
                ? "text-amber-400 dark:text-[#8B642D]"
                : secondaryTextClass
                }`}
            >
              {comment.length}/{MAX_COMMENT_LENGTH}
            </p>
          </div>

          <div
            className={`mt-2 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between ${dividerClass}`}
          >
            <p className={`text-xs leading-5 ${secondaryTextClass}`}>
              Please keep your review helpful and respectful.
            </p>

            <CustomButton
              type="submit"
              color="yellow"
              text={isSubmitting ? "Submitting..." : "Submit review"}
              containerClassName="w-full cursor-pointer sm:w-auto sm:min-w-[150px]"
              loading={isSubmitting}
            />
          </div>
        </form>
      </motion.section>

      {/* Reviews list */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <p
              className={`text-xs font-medium uppercase tracking-[0.18em] ${accentTextClass}`}
            >
              Reader feedback
            </p>
            <h3 className={headingClass}>Reviews</h3>
          </div>

          <span className="rounded-full border border-[#E7C9A5]/25 bg-[#E7C9A5]/10 px-3 py-1.5 text-xs font-medium text-[#E7C9A5] dark:border-[#B88A4B]/30 dark:bg-[#A87938]/10 dark:text-[#8B642D]">
            {bookReviews.length} total
          </span>
        </div>

        {bookReviews.length > 0 ? (
          <div className="flex flex-col gap-3">
            {bookReviews.map((review, index) => {
              const reviewId = review._id;
              const reviewerName =
                typeof review.userId === "object" && review.userId !== null
                  ? review.userId.fullName
                  : "Reader";

              const isExpanded = expandedComments.includes(reviewId);
              const isLong = review.comment.length > 150;

              return (
                <motion.article
                  key={reviewId}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.35,
                    delay: shouldReduceMotion
                      ? 0
                      : Math.min(index * 0.05, 0.2),
                  }}
                  className="
                    group rounded-2xl border border-[#E7C9A5]/15
                    bg-[#171614] p-4 transition-colors duration-300
                    hover:border-[#E7C9A5]/40
                    dark:border-[#B88A4B]/25 dark:bg-[#F8F2E6]
                    dark:hover:border-[#A87938]/50
                    sm:p-5
                  "
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E7C9A5]/25 bg-[#E7C9A5]/10 text-sm font-semibold text-[#E7C9A5] dark:border-[#B88A4B]/30 dark:bg-[#A87938]/10 dark:text-[#8B642D]">
                      {(reviewerName || "R").charAt(0).toUpperCase()}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex min-w-0 flex-col gap-1">
                          <p className="truncate text-sm font-semibold text-[#F8F2E6] dark:text-[#17130F] sm:text-base">
                            {reviewerName}
                          </p>

                          {review.createdAt && (
                            <p className={`text-xs ${secondaryTextClass}`}>
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          )}
                        </div>

                        <div
                          className="flex items-center gap-0.5"
                          aria-label={`${review.rating} out of 5 stars`}
                        >
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              filled={i <= review.rating}
                              size="h-3.5 w-3.5"
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="whitespace-pre-line break-words text-sm leading-7 text-stone-300 dark:text-[#40372B]">
                          {isLong && !isExpanded
                            ? `${review.comment.slice(0, 150).trimEnd()}...`
                            : review.comment}
                        </p>

                        {isLong && (
                          <button
                            type="button"
                            onClick={() => toggleExpanded(reviewId)}
                            className="mt-2 text-xs font-semibold text-[#E7C9A5] transition-colors hover:text-white focus-visible:outline-none focus-visible:underline dark:text-[#8B642D] dark:hover:text-[#6F4D21]"
                          >
                            {isExpanded ? "Show less" : "Read more"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div
            className={`${panelClass} flex flex-col items-center gap-3 px-5 py-10 text-center`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E7C9A5]/15 bg-[#E7C9A5]/10 dark:border-[#B88A4B]/25 dark:bg-[#A87938]/10">
              <Star filled size="h-7 w-7" />
            </div>

            <h4 className="text-base font-semibold text-[#F8F2E6] dark:text-[#17130F]">
              No reviews yet
            </h4>

            <p className={`max-w-sm text-sm leading-6 ${secondaryTextClass}`}>
              Be the first to share your thoughts about this book.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default BookReviews;
