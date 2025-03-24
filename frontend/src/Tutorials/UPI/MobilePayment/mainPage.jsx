import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaQuestionCircle, FaUserCircle } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";

const SendMoneyPage = () => {
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

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.number.includes(searchTerm)
  );

  return (
    <div className="w-full h-screen bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <MdArrowBack size={24} />
        <FaQuestionCircle size={20} />
      </div>

      {/* Conditional Rendering for Image */}
      {!searchActive && (
        <div className="w-full h-60 mt-2">
          <img 
            src="/assets/Tutorials/UPI/QRPayments/mainPage-img.jpg" 
            alt="Send Money" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Search Bar */}
      <div className="mt-6">
        <p className="text-lg font-semibold">Select Contact</p>
        <div className="flex items-center bg-gray-100 rounded-full p-2 mt-4">
          <FaSearch className="text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="Search any mobile number"
            className="w-full bg-transparent outline-none px-2"
            onFocus={() => setSearchActive(true)}
            onBlur={() => setSearchActive(false)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* New Mobile Number */}
      {!searchActive && (
        <div 
          className="mt-6 text-purple-600 font-semibold cursor-pointer"
          onClick={() => navigate("/tutorial/UPI/new-contact")}
        >
          <p>New Mobile Number</p>
        </div>
      )}
      
      {/* Separator Line */}
      <div className="border-t border-gray-300 mt-2"></div>

      {/* Contact List */}
      <div className="mt-4">
        {filteredContacts.map((contact, index) => (
          <div 
            key={index} 
            className="flex items-center py-2 cursor-pointer"
            onClick={() => navigate("/tutorial/UPI/send-money", { state: contact })}
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
  );
};

export default SendMoneyPage;
