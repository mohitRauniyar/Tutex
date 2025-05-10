import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearUserProfile } from "../redux/userSlice";
import { clearAssignment } from "../redux/currentAssignmentSlice";
import Loader from "../components/Loader";
import { FiEye,FiEyeOff } from "react-icons/fi";

export default function ResetPassword() {
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [newPassStatus, setNewPassStatus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatePassword = (password) => {
    let errorMessage = "";

    if (password.length < 8) {
      errorMessage = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      errorMessage = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errorMessage = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errorMessage = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errorMessage = "Password must contain at least one special character.";
    }

    return errorMessage;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setPasswordError("");

    const error = validatePassword(formData);
    if (error) {
      setPasswordError(error);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/password/forgot/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ password: formData }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Password Updated successfully!");
        setFormData("");
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to update password.");
        if (response.status === 401) {
          dispatch(clearUserProfile());
          dispatch(clearAssignment());
          toast.error("Session Expired");
          navigate("/login", { replace: true });
        }
      }
    } catch (error) {
      console.error("Internal server error:", error);
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
              onSubmit={handleReset}
              className="max-w-md mx-auto mt-6 p-8 rounded flex flex-col gap-6"
            >
              <div className="relative">
                <label className="block mb-2 text-lg font-medium">
                  New Password
                </label>
                <input
                  type={newPassStatus?"text":"password"}
                  value={formData}
                  placeholder="Create a new password"
                  onChange={(e) => setFormData(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <span
                  className="absolute top-12 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setNewPassStatus((prev) => !prev)}
                >
                  {newPassStatus ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </span>
                {passwordError && (
                  <div className="text-red-500 text-sm mt-2">
                    {passwordError}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 text-white rounded ${
                  loading ? "bg-gray-400" : "bg-[#30A0FE] hover:bg-blue-700"
                }`}
              >
                {loading ? "Setting..." : "Set Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
