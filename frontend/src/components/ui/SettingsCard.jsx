import React from "react";

export default function SettingCard({name, handleNext,color}){
  return (
    <div className={`h-15 w-full bg-white px-8 py-5 border-b-2 border-gray-200 text-xl cursor-pointer ${color?`text-[${color}]`:"text-black"}`} onClick={handleNext}>{name}</div>
  );
};