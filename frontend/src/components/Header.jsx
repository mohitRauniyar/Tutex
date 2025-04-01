import React from 'react'

export default function Header() {
  return (
    <div className='fixed top-0 left-0 h-20 w-full bg-[#30A0FE] p-4 flex gap-4 justify-start items-center z-50'>
        <img src="/assets/mascot.PNG" alt="mascot" className="w-20" />
        <div className="flex flex-col text-white">
            <h1 className="text-2xl font-semibold">Tutex</h1>
            <p className="text-md">Tutorial to Experience</p>
        </div>
    </div>
  )
}
