import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Button from "./components/button"
import SettingCard from "./components/ui/SettingsCard";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header/>

      {/* Profile Info */}
      <div className="flex flex-row justify-evenly mt-27">
        <div className="w-27 h-27 mt-5 rounded-full bg-gray-300" />
        <div className="w-fit h-fit mt-5 relative">
          <h2 className="text-lg font-semibold">Account Username</h2>
          <p className="text-sm text-gray-600">accountMailHandle@email.com</p>
          <p className="text-sm text-gray-600">Age: 00</p>
          <p className="text-sm text-gray-600">Gender: Fe/male</p>
          <button className="bg-[#30A0FE] border-1 px-7 text-white absolute right-0 mt-4 ">Edit</button>
        </div>
      </div>

      <div className="h-full w-full mt-22">
        <SettingCard name = "Username" />
        <SettingCard name = "Username"/>
        <SettingCard name = "Username"/>
        <SettingCard name = "Username"/>
        <SettingCard name = "Username"/>
        <SettingCard name = "Username"/>
        <SettingCard name = "Username"/>
        <SettingCard name = "Username"/>
        <SettingCard name = "Username"/>
      </div>
      <Navbar/>
    </div>
  );
}
