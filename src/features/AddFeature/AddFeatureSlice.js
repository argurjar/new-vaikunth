
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FeatureService } from "./AddFeatureService";


const initialState = {
    AllFeatures: [],
    Feature: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    msg: "",
    status: null,
    totalFeatures: "",
    item_per_page: "",
  
};

const AddFeatureSlice = createSlice({
    name: "Feature",
    initialState,
    reducers : {
        reset: (state) => initialState ,
       
    }, 
       
    extraReducers: (builder) => {
        builder
            .addCase(Features.pending, (state) => {
                state.isLoading = true
                state.status=null
               
            })
            .addCase(Features.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError=false
                state.AllFeatures = action.payload.data
                state.totalFeatures = action.payload.totalFeatures
                state.item_per_page=action.payload.item_per_page
            })
            .addCase(Features.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })

            .addCase(SingelFeature.pending, (state) => {
                state.isLoading = true
            })
            .addCase(SingelFeature.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.Feature = action.payload.data

            })
            .addCase(SingelFeature.rejected,(state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })


            .addCase(AddFeature.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AddFeature.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true                 
                state.msg = action.payload.msg
                state.status=action.payload.status
            })
            .addCase(AddFeature.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
        

            .addCase(DeleteFeature.pending, (state) => {
                state.isLoading = true
            })
            .addCase(DeleteFeature.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.msg = action.payload.msg
                // state.AllFeatures = state.AllFeatures.filter(item => item.id !== action.payload.id)
                state.status=action.payload.status
            })
            .addCase(DeleteFeature.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
         
            })

            .addCase(updateFeature.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateFeature.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.msg = action.payload.msg
                state.status=action.payload.status
            })
            .addCase(updateFeature.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload

            })

    }

});



export const Features = createAsyncThunk("Features/get", async(_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await FeatureService.Features(_,token)
    } catch (error) {
        const message = (error.msg && error.response.data && error.response.data.message) || error.message || error.toString()     
        return thunkAPI.rejectWithValue(message)
    }
})

export const SingelFeature = createAsyncThunk("Feature/singel", async (id,thunkAPI) => { 
    try {
        const token = thunkAPI.getState().auth.user.token
        return await FeatureService.SingelFeature( id,token)
    } catch (error) {
        const message = (error.msg && error.response.data && error.response.data.message) || error.message || error.toString()    
        return thunkAPI.rejectWithValue(message)
    }
})



export const AddFeature = createAsyncThunk("Feature/Add", async (Featuresdata,thunkAPI) => {  
    try {
        const token = thunkAPI.getState().auth.user.token
        return await FeatureService.AddFeature(Featuresdata,  token)
    } catch (error) {
        const message = (error.msg && error.response.data && error.response.data.message) || error.message || error.toString()   
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const DeleteFeature = createAsyncThunk("Feature/delet", async (id , thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await FeatureService.DeleteFeatures( id,token)
    } catch (error) {
        const message = (error.msg && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const updateFeature = createAsyncThunk("Feature/update", async (Featuresdata,thunkAPI) => { 
    try {
        const token = thunkAPI.getState().auth.user.token
        return await FeatureService.updateFeature(Featuresdata,token)
    } catch (error) {
        const message = (error.msg && error.response.data && error.response.data.message) || error.message || error.toString()    
        return thunkAPI.rejectWithValue(message)
    }
})

export const { reset } = AddFeatureSlice.actions


export default AddFeatureSlice.reducer;