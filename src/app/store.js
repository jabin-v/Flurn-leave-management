import { configureStore } from "@reduxjs/toolkit";
import { LeavesApi } from './api/apiSlice';

export const store = configureStore({
    reducer: {
        [LeavesApi.reducerPath]: LeavesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(LeavesApi.middleware),
})