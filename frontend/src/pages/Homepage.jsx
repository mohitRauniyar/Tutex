import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import CourseBanner from "../components/CourseBanner";

export default function Homepage() {
  return (
    <div>
      <Header />
      <div className="mt-20 mb-16 p-4">
        <div className="flex justify-between items-end my-4">
          <h2 className="font-semibold text-lg ">Your Lessons</h2>
          <Link to="/lessons" className="underline">
            see all
          </Link>
        </div>
        <div className="overflow-x-scroll scrollbar-hidden flex gap-3 justify-evenly">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>

        <Link
          to="/search"
          className="flex justify-between w-full h-12 my-8 items-center gap-4"
        >
          <p className="w-full bg-[#E1E1E1] p-3 rounded-sm">Search</p>
          <MdOutlineSearch className="text-2xl" />
        </Link>

        <h2 className="mb-8 font-semibold text-lg">Explore</h2>
        <div className="grid grid-cols-2 gap-8 mx-4">
          <CourseBanner />
          <CourseBanner />
          <CourseBanner />
          <CourseBanner />
          <CourseBanner />
          <CourseBanner />
        </div>
      </div>
      <Navbar />
    </div>
  );
}
