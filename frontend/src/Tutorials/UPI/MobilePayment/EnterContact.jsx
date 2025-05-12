import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch, FaQuestionCircle, FaUserCircle } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { MODES } from "../../../constants";
import WalkthroughOverlay from "./Overlays/WalkThroughOverlay";
import PracticeOverlay from "./Overlays/PracticeOverlay";
import AssessmentOverlay from "./Overlays/AssessmentOverlay";

function EnterContactPage() {
  const { mode } = useParams();
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const contacts = [
    { name: "Aabiskar", number: "9849942073", bankingName: "AABISKAR ACHARYA" },
    { name: "Aadi Yadav", number: "7892835803", bankingName: "AADITYA YADAV" },
    { name: "Aarav", number: "6397948717", bankingName: "AARAV KUMAR" },
    { name: "John Doe", number: "9857393330", bankingName: "JOHN DOE" },
    { name: "Alice", number: "8538920483", bankingName: "ALICE SMITH" },
    { name: "Marie", number: "5893748091", bankingName: "MARIE CURIE" },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.number.includes(searchTerm)
  );

  const Textbox = useRef(null);
  const searchtext = useRef(null);
  const inputbox = useRef(null);
  const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
  return (
    <div
      className={`bg-white min-h-screen text-black font-sans overflow-y-hidden ${
        mode === MODES.WALKTHROUGH ? "fixed" : ""
      }`}
    >
      {mode === MODES.WALKTHROUGH && !isWalkthroughComplete && (
        <WalkthroughOverlay
          step="chooseContact"
          refs={{
            Textbox,
            searchtext,
          }}
          onComplete={() => setIsWalkthroughComplete(true)}
        />
      )}
      {mode === MODES.PRACTICE && (
        <PracticeOverlay step="UPI_Mobile_TypeMarie" refs={{ Textbox }} />
      )}
      {mode === MODES.ASSESSMENT && <AssessmentOverlay />}

      <div className="w-full h-screen bg-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <MdArrowBack
            size={24}
            onClick={() => {
              navigate(-1);
            }}
          />
          <FaQuestionCircle size={20} />
        </div>

        {/* Search Bar */}
        <div className="mt-6 w-full">
          <p className="text-lg font-semibold">Select Contact</p>
          <div className="flex items-center bg-gray-100 rounded-full p-2 mt-4 w-full justify-between">
            <FaSearch className="text-gray-500 ml-2 w-5" />
            <input
              type="text"
              placeholder="Search any mobile number"
              className="w-70 bg-transparent outline-none px-2 py-3 block flex-1"
              onFocus={() => setSearchActive(true)}
              onBlur={() => setSearchActive(false)}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              ref={Textbox}
            />
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-300 mt-2"></div>

        {/* Contact List */}
        <div className="mt-4">
          {filteredContacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center py-2 cursor-pointer"
              onClick={() =>
                navigate(`/tutorial/UPI/Mobile/send-money/${mode}`, {
                  state: contact,
                })
              }
              ref={contact.name == "Marie" ? searchtext : null}
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
}
export default EnterContactPage;
