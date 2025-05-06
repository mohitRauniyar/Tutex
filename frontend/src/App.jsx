import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Tutorials/UPI/QRPayment/LandingPage";
import ScanQR from "./Tutorials/UPI/QRPayment/ScanQR";
import EnterAmount from "./Tutorials/UPI/QRPayment/EnterAmount";
import EnterPin from "./Tutorials/UPI/QRPayment/EnterPin";
import MainPage from "./Tutorials/UPI/MobilePayment/mainPage";
import NumberSearch from "./Tutorials/UPI/MobilePayment/newContact";
import EnterContactPage from "./Tutorials/UPI/MobilePayment/EnterContact";
import SendMoneyPage from "./Tutorials/UPI/MobilePayment/sendMoney";
import DashBoard from "./Tutorials/UPI/MobilePayment/LandingPage";
import MobileEnterPin from "./Tutorials/UPI/MobilePayment/EnterPin";
import { MODES } from "./constants";
import Homepage from "./pages/Homepage";
import YourLessons from "./pages/YourLessons";
import CoursePage from "./pages/CoursePage";
import ModulesPage from "./pages/ModulesPage";
import Search from "./pages/Search";
import LoginPage from "./login";
import RegisterPage from "./register";
import ProfilePage from "./profileUpdate";
import BankLandingPage from "./Tutorials/UPI/BankPayment/BankLandingPage";
import Options from "./Tutorials/UPI/BankPayment/ChooseService";
import AddBenificiaryAccount from "./Tutorials/UPI/BankPayment/AddBenificiary";
import BankSelector from "./Tutorials/UPI/BankPayment/FindBank";
import AddBankDetails from "./Tutorials/UPI/BankPayment/BankDetails";
import EnterBankAmount from "./Tutorials/UPI/BankPayment/EnterAmount";
import EnterBankPin from "./Tutorials/UPI/BankPayment/EnterPin";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUserProfile } from "./redux/userSlice";
import TutorialView from "./pages/TutorialView";
import OtpVerification from "./pages/OtpVerification";
import ComingSoon from "./pages/ComingSoon";
import ProtectedRoute from "./pages/ProtectedRoute";
import Loader from "./components/Loader";
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
import OtpVerification from "./pages/OtpVerification"
import ProfilePage from "./pages/ProfilePage2"
import ProfileUpdate from "./pages/ProfileUpdate"
import ChangePassword from "./pages/ChangePassword"
import ForgotPassword from "./pages/ForgotPassword"
import OtpVerificationForForgotPassword from "./pages/OtpVerificationForForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ComingSoon from "./pages/ComingSoon2"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import HelpCenter from "./pages/HelpCenter"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      dispatch(setUserProfile(JSON.parse(storedProfile)));
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/verify" element={<OtpVerification />} />

            <Route path="/" element={< ProtectedRoute Component={Homepage} />} />
            <Route
              path="/search"
              element={<ProtectedRoute Component={Search} />}
            />
            <Route
              path="/lessons"
              element={<ProtectedRoute Component={YourLessons} />}
            />

            <Route
              path="/course/:assignmentId"
              element={<ProtectedRoute Component={CoursePage} />}
            />
            <Route
              path="/modules/:assignmentId/:lessonId"
              element={<ProtectedRoute Component={ModulesPage} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute Component={ProfilePage} />}
            />

            <Route path="/analytics" element={<ComingSoon2/>}/>
        <Route
              path="/tutorial/:courseId/view"
              element={<ProtectedRoute Component={TutorialView} />}
            />
            <Route path="/profile/preferences" element={<ComingSoon/>} />
        <Route path="/profile/language" element={<ComingSoon/>} />
        <Route path="/profile/accessibility" element={<ComingSoon/>} />
        <Route path="/profile/privacy" element={<PrivacyPolicy/>} />
        <Route path="/profile/help" element={<HelpCenter/>} />
        <Route path="/profile/update" element={<ProfileUpdate/>} />
        <Route path="/profile/update/password" element={<ChangePassword/>} />
        <Route path="/password/forgot" element={<ForgotPassword/>} />
        <Route path="/password/reset" element={<ResetPassword/>} />
        <Route path="/password/forgot/otp" element={<OtpVerificationForForgotPassword/>} />
        <Route
              path="/tutorial/coming-soon"
              element={<ProtectedRoute Component={ComingSoon} />}
            />

            {/*UPI QR routes */}
            <Route
              path="/tutorial/UPI/walkthrough"
              element={
                <ProtectedRoute
                  Component={LandingPage}
                  mode={MODES.WALKTHROUGH}
                />
              }
            />
            <Route
              path="/tutorial/UPI/practice"
              element={
                <ProtectedRoute Component={LandingPage} mode={MODES.PRACTICE} />
              }
            />
            <Route
              path="/tutorial/UPI/assessment"
              element={
                <ProtectedRoute
                  Component={LandingPage}
                  mode={MODES.ASSESSMENT}
                />
              }
            />
            <Route
              path={"/tutorial/UPI/qr/:mode"}
              element={<ProtectedRoute Component={ScanQR} />}
            />
            <Route
              path="/tutorial/UPI/enter-amount/:mode"
              element={<ProtectedRoute Component={EnterAmount} />}
            />
            <Route
              path="/tutorial/UPI/enter-pin/:mode"
              element={<ProtectedRoute Component={EnterPin} />}
            />
            {/*UPI bank routes */}
            <Route
              path="/tutorial/UPI/Bank/walkthrough"
              element={
                <ProtectedRoute
                  Component={BankLandingPage}
                  mode={MODES.WALKTHROUGH}
                />
              }
            />
            <Route
              path="/tutorial/UPI/Bank/practice"
              element={
                <ProtectedRoute
                  Component={BankLandingPage}
                  mode={MODES.PRACTICE}
                />
              }
            />
            <Route
              path="/tutorial/UPI/Bank/assessment"
              element={
                <ProtectedRoute
                  Component={BankLandingPage}
                  mode={MODES.ASSESSMENT}
                />
              }
            />
            <Route
              path="/tutorial/UPI/Bank/options/:mode"
              element={<ProtectedRoute Component={Options} />}
            />
            <Route
              path="/tutorial/UPI/Bank/add/:mode"
              element={<ProtectedRoute Component={AddBenificiaryAccount} />}
            />
            <Route
              path="/tutorial/UPI/Bank/select/:mode"
              element={<ProtectedRoute Component={BankSelector} />}
            />
            <Route
              path="/tutorial/UPI/Bank/addDetails/:mode"
              element={<ProtectedRoute Component={AddBankDetails} />}
            />
            <Route
              path="/tutorial/UPI/Bank/enteramount/:mode"
              element={<ProtectedRoute Component={EnterBankAmount} />}
            />
            <Route
              path="/tutorial/UPI/Bank/enter-bank-pin/:mode"
              element={<ProtectedRoute Component={EnterBankPin} />}
            />
            {/*UPI Mobile routes */}
            <Route
              path="/tutorial/UPI/Mobile/to-contact/:mode"
              element={<ProtectedRoute Component={MainPage} />}
            />
            <Route
              path="/tutorial/UPI/Mobile/choose-contact/:mode"
              element={<ProtectedRoute Component={EnterContactPage} />}
            />
            <Route
              path="/tutorial/UPI/Mobile/new-contact/:mode"
              element={<ProtectedRoute Component={NumberSearch} />}
            />
            <Route
              path="/tutorial/UPI/Mobile/send-money/:mode"
              element={<ProtectedRoute Component={SendMoneyPage} />}
            />
            <Route
              path="/tutorial/UPI/Mobile/enter-pin/:mode"
              element={<ProtectedRoute Component={MobileEnterPin} />}
            />
            <Route
              path="/tutorial/UPI/Mobile/walkthrough"
              element={
                <ProtectedRoute
                  Component={DashBoard}
                  mode={MODES.WALKTHROUGH}
                />
              }
            />
            <Route
              path="/tutorial/UPI/Mobile/practice"
              element={
                <ProtectedRoute Component={DashBoard} mode={MODES.PRACTICE} />
              }
            />
            <Route
              path="/tutorial/UPI/Mobile/assessment"
              element={
                <ProtectedRoute Component={DashBoard} mode={MODES.ASSESSMENT} />
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
