import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  bizs: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {  //functions that modify the global state
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setBizs: (state, action) => {
      state.bizs = action.payload.bizs;
    },
    setBiz: (state, action) => {
      const updatedBizs = state.bizs.map((biz) => {
        if (biz._id === action.payload.biz._id) return action.payload.biz;
        return biz;
      });
      state.bizs = updatedBizs;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setBizs, setBiz } =
  authSlice.actions;
export default authSlice.reducer;
