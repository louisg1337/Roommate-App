import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: "",
        id: "",
    },  
    reducers: {
        initializeUser(state, action) {
            state.name = action.payload.name;
            state.id = action.payload.id;
        },
    }
});

// Export reducer functions
export const { initializeUser } = userSlice.actions;

// Export entire slice
export default userSlice.reducer;