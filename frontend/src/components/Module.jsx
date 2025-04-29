import React from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { URL_MAPS } from "../constants.js";
import { useDispatch } from "react-redux";
import { setAssignment } from "../redux/currentAssignmentSlice.js";

export default function Module({
  moduleName,
  isComplete,
  lessonId,
  assignmentId,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(
      setAssignment({
        assignmentId,
        lessonId,
        moduleName,
      })
    );
    navigate(`/tutorial/${URL_MAPS[lessonId]}/${moduleName.toLowerCase()}`);
  };
  return (
    <div
      className="w-full flex justify-between bg-white p-4 items-center"
      onClick={handleClick}
    >
      <p className="text-lg">{moduleName}</p>
      {isComplete ? (
        <FaCheckCircle className="text-xl text-green-400" />
      ) : (
        <FaRegCircle className="text-xl" />
      )}
    </div>
  );
}
