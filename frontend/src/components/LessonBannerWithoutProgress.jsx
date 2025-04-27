import React from 'react'
import { GoChevronRight } from 'react-icons/go'

export default function LessonBannerWithoutProgress() {
  return (
    <div className="flex flex-col bg-[#ffffff] w-full px-4 py-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="opacity-50 text-sm">Lesson-1</p>
          <h3 className="text-lg">Lesson Title</h3>
        </div>
        <GoChevronRight className="font-extralight text-2xl" />
      </div>
      
    </div>
  )
}
