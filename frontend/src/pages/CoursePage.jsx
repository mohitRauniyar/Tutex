import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import LessonBanner from "../components/LessonBanner";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/loadingSlice";
import { clearAssignment } from "../redux/currentAssignmentSlice";
import { clearUserProfile } from "../redux/userSlice";

export default function CoursePage() {
  const [assignmentDetail, setAssignmentDetail] = useState(null);
  const assignmentId = useParams().assignmentId;
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;
    dispatch(setLoading(true));
    const fetchAssignmentDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/tutorial/${assignmentId}`,
          {
            method: "GET",
            credentials: "include",
            signal:signal
          }
        );

        if(response.status === 401){
          toast.error('Sesson Expired');
          dispatch(clearUserProfile());
          dispatch(clearAssignment());
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAssignmentDetail(data.body || []);

      } catch (err) {
        console.error("Failed to fetch subscribedCourses:", err);
        toast.error('Failed to fetch course lessons');
      }finally{
        dispatch(setLoading(false));
      }
    };

    fetchAssignmentDetails();
    return ()=>controller.abort();
  }, [assignmentId]);

  return (
    <div className="min-h-screen bg-[#F0F0F0] pt-20 pb-16">
      <Header />
      {loadingStatus ? (
        <Loader />
      ) : (
        <>
          <div className="p-8">
            <h1 className="text-2xl font-semibold">
              {assignmentDetail && assignmentDetail.title}
            </h1>
            <div className="flex flex-col gap-4 w-full mt-8">
              {assignmentDetail &&
                assignmentDetail.lessons.map((lesson, index) => (
                  <LessonBanner lesson={lesson} index={index} key={index} />
                ))}
            </div>
          </div>
          <Navbar />
        </>
      )}
    </div>
  );
}
