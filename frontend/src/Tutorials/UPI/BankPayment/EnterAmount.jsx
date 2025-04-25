import { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import WalkthroughOverlay from "./Overlays/WalkthroughOverlay";
import PracticeOverlay from "./Overlays/PracticeOverlay";
import AssessmentOverlay from "./Overlays/AssessmentOverlay";
import { MODES } from "../../../constants.js";

export default function EnterAmount() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const name = "XYZ";
  const number = "DhanLaxmi Bank";
  const bankingName = "XYZ";
  const inputRef = useRef();
  const { mode } = useParams();
  const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
  const headRef = useRef();

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "" || parseInt(value, 10) <= 100000) {
      setAmount(value);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center p-4 bg-white">
      {mode === MODES.WALKTHROUGH && !isWalkthroughComplete && (
        <WalkthroughOverlay
          step="EnterAmount"
          refs={{
            inputRef,
            headRef,
          }}
          onComplete={() => setIsWalkthroughComplete(true)}
        />
      )}
      {mode === MODES.PRACTICE && (
        <PracticeOverlay step="UPI_QR_enterAmount" refs={{}} />
      )}
      {mode === MODES.ASSESSMENT && <AssessmentOverlay />}
      {/* Header Section */}

      <div
        className="w-full flex items-center gap-3 p-3 border-b"
        ref={headRef}
      >
        <IoArrowBack
          size={24}
          className="text-gray-600 cursor-pointer"
          onClick={mode === "walkthrough" ? null : () => navigate(-1)}
        />

        <FaUserCircle size={40} className="text-gray-400" />

        {
          <div className="flex flex-col">
            <p className="text-lg font-medium">{name}</p>
            <p className="text-sm text-gray-500">{number}</p>
          </div>
        }
      </div>
      {/* Banking Info */}
      <div className="mt-130 text-center">
        <p className="mt-2 px-3 py-1 bg-black text-white text-sm rounded-full inline-block">
          Banking name: <span className="font-bold">{bankingName} ✅</span>
        </p>
      </div>

      {/* Amount Input */}
      <div className="mt-auto w-full px-4">
        <div className="w-full mt-auto flex justify-end">
          <button className="px-4 py-2 mb-2 border-gray-400 border-2 border-dashed rounded-full text-sm">
            Send ₹1
          </button>
        </div>
        <div
          className="flex items-center border rounded-full p-2 shadow-sm"
          ref={inputRef}
        >
          <input
            type="text"
            value={amount}
            onChange={handleChange}
            className="flex-1 text-lg outline-none px-3"
            placeholder="Enter amount or chat"
          />
          <button
            className={`px-4 py-2 rounded-full text-white font-medium ${
              amount ? "bg-green-500" : "bg-gray-300"
            }`}
            disabled={!amount}
            onClick={() =>
              navigate(`/tutorial/UPI/Bank/enter-bank-pin/${mode}`, { state: { amount: amount } })
            }
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
