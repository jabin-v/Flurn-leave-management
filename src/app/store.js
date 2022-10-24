import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import leavesReducer  from "../features/leaves/leavesSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        leaves:leavesReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})