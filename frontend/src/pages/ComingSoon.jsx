import React, { useState } from "react";
import Navbar from "../components/Navbar";

const ComingSoon = () => {
  

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-[url(/assets/background.png)]">
      <div className="bg-white rounded-xl p-8 w-full absolute bottom-8 h-108">
        <h3 className="text-2xl font-bold text-center mt-6">Feature Coming Soon...</h3>
        <Navbar/>
      </div>
    </div>
  );
};

export default ComingSoon;
