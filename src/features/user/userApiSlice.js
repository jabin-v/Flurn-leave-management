
import { apiSlice } from "../../app/api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: initialUserData => ({
                url: '/auth/v1/signup',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
        }),
        
    }),
})

export const {
   useRegisterMutation
    
} = usersApiSlice




