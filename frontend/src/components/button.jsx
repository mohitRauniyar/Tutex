import React from "react";

const Button = ({ children, className, disabled, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-full text-white font-semibold transition ${
        disabled ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
