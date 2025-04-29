import React from "react";

const Loader = () => {
  return (
    <>
      <style>{`
        @keyframes jump7456 {
          15% { border-bottom-right-radius: 3px; }
          25% { transform: translateY(9px) rotate(22.5deg); }
          50% {
            transform: translateY(18px) scale(1, .9) rotate(45deg);
            border-bottom-right-radius: 40px;
          }
          75% { transform: translateY(9px) rotate(67.5deg); }
          100% { transform: translateY(0) rotate(90deg); }
        }

        @keyframes shadow324 {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(1.2, 1); }
        }

        .loader-shadow {
          animation: shadow324 0.5s linear infinite;
        }

        .loader-jump {
          animation: jump7456 0.5s linear infinite;
        }
      `}</style>

      <div className="relative w-12 h-12 mx-auto">
        <div className="absolute top-[60px] left-0 w-12 h-[5px] bg-gray-400 rounded-full loader-shadow"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-blue-600 rounded-md loader-jump"></div>
      </div>
    </>
  );
};

export default Loader;
