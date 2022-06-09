import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        data: []
    },
    reducers: { 
        initExpenseData(state, action) {
            state.data = action.payload.expenseData;
        }
    }
})

export const { initExpenseData } = expenseSlice.actions;

export default expenseSlice.reducer;