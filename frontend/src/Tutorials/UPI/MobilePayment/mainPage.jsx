import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch, FaQuestionCircle, FaUserCircle } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { MODES } from "../../../constants";
import WalkthroughOverlay from "./Overlays/WalkThroughOverlay";
import PracticeOverlay from "./Overlays/PracticeOverlay";
import AssessmentOverlay from "./Overlays/AssessmentOverlay";

const MainPage = () => {
  const { mode } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const contacts = [
    { name: "Person 1", number: "1111111111", bankingName: "Person 1" },
    { name: "Person 2", number: "2222222222", bankingName: "Person 2" },
    { name: "Person 3", number: "3333333333", bankingName: "Person 3" },
    { name: "John Doe", number: "4444444444", bankingName: "John Doe" },
    { name: "Alice", number: "5555555555", bankingName: "Alice" },
    { name: "Marie", number: "6666666666", bankingName: "Marie" },
  ];

  // const filteredContacts = contacts.filter(
  //   (contact) =>
  //     contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     contact.number.includes(searchTerm)
  // );

  const searchbox = useRef(null);
  const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
  return (
    <div
      className={`bg-white min-h-screen text-black font-sans overflow-y-hidden ${
        mode === MODES.WALKTHROUGH ? "fixed" : ""
      }`}
    >
      {mode === MODES.WALKTHROUGH && !isWalkthroughComplete && (
        <WalkthroughOverlay
          step="search"
          refs={{
            searchbox,
          }}
          onComplete={() => setIsWalkthroughComplete(true)}
        />
      )}
      {mode === MODES.PRACTICE && <PracticeOverlay step="UPI_Mobile_Searchbox" refs={{searchbox,}}/>}
      {mode === MODES.ASSESSMENT && <AssessmentOverlay />}


      <div className="w-full h-screen bg-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <MdArrowBack size={24} />
          <FaQuestionCircle size={20} />
        </div>

        {/* Conditional Rendering for Image */}
        <div className="w-full h-60 mt-2">
          <img
            src="/assets/Tutorials/UPI/QRPayments/mainPage-img.jpg"
            alt="Send Money"
            className="w-full h-full object-cover"
          />
        </div>
        

        {/* Search Bar */}
        <div className="mt-6">
          <p className="text-lg font-semibold">Select Contact</p>
          <div className="flex items-center bg-gray-100 rounded-full p-2 mt-4" ref={searchbox}>
            <FaSearch className="text-gray-500 ml-2" />
            <input
              type="text"
              placeholder="Search any mobile number"
              className="w-full bg-transparent outline-none px-2"
              // onFocus={() => setSearchActive(true)}
              // onBlur={() => setSearchActive(false)}
              // onChange={(e) => setSearchTerm(e.target.value)}
              onClick={() =>
                navigate(`/tutorial/UPI/Mobile/choose-contact/${mode}`)
              }
            />
          </div>
        </div>

        {/* New Mobile Number */}
        <div
          className="mt-6 text-purple-600 font-semibold cursor-pointer"
          onClick={() => navigate("/tutorial/UPI/new-contact")}
        >
          <p>New Mobile Number</p>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-300 mt-2"></div>

        {/* Contact List */}
        <div className="mt-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center py-2 cursor-pointer"
              onClick={() =>
                navigate(`/tutorial/UPI/Mobile/send-money/${mode}`, { state: contact })
              }
            >
              <FaUserCircle size={40} className="text-gray-500 mr-4" />
              <div>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-gray-500 text-sm">{contact.number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
