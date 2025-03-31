import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import LessonBanner from "../components/LessonBanner";

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] pt-20 pb-16">
      <Header />
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Tutorial Title</h1>
        <div className="flex flex-col gap-4 w-full mt-8">
          <LessonBanner/>
          <LessonBanner/>
          <LessonBanner/>
          <LessonBanner/>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
