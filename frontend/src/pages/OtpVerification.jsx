import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const OTP_VALIDITY_SECONDS = 120;
  const [timeLeft, setTimeLeft] = useState(OTP_VALIDITY_SECONDS);
  const [resendActive, setResendActive] = useState(false);
  const startTimeRef = useRef(Date.now()); // Track when OTP screen is loaded

  useEffect(()=>{
    if(!resendActive){
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const remaining = OTP_VALIDITY_SECONDS - elapsed;
  
        if (remaining > 0) {
          setTimeLeft(remaining);
        } else {
          setTimeLeft(0);
          setResendActive(true);
          clearInterval(interval);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }
  },[resendActive]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies if needed
        body: JSON.stringify({ otp: otp, resendStatus: false }),
      });

      const data = await response.json();

      if (response.ok) {
        // setMessage("✅ OTP Verified Successfully!");
        toast.success(data.message);
        navigate("/login");
      } else {
        // setMessage(`❌ Error: ${data.message || "Invalid OTP"}`);
        toast.error(data.message);
        if(response.status === 401){
          navigate("/register",{replace:true});
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // setMessage("❌ Network Error");
      toast.error("Network Error");
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
        body: JSON.stringify({ otp: "", resendStatus: true }),
      });

      const data = await response.json();
     
      if (response.ok) {
        toast.success(data.message);
        if(data.verified){
          setMessage("✅ OTP Verified Successfully!");
          navigate("/login");
        }else{
          console.log("OTP resent");
          startTimeRef.current = Date.now(); // Reset the start time
          setTimeLeft(OTP_VALIDITY_SECONDS); // Reset timer
          setResendActive(false);
        }
      } else {
        toast.error(data.message);
        if(response.status === 401){
          navigate("/register",{replace:true});
        }
        // setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // setMessage("❌ Network Error");
      toast.error("Network Error");
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

          {/* {message && (
            <p className="text-center mt-4 text-sm font-medium">
              {message}
            </p>
          )} */}
        </form>

        <p className="text-xl text-gray-600 mb-2 mt-2">
          Time remaining: <span className="font-bold">{formatTime(timeLeft)}</span>
        </p>

        <button
          onClick={handleResendOTP}
          className={`px-4 py-2 rounded-md text-white font-semibold cursor-pointer ${
            resendActive ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!resendActive}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}
