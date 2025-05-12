import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { INSTRUCTIONS } from "../constants";

export default function CoverPage({show,setShow,mode}) {
  const { assignmentId, lessonId, moduleName } = useSelector(
    (state) => state.currentAssignment
  );
  const navigate = useNavigate();
  const goBack = ()=>{
    navigate(-1);
  }
  return (
    <div className={show?" bg-white h-screen w-full":"hidden"}>
      <Header />
      <div className="pt-24 mb-16 p-8 h-full">
        <h2 className="text-3xl mb-8">{mode.charAt(0).toUpperCase()+mode.substring(1)}</h2>
        <h1 className="text-4xl mb-8">{lessonId && INSTRUCTIONS[lessonId][mode].title}</h1>
        
        <h1 className="text-2xl mb-8 font-bold">Your Task:</h1>
        <div
          className="mb-12"
          dangerouslySetInnerHTML={lessonId && { __html: INSTRUCTIONS[lessonId][mode].instructionText }}
        ></div>
        {lessonId && (

          <div className="flex justify-evenly w-full">
          <div
            onClick={goBack}
            className="border-2 border-[#30A0FE] text-[#30A0FE] p-2 rounded-md text-lg"
            >
            Go Back
          </div>
          <div
            onClick={()=>{setShow(false)}}
            className="bg-[#30A0FE] border-2 border-black text-white font-semibold py-2 px-4 rounded-md text-lg"
            >
            Start
          </div>
        </div>
          )}
      </div>
      <Navbar />
    </div>
  );
}
