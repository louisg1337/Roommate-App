import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: "",
        id: "",
        roomId: "",

    },  
    reducers: {
        initialize(state, action) {
            state.name = action.payload.name;
            state.id = action.payload.id;
            state.roomId = action.payload.roomId;
        },
        updateRoom(state, action) {
            state.roomId = action.payload.roomId;
        }
    }
});

// Export reducer functions
export const { initialize, updateRoom } = userSlice.actions;

// Export entire slice
export default userSlice.reducer;