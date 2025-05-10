import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserProfile } from "../redux/userSlice";
import { clearAssignment } from "../redux/currentAssignmentSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TbEye,TbEyeOff } from "react-icons/tb";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [oldPassStatus, setOldPassStatus] = useState(false);
  const [newPassStatus, setNewPassStatus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Validate new password
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

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validate new password only
    const newPasswordError = validatePassword(formData.newPassword);

    if (newPasswordError) {
      setPasswordError(newPasswordError);
      return;
    }

    setPasswordError(""); // Clear any previous error

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/password/change`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      if (response.status === 401) {
        dispatch(clearUserProfile());
        dispatch(clearAssignment());
        navigate("/login", { replace: true });
        return;
      }
      const data = await response.json();

      if (response.ok) {
        toast.success("Password changed successfully!");
        setFormData({ oldPassword: "", newPassword: "" });
        handleLogout();
      } else {
        toast.error(data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signout`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.status === 401) {
        dispatch(clearUserProfile());
        dispatch(clearAssignment());
        navigate("/login", { replace: true });
        return;
      }
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch(clearUserProfile());
        dispatch(clearAssignment());
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />
      <div className="mt-20">
        <form
          onSubmit={handleChangePassword}
          className="max-w-md mx-auto mt-6 p-4 rounded flex flex-col gap-6"
        >
          <h1 className="text-3xl font-semibold">Change Password</h1>

          {/* Old Password Input */}
          <div className="relative">
            <label className="block mb-2 text-lg font-medium">
              Old Password
            </label>
            <input
              type={oldPassStatus ? "text" : "password"}
              value={formData.oldPassword}
              placeholder="Enter old password here"
              onChange={(e) =>
                setFormData({ ...formData, oldPassword: e.target.value })
              }
              required
              className="w-full px-3 py-2 border rounded pr-10"
            />
            <span
              className="absolute top-12 right-3 text-gray-500 cursor-pointer"
              onClick={() => setOldPassStatus((prev) => !prev)}
            >
              {oldPassStatus ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </span>
            {passwordError && (
              <div className="text-red-500 text-sm mt-2">{passwordError}</div>
            )}
          </div>

          {/* New Password Input */}
          <div className="relative">
            <label className="block mb-2 text-lg font-medium">
            New Password
            </label>
            <input
              type={newPassStatus ? "text" : "password"}
              value={formData.newPassword}
              placeholder="Enter new password here"
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              required
              className="w-full px-3 py-2 border rounded pr-10"
            />
            <span
              className="absolute top-12 right-3 text-gray-500 cursor-pointer"
              onClick={() => setNewPassStatus((prev) => !prev)}
            >
              {newPassStatus ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </span>
            {passwordError && (
              <div className="text-red-500 text-sm mt-2">{passwordError}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white rounded ${
              loading ? "bg-gray-400" : "bg-[#30A0FE] hover:bg-blue-700"
            }`}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
      <Navbar />
    </div>
  );
}
