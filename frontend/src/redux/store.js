// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // we'll create this next

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
