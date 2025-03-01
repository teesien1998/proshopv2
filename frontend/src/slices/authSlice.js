import { createSlice } from "@reduxjs/toolkit";
// import { useGetMyOrdersQuery } from "./orderApiSlice";

// const { data, isLoading, error, refetch } = useGetMyOrdersQuery();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;    
      // localStorage.removeItem("userInfo");
      localStorage.clear(); // Clear all the localstorage data, e.g. cart, shipping & userInfo
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
