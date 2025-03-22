import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { CiBank } from "react-icons/ci";

function EnterAmount() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const navigate = useNavigate();

  // Check if amount is valid to enable button
  const isAmountValid = amount !== "" && parseFloat(amount) > 0;

  // Handle Proceed to Pay
  const handleProceedToPay = () => {
    if (isAmountValid) {
      setShowPaymentSheet(true);
    }
  };

  // Handle Pay Now
  const handlePayNow = () => {
    navigate("/tutorial/UPI/enter-pin", {state: {amount: amount}});
  };

  return (
    <div className="bg-gray-100 relative">
      {/* Header Section */}
      <div className="flex items-center p-4 bg-white shadow-md">
        <button className="text-black text-xl">&larr;</button>
        <p className="text-lg font-bold ml-4">Pay</p>
      </div>

      {/* User Details Card */}
      <div
        className={`bg-white mx-4 mt-4 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          showPaymentSheet ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
            <span className="text-sm font-bold">AC</span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-bold">Recipient Account Name</p>
            <p className="text-xs text-gray-500">UPI ID of recipient</p>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mt-4 border border-purple-500 rounded-lg flex items-center p-3">
          <span className="text-lg font-bold mr-2">₹</span>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full focus:outline-none text-gray-700 text-lg placeholder-gray-400"
          />
        </div>

        {/* Add Message Input */}
        <input
          type="text"
          placeholder="Add a message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-4 w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none"
        />
      </div>

      {/* Proceed to Pay Button */}
      <div
        className={`p-4 bg-white shadow-md fixed bottom-0 left-0 w-full transition-all duration-300 ${
          showPaymentSheet ? "opacity-50" : "opacity-100"
        }`}
      >
        <button
          className={`w-full text-white font-bold py-3 rounded-lg ${
            isAmountValid ? "bg-purple-600" : "bg-gray-300"
          }`}
          onClick={handleProceedToPay}
          disabled={!isAmountValid}
        >
          Proceed To Pay
        </button>
      </div>

      {/* Dark Overlay When Modal is Opened */}
      {showPaymentSheet && (
        <div
          className="fixed inset-0 bg-[#2222229c] bg-opacity-50 transition-opacity duration-300"
          onClick={() => setShowPaymentSheet(false)} // Close on clicking outside
        ></div>
      )}

      {/* Payment Bottom Sheet (Modal) */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg transition-transform duration-300 ${
          showPaymentSheet ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Close Button and Total Payable */}
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-bold">Total payable</h3>
          <div className="flex gap-4 items-center">
            <p className="text-3xl font-bold text-black">₹{amount || "0"}</p>
            <button
                onClick={() => setShowPaymentSheet(false)}
                className="text-3xl"
            >
                &times;
            </button>
          </div>
        </div>

        {/* Recommended Bank */}
        <div className="bg-gray-200 p-2 flex flex-col gap-2">

        <div className="p-4 bg-white rounded-lg">
          <p className="text-xs text-gray-500 mb-4">Recommended</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full mr-2"></div>
              <div>
                <p className="text-sm font-semibold">Your Bank Name</p>
                <p className="text-xs text-gray-500">
                  •• XXXX <span className="text-xs ml-1">UPI</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-lg">
                <p className="font-bold text-black">₹{amount || "0"}</p>
                <FaCheckCircle className="text-green-600"/>
            </div>
          </div>
        </div>

        {/* Add Bank Section */}
        <div className="p-4 bg-white rounded-lg">
          <p className="text-xs text-gray-500 mb-4">Add payment methods</p>
          <div className="flex items-center gap-3">
            <CiBank className="text-2xl"/>
            <p className="text-sm">Add bank accounts</p>
          </div>
        </div>

        </div>
        {/* Pay Button */}
        <div className="p-4 bg-white shadow-md">
          <button
            onClick={handlePayNow}
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg"
            >
            Pay ₹{amount || "0"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnterAmount;