import React from 'react'
import { Link } from 'react-router-dom'

export default function CourseCard() {
  return (
    <Link to="/course">
        <div className="bg-[url(/assets/Tutorials/phonepeBanner.png)] w-28 h-44 bg-cover">
            <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-950 flex flex-col justify-between items-center p-2">
                <div className="rounded-full bg-[#eeff00] align-right self-end text-right"><p className='inline p-2'>0</p></div>
                <div className="text-white flex flex-col gap-2">
                    <h2 className='text-md text-left'>Tutorial Title</h2>
                    <button className='p-[2px] w-full rounded-xs bg-gradient-to-r from-[#6FF2FE] to-[#30A0FE] text-black text-xs'>
                        status
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}
