import React, { useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Header from "../../../../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { HINTS } from "../../../../constants";

export default function PracticeOverlay({step, refs}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  
  const navigate = useNavigate();
  const hint = HINTS[step]["text"] || "No hints available for this section.";

  // Handle Quit Logic (Redirect or Quit Action)
  const handleQuit = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <div
        className={`fixed flex flex-col bottom-20 ${
          isCollapsed ? "-right-20" : "right-0"
        } z-40 bg-[#30A0FE] p-3 rounded-l-2xl h-40 transition-all duration-300 ease-in-out shadow-2xl shadow-black`}
      >
        {/* Toggle Button (Lightbulb Icon) */}
        <button
          className="absolute -left-8 top-1/2 transform -translate-y-1/2 border-2 border-[#30A0FE] bg-white rounded-full p-2 shadow-md"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <IoClose className={`text-xl transition-transform duration-300 ${isCollapsed ? "rotate-45" : "rotate-0"}`} />
        </button>

        <div
          className={`flex flex-col gap-8 justify-evenly items-center pt-3 ${
            isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
          } transition-opacity duration-300`}
        >
          {/* Pause Button - Opens Quit Modal */}
          <button
            className="py-2 px-4 rounded-sm shadow-black bg-white w-full"
            onClick={() => setShowModal(true)}
          >
            Pause
          </button>

          {/* Lightbulb Button - Opens Hint Modal */}
          <button className="bg-white rounded-full p-2" onClick={() => {
            setIsCollapsed(!isCollapsed)
            setShowHintModal(true)
          }}>
            <HiOutlineLightBulb className="text-[#30A0FE] text-2xl" />
          </button>
        </div>

        {/* Modal for Quit Confirmation */}
        {showModal && (<div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 w-full h-full">
              <Header />
              <div className="mt-20 p-8">
                <div className="flex gap-8">
                  <div className="bg-[url(/assets/Tutorials/phonepeBanner.png)] w-28 h-48 bg-contain">
                    <div className="w-full h-full bg-gradient-to-b from-transparent to-[#000]"></div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h1 className="text-2xl">Tutorial Title</h1>
                    <p className="opacity-50">Lesson-0</p>
                    <h1>Lesson Title</h1>
                    <p>Module Name</p>
                  </div>
                </div>
                <div className="flex justify-between my-16 gap-4">
                  {/* Continue Button */}
                  <button
                    onClick={handleQuit}
                    className="bg-red-500 text-white px-8 py-2 text-xl rounded-md"
                  >
                    Quit
                  </button>

                  {/* Quit Button */}
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-8 py-2 text-xl rounded-md bg-[#30A0FE] text-white"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hint Modal */}
        {showHintModal && (
          <div className="fixed inset-0 bg-[#000000dd] bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h1 className="text-xl font-bold">Hint</h1>
              <p className="mt-2 text-gray-700">{hint}</p>
              <button
                onClick={() => {setShowHintModal(false)
                  
                }}
                className="mt-4 bg-[#30A0FE] text-white px-4 py-2 rounded-md w-full"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
