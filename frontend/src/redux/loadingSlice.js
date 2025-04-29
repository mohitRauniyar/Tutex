import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    isLoading: (state, action) => {
      const { loading } = action.payload;
      state.isLoading = loading;
    }
  },
});

export const { isLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
