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

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/tutorial/UPI" element={<LandingPage mode={MODES.WALKTHROUGH}/>}/>
        <Route path={"/tutorial/UPI/qr/:mode"} element={<ScanQR/>}/>
        <Route path="/tutorial/UPI/enter-amount/:mode" element={<EnterAmount/>}/>
        <Route path="/tutorial/UPI/enter-pin/:mode" element={<EnterPin/>}/>
        <Route path="/tutorial/UPI/to-contact" element={<SendMoneyPage />} />
        <Route path="/tutorial/UPI/new-contact" element={<NumberSearch />} />
        <Route path="/tutorial/UPI/send-money" element={<SendMoneyDetailsPage />} />
        <Route path="/tutorial/UPI/phonepe" element={<DashBoard />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
