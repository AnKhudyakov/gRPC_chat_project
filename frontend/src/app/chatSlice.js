import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  users: [],
};

export const chatSlice = createSlice({
  name: "chatPage",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    setUsers: (state, action) => {
      state.users = [...action.payload];
    },
  },
});

export const { setMessages } = chatSlice.actions;
export const { setUsers } = chatSlice.actions;

export default chatSlice.reducer;
