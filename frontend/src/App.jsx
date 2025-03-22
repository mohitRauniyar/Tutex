import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./Tutorials/UPI/QRPayment/LandingPage"
import ScanQR from "./Tutorials/UPI/QRPayment/ScanQR"
import EnterAmount from "./Tutorials/UPI/QRPayment/EnterAmount"
import EnterPin from "./Tutorials/UPI/QRPayment/EnterPin"
import { MODES } from "./constants";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/tutorial/UPI" element={<LandingPage mode={MODES.ASSESSMENT}/>}/>
        <Route path="/tutorial/UPI/qr" element={<ScanQR/>}/>
        <Route path="/tutorial/UPI/enter-amount" element={<EnterAmount/>}/>
        <Route path="/tutorial/UPI/enter-pin" element={<EnterPin/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
