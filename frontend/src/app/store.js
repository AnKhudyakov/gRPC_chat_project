import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
const store = configureStore({
  reducer: {
    authPage: authReducer,
    chatPage: chatReducer,
  },
});

console.log("STATE", store.getState());

export default store;
