import { useState } from "react";

export function useRating({ onSubmit }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [reviewText, setReviewText]     = useState("");
  const [error, setError]               = useState("");
  const [submitted, setSubmitted]       = useState(false);

  function handleStarClick(star) {
    setSelectedStar(star);
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedStar === 0) {
      setError("Please select a star rating before submitting.");
      return;
    }

    setSubmitted(true);
    onSubmit({ score: selectedStar, reviewText });
  }

  function reset() {
    setHoveredStar(0);
    setSelectedStar(0);
    setReviewText("");
    setError("");
    setSubmitted(false);
  }

  return {
    hoveredStar,  setHoveredStar,
    selectedStar,
    reviewText,   setReviewText,
    error,
    submitted,
    handleStarClick,
    handleSubmit,
    reset,
  };
}
