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

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/lessons" element={<YourLessons/>}/>
        <Route path="/course" element={<CoursePage/>}/>
        <Route path="/modules" element={<ModulesPage/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/tutorial/UPI/walkthrough" element={<LandingPage mode={MODES.WALKTHROUGH}/>}/>
        <Route path="/tutorial/UPI/practice" element={<LandingPage mode={MODES.PRACTICE}/>}/>
        <Route path="/tutorial/UPI/assessment" element={<LandingPage mode={MODES.ASSESSMENT}/>}/>
        <Route path={"/tutorial/UPI/qr/:mode"} element={<ScanQR/>}/>
        <Route path="/tutorial/UPI/enter-amount/:mode" element={<EnterAmount/>}/>
        <Route path="/tutorial/UPI/enter-pin/:mode" element={<EnterPin/>}/>
        <Route path="/tutorial/UPI/to-contact" element={<SendMoneyPage />} />
        <Route path="/tutorial/UPI/new-contact" element={<NumberSearch />} />
        <Route path="/tutorial/UPI/send-money" element={<SendMoneyDetailsPage />} />
        <Route path="/tutorial/UPI/phonepe" element={<DashBoard />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
