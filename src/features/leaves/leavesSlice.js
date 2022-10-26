import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import format from 'date-fns/format'


const BASE_URL = 'https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves';

export const fetchLeaves = createAsyncThunk('leaves/fetchLeaves', async (arg, { getState, rejectWithValue })=> {
    const { auth } = getState();    
    const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg"
        },
      };

    const response = await axios.get(`${BASE_URL}?select=*`,config);

    return response.data
})
export const fetchLeavesWithFilter = createAsyncThunk('leaves/fetchLeavesWithFilter', async (data, { getState, rejectWithValue })=> {

    const startDate=format(data[0].startDate,"yyyy-MM-dd");
    const endDate=format(data[0].endDate,"yyyy-MM-dd");


    console.log(startDate)
    console.log(endDate)
    const { auth } = getState();    
    const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg"
        },
      };


    const response = await axios.get(`${BASE_URL}?start_date=gt.${startDate}&end_date=lt.${endDate}&select=*`,config);

    console.log(response)

    return response.data

    
})


export const addNewLeave = createAsyncThunk('leaves/addNewLeave', async ({start_date,end_date,reason},{ getState, rejectWithValue }) => {

    const { auth } = getState();
    const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg"
        },
      };

     
    const response = await axios.post(BASE_URL,{start_date,end_date,reason},config)
    console.log(response)
    // return response.data
})


export const updateLeave = createAsyncThunk('leaves/updateLeave', async (initialPost,{ getState, rejectWithValue }) => {
    const { auth } = getState();

    const { id,start_date,end_date } = initialPost;

    

    console.log(initialPost)

    const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg"
        },
      };
    console.log(initialPost)
    
    try {
        const response = await axios.patch(`${BASE_URL}?id=eq.${id}`,initialPost,config)
        // return response.data
        console.log(response)
    } catch (err) {
        //return err.message;
        return initialPost; // only for testing Redux!
    }
})

const leavesSlice = createSlice({
    name: 'leaves',
    initialState: { 
        data:[],
        status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers:{},
    extraReducers(builder) {
        builder
              .addCase(fetchLeaves.pending,(state,action)=>{
                state.status = 'loading'
              })
              .addCase(fetchLeaves.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.data = action.payload

                const loadedPosts = action.payload.sort(function(a, b) {
                    var c = new Date(a.end_date);
                    var d = new Date(b.start_date);
                    return d-c;
                });

                state.data = loadedPosts

              })

              .addCase(fetchLeaves.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
              })
              .addCase(fetchLeavesWithFilter.pending,(state,action)=>{
                state.status = 'loading'
              })
              .addCase(fetchLeavesWithFilter.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.data = action.payload

                const loadedPosts = action.payload.sort(function(a, b) {
                    var c = new Date(a.end_date);
                    var d = new Date();
                    return d-c;
                });

                state.data = loadedPosts

              })

              .addCase(fetchLeavesWithFilter.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
              })

              // .addCase(addNewLeave.fulfilled, (state, action) => {
              //   console.log(action.payload)
              //   // state.data.push(action.payload)

              // })

            //   .addCase(updateLeave.fulfilled, (state, action) => {

            //     console.log(action.payload)
            //     if (!action.payload?.id) {
            //         console.log('Update could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     const { id } = action.payload;
            //     const leaves = state.data.filter(leave => leave.id !== id);
            //     state.data = [...leaves, action.payload];
            // })

    }
   
})

export const {  } = leavesSlice.actions;
export const selectAllLeaves = (state) => state.leaves.data;
export const selectLeaveById = (state, id) =>
    state.leaves.data.find(leave => leave.id === id);

export default leavesSlice.reducer


