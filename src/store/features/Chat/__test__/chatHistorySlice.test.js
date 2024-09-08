/**
 * @file chatHistorySlice.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import chatHistoryReducer, { saveMessage } from "../chatHistorySlice";

describe("chatHistorySlice", () => {
  it("should add a new room and message if the room does not exist", () => {
    const initialState = [];
    const action = {
      type: saveMessage.type,
      payload: {
        roomId: "room1",
        message: "hello",
      },
    };

    const nextState = chatHistoryReducer(initialState, action);

    expect(nextState).toEqual([
      {
        roomId: "room1",
        messages: ["hello"],
      },
    ]);
  });

  it("should add a message to an existing room", () => {
    const initialState = [
      {
        roomId: "room1",
        messages: ["Previous message"],
      },
    ];
    const action = {
      type: saveMessage.type,
      payload: {
        roomId: "room1",
        message: "Hello, World!",
      },
    };

    const nextState = chatHistoryReducer(initialState, action);

    expect(nextState).toEqual([
      {
        roomId: "room1",
        messages: ["Previous message", "Hello, World!"],
      },
    ]);
  });
});
