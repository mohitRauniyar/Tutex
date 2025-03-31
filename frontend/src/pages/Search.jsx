import React from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import CourseBanner from '../components/CourseBanner'
import Navbar from '../components/Navbar'

export default function Search() {
  return (
    <div>
        <div className=" fixed top-0 left-0 w-full bg-[#E1E1E1] p-4 flex items-center z-50">
            <input type="text" name="search" id="search" placeholder='Search' className='w-full active:border-0 focus:outline-none'/>
            <MdOutlineSearch className='text-2xl'/>
        </div>
        <div className="p-4 mt-12">
            <p className="text-xl opacity-50 my-4">Results</p>
            <div className="grid grid-cols-2 gap-y-8 w-full items-center justify-items-center">
                <CourseBanner/>
                <CourseBanner/>
                <CourseBanner/>
                <CourseBanner/>
                <CourseBanner/>
                <CourseBanner/>
                <CourseBanner/>
                <CourseBanner/>
            </div>
        </div>
        <Navbar/>
    </div>
  )
}
