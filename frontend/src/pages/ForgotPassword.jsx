import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

export default function ForgotPassword() {
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const navigate = useNavigate();
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/password/forgot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email: formData }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP sent successfully!");
        setFormData("");
        navigate("/password/forgot/otp");
      } else {
        toast.error(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("OTP send error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loadingStatus ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-white flex flex-col bg-cover bg-center bg-[url(/assets/background.png)]">
          <div className="absolute bottom-40 w-full">
            <h1 className="text-3xl font-semibold text-center">
              Reset Password
            </h1>
            <form
              onSubmit={handleSendOtp}
              className="max-w-md mx-auto mt-6 p-8 rounded flex flex-col gap-6"
            >
              <div className="">
                <label className="block mb-2 text-lg font-medium">Email</label>
                <input
                  type="email"
                  value={formData}
                  placeholder="Enter your registered email"
                  onChange={(e) => setFormData(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 text-white rounded ${
                  loading ? "bg-gray-400" : "bg-[#30A0FE] hover:bg-blue-700"
                }`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
