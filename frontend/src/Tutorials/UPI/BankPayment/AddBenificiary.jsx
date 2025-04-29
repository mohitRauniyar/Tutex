import { Search, ArrowLeft, HelpCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { MODES } from "../../../constants";
import { useState,useRef } from "react";
import WalkthroughOverlay from "./Overlays/WalkthroughOverlay";
import PracticeOverlay from "./Overlays/PracticeOverlay";
import AssessmentOverlay from "./Overlays/AssessmentOverlay";
import { useNavigate } from "react-router-dom";


export default function AddBenificiaryAccount() {
    const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
    const {mode} = useParams();
    const AddAccount = useRef();
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-4">
        {mode === MODES.WALKTHROUGH && !isWalkthroughComplete && (
            <WalkthroughOverlay
            step="AddAccount"
            refs={{
                AddAccount
            }}
            onComplete={() => setIsWalkthroughComplete(true)}
            />
        )}
        {mode === MODES.PRACTICE && (
            <PracticeOverlay
            step="Bank_Add_Button"
            refs={{
            }}
            />
        )}
        {mode === MODES.ASSESSMENT && (
                <AssessmentOverlay/>
        )}
        {/* Header */}
        <div className="flex items-center justify-between w-full max-w-md py-2">
            <ArrowLeft className="w-6 h-6" />
            <h2 className="text-lg font-semibold">To other bank account</h2>
            <HelpCircle className="w-6 h-6" />
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            type="text"
            placeholder="Search saved bank accounts"
            className="w-full pl-10 pr-4 py-2 rounded-full border bg-gray-100 focus:outline-none"
            />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center mt-10 w-full text-center">
            <h3 className="text-2xl font-bold mt-4">Send money to any bank account number</h3>
            <img
            src="/assets/Tutorials/UPI/BankPayments/Addaccount.png" // Replace with actual image path
            alt="Bank Transfer"
            className="w-full"
            />
        </div>

        {/* Button */}
        <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold w-full max-w-md text-[18px]" ref={AddAccount}
            onClick={()=>navigate(`/tutorial/UPI/Bank/select/${mode}`)}
        >
            Add Beneficiary Account
        </button>

        {/* Alternative Transfer Option */}
        <p className="mt-4 text-gray-500">Don’t have bank account details?</p>
        <button className="text-purple-600 font-semibold">SEND MONEY VIA MOBILE NUMBER</button>
        <p className="text-gray-500 text-xs mt-auto mb-2">Powered by <span className="font-semibold">UPI</span></p>
        </div>
    );
}
