import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Install it if you haven't: npm install axios
import { setUserProfile } from "./redux/userSlice";
import toast from "react-hot-toast";
import Loader from "./components/Loader";
import { setLoading } from "./redux/loadingSlice";

const LoginPage = () => {
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        dispatch(setUserProfile(response.data.body.userProfile)); // store in Redux
        // localStorage.setItem(
        //   "userProfile",
        //   JSON.stringify(response.data.body.userProfile)
        // ); // store in LocalStorage
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Login failed. Please check your credentials.");
    }finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {loadingStatus ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-[url(/assets/background.png)]">
          <div className="bg-white rounded-xl p-8 w-full absolute bottom-8 h-108">
            <h3 className="text-2xl font-bold text-center mt-6">Login</h3>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <label className="block text-md font-semibold">Username</label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-b-2 border-blue-400 focus:outline-none focus:border-blue-500 py-1 pr-8"
                />
                <span className="absolute right-2 top-7 text-gray-500">
                  <CgProfile className="text-xl font-bold" />
                </span>
              </div>

              <div className="relative mb-4">
                <label className="block text-md font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b-2 border-blue-400 focus:outline-none focus:border-blue-500 py-1 pr-8"
                />
                <span className="absolute right-2 top-7 text-gray-500">
                  <TbLockPassword className="text-xl font-bold" />
                </span>
              </div>
              <p
                className="text-sm -mt-2 text-[#007BFF] hover:underline cursor-pointer font-semibold"
                onClick={() => {
                  navigate("/password/forgot");
                }}
              >
                Forgot password?
              </p>

              <div className="flex justify-evenly mt-12">
                <button
                  type="submit"
                  className="bg-[#007BFF] text-white px-8 py-2 rounded-md text-md font-medium "
                >
                  LogIn
                </button>
                <button
                  type="button"
                  className="border-[#007BFF] border-1 px-6 py-2 rounded-md text-sm font-medium hover:bg-[#007BFF] hover:text-white"
                  onClick={() => navigate("/register")} // Redirect to signup page
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
