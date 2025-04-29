import React from "react";
import { GoChevronRight } from "react-icons/go";
import { Link, useParams } from "react-router-dom";

export default function LessonBanner({lesson, index}) {
  const assignmentId = useParams().assignmentId;
  const progressString = lesson.progress.split("")
  let progress = 0;
  for(let i = 0; i < progressString.length; i++){
    if(progressString[i]=="1")
        progress++;
  }

  return (
    <Link to={`/modules/${assignmentId}/${lesson.lessonId}`} className="flex flex-col bg-[#ffffff] w-full px-4 py-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="opacity-50 text-sm">Lesson-{index+1}</p>
          <h3 className="text-lg">{lesson.title}</h3>
        </div>
        <GoChevronRight className="font-extralight text-2xl" />
      </div>
      <div className="h-1 bg-gray-200 rounded-full w-full mt-2">
        <div
          className="h-1 bg-green-500 rounded-full"
          style={{ width: `${progress/progressString.length *100}%` }}
        ></div>
      </div>
    </Link>
  );
}
