// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // we'll create this next
import currentAssignmentReducer from "./currentAssignmentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    currentAssignment: currentAssignmentReducer
  },
});

export default store;
