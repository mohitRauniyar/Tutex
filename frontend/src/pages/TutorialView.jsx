import React from 'react'
import LessonBannerWithoutProgress from '../components/LessonBannerWithoutProgress'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

export default function TutorialView() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] pt-20 pb-16">
          <Header />
          <div className="p-8">
            <h1 className="text-2xl font-semibold">Tutorial Title</h1>
            <div className="flex flex-col gap-4 w-full mt-8">
              <LessonBannerWithoutProgress/>
            </div>
          </div>
          <Navbar />
        </div>
  )
}
