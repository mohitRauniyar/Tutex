import React from 'react'
import { Link } from 'react-router-dom'

// export default function CourseCard({ imageLink, title, status, assignmentId }) {
//   const imageUrl = `https://drive.google.com/uc?export=view&id=${imageLink.split('/')[5]}`;
//   return (
//     <Link to={`/course/${assignmentId}`}>
//       <div
//         className={`w-28 h-44 bg-cover`}
//         style={{ backgroundImage: `url(${imageUrl})` }}
//       >
//         <div className="w-full h-full bg-gradient-to-b from-[#00000076] to-gray-950 to-60% flex flex-col justify-between items-center p-2">
//           <div className="rounded-full bg-[#eeff00] align-right self-end text-right">
//             <p className="inline p-2">0</p>
//           </div>
//           <div className="text-white flex flex-col gap-2">
//             <h2 className="text-md text-left">{title}</h2>
//             <button className="p-[2px] w-full rounded-xs bg-gradient-to-r from-[#6FF2FE] to-[#30A0FE] text-black text-xs">
//               {status === "pending"? "Continue": "Completed"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   )
// }
export default function CourseCard({ imageLink, title, status, assignmentId }) {
  const imageUrl = `/assets/Tutorials/${imageLink}`;
  console.log(imageUrl)

  return (
    <Link to={`/course/${assignmentId}`}>
      <div
        className={`w-28 h-44 bg-cover`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="w-full h-full bg-gradient-to-b from-[#00000076] to-gray-950 to-60% flex flex-col justify-between items-center p-2">
          <div className="rounded-full bg-[#eeff00] align-right self-end text-right">
            <p className="inline p-2">0</p>
          </div>
          <div className="text-white flex flex-col gap-2">
            <h2 className="text-md text-left">{title}</h2>
            <button className="p-[2px] w-full rounded-xs bg-gradient-to-r from-[#6FF2FE] to-[#30A0FE] text-black text-xs">
              {status === "pending" ? "Continue" : "Completed"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
