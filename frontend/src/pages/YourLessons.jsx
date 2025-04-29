import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CourseCardLarge from '../components/CourseCardLarge'
import Navbar from '../components/Navbar'

export default function YourLessons() {
  const [subscribedCourses, setSubscribedCourses] = useState([]);
    useEffect(() => {
      const fetchSubscribedCourses = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/tutorial/all`, {
            method: "GET",
            credentials: "include",
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          setSubscribedCourses(data.body || []); // store the subscribedCourses list
          console.log(subscribedCourses);
        } catch (err) {
          console.error("Failed to fetch subscribedCourses:", err);
          // setError(err.message);
        } 
      };
  
      fetchSubscribedCourses();
    }, []);
  return (
    <div>
        <Header/>
        <div className="mt-20 mb-16 p-8">
            <h1 className="text-xl font-semibold">Your Lessons</h1>
            <div className="grid grid-cols-2 gap-8 justify-evenly mt-8">
                {subscribedCourses.map((data, index)=>(
                  <CourseCardLarge course={data} key={index}/>
                ))}
            </div>
        </div>
        <Navbar/>
    </div>
  )
}
