import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
  accountLoading:true
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
      localStorage.removeItem("userProfile");
    },
    setAccountLoading:(state,action)=>{
      state.accountLoading = action.payload
    }
  },
});

export const { setUserProfile, clearUserProfile,setAccountLoading } = userSlice.actions;
export default userSlice.reducer;
