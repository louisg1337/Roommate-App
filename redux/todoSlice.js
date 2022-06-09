import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        data: [],
    },
    reducers: {
        initTodoData(state, action) {
            state.data = action.payload.data;
        }
    }
});

export const { initTodoData } = todoSlice.actions;

export default todoSlice.reducer;