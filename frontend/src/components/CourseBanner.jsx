import React from "react";
import { Link } from "react-router-dom";

export default function CourseBanner() {
  return (
    <Link to="/tutorial/UPI" className=" w-40 h-68">
      <div className="bg-[url(/assets/Tutorials/phonepeBanner.png)] rounded-lg bg-cover w-full h-full">
        <div className="relative text-white w-full h-full bg-gradient-to-b from-transparent rounded-lg to-gray-950 p-4 gap-2 flex flex-col justify-end">
          <h2 className="text-2xl">Title</h2>
          <p className="text-sm font-light">Lessons: 3</p>
        </div>
      </div>
    </Link>
  );
}
