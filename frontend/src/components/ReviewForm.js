import React, { useState } from "react";

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    // Send review to backend here
    if (onSubmit) onSubmit({ rating, text });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
      <div className="mb-2 font-semibold">Rate your experience:</div>
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={
              star <= rating
                ? "text-yellow-500 text-2xl"
                : "text-gray-300 text-2xl"
            }
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Write a review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="w-full bg-green-600 text-white py-2 rounded"
        type="submit"
      >
        Submit Review
      </button>
    </form>
  );
}
