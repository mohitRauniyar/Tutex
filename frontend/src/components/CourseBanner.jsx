import React from "react";
import { Link } from "react-router-dom";

export default function CourseBanner({ imageLink, title, courseId }) {
  return (
    <Link to={`/tutorial/${courseId}/view`} className="w-40 h-68 block">
      <div
        className="rounded-lg bg-cover w-full h-full"
        style={{ backgroundImage: `url(${imageLink})` }}
      >
        <div className="relative text-white w-full h-full bg-gradient-to-b from-[#00000076] to-gray-950 to-80% rounded-lg p-4 gap-2 flex flex-col justify-end">
          <h2 className="text-2xl">{title}</h2>
        </div>
      </div>
    </Link>
  );
}
