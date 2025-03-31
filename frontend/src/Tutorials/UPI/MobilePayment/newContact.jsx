import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

export default function NumberSearch() {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setNumber(value);
    }
  };

  const handleContactClick = () => {
    if (number.length === 10) {
      navigate("/tutorial/UPI/send-money", {
        state: {
          name: "Unknown",
          number: number,
          bankingName: "Person1"
        }
      });
    }
  };

  return (
    <div className="p-2 max-w-md mx-auto bg-gray-100 min-h-screen">
      <div className="flex items-center pb-2 bg-white rounded fixed top-0 left-0 right-0 z-10 h-15">
        <button onClick={() => navigate('/tutorial/UPI/to-contact')} className="mr-2 ml-3">
          <ArrowLeft size={24} />
        </button>
        <input
          type="text"
          value={number}
          onChange={handleInputChange}
          placeholder="Enter number"
          className="w-full p-2 outline-none text-lg bg-white rounded "
        />
      </div>
      {number && (
        <div className="mt-15 p-1 shadow-md bg-white rounded-lg">
          <h3 className="text-gray-600 font-semibold pl-3">Search Results</h3>
          <div 
            className="flex items-center mt-1 p-2 bg-white rounded-lg cursor-pointer"
            onClick={handleContactClick}
          >
            <FaUserCircle size={40} className="text-gray-500" />
            <div className="ml-3">
              <p className="text-black font-semibold">New Number</p>
              <p className="text-gray-500">{number}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
