import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

function WalkthroughOverlay({ step }) {
  // Instruction Steps per Page
  const instructions = {
    landing: [
      "This is the home page where you can access all UPI options.",
      "Click on 'To mobile number' to transfer money using mobile number.",
      "Click on the QR icon to scan a QR code.",
      "You can check balance by clicking on the 'Check balance' option.",
    ],
    qr: [
      "Tap the QR icon to open the scanner.",
      "Drag the QR code image to the scanning area.",
      "Wait for the QR code to be scanned automatically.",
    ],
    payment: [
      "Enter the amount and click proceed.",
      "Review the details and confirm the payment.",
      "Enter your UPI PIN and complete the transaction.",
    ],
  };

  // State to track current step
  const [currentStep, setCurrentStep] = useState(0);

  // Total Steps for the current page
  const totalSteps = instructions[step]?.length || 0;

  // Handle Next Step
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Handle Previous Step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Hide overlay if all steps are completed
  if (currentStep >= totalSteps) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#353535b4] bg-opacity-50 flex justify-center items-center text-white z-50">
      <div className="p-4 bg-[#6510C5] text-white rounded-lg shadow-lg max-w-sm text-center">
        <p className="mb-4">{instructions[step][currentStep]}</p>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-lg ${
              currentStep === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-white text-black"
            }`}
          >
            <AiOutlineArrowLeft className="inline mr-1" />
            Previous
          </button>

          {/* Step Counter */}
          <span className="text-sm text-gray-300">
            Step {currentStep + 1} of {totalSteps}
          </span>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className={`px-4 py-2 rounded-lg ${
              currentStep === totalSteps - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-white text-black"
            }`}
          >
            Next
            <AiOutlineArrowRight className="inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalkthroughOverlay;
