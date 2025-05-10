import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegCircleQuestion,FaRegImage  } from "react-icons/fa6";
import { BiSolidTorch } from "react-icons/bi";
import { MODES } from "../../../constants";
import WalkthroughOverlay from "./Overlays/WalkthroughOverlay";
import PracticeOverlay from "./Overlays/PracticeOverlay";
import AssessmentOverlay from "./Overlays/AssessmentOverlay";


function ScanQR() {
  const { mode } = useParams();

  const qrCodeRef = useRef(null);
  const uploadQRRef = useRef(null);
  const scanningArea = useRef(null);
  const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const navigate = useNavigate();

  // Handle QR Drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDropped(true);
    setTimeout(() => {
      navigate(`/tutorial/UPI/enter-amount/${mode}`);
    }, 1000);
  };

  // Allow drag over to enable dropping
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {mode === MODES.WALKTHROUGH && !isWalkthroughComplete && (
        <WalkthroughOverlay
          step="qrScanning"
          refs={{
            qrCodeRef, uploadQRRef, scanningArea
          }}
            onComplete={() => setIsWalkthroughComplete(true)}
        />
      )}
      {mode === MODES.PRACTICE && (
        <PracticeOverlay
          step="UPI_QR_qrScanning"
          refs = {{qrCodeRef, scanningArea}}
        />
      )}
      {mode === MODES.ASSESSMENT && (
              <AssessmentOverlay/>
            )}
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 absolute top-0 w-full">
        <div className="flex gap-4">
            <button className="text-black text-lg">&larr;</button>
            <p className="text-black text-lg font-bold">Scan any QR</p>
        </div>
        <FaRegCircleQuestion/>
      </div>

      {/* QR Scanning Box */}
      <div
        className="absolute top-30 left-[50%] -translate-x-[50%] flex justify-center items-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        
      >
        <div
          className={`w-64 h-64 relative bg-black bg-opacity-40 rounded-lg ${
            isDropped
              ? "border-4 border-green-500"
              : "border-dashed border-4 border-purple-500"
          }` } ref={scanningArea}
        >
          {/* Purple Corner Borders */}
          <div className="absolute top-1 left-1 w-6 h-6 border-t-4 border-l-4 border-purple-500"></div>
          <div className="absolute top-1 right-1 w-6 h-6 border-t-4 border-r-4 border-purple-500"></div>
          <div className="absolute bottom-1 left-1 w-6 h-6 border-b-4 border-l-4 border-purple-500"></div>
          <div className="absolute bottom-1 right-1 w-6 h-6 border-b-4 border-r-4 border-purple-500"></div>

          {/* Dragged QR Box */}
          {isDropped ? (
            <div className="flex justify-center items-center w-full h-full">
              <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full text-white text-sm">
              Drag QR into this area
            </div>
          )}
        </div>
      </div>

      {/* Draggable QR Box */}
      {!isDropped && (
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", "qr");
          }}
        >
          <div className="w-48 h-48 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center" ref={qrCodeRef}>
            <img src="/assets/Tutorials/UPI/QRPayments/qrCode.webp" alt="" />
          </div>
        </div>
      )}

      {/* Upload & Torch Buttons */}
      <div className="absolute top-100 w-full flex justify-center gap-8 -z-10">
        <div className="flex flex-col items-center" ref={uploadQRRef}>
          <div className="w-12 h-12 bg-gray-200 flex justify-center items-center text-xl rounded-full mb-2" ><FaRegImage /></div>
          <p className="text-black text-xs">Upload QR</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-200 flex justify-center items-center text-2xl rounded-full mb-2"><BiSolidTorch /></div>
          <p className="text-black text-xs">Torch</p>
        </div>
      </div>
    </div>
  );
}

export default ScanQR;
