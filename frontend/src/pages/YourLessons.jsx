import React from 'react'
import Header from '../components/Header'
import CourseCardLarge from '../components/CourseCardLarge'
import Navbar from '../components/Navbar'

export default function YourLessons() {
  return (
    <div>
        <Header/>
        <div className="mt-20 mb-16 p-8">
            <h1 className="text-xl font-semibold">Your Lessons</h1>
            <div className="grid grid-cols-2 gap-8 justify-evenly mt-8">
                <CourseCardLarge/>
                <CourseCardLarge/>
                <CourseCardLarge/>
                <CourseCardLarge/>
                <CourseCardLarge/>
                <CourseCardLarge/>
            </div>
        </div>
        <Navbar/>
    </div>
  )
}
