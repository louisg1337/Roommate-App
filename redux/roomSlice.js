import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomName: "",
        roomId: "",
        roommates: [],
        owner: "",
        expenseId: "",
        todoId: "",
        status: "",
        statusName: "",
    },  
    reducers: {
        initializeRoom(state, action) {
            state.roomName = action.payload.roomName;
            state.roomId = action.payload.roomId;
            state.roommates = action.payload.roommates;
            state.owner = action.payload.owner;
            state.expenseId = action.payload.expenseId;
            state.todoId = action.payload.todoId;
            state.status = action.payload.status;
        },
        changeStatus(state, action){
            state.status = action.payload.status;
            state.statusName = action.payload.statusName;
        }
    }
});

// Export reducer functions
export const { initializeRoom, changeStatus } = roomSlice.actions;

// Export room state
export const selectRoom = (state) => state.room;

// Export entire slice
export default roomSlice.reducer;