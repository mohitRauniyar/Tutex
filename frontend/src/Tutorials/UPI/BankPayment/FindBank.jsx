import React, { useState, useRef } from "react";
import { Search } from "lucide-react";
import { BiSolidBank as Bank } from "react-icons/bi";
import WalkthroughOverlay from "./Overlays/WalkthroughOverlay";
import PracticeOverlay from "./Overlays/PracticeOverlay";
import AssessmentOverlay from "./Overlays/AssessmentOverlay";
import { MODES } from "../../../constants.js";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const popularBanks = [
  { name: "State Bank of India", logo: "/logos/sbi.png" },
  { name: "Canara Bank", logo: "/logos/canara.png" },
  { name: "Karnataka Bank", logo: "/logos/karnataka.png" },
  { name: "Kotak Mahindra Bank", logo: "/logos/kotak.png" },
  { name: "HDFC Bank", logo: "/logos/hdfc.png" },
  { name: "India Post Payment Bank", logo: "/logos/ippb.png" },
  { name: "Union Bank Of India", logo: "/logos/union.png" },
  { name: "Bank Of Baroda", logo: "/logos/bob.png" },
  { name: "Karnataka Gramin Bank", logo: "/logos/kgb.png" },
];

const allBanks = [
  "510 ARMY BASE WORKSHOP CREDIT CO OPERATIVE PRIMARY",
  "ACE Cooperative Bank Ltd",
  "AMAN SAHAKARI BANK LTD ICHAL",
  "AP Mahesh Co-operative Urban Bank",
  "ARUNACHAL PRADESH RURAL BANK",
  "Au Small Finance Bank",
  "Abhinandan Urban Co-Op Bank Ltd",
  "State Bank of India",
  "Canara Bank",
  "Karnataka Bank",
  "Kotak Mahindra Bank",
  "HDFC Bank",
  "India Post Payment Bank",
  "Union Bank Of India",
  "Bank Of Baroda",
  "Karnataka Gramin Bank",
  "DhanLaxmi Bank",
];

const BankSelector = () => {
  const { mode } = useParams();
  const searchRef = useRef();
  const bankRef = useRef();
  const [text, setText] = useState("");
  const [Banks, setBanks] = useState(allBanks);
  const [search, searchState] = useState("block");
  const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
  const navigate = useNavigate();
  const screenFixed = mode===MODES.WALKTHROUGH?"h-screen overflow-hidden":"";
  const handleText = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);

    if (inputValue !== "") searchState("hidden");
    else searchState("block");

    const filteredBanks = allBanks.filter((bank) =>
      bank.toLowerCase().includes(inputValue.toLowerCase())
    );
    setBanks(filteredBanks);
  };
  const handleSelect = (bankName)=>{
    navigate(`/tutorial/UPI/Bank/addDetails/${mode}`,{state:{bankName:bankName}});
  }
  
  return (
    <div className={`max-w-md mx-auto px-2 pb-2 font-sans ${screenFixed}`}>
      {mode === MODES.WALKTHROUGH && !isWalkthroughComplete && (
        <WalkthroughOverlay
          step="selectBank"
          refs={{
            bankRef,
            searchRef,
          }}
          onComplete={() => setIsWalkthroughComplete(true)}
        />
      )}
      {mode === MODES.PRACTICE && (
        <PracticeOverlay step="Select_Bank_Step" refs={{}} />
      )}
      {mode === MODES.ASSESSMENT && <AssessmentOverlay />}
      <h2 className={`text-2xl font-bold py-4`}>Select receiver Bank</h2>

      {/* Search Bar */}
      <div className="sticky top-0 w-full pt-2 pb-8 bg-white ">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => handleText(e)}
            placeholder="Search By Bank Name"
            className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:outline-none"
            ref={searchRef}
          />
          <Search className="absolute top-3 left-3 h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Popular Banks */}
      <div className={`${search}`}>
        <h3 className="text-lg font-semibold mb-2">Popular Banks</h3>
        <div className="grid grid-cols-3 gap-4">
          {popularBanks.map((bank) => (
            <div
              key={bank.name}
              className="flex flex-col items-center text-center text-sm"
              onClick={()=>handleSelect(bank.name)}
            >
              <div className="border-zinc-700 w-fit h-fit p-2 border-1 rounded-xl">
                <Bank size={40} className="text-purple-600" />
              </div>
              <span className="text-lg">{bank.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* All Banks */}
      <div>
        <h3 className="text-lg font-semibold mb-2">All Banks</h3>
        <div className="space-y-2 p-2">
          {Banks.map((bank, idx) => (
            // <Link to={`/tutorial/UPI/Bank/addDetails/${mode}`}>
              <div
                key={idx}
                className="px-3 py-2 shadow text-sm flex items-center"
                ref={bank == "DhanLaxmi Bank" ? bankRef : null}
                onClick={()=>handleSelect(bank)}
              >
                <div>
                  <Bank size={40} className="text-purple-600 mr-5" />
                </div>
                <p className="text-lg truncate">{bank}</p>
              </div>
            // </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankSelector;
