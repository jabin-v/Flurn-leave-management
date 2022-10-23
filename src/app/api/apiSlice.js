import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"


    export const LeavesApi=createApi({
        reducerPath:"LeavesApi",
        baseQuery:fetchBaseQuery({
            baseUrl:"https://dkgicggupnrxldwvkeft.supabase.co",
            prepareHeaders: (headers) => {
                headers.set('apikey', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZi   I6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nj  YwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJ  s_0TFhOb1n3zkSVc7eg");
          
                return headers;
              },

        }),
        endpoints:(builder)=>({
            login: builder.mutation({
                query: credentials => ({
                    url: '/auth/v1/token?grant_type=password',
                    method: 'POST',
                    body: { ...credentials }
                })
            }),
            register: builder.mutation({
                query: initialUserData => ({
                    url: '/auth/v1/signup',
                    method: 'POST',
                    body: {
                        ...initialUserData,
                    }
                }),
            }),

        

            
        })

    })



    export const {
        useLoginMutation,
        useRegisterMutation
        
        
      } = LeavesApi;