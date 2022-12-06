import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    authPage: authReducer,
  },
});

console.log("STATE", store.getState());

export default store;
