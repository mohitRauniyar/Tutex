import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentId: null,
  lessonId: null,
  moduleName: null,
};

const currentAssignmentSlice = createSlice({
  name: "currentAssignment",
  initialState,
  reducers: {
    setAssignment: (state, action) => {
      const { assignmentId, lessonId, moduleName } = action.payload;
      state.assignmentId = assignmentId;
      state.lessonId = lessonId;
      state.moduleName = moduleName;
    },
    clearAssignment: (state) => {
      state.assignmentId = null;
      state.lessonId = null;
      state.moduleName = null;
    },
  },
});

export const { setAssignment, clearAssignment } = currentAssignmentSlice.actions;

export default currentAssignmentSlice.reducer;
