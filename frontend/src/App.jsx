import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./Tutorials/UPI/QRPayment/LandingPage"
import ScanQR from "./Tutorials/UPI/QRPayment/ScanQR"
import EnterAmount from "./Tutorials/UPI/QRPayment/EnterAmount"
import EnterPin from "./Tutorials/UPI/QRPayment/EnterPin"
import  SendMoneyPage from "./Tutorials/UPI/MobilePayment/mainPage"
import NumberSearch from "./Tutorials/UPI/MobilePayment/newContact"
import SendMoneyDetailsPage from "./Tutorials/UPI/MobilePayment/sendMoney"
import DashBoard from "./Tutorials/UPI/MobilePayment/LandingPage"
import { MODES } from "./constants";
import Homepage from "./pages/Homepage"
import YourLessons from "./pages/YourLessons"
import CoursePage from "./pages/CoursePage"
import ModulesPage from "./pages/ModulesPage"
import Search from "./pages/Search"
import LoginPage from "./login";
import RegisterPage from "./register";
import ProfilePage from "./profileUpdate"
import BankLandingPage from "./Tutorials/UPI/BankPayment/BankLandingPage"
import Options from "./Tutorials/UPI/BankPayment/ChooseService"
import AddBenificiaryAccount from "./Tutorials/UPI/BankPayment/AddBenificiary"
import BankSelector from "./Tutorials/UPI/BankPayment/FindBank"
import AddBankDetails from "./Tutorials/UPI/BankPayment/BankDetails"
import EnterBankAmount from "./Tutorials/UPI/BankPayment/EnterAmount"
import EnterBankPin from "./Tutorials/UPI/BankPayment/EnterPin"
import CoverPage from "./components/CoverPage"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setUserProfile } from "./redux/userSlice"
import TutorialView from "./pages/TutorialView"

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      dispatch(setUserProfile(JSON.parse(storedProfile)));
    }
  }, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/lessons" element={<YourLessons/>}/>
        <Route path="/course" element={<CoursePage/>}/>
        <Route path="/modules" element={<ModulesPage/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/tutorialView" element={<TutorialView/>}/>

        <Route path="/coverpage" element={<CoverPage page="Practice" title="UPI Paymeny via QR Scan" instruction="This is the instruction."/>}/>
        <Route path="/tutorial/UPI/walkthrough" element={<LandingPage mode={MODES.WALKTHROUGH}/>}/>
        <Route path="/tutorial/UPI/practice" element={<LandingPage mode={MODES.PRACTICE}/>}/>
        <Route path="/tutorial/UPI/assessment" element={<LandingPage mode={MODES.ASSESSMENT}/>}/>
        <Route path="/tutorial/UPI/Bank/walkthrough" element={<BankLandingPage mode={MODES.WALKTHROUGH}/>}/>
        <Route path="/tutorial/UPI/Bank/practice" element={<BankLandingPage mode={MODES.PRACTICE}/>}/>
        <Route path="/tutorial/UPI/Bank/assessment" element={<BankLandingPage mode={MODES.ASSESSMENT}/>}/>
        <Route path={"/tutorial/UPI/qr/:mode"} element={<ScanQR/>}/>
        <Route path="/tutorial/UPI/enter-amount/:mode" element={<EnterAmount/>}/>
        <Route path="/tutorial/UPI/enter-pin/:mode" element={<EnterPin/>}/>
        <Route path="/tutorial/UPI/to-contact" element={<SendMoneyPage />} />
        <Route path="/tutorial/UPI/new-contact" element={<NumberSearch />} />
        <Route path="/tutorial/UPI/send-money" element={<SendMoneyDetailsPage />} />
        <Route path="/tutorial/UPI/phonepe" element={<DashBoard />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/update-profile" element={<ProfilePage/>} />
        <Route path="/tutorial/UPI/Bank/options/:mode" element={<Options />}/>
        <Route path="/tutorial/UPI/Bank/add/:mode" element={<AddBenificiaryAccount />}/>
        <Route path="/tutorial/UPI/Bank/select/:mode" element={<BankSelector/>}/>
        <Route path="/tutorial/UPI/Bank/addDetails/:mode" element={<AddBankDetails/>}/>
        <Route path="/tutorial/UPI/Bank/enteramount/:mode" element={<EnterBankAmount/>}/>
        <Route path="/tutorial/UPI/Bank/enter-bank-pin/:mode" element={<EnterBankPin/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
