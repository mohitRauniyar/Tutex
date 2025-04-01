import React from 'react'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Module({moduleName, isComplete, lessonId}) {
  return (
    // <Link to={`/tutorial/${lessonId}/${moduleName.toLowerCase()}`} className="w-full flex justify-between bg-white p-4 items-center">
    <Link to={`/tutorial/UPI/${moduleName.toLowerCase()}`} className="w-full flex justify-between bg-white p-4 items-center">
        <p className="text-lg">{moduleName}</p>
        {isComplete? (<FaCheckCircle className='text-xl text-green-400'/>) : (<FaRegCircle className='text-xl'/>)}
    </Link>
  )
}
