// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // we'll create this next
import currentAssignmentReducer from "./currentAssignmentSlice";
import loadingSliceReducer from "./loadingSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    currentAssignment: currentAssignmentReducer,
    loading:loadingSliceReducer
  },
});

export default store;
