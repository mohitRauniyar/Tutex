import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CourseCardLarge from "../components/CourseCardLarge";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/loadingSlice";
import { useNavigate } from "react-router-dom";
import { clearUserProfile } from "../redux/userSlice";
import { clearAssignment } from "../redux/currentAssignmentSlice";

export default function YourLessons() {
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading(true));
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchSubscribedCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/tutorial/all`,
          {
            method: "GET",
            credentials: "include",
            signal: signal,
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
        }

        const data = await response.json();
        setSubscribedCourses(data.body || []); // store the subscribedCourses list
      } catch (err) {
        console.error("Failed to fetch subscribedCourses:", err);
        // setError(err.message);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchSubscribedCourses();
    return () => controller.abort();
  }, []);
  return (
    <>
      <Header />
      {loadingStatus ? (
        <Loader />
      ) : (
        <>
          <div className="mt-20 mb-16 p-8">
            <h1 className="text-xl font-semibold">Your Lessons</h1>
            <div className="grid grid-cols-2 gap-8 justify-evenly mt-8">
              {subscribedCourses.map((data, index) => (
                <CourseCardLarge course={data} key={index} />
              ))}
            </div>
          </div>
          <Navbar />
        </>
      )}
    </>
  );
}
