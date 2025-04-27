import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import LessonBanner from "../components/LessonBanner";
import { useParams } from "react-router-dom";

export default function CoursePage() {
  const [assignmentDetail, setAssignmentDetail] = useState(null);
  const assignmentId = useParams().assignmentId
  useEffect(() => {
      const fetchAssignmentDetails = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/tutorial/${assignmentId}`, {
            method: "GET",
            credentials: "include",
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          setAssignmentDetail(data.body || []);
          console.log(assignmentDetail);
        } catch (err) {
          console.error("Failed to fetch subscribedCourses:", err);
          // setError(err.message);
        } 
      };
  
      fetchAssignmentDetails();
    }, []);
  return (
    <div className="min-h-screen bg-[#F0F0F0] pt-20 pb-16">
      <Header />
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Tutorial Title</h1>
        <div className="flex flex-col gap-4 w-full mt-8">
          {assignmentDetail && assignmentDetail.lessons.map((lesson, index)=>(
            <LessonBanner lesson={lesson} index = {index} key={index}/>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
}
