import React from "react";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";

const RegisterPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-[url(/assets/background.png)]"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 w-full mt-94 h-full">
        <h3 className="text-xl font-bold text-center mt-4">Create your account</h3>
        <form className="mt-6">
          <div className="relative mb-4">
            <label className="block text-sm font-semibold">Username</label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full border-b-2 border-blue-400 focus:outline-none focus:border-blue-500 py-1 pr-8"
            />
            <span className="absolute right-2 top-7 text-gray-500"><CgProfile className="text-xl font-bold" /></span>
          </div>

          <div className="relative mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full border-b-2 border-blue-400 focus:outline-none focus:border-blue-500 py-1 pr-8"
            />
            <span className="absolute right-2 top-7 text-gray-500"><MdOutlineMail className="text-xl font-bold" /></span>
          </div>

          <div className="relative mb-4">
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border-b-2 border-blue-400 focus:outline-none focus:border-blue-500 py-1 pr-8"
            />
            <span className="absolute right-2 top-7 text-gray-500"><TbLockPassword className="text-xl font-bold" /></span>
          </div>
          <p className="text-sm -mt-2 text-[#007BFF] hover:underline hover: cursor-pointer">Forgot password?</p>

          <div className="flex justify-evenly mt-12">
            {/* Sign In Button */}
            <button
              type="submit"
              className="bg-[#007BFF] text-white px-6 py-2 rounded-md text-md font-medium "
            >
              SignUp
            </button>
            {/* Sign Up Button */}
            <button className="border-[#007BFF] border-1 px-7 py-2 rounded-md text-sm font-medium hover:bg-[#007BFF] hover:text-white">
              Login
            </button>
          </div>
        </form>
      </div> 
    </div>
  );
};

export default RegisterPage;
