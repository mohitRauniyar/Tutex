import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

export default function CoverPage({page, title, instruction}) {
    
  return (
    <div>
        <Header/>
        <div className='mt-20 mb-16 p-8'>
            <h2 className="text-2xl mb-8">{page}</h2>
            <h1 className="text-3xl mb-8">{title}</h1>
            <p className="mb-12">{instruction}</p>
            <div className="flex justify-evenly w-full">
                <Link to="/modules" className='border-1 border-[#30A0FE] text-[#30A0FE] p-2 rounded-md text-lg'>Go Back</Link>
                <Link to={`/tutorial/UPI/${page.toLowerCase()}`} className='bg-[#30A0FE] py-2 px-4 rounded-md text-lg'>Start</Link>
            </div>
        </div>
        <Navbar/>
    </div>
  )
}
