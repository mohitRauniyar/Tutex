import React, { useState } from 'react';
import { GoChevronRight } from 'react-icons/go';

export default function LessonBannerWithoutProgress({ lesson, index }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="flex flex-col bg-[#ffffff] w-full px-4 py-3 border-b">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDescription}
      >
        <div>
          <p className="opacity-50 text-sm">Lesson-{index + 1}</p>
          <h3 className="text-lg">{lesson.title}</h3>
        </div>
        <GoChevronRight
          className={`text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
        />
      </div>

      {/* Animated Description */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 text-sm">{lesson.description}</p>
      </div>
    </div>
  );
}
