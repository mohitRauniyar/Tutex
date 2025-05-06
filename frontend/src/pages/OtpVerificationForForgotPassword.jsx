import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"

export default function OtpVerificationForForgotPassword(){
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/password/forgot/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ "otp":otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ OTP Verified Successfully!");
        toast.success(data.message)
        navigate("/password/reset");
        
      } else {
        setMessage(`❌ Error: ${data.message || "Invalid OTP"}`);
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("❌ Network Error");
      toast.error(data.message)
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-[url(/assets/background.png)]">
      <div className="bg-white rounded-xl p-8 w-95 mt-94 h-108">
        <h3 className="text-xl font-bold text-center mt-4">Enter OTP sent to your mail</h3>
        <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-6">
            <label className="block text-sm font-semibold mb-2" htmlFor="otp">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter 6-digit OTP"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {message && (
            <p className="text-center mt-4 text-sm font-medium">
              {message}
            </p>
          )}
        </form>
        
      </div>
    </div>
  );
};

