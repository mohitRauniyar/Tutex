import React, { useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [easeOfUse, setEaseOfUse] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hoveredEase, setHoveredEase] = useState(0);
  const [helpfulFeature, setHelpfulFeature] = useState("");
  const [recommend, setRecommend] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const handleRatingClick = (setter, value) => setter(value);
  const handleHover = (setter, value) => setter(value);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || easeOfUse === 0 || !helpfulFeature || !recommend) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          easeOfUse,
          helpfulFeature,
          recommend,
          comment,
          suggestion,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast.success("Thank you for your feedback!");
      // Reset form
      setRating(0);
      setEaseOfUse(0);
      setHelpfulFeature("");
      setRecommend("");
      setComment("");
      setSuggestion("");
      navigate("/")
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-20 max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl mb-6 font-bold text-primary">We Value Your Feedback</h1>
          <p>Please share your thoughts to help us improve our service</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Overall Rating */}
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">Overall Experience</label>
            <div className="flex justify-center space-x-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(setRating, star)}
                  onMouseEnter={() => handleHover(setHoveredRating, star)}
                  onMouseLeave={() => handleHover(setHoveredRating, 0)}
                >
                  <Star
                    size={32}
                    className={`${
                      (hoveredRating ? hoveredRating >= star : rating >= star)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
                
        </div>
          

          {/* Ease of Use */}
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">Ease of Use</label>
            <div className="flex justify-center space-x-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(setEaseOfUse, star)}
                  onMouseEnter={() => handleHover(setHoveredEase, star)}
                  onMouseLeave={() => handleHover(setHoveredEase, 0)}
                >
                  <Star
                    size={32}
                    className={`${
                      (hoveredEase ? hoveredEase >= star : easeOfUse >= star)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Most Helpful Feature */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Most Helpful Feature</label>
            <select
              className="w-full p-3 bg-gray-100 rounded"
              value={helpfulFeature}
              onChange={(e) => setHelpfulFeature(e.target.value)}
              required
            >
              <option value="">-- Select a Feature --</option>
              <option value="Walkthroughs">Walkthroughs</option>
              <option value="Practice Mode">Practice Mode</option>
              <option value="Simplicity">Simplicity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Recommendation */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Would you recommend Tutex?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="Yes" checked={recommend === "Yes"} onChange={(e) => setRecommend(e.target.value)} />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="No" checked={recommend === "No"} onChange={(e) => setRecommend(e.target.value)} />
                No
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="Not Sure" checked={recommend === "Not Sure"} onChange={(e) => setRecommend(e.target.value)} />
                Not Sure
              </label>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="block text-md font-medium text-gray-700">
              Comments (Optional)
            </label>
            <textarea
              placeholder="Please share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full resize-none bg-gray-100 p-4"
            />
          </div>

          {/* Suggestion */}
          <div className="space-y-2">
            <label className="block text-md font-medium text-gray-700">
              Any Suggestion or Confusing Part? (Optional)
            </label>
            <textarea
              placeholder="Tell us if something was confusing or needs improvement"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              rows={3}
              className="w-full resize-none bg-gray-100 p-4"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-md m-4 bg-[#30A0FE] text-white font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
      <Navbar />
    </div>
  );
};

export default Feedback;
