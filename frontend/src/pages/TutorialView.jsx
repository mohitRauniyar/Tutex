import React, { useEffect, useState } from "react";
import LessonBannerWithoutProgress from "../components/LessonBannerWithoutProgress";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { FaSpinner} from "react-icons/fa"

export default function TutorialView() {
  const courseId = useParams().courseId;
  const [lessons, setLessons] = useState([]);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const hanldeStartCourse = async ()=>{
    try{
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tutorial/${courseId}/start`,
          {
            method: "GET",
            credentials: "include",
          }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }else{
        alert('Course Started Successfully!');
        const data = await response.json();
        const assignmentId = data.body.assignmentId;
        navigate(`/course/${assignmentId}`)
      }
    }catch(err){
      console.log(err.message);
      alert('failed to start the course');
      setLoading(false);
    }

  }
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/tutorial/${courseId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const list = data.body.Lessons;
        setLessons(list); // store the lessons list
      } catch (err) {
        console.error("Failed to fetch course details:", err);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  
  return (
    <div className="min-h-screen bg-[#F0F0F0] pt-20 pb-16">
      <Header />
      {lessons.length > 0 && (
        <div className="p-8">
          <h1 className="text-2xl font-semibold">Tutorial Title</h1>
          <div className="flex flex-col gap-4 w-full mt-8">
            {lessons.map((lesson, index) => (
              <LessonBannerWithoutProgress
                lesson={lesson}
                index={index}
                key={lesson.lessonId} // Assuming each lesson has a unique id
              />
            ))}
          </div>
          <Button hanldeStartCourse={hanldeStartCourse} loading={loading}/>
        </div>
      )}
      <Navbar />
    </div>
  );
}


function Button({hanldeStartCourse,loading}) {
  // assume you have hanldeStartCourse and loading props or state here

  return (
    <button
      className="flex items-center justify-center bg-[#007BFF] mt-8 ml-auto text-white px-4 py-2 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
      onClick={hanldeStartCourse}
      disabled={loading}
    >
      {loading ? (
        <FaSpinner className="animate-spin text-white text-lg" />
      ) : (
        "Start Course"
      )}
    </button>
  );
}
