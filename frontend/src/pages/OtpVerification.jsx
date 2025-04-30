import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"

export default function OtpVerification(){
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds
  const [resendActive, setResendActive] = useState(false);

  useEffect(() => {
    let timer;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      setResendActive(true); // Enable resend after timer ends
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies if needed
        body: JSON.stringify({ "otp":otp , resendStatus:false }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ OTP Verified Successfully!");
        toast.success(data.message)
        navigate("/login");
        
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
  const handleResendOTP = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies if needed
        body: JSON.stringify({ "otp":"" , resendStatus:true }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ OTP Verified Successfully!");
        toast.success(data.message)
        navigate("/login");
        
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
    console.log('OTP resent'); // Add your resend OTP logic here
    setTimeLeft(120); // Reset timer
    setResendActive(false);
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
        <p className="text-xl text-gray-600 mb-2 mt-2">
        Time remaining: <span className="font-bold">{formatTime(timeLeft)}</span>
        </p>

        <button
          onClick={handleResendOTP}
          className={`px-4 py-2 rounded-md text-white font-semibold cursor-pointer ${
            resendActive ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!resendActive}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

