import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import CourseBanner from "../components/CourseBanner";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/loadingSlice";
import toast from "react-hot-toast";
import { clearAssignment } from "../redux/currentAssignmentSlice";
import { clearUserProfile } from "../redux/userSlice";

export default function Homepage() {
  const loadingStatus = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState(null);
  const [subscribedCourses, setSubscribedCourses] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setLoading(true));
    let controller = new AbortController();
    const fetchCourses = async () => {
      let signal = controller.signal;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/tutorial/all`,
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
        const list = data.body;
        setCourses(list);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        // toast.error("Failed to fetch courses");
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchCourses();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    let controller = new AbortController();
    let signal = controller.signal;
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
          dispatch(clearAssignment());
          dispatch(clearUserProfile());
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
        // toast.error("Failed to fetch subscribedCourses");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSubscribedCourses();
    return () => controller.abort();
  }, []);

  useEffect(()=>{
    const handleFeedback = async ()=>{
      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/feedback/query`, {
          method: "GET",
          credentials: "include",
        })
        if(!response.ok){
          setShowFeedback(true);
        }
        else{
          setShowFeedback(false);
        }
      }catch(err){
        console.log("Failed to fetch the feedback data" + err);
      }
    }
    handleFeedback()
  }, [])

  return (
    <>
      {loadingStatus ? (
        <Loader />
      ) : (
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
              {subscribedCourses &&
                subscribedCourses.map((data, index) => (
                  <CourseCard
                    imageLink={data.photoUrl}
                    title={data.title}
                    status={data.status}
                    assignmentId={data.assignmentId}
                    key={index}
                  />
                ))}
              {/* <CourseCard imageLink={"/assets/Tutorials/phonepeBanner.png"} title={"UPI Payment Tutorial"}/>
          <CourseCard imageLink={"/assets/Tutorials/whatsapp.png"} title={"Messaging on whatapp"}/>
          <CourseCard imageLink={"/assets/Tutorials/instagram.png"} title={"Using Instagram"}/>
          <CourseCard imageLink={"/assets/Tutorials/facebook.png"} title={"Using facebook"}/>
          <CourseCard imageLink={"/assets/Tutorials/irctc.png"} title={"Ticket booking"}/>
          <CourseCard imageLink={"/assets/Tutorials/amazon.png"} title={"Shopping on Amazon"}/>
          <CourseCard imageLink={"/assets/Tutorials/flipkart.png"} title={"Shopping on Flipkart"}/> */}
            </div>
            {showFeedback && (
              <div className="w-full h-28 mt-4 bg-[#30A0FE] p-4 text-white rounded-sm relative" onClick={()=>{navigate("/feedback")}}>
              <p className="text-lg font-semibold mb-2">Help us improve our services.</p>
              <p>Submit your feedback</p>
              <Link to="/feedback" className="text-[#30A0FE] bg-white text-md px-3 py-2 absolute right-3 bottom-3 rounded-sm">Go to feedback</Link>
          </div>
            )}
            <Link
              to="/search"
              className="flex justify-between w-full h-12 my-8 items-center gap-4"
            >
              <p className="w-full bg-[#E1E1E1] p-3 rounded-sm">Search</p>
              <MdOutlineSearch className="text-2xl" />
            </Link>

            <h2 className="mb-8 font-semibold text-lg">Explore</h2>
            <div className="grid grid-cols-2 gap-8 mx-4">
              {courses &&
                courses.map((data, index) => (
                  <CourseBanner
                    imageLink={data.photoUrl}
                    title={data.title}
                    key={index}
                    courseId={data.courseId}
                  />
                ))}
              {/* <CourseBanner imageLink={"/assets/Tutorials/whatsapp.png"} title={"Messaging on whatapp"} lessonCount={4}/>
          <CourseBanner imageLink={"/assets/Tutorials/instagram.png"} title={"Using Instagram"} lessonCount={6}/>
          <CourseBanner imageLink={"/assets/Tutorials/facebook.png"} title={"Using facebook"} lessonCount={5}/>
          <CourseBanner imageLink={"/assets/Tutorials/uber.png"} title={"Booking Taxi"} lessonCount={4}/>
          <CourseBanner imageLink={"/assets/Tutorials/irctc.png"} title={"Ticket booking"} lessonCount={2}/>
          <CourseBanner imageLink={"/assets/Tutorials/amazon.png"} title={"Shopping on Amazon"} lessonCount={3}/>
          <CourseBanner imageLink={"/assets/Tutorials/flipkart.png"} title={"Shopping on Flipkart"} lessonCount={3}/> */}
            </div>
          </div>
          <Navbar />
        </div>
      )}
    </>
  );
}
