import { Star } from "lucide-react";
import { useRating } from "../hooks/useRating";

function RatingPanel({ targetName, targetRole, onSubmit }) {
  const {
    hoveredStar,  setHoveredStar,
    selectedStar,
    reviewText,   setReviewText,
    error,
    submitted,
    handleStarClick,
    handleSubmit,
  } = useRating({ onSubmit });

  if (submitted) {
    return (
      <div className="mt-2 bg-emerald-50 border border-emerald-300 rounded-xl p-5 text-center">
        <div className="flex justify-center mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={22}
              className={
                s <= selectedStar
                  ? "text-amber-400 fill-amber-400"
                  : "text-gray-300 fill-gray-300"
              }
            />
          ))}
        </div>
        <p className="text-sm font-semibold text-emerald-800">
          Rating submitted for {targetName}
        </p>
        {reviewText && (
          <p className="text-xs text-emerald-700 mt-1 italic">
            "{reviewText}"
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div>
        <p className="text-sm font-bold text-gray-800">
          Rate this {targetRole}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          How was your experience with{" "}
          <strong className="text-gray-700">{targetName}</strong>?
          A rating is required to close this job.
        </p>
      </div>

      {/* Star selector */}
      <div className="flex flex-col gap-2">
        <div
          className="flex gap-1"
          onMouseLeave={() => setHoveredStar(0)}
          role="group"
          aria-label="Star rating"
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const isActive = star <= (hoveredStar || selectedStar);
            return (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredStar(star)}
                aria-label={`Rate ${star} out of 5`}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  size={28}
                  className={
                    isActive
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300 fill-gray-300"
                  }
                />
              </button>
            );
          })}
        </div>

        {/* Star label */}
        {(hoveredStar || selectedStar) > 0 && (
          <p className="text-xs font-semibold text-amber-700">
            {STAR_LABELS[hoveredStar || selectedStar]}
          </p>
        )}

        {/* Validation error */}
        {error && (
          <p className="text-xs text-red-600 font-medium">{error}</p>
        )}
      </div>

      {/* Review textarea */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-700">
          Written Review
          <span className="text-gray-400 font-normal ml-1">(required)</span>
        </label>
        <textarea
          placeholder={`Share your experience with ${targetName}...`}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={2}
          required
          className="px-3 py-2 border border-amber-300 rounded-lg text-sm bg-white resize-none focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 bg-amber-500 text-white text-sm font-bold rounded-lg hover:bg-amber-600 active:scale-[0.99] transition-all"
        >
          <Star size={15} className="fill-white" />
          Submit Rating
        </button>
      </div>
    </form>
  );
}

const STAR_LABELS = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export default RatingPanel;
