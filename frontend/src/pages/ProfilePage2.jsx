import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SettingCard from "../components/ui/SettingsCard";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Logout from "../components/ui/Logout";
import { clearUserProfile } from "../redux/userSlice";
import { clearAssignment } from "../redux/currentAssignmentSlice";
import Loader from "../components/Loader";
import { setLoading } from "../redux/loadingSlice";

export default function ProfilePage2() {
  const [age, setAge] = useState(0);
  const userProfile = useSelector((state) => state.user.userProfile);
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const navigate = useNavigate();
  const [signOut, setSignOut] = useState(false);
  const dispatch = useDispatch();

  const gender = {
    M: "Male",
    F: "Female",
  };
  const map = {
    "Account Settings": "/profile/update",
    Preferences: "/profile/preferences",
    "Language Settings": "/profile/language",
    Accessebility: "/profile/accessibility",
    "Help Center": "/profile/help",
    "Privacy Policy": "/profile/privacy",
  };
  useEffect(() => {
    if (userProfile != null) {
      setAge(new Date().getFullYear() - parseInt(userProfile.dob));
    }
  }, [userProfile]);

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      setSignOut(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signout`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else toast.success(data.message);
      dispatch(clearUserProfile());
      dispatch(clearAssignment());
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Request failed");
    } finally {
      setSignOut(false);
      dispatch(setLoading(false));
    }
  };

  const handleClick = (e) => {
    navigate(map[e.target.textContent]);
  };
  return (
    <>
      {loadingStatus ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-white flex flex-col">
          {/* Header */}
          <Header />

          {/* Profile Info */}
          <div className="flex flex-row justify-evenly mt-27">
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
              <div className="w-fit h-fit mt-5 flex flex-col gap-2">
                <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
                <p className="text-sm text-gray-600">{userProfile.email}</p>
                <p className="text-sm text-gray-600">Age: {age}</p>
                <p className="text-sm text-gray-600">
                  Gender: {gender[userProfile.gender]}
                </p>
                {/* <button className="bg-[#30A0FE] border-1 px-7 text-white absolute right-0 mt-4" onClick={()=>{navigate("/profile/update")}}>Edit</button> */}
              </div>
            )}
          </div>

          <div className="h-full w-full mt-22 mb-20">
            <SettingCard name="Account Settings" handleNext={handleClick} />
            <SettingCard name="Preferences" handleNext={handleClick} />
            <SettingCard name="Language Settings" handleNext={handleClick} />
            <SettingCard name="Accessebility" handleNext={handleClick} />
            <SettingCard name="Help Center" handleNext={handleClick} />
            <SettingCard name="Privacy Policy" handleNext={handleClick} />
            <Logout handleLogout={handleLogout} disabled={signOut} />
          </div>
          <Navbar />
        </div>
      )}
    </>
  );
}
