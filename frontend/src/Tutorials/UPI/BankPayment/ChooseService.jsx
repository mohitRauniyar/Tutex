import { useParams,Link } from "react-router-dom";
import { User,AtSign,ChevronRight } from "lucide-react";
import { MODES } from "../../../constants";
import { useState,useRef } from "react";
import { BiSolidBank as Bank } from "react-icons/bi";
import WalkthroughOverlay from "./Overlays/WalkthroughOverlay";
import PracticeOverlay from "./Overlays/PracticeOverlay";
import AssessmentOverlay from "./Overlays/AssessmentOverlay";

export default function Options() {
    const {mode} = useParams();
    const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
    const chooseOption = useRef();
    return (
        <div className="h-screen w-screen flex flex-col items-center overflow-hidden">
            {mode === MODES.WALKTHROUGH && !isWalkthroughComplete && (
                <WalkthroughOverlay
                step="chooseService"
                refs={{
                    chooseOption
                }}
                onComplete={() => setIsWalkthroughComplete(true)}
                />
            )}
            {mode === MODES.PRACTICE && (
                <PracticeOverlay
                step="UPI_QR_enterAmount"
                refs={{
                }}
                />
            )}
            {mode === MODES.ASSESSMENT && (
                    <AssessmentOverlay/>
            )}
            <div className="bg-[url('/assets/Tutorials/UPI/BankPayments/sendMoneyBanner.png')] w-full h-89 bg-no-repeat bg-cover"/>
            <div className="mt-4 space-y-4 mr-auto pl-5">
            <OptionCard
                icon={<User size={24} className="text-purple-600" />}
                title="To self bank account"
                subtitle="1 saved account"
            />
            <Link to={`/tutorial/UPI/Bank/add/${mode}`}>
                <OptionCard
                    icon={<Bank size={24} className="text-purple-600" />}
                    title="To other's bank account"
                    subtitle="using A/C number & IFSC code"
                    ref = {chooseOption}
                />
            </Link>
            <OptionCard
                icon={<AtSign size={24} className="text-purple-600" />}
                title="To any UPI app"
                subtitle="2 saved UPI IDs / numbers"
            />
            </div>
        <p className="text-gray-500 text-xs mt-auto mb-2">Powered by <span className="font-semibold">UPI</span></p>
        </div>
    );
}

function OptionCard({ icon, title, subtitle,ref }) {
  return (
    <div
      className={`flex items-center p-4 w-screen`} ref={ref}
    >
        <div className="mr-4">{icon}</div>
        <div className="w-full">
            <h2 className="text-lg font-medium text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
        <ChevronRight size={24} className="text-gray-400 ml-auto mr-5"/>
    </div>
  );
}