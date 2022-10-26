import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/v1/token?grant_type=password',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/v1/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(logOut())
                    // setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    // }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
   useLoginMutation,
   useSendLogoutMutation

} = authApiSlice 