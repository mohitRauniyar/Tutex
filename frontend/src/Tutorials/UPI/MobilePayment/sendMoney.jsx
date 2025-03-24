import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

export default function sendMoneyPage() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [contactName1, setContactName] = useState("hi")
  const { name = "Unknown", number = "N/A", bankingName = "Unknown Bank" } = location.state || {};

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "" || parseInt(value, 10) <= 100000) {
      setAmount(value);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center p-4 bg-white">
      {/* Header Section */}
      <div className="w-full flex items-center gap-3 p-3 border-b">
  <IoArrowBack size={24} className="text-gray-600 cursor-pointer" onClick={() => navigate(-1)} />
  
  <FaUserCircle size={40} className="text-gray-400" />
  
  {(<div className="flex flex-col">
    <p className="text-lg font-medium">{name}</p>
    <p className="text-sm text-gray-500">{number}</p>
  </div>)}
</div>
      {/* Banking Info */}
      <div className="mt-130 text-center">
        <p className="text-sm text-gray-500">Your messages are secured with 256-bit encryption</p>
        <p className="mt-2 px-3 py-1 bg-black text-white text-sm rounded-full inline-block">
          Banking name: <span className="font-bold">{bankingName || contactName} ✅</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">Hi</button>
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">Send ₹1</button>
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">👋</button>
      </div>

      {/* Amount Input */}
      <div className="absolute bottom-4 w-full px-4">
        <div className="flex items-center border rounded-full p-2 shadow-sm">
          <input
            type="text"
            value={amount}
            onChange={handleChange}
            className="flex-1 text-lg outline-none px-3"
            placeholder="Enter amount or chat"
          />
          <button
            className={`px-4 py-2 rounded-full text-white font-medium ${amount ? "bg-green-500" : "bg-gray-300"}`}
            disabled={!amount} onClick={() => navigate("/tutorial/UPI/enter-pin")}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
