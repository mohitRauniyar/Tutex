import React from 'react'
import { Link } from 'react-router-dom'

export default function CourseCardLarge({course}) {
    console.log(course.photoUrl);
  return (
    <Link to={`/course/${course.assignmentId}`}>
        <div className="w-40 h-68 bg-cover" style={{ backgroundImage: `url(/assets/Tutorials/${course.photoUrl})` }}>
            <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-950 flex items-end p-4">
                {/* <div className="rounded-full bg-[#eeff00] align-right self-end text-right"><p className='inline p-2'>0</p></div> */}
                <div className="text-white flex flex-col grow-0 gap-2">
                    <h2 className='text-xl text-left'>{course.title}</h2>
                    <button className='p-[2px] px-4 w-fit rounded-xs bg-gradient-to-r from-[#6FF2FE] to-[#30A0FE] text-black text-xs'>
                        {course.status == "pending" ? "Continue": "Completed"}
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}
