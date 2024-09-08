/**
 * @file chatHistorySlice.js
 * @brief Redux slice for managing chat history.
 *
 * This module defines a Redux slice named 'chatHistory'. It is responsible for managing the state of chat history
 * in a chat application, allowing for the storage and retrieval of messages in different chat rooms.
 */
import { createSlice } from "@reduxjs/toolkit";

/**
 * Creates a slice for chat history state management.
 *
 * The slice includes an initialState array to store chat room details, including messages for each room,
 * and reducers to handle updates to the chat history.
 */
export const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: [],
  reducers: {
    /**
     * Reducer to save a message in the chat history.
     *
     * @param {object} state - The current state of the slice.
     * @param {object} action - The dispatched action containing the payload with room and message details.
     *
     * If the room does not exist in the state, it creates a new room with the message.
     * If the room exists, it appends the new message to the room's messages array.
     */
    saveMessage: (state, action) => {
      if (!state.find((room) => room.roomId === action.payload.roomId)) {
        state.push({
          roomId: action.payload.roomId,
          messages: [action.payload.message],
        });
      } else {
        let room = state.find((room) => room.roomId === action.payload.roomId);
        room.messages = [...room.messages, action.payload.message];
      }
    },
  },
});

export const { saveMessage } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;
