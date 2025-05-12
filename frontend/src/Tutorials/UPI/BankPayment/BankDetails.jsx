import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { ArrowLeft, HelpCircle } from "react-feather";
import WalkthroughOverlay from "./Overlays/WalkthroughOverlay";
import PracticeOverlay from "./Overlays/PracticeOverlay";
import AssessmentOverlay from "./Overlays/AssessmentOverlay";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MODES } from "../../../constants.js";

export default function AddBankDetails() {
  const {mode} = useParams();
  const inputRef = useRef();
  const buttonRef = useRef();
  const accountHolder = useRef();
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [disabled,setDisabled] = useState(true);
  const [isWalkthroughComplete,setIsWalkthroughComplete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {bankName} = location.state;
  useEffect(()=>{
    const ifsc_mode = {
      "walkthrough":"DLXB0000",
      "practice":"ABCD0000",
      "assessment":"IFSC1234"
    }
    const accNos = {
      "walkthrough":"123456789",
      "practice":"5432102",
      "assessment":"8521349"
    }
    if(accountNumber === accNos[mode] && ifsc === ifsc_mode[mode]){
        setDisabled(false);
    }else setDisabled(true);
  },[accountNumber,ifsc])
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      {/* Top bar */}
      {mode === MODES.WALKTHROUGH && !isWalkthroughComplete && (
        <WalkthroughOverlay
          step="AddBankDetails"
          refs={{
            inputRef,
            buttonRef,
            accountHolder
          }}
          onComplete={() => setIsWalkthroughComplete(true)}
        />
      )}
      {mode === MODES.PRACTICE && (
        <PracticeOverlay step="Fill_Account_Details" refs={{}} />
      )}
      {mode === MODES.ASSESSMENT && <AssessmentOverlay />}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" onClick={()=>navigate(-1)}/>
          <h2 className="text-lg font-semibold">Add Bank Account</h2>
        </div>
        <HelpCircle className="w-5 h-5" />
      </div>

      {/* Bank Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Selected bank</p>
            <p className="text-lg font-medium">{bankName}</p>
          </div>
          <Pencil className="w-4 h-4 text-purple-600" />
        </div>
      </div>

      {/* Form fields */}
      <div className="flex flex-col gap-4 bg-white shadow-sm p-4" ref={inputRef}>
        <input
          type="text"
          placeholder="Account number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="border-b border-gray-300 focus:outline-none py-2 placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="IFSC"
          value={ifsc}
          onChange={(e) => setIfsc(e.target.value)}
          className="border-b border-gray-300 focus:outline-none py-2 placeholder-gray-400"
        />
      </div>
      {/* Account holder reveal section */}
      <div className={`${disabled?"hidden":"block"} flex flex-col gap-4 bg-white shadow-sm p-4 `} ref={accountHolder}>
        <p className="text-gray-400">Verified Account Holder Name</p>
        <input
          type="text"
          placeholder="Account number"
          value="XYZ"
          className="border-b border-gray-300 focus:outline-none py-1 placeholder-gray-400"
          
        />
      </div>

      {/* Next Button */}
      <button
        className="mt-auto w-full disabled:bg-gray-300 bg-purple-600 text-white py-3 rounded-none text-center font-medium tracking-wide"
        disabled={disabled}
        onClick={()=>{
            navigate(`/tutorial/UPI/Bank/enteramount/${mode}`,{state:{name:"XYZ",bankName:bankName}});
        }}
        ref={buttonRef}
      >
        {disabled?"NEXT":"PROCEED TO PAY"}
      </button>
    </div>
  );
}
