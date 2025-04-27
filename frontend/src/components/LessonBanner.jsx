import React from "react";
import { GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";

export default function LessonBanner() {
  return (
    <Link to="/modules" className="flex flex-col bg-[#ffffff] w-full px-4 py-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="opacity-50 text-sm">Lesson-1</p>
          <h3 className="text-lg">Lesson Title</h3>
        </div>
        <GoChevronRight className="font-extralight text-2xl" />
      </div>
      <div className="h-1 bg-gray-200 rounded-full w-full mt-2">
        <div
          className="h-1 bg-green-500 rounded-full"
          style={{ width: `${100 / 3}%` }}
        ></div>
      </div>
    </Link>
  );
}
