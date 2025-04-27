import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import CourseBanner from "../components/CourseBanner";
import { useSelector } from "react-redux";

export default function Homepage() {
  const userProfile = useSelector((state) => state.user.userProfile);
  console.log(userProfile)
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
          <CourseCard imageLink={"/assets/Tutorials/phonepeBanner.png"} title={"UPI Payment Tutorial"}/>
          <CourseCard imageLink={"/assets/Tutorials/whatsapp.png"} title={"Messaging on whatapp"}/>
          <CourseCard imageLink={"/assets/Tutorials/instagram.png"} title={"Using Instagram"}/>
          <CourseCard imageLink={"/assets/Tutorials/facebook.png"} title={"Using facebook"}/>
          <CourseCard imageLink={"/assets/Tutorials/irctc.png"} title={"Ticket booking"}/>
          <CourseCard imageLink={"/assets/Tutorials/amazon.png"} title={"Shopping on Amazon"}/>
          <CourseCard imageLink={"/assets/Tutorials/flipkart.png"} title={"Shopping on Flipkart"}/>
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
          <CourseBanner imageLink={"/assets/Tutorials/phonepeBanner.png"} title={"UPI Payment Tutorial"} lessonCount={3}/>
          <CourseBanner imageLink={"/assets/Tutorials/whatsapp.png"} title={"Messaging on whatapp"} lessonCount={4}/>
          <CourseBanner imageLink={"/assets/Tutorials/instagram.png"} title={"Using Instagram"} lessonCount={6}/>
          <CourseBanner imageLink={"/assets/Tutorials/facebook.png"} title={"Using facebook"} lessonCount={5}/>
          <CourseBanner imageLink={"/assets/Tutorials/uber.png"} title={"Booking Taxi"} lessonCount={4}/>
          <CourseBanner imageLink={"/assets/Tutorials/irctc.png"} title={"Ticket booking"} lessonCount={2}/>
          <CourseBanner imageLink={"/assets/Tutorials/amazon.png"} title={"Shopping on Amazon"} lessonCount={3}/>
          <CourseBanner imageLink={"/assets/Tutorials/flipkart.png"} title={"Shopping on Flipkart"} lessonCount={3}/>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
