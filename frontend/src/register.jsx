import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    DOB: "",
    gender: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Password Validation Function
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password
    const passwordError = validatePassword(formData.password);

    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }

    setPasswordError("");  // Clear any previous errors

    const dobDate = new Date(formData.DOB);
    const body = {
      name: formData.name,
      password: formData.password,
      DOB: {
        year: dobDate.getFullYear(),
        month: dobDate.getMonth() + 1, // Month is 0-based
        day: dobDate.getDate(),
      },
      gender: formData.gender,
      email: formData.email,
    };

    console.log("Request Body: ", body);

    // Example fetch request
    fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Please check your email for the OTP.");
        navigate("/register/verify");
        // You can redirect or show success message here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-cover bg-[url(/assets/background.png)] overflow-y-hidden">
      <div className="bg-white rounded-xl shadow-lg p-8 pb-12 w-full mt-64 fixed bottom-0">
        <h3 className="text-2xl font-bold text-center mt-4">
          Create your account
        </h3>
        <form className="mt-6 flex flex-col gap-3" id="registrationForm" onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <label className="block text-md font-semibold">Username</label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full border-b-2 border-blue-400 focus:outline-none focus:border-blue-500 py-1 pr-8"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            <span className="absolute right-2 top-7 text-gray-500">
              <CgProfile className="text-xl font-bold" />
            </span>
          </div>

          <div className="relative mb-4">
            <label className="block text-md font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full border-b-2 border-blue-400 focus:outline-none focus:border-blue-500 py-1 pr-8"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="absolute right-2 top-7 text-gray-500">
              <MdOutlineMail className="text-xl font-bold" />
            </span>
          </div>

          <div className="relative mb-4">
            <label className="block text-md font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border-b-2 border-blue-400 focus:outline-none focus:border-blue-500 py-1 pr-8"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="absolute right-2 top-7 text-gray-500">
              <TbLockPassword className="text-xl font-bold" />
            </span>
            {/* Show Password Validation Error */}
            {passwordError && (
              <div className="text-red-500 text-sm mt-2">{passwordError}</div>
            )}
          </div>

          <div className="relative mb-4">
            <label className="block text-md font-semibold">Date of Birth</label>
            <input
              type="date"
              className="w-full border-b-2 border-blue-400 focus:outline-none focus:border-blue-500 py-1 pr-2"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
            />
          </div>

          <div className="relative mb-4">
            <label className="block text-md font-semibold mb-2">Gender</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  className="mr-2"
                  checked={formData.gender === "M"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  className="mr-2"
                  checked={formData.gender === "F"}
                  onChange={handleChange}
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="0"
                  className="mr-2"
                  checked={formData.gender === "0"}
                  onChange={handleChange}
                />
                Others
              </label>
            </div>
          </div>

          <div className="flex justify-evenly mt-6">
            <button
              type="submit"
              className="bg-[#007BFF] text-white px-6 py-2 rounded-md text-md font-medium "
            >
              SignUp
            </button>
            <button
              type="button"
              className="border-[#007BFF] border-1 px-7 py-2 rounded-md text-sm font-medium hover:bg-[#007BFF] hover:text-white"
              onClick={()=>{navigate("/login")}}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
