import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import AssessmentOverlay from "./Overlays/AssessmentOverlay";
import WalkthroughOverlay from "./Overlays/WalkthroughOverlay";
import PracticeOverlay from "./Overlays/PracticeOverlay";
import { MODES } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearUserProfile } from "../../../redux/userSlice";
import { clearAssignment } from "../../../redux/currentAssignmentSlice";
import Loader from "../../../components/Loader";

const EnterPin = () => {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { amount, bankName } = location.state;
  const { mode } = useParams();
  const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
  const { assignmentId, lessonId, moduleName } = useSelector(
    (state) => state.currentAssignment
  );
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  // Check if the pin is correct
  const isPinCorrect = pin === "0000";

  // Handle Keypad Input
  const handleKeyPress = async (value) => {
    if (value === "clear") {
      setPin(pin.slice(0, -1)); // Remove last character
    } else if (value === "submit") {
      if (isPinCorrect) {
        try {
          setLoading(true);
          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/user/complete?assignmentId=${assignmentId}&lessonId=${lessonId}&moduleName=${moduleName}`,
            {
              method: "GET", // (assuming your backend expects a GET request)
              credentials: "include", // <-- Important to send your auth-token cookie
            }
          );
          if (response.status === 401) {
            dispatch(clearUserProfile());
            dispatch(clearAssignment());
            toast.error("Session Expired");
            navigate("/login");
            return;
          }
          if (response.ok) {
            dispatch(clearAssignment());
            toast.success("Successfully marked completed.");
            navigate(`/modules/${assignmentId}/${lessonId}`);
          } else {
            toast.error(
              "Failed to mark assignment complete. Please try again."
            );
            setPin("");
            setAttempts(attempts + 1);
            if (attempts >= 3) {
              toast.error("Internal Server Error. Try again later.");
              navigate(`/modules/${assignmentId}/${lessonId}`);
            }
          }
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong! Please try again.");
          setPin("");
          setAttempts(attempts + 1);
          if (attempts >= 3) {
            navigate(`/modules/${assignmentId}/${lessonId}`);
          }
        } finally {
          setLoading(false);
        }
      } else {
        alert("Incorrect UPI PIN. Please try again!");
      }
    } else if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  // Render masked pin input
  const renderPin = () => {
    return (
      <div className="flex justify-center space-x-4 my-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-8 h-8 border-b-2 border-gray-500">
            {pin[index] ? (
              <div className="w-2 h-2 bg-black rounded-full mx-auto mt-2"></div>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  // Keypad buttons
  const keypadValues = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["clear", 0, "submit"],
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen bg-gray-100 flex flex-col justify-between">
          {mode === MODES.WALKTHROUGH && !isWalkthroughComplete && (
            <WalkthroughOverlay
              step="EnterPin"
              refs={{}}
              onComplete={() => setIsWalkthroughComplete(true)}
            />
          )}
          {mode === MODES.PRACTICE && (
            <PracticeOverlay step="Enter_Pin_Value" refs={{}} />
          )}
          {mode === MODES.ASSESSMENT && <AssessmentOverlay />}
          {/* Header Section */}
          <div className="">
            <div className="p-4 bg-white shadow-md flex justify-between items-center">
              <p className="text-sm text-gray-500">Your Bank Name</p>
              <img src="/upi-logo.png" alt="UPI" className="h-4" />
            </div>

            {/* Transaction Details */}
            <div className="p-4">
              <div className="flex w-full justify-between">
                <p className="text-xs text-gray-500">To:</p>
                <p className="text-sm font-bold">XYZ</p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-xs text-gray-500">Sending:</p>
                <p className="text-lg font-bold text-black">₹ {amount}</p>
              </div>
            </div>
          </div>

          {/* Pin Entry Section */}
          <div className="text-center">
            <p className="text-sm text-gray-500">ENTER 4-DIGIT UPI PIN</p>
            {renderPin()}

            {/* Alert Message */}
            <div className="mt-4 bg-yellow-100 text-xs text-black px-4 py-2 rounded-md">
              <span className="text-orange-600 font-bold mr-1">⚠️</span>
              You are transferring money from your Bank Name account to{" "}
              <span className="font-bold">{bankName}</span>
            </div>
          </div>

          {/* Custom Keypad */}
          <div className="bg-white p-4 grid grid-cols-3 gap-4">
            {keypadValues.flat().map((item, index) => (
              <button
                key={index}
                className={`py-3 font-bold text-center flex justify-center items-center ${
                  item === "submit"
                    ? "text-blue-600 rounded-full"
                    : "text-black"
                } ${item === "clear" ? "text-red-500" : "text-xl"}`}
                onClick={() => handleKeyPress(item)}
              >
                {item === "clear" ? (
                  <MdCancel className="text-3xl" />
                ) : item === "submit" ? (
                  <FaCheckCircle className="text-4xl" />
                ) : (
                  item
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EnterPin;
