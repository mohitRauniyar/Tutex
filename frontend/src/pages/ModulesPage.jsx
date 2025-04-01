import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Module from "../components/Module";
import { Link } from "react-router-dom";

export default function ModulesPage({lessonNumber, lessonTitle, description}) {
  return (
    <div className="min-h-screen bg-[#F0F0F0] pt-20 pb-16">
      <Header />
      <div className="p-8 flex flex-col gap-2">
        <p className="opacity-50">Lesson-0{/* {lessonNumber} */}</p>
        <h1 className="text-2xl">Lesson Title{/* lessonTitle} */}</h1>
        <p className="opacity-50">Sample description of the lesson{/* {description} */}</p>
        <div className="h-1 bg-gray-200 rounded-full w-full mt-2">
              <div
                className="h-1 bg-green-500 rounded-full"
                style={{ width: `${100 / 3}%` }}
              ></div>
            </div>
        <div className="flex flex-col gap-4 w-full mt-4">
          <Module moduleName={"Walkthrough"}/>
          <Module moduleName={"Practice"}/>
          <Module moduleName={"Assessment"}/>
        </div>
        <Link to="" className="px-8 py-3 ml-auto mr-0 bg-[#30A0FE] text-white my-4 rounded-sm">Next Lesson</Link>
      </div>
      <Navbar />
    </div>
  );
}
