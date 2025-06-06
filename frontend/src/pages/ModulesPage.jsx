import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Module from "../components/Module";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/loadingSlice";
import Loader from "../components/Loader";
import { clearAssignment } from "../redux/currentAssignmentSlice";
import { clearUserProfile } from "../redux/userSlice";

export default function ModulesPage() {
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const assignmentId = useParams().assignmentId;
  const lessonId = useParams().lessonId;
  const [lessonNumber, setLessonNumber] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0.0);
  const [progressString, setProgressString] = useState("");
  const [lesson, setLesson] = useState(null);
  const [nextLessonId, setNextLessonId] = useState(0);
  const [assignmentDetail, setAssignmentDetail] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setLoading(true));
    let controller = new AbortController();
    let signal = controller.signal;
    const fetchAssignmentDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/tutorial/${assignmentId}`,
          {
            method: "GET",
            credentials: "include",
            signal: signal,
          }
        );

        if (response.status === 401) {
          dispatch(clearUserProfile());
          dispatch(clearAssignment());
          toast.error("Session Expired");
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAssignmentDetail(data.body || []);
      } catch (err) {
        console.error("Failed to fetch subscribedCourses:", err);
        toast.error("Failed to load lesson");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAssignmentDetails();
    return () => controller.abort();
  }, [lessonId]);

  useEffect(() => {
    if (assignmentDetail !== null) {
      for (let i = 0; i < assignmentDetail.lessons.length; i++) {
        if (assignmentDetail.lessons[i].lessonId == lessonId) {
          setLesson(assignmentDetail.lessons[i]);

          setLessonNumber(i + 1);
          console.log(i);
          if (i + 1 < assignmentDetail.lessons.length) {
            setNextLessonId(assignmentDetail.lessons[i + 1].lessonId);
          }else{
            setNextLessonId(0);
          }
        }
      }
    }
  }, [assignmentDetail]);

  useEffect(() => {
    if (lesson !== null) {
      setProgressString(lesson.progress);
      const progressStringList = lesson.progress.split("");
      let progress = 0;
      for (let i = 0; i < progressStringList.length; i++) {
        if (progressStringList[i] == "1") progress++;
      }
      setProgressPercent((progress / progressStringList.length) * 100);
    }
  }, [lesson]);

  return (
    <div className="min-h-screen bg-[#F0F0F0] pt-20 pb-16">
      <Header />
      {loadingStatus ? (
        <Loader />
      ) : (
        <>
          {lesson && (
            <div className="p-8 flex flex-col gap-2">
              <p className="opacity-50">
                Lesson-{lessonNumber}
                {/* {lessonNumber} */}
              </p>
              <h1 className="text-2xl">
                {lesson.title}
                {/* lessonTitle} */}
              </h1>
              <p className="opacity-50">
                {lesson.description}
                {/* {description} */}
              </p>
              <div className="h-1 bg-gray-200 rounded-full w-full mt-2">
                <div
                  className="h-1 bg-green-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex flex-col gap-4 w-full mt-4">
                <Module
                  moduleName={"Walkthrough"}
                  lessonId={lessonId}
                  isComplete={progressString[0] == "1"}
                  assignmentId={assignmentId}
                />
                <Module
                  moduleName={"Practice"}
                  lessonId={lessonId}
                  isComplete={progressString[1] == "1"}
                  assignmentId={assignmentId}
                />
                <Module
                  moduleName={"Assessment"}
                  lessonId={lessonId}
                  isComplete={progressString[2] == "1"}
                  assignmentId={assignmentId}
                />
              </div>
              {nextLessonId !== 0 && (
                <Link
                  to={`/modules/${assignmentId}/${nextLessonId}`}
                  className="px-8 py-3 ml-auto mr-0 bg-[#30A0FE] text-white my-4 rounded-sm"
                >
                  Next Lesson
                </Link>
              )}
            </div>
          )}
          <Navbar />
        </>
      )}
    </div>
  );
}
