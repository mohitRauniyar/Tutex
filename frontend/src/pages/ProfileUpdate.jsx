import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SettingCard from "../components/ui/SettingsCard";
import { clearUserProfile, setUserProfile } from "../redux/userSlice";
import { clearAssignment } from "../redux/currentAssignmentSlice";
import Loader from "../components/Loader";

export default function ProfileUpdate() {
  const userProfile = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
  });

  const [age, setAge] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const genderMap = {
    M: "Male",
    F: "Female",
    O: "Other",
  };

  useEffect(() => {
    if (userProfile) {
      const dobDate = new Date(userProfile.dob);
      setAge(new Date().getFullYear() - dobDate.getFullYear());

      setFormData({
        name: userProfile.name || "",
        dob: dobDate.toISOString().split("T")[0],
        gender: userProfile.gender || "",
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const [year, month, day] = formData.dob.split("-");

      const patchData = {
        name: formData.name.trim(),
        dob: {
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
        },
        gender: formData.gender,
        profileUrl: null,
      };

     
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/update`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(patchData),
        credentials:"include"
      })
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        dispatch(setUserProfile(data.body));
      } else {
        toast.error(data.message);
      }
      setIsEditing(false);
    } catch (error) {
        toast.error("Something went wrong while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/delete`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Account deleted successfully.");
        dispatch(clearUserProfile());
        dispatch(clearAssignment());
        navigate("/login", { relative: true });
      } else {
        toast.error(data.message || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error("Something went wrong. Please try again later.");
    }finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {loadingStatus ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-white flex flex-col">
          <Header />

          <div className="flex flex-row justify-evenly mt-28">
            <div className="w-32 h-32 mt-5 rounded-full flex justify-center items-center border-2 border-gray-300 bg-gray-200">
              {userProfile && userProfile.profileUrl ? (
                <img
                  src={userProfile.profileUrl}
                  className="w-full h-full rounded-full"
                  alt="dp"
                />
              ) : (
                <svg
                  className="w-25 h-25"
                  viewBox="0 0 24 24"
                  fill="#ccc"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="7" r="5" fill="#bbb" />
                  <path
                    d="M12 14c-5 0-9 3-9 5v2h18v-2c0-2-4-5-9-5z"
                    fill="#bbb"
                  />
                </svg>
              )}
            </div>
            {userProfile && (
              <div className="w-fit h-fit mt-5 flex flex-col gap-3">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-none focus:ring-0 pl-2 py-1 text-xl font-semibold rounded"
                      placeholder="Name"
                    />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="focus:border-0 pl-2 py-1 rounded"
                    />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="focus:border-0 pl-2 py-1 rounded"
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold">{formData.name}</h2>
                    <p className="text-sm text-gray-600">{userProfile.email}</p>
                    <p className="text-sm text-gray-600">Age: {age}</p>
                    <p className="text-sm text-gray-600">
                      Gender: {genderMap[formData.gender]}
                    </p>
                  </>
                )}

                {isEditing ? (
                  <div className="flex gap-3 justify-between">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className={`px-5 py-1 w-full text-white rounded ${
                        loading ? "bg-gray-400" : "bg-[#30A0FE]"
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Saving...
                        </div>
                      ) : (
                        "Save"
                      )}
                    </button>

                    {/* ✅ Cancel Button */}
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        const dobDate = new Date(userProfile.dob);
                        setFormData({
                          name: userProfile.name || "",
                          dob: dobDate.toISOString().split("T")[0],
                          gender: userProfile.gender || "",
                        });
                      }}
                      className="px-5 py-1 text-gray-700 border border-gray-400 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-[#30A0FE] border-1 px-7 py-1 text-white rounded"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-8">
            <SettingCard
              name="Delete Account"
              handleNext={handleDeleteAccount}
            />
            <SettingCard
              name="Change Password"
              handleNext={() => {
                navigate("/profile/update/password");
              }}
            />
          </div>
          <Navbar />
        </div>
      )}
    </>
  );
}
