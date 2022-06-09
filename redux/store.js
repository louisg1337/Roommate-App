import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import roomSlice from './roomSlice';
import expenseSlice from './expenseSlice';
import todoSlice from './todoSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        room: roomSlice,
        expense: expenseSlice,
        todo: todoSlice,
    },
})