import React, { useEffect, useState } from "react";
import LessonBannerWithoutProgress from "../components/LessonBannerWithoutProgress";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { setLoading } from "../redux/loadingSlice";
import { clearUserProfile } from "../redux/userSlice";
import { clearAssignment } from "../redux/currentAssignmentSlice";
import { COURSES } from "../constants";

export default function TutorialView() {
  const courseId = useParams().courseId;
  const [lessons, setLessons] = useState([]);
  const [loading, setButtonLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState(null);
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hanldeStartCourse = async () => {
    try {
      setButtonLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tutorial/${courseId}/start`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 401) {
        dispatch(clearUserProfile());
        dispatch(clearAssignment());
        navigate("/login", { replace: true });
        toast.error("Session Expired");
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        toast.success(data.message);
        const assignmentId = data.body.assignmentId;
        navigate(`/course/${assignmentId}`);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to start the course");
    }
    setButtonLoading(false);
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(setLoading(true));
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/tutorial/${courseId}`,
          {
            method: "GET",
            credentials: "include",
            signal:signal
          }
        );
        if (response.status === 401) {
          dispatch(clearAssignment());
          dispatch(clearUserProfile());
          navigate("/login", { replace: true });
          toast.error("Session Expired");
          dispatch(setLoading(false));
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const list = data.body.Lessons;
        setLessons(list); // store the lessons list
        setCourseTitle(data.body.title);
        dispatch(setLoading(false));
      } catch (err) {
        toast.error("Failed to load course details");
        console.error("Failed to fetch course details:", err);
        dispatch(setLoading(false));
        navigate(-1);
      }
    };
    fetchCourseDetails();
    return ()=>controller.abort();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-[#F0F0F0] pt-20 pb-16">
      <Header />
      {loadingStatus ? (
        <Loader />
      ) : (
        <>
          {lessons.length > 0 && (
            <div className="p-8">
              <h1 className="text-2xl font-semibold">
                {courseTitle ? courseTitle : "Tutorial title"}
              </h1>
              <div className="flex flex-col gap-4 w-full mt-8">
                {lessons.map((lesson, index) => (
                  <LessonBannerWithoutProgress
                    lesson={lesson}
                    index={index}
                    key={lesson.lessonId} // Assuming each lesson has a unique id
                  />
                ))}
              </div>
              {COURSES.includes(courseTitle)?<Button hanldeStartCourse={hanldeStartCourse} loading={loading} />:(
                <p className="mt-3 ml-auto w-fit px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-md">
                Coming Soon
              </p>
              
              )}
            </div>
          )}
          <Navbar />
        </>
      )}
    </div>
  );
}

function Button({ hanldeStartCourse, loading }) {
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
