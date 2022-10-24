import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://dkgicggupnrxldwvkeft.supabase.co',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        headers.set('apikey', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg");


        return headers
    }
})


export const apiSlice = createApi({
    baseQuery,
    endpoints: builder => ({})
})


