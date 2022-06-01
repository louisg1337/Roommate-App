import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomName: "",
        roomId: "",
        roommates: [],
    },  
    reducers: {
        initializeRoom(state, action) {
            state.roomName = action.payload.roomName;
            state.roomId = action.payload.roomId;
            state.roommates = action.payload.roommates;
        },
    }
});

// Export reducer functions
export const { initializeRoom } = roomSlice.actions;

// Export entire slice
export default roomSlice.reducer;