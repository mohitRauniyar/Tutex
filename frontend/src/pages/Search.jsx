import React, { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import CourseBanner from "../components/CourseBanner";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/loadingSlice";
import Loader from "../components/Loader";
import { clearAssignment } from "../redux/currentAssignmentSlice";
import { clearUserProfile } from "../redux/userSlice";

export default function Search() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses,setFilteredCourses] = useState([]);
  const [text,setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.loading.isLoading);
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
          navigate("/login", { replace: true });
          dispatch(clearAssignment());
          dispatch(clearUserProfile());
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
        toast.error("Failed to fetch courses");
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchCourses();

    return () => controller.abort();
  }, []);

  useEffect(()=>{
    let filtered = []
    courses && courses.forEach((course)=>{
      let words = course.slug.split("-");
      for(let word of words){
        if(word.toLowerCase().includes(text.toLowerCase())){
          filtered.push(course);break;
        }
      }
    })
    setFilteredCourses(filtered);
  },[text,courses]);

  return (
    <div>
      <div className=" fixed top-0 left-0 w-full bg-[#E1E1E1] p-4 flex items-center z-50">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="w-full active:border-0 focus:outline-none"
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />
        <MdOutlineSearch className="text-2xl" />
      </div>
      {loadingStatus ? (
        <Loader />
      ) : (
        <>
          <div className="p-4 mt-12">
            <p className="text-xl opacity-50 my-4">Results</p>
            <div className="grid grid-cols-2 gap-y-8 w-full items-center justify-items-center">
              {filteredCourses &&
                filteredCourses.map((data, index) => (
                  <CourseBanner
                    imageLink={data.photoUrl}
                    title={data.title}
                    key={index}
                    courseId={data.courseId}
                  />
                ))}
            </div>
          </div>
          <Navbar />
        </>
      )}
    </div>
  );
}
