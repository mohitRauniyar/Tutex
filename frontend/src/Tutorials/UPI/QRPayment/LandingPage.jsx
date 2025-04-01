import React, { useState, useRef } from "react";
import {Link} from "react-router-dom"
import { IoCallOutline } from "react-icons/io5";
import { BiSolidBank } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import {GrHomeRounded} from "react-icons/gr"
import {IoIosSearch } from "react-icons/io";
import {GoBell } from "react-icons/go";
import {MdOutlineAccessTime } from "react-icons/md";
import {BsQrCodeScan } from "react-icons/bs";
import { MODES } from "../../../constants";
import WalkthroughOverlay from "./Overlays/WalkthroughOverlay";
import PracticeOverlay from "./Overlays/PracticeOverlay";


function LandingPage({mode}) {
  const qrScanRef = useRef(null);
  
  const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
  return (
    <div className="bg-white min-h-screen text-black font-sans">
      {mode === MODES.WALKTHROUGH && !isWalkthroughComplete && (
        <WalkthroughOverlay
        step="landing"
        refs={{
          qrScanRef
        }}
          onComplete={() => setIsWalkthroughComplete(true)}
        />
      )}
      {mode === MODES.PRACTICE && (
        <PracticeOverlay
        step="UPI_QR_landing"
        />
      )}
      {/* Banner Section */}
      <div className="">
        <img
          src="/assets/Tutorials/UPI/QRPayments/banner.png"
          alt="could not load image"
        />
      </div>
      {/* Money Transfers */}
      <div className="p-4 pb-0">
        <h2 className="text-lg font-bold">Money transfers</h2>
        <div className="flex justify-around m-4 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#6510C5] rounded-full flex justify-center items-end overflow-hidden">
              <div className="bg-[#E1CEFC] py-2 px-1 rounded-sm text-xl text-[#6510C5]">
                <IoCallOutline />
              </div>
            </div>
            <p className="text-sm mt-2">To mobile number</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#6510C5] rounded-full flex justify-center items-end overflow-hidden text-[40px] text-[#E1CEFC]">
              <BiSolidBank className="-mb-1.5" />
            </div>
            <p className="text-sm mt-2">To bank & <br />self account</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#6510C5] rounded-full flex justify-end items-end overflow-hidden">
              <div className="bg-[#E1CEFC] p-2 rounded-sm text-xl text-[#6510C5]">
                <FaRupeeSign />
              </div>
            </div>
            <p className="text-sm mt-2">Check balance</p>
          </div>
        </div>
      </div>

      {/* Service Sections */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {/* Recharge & bills spans 2 rows */}
        <div className="p-4 pb-0 bg-white text-black rounded-lg flex flex-col shadow-lg col-span-1 row-span-2 justify-between">
          <div className="">
            <h3 className="text-sm font-bold">Recharge & bills</h3>
            <p className="text-xs text-gray-600 mt-1">
              Electricity, loan EMI, rent & credit card
            </p>
          </div>
          <div className="rounded-lg flex justify-end translate-x-4">
            <img
              
              src="/assets/Tutorials/UPI/QRPayments/bills.png"
              alt=""
            />
          </div>
        </div>
        {/* Travel & stays */}
        <div className="p-4 pb-0 bg-white text-black rounded-lg flex flex-col shadow-lg">
          <h3 className="text-sm font-bold">Travel & stays</h3>
          <p className="text-xs text-gray-600 mt-1">Flight, train & bus</p>
          <div className="rounded-lg flex justify-end translate-x-4">
            <img
              className="w-[50%]"
              src="/assets/Tutorials/UPI/QRPayments/travel.png"
              alt=""
            />
          </div>
        </div>
        {/* Commute */}
        <div className="p-4 pb-0 bg-white text-black rounded-lg flex flex-col items-center shadow-lg">
          <h3 className="text-sm font-bold">Commute</h3>
          <p className="text-xs text-gray-600 mt-1">FASTag, metro & NCMC</p>
          <div className="rounded-lg flex justify-end translate-x-8">
            <img
              className="w-[50%]"
              src="/assets/Tutorials/UPI/QRPayments/commute.png"
              alt=""
            />
          </div>
        </div>
        {/* Loans */}
        <div className="p-4 pb-0 bg-white text-black rounded-lg flex flex-col shadow-lg">
          <h3 className="text-sm font-bold">Loans</h3>
          <p className="text-xs text-gray-600 my-1">
            Personal, bike, gold & free credit score
          </p>
          <div className="rounded-lg flex justify-end translate-x-4">
            <img
              className="w-[50%]"
              src="/assets/Tutorials/UPI/QRPayments/loan.png"
              alt=""
            />
          </div>
        </div>
        {/* Insurance */}
        <div className="p-4 pb-0 bg-white text-black rounded-lg flex flex-col shadow-lg">
          <h3 className="text-sm font-bold">Insurance</h3>
          <p className="text-xs text-gray-600 mt-1">
            Motor, health, life, travel, shop & more
          </p>
          <div className="rounded-lg flex justify-end translate-x-4">
            <img
              className="w-[50%]"
              src="/assets/Tutorials/UPI/QRPayments/insurance.png"
              alt=""
            />
          </div>
        </div>
        <div className="p-4 pb-0 bg-white text-black rounded-lg flex flex-col shadow-lg">
          <h3 className="text-sm font-bold">Savings</h3>
          <p className="text-xs text-gray-600 mt-1">Gold & NPS</p>
          <div className="rounded-lg flex justify-end translate-x-4">
            <img
              className="w-[50%]"
              src="/assets/Tutorials/UPI/QRPayments/savings.png"
              alt=""
            />
          </div>
        </div>
        {/* Insurance */}
        <div className="p-4 pb-0 bg-white text-black rounded-lg flex flex-col shadow-lg">
          <h3 className="text-sm font-bold">Mutual funds</h3>
          <p className="text-xs text-gray-600 mt-1">SIPS & more</p>
          <div className="rounded-lg flex justify-end translate-x-4">
            <img
              className="w-[50%]"
              src="/assets/Tutorials/UPI/QRPayments/mutual_funds.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="w-full h-16" />

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white text-black flex justify-around items-center py-2 border-t">
        <div className="flex flex-col items-center text-sm">
          <GrHomeRounded className="text-lg"/>
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center text-sm text-gray-500">
          <IoIosSearch className="text-xl"/>
          <p>Search</p>
        </div>
        <Link to={`/tutorial/UPI/qr/${mode}`}>
        <div className="flex flex-col items-center text-sm text-gray-500" >
          <div className="bg-[#6510C5] p-4 text-white rounded-full text-2xl" ref={qrScanRef}>
            <BsQrCodeScan className="text-lg"/>
          </div>
        </div>
        </Link>
        <div className="flex flex-col items-center text-sm text-gray-500">
          <GoBell className="text-lg"/>
          <p>Alerts</p>
        </div>
        <div className="flex flex-col items-center text-sm text-gray-500">
          <MdOutlineAccessTime className="text-lg"/>
          <p>History</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
