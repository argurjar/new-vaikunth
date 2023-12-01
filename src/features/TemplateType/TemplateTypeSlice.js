
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TemplatetypeService } from "./TemplateTypeService";


const initialState = {
    AllTemplatetypes: [],
    Templatetype: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    msg: "",
    status: null,
    totalTemplatetypes: "",
    item_per_page: "",
  
};

const TemplateTypeSlice = createSlice({
    name: "Templatetype",
    initialState,
    reducers : {
        reset: (state) => initialState ,
       
    }, 
       
    extraReducers: (builder) => {
        builder
            .addCase(TemplateTypes.pending, (state) => {
                state.isLoading = true
                state.status=null
               
            })
            .addCase(TemplateTypes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false        
                state.AllTemplatetypes = action.payload.data
                state.totalTemplatetypes = action.payload.totalTemplatetypes
                state.item_per_page=action.payload.item_per_page
            })
            .addCase(TemplateTypes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })

            .addCase(SingelTemplatetype.pending, (state) => {
                state.isLoading = true
            })
            .addCase(SingelTemplatetype.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.Templatetype = action.payload.data

            })
            .addCase(SingelTemplatetype.rejected,(state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })


            .addCase(AddTemplateType.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AddTemplateType.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true             
                state.AllTemplatetypes.push(action.payload.data)
                state.msg = action.payload.msg
                state.status=action.payload.status
            })
            .addCase(AddTemplateType.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
        

            .addCase(DeleteTemplateType.pending, (state) => {
                state.isLoading = true
            })
            .addCase(DeleteTemplateType.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.msg = action.payload.msg
                state.AllTemplatetypes = state.AllTemplatetypes.filter(item => item.id !== action.payload.id)
                state.status=action.payload.status
            })
            .addCase(DeleteTemplateType.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
         
            })

            .addCase(updateTemplatetype.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTemplatetype.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.msg = action.payload.msg
                state.status=action.payload.status
            })
            .addCase(updateTemplatetype.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload

            })

    }

});



export const TemplateTypes = createAsyncThunk("Templatetypes/get", async(_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await TemplatetypeService.Templatetypes(_,token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()     
        return thunkAPI.rejectWithValue(message)
    }
})

export const SingelTemplatetype = createAsyncThunk("Templatetype/singel", async (id,thunkAPI) => { 
    try {
        const token = thunkAPI.getState().auth.user.token
        return await TemplatetypeService.SingelTemplatetype( id,token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()    
        return thunkAPI.rejectWithValue(message)
    }
})



export const AddTemplateType = createAsyncThunk("Templatetype/Add", async (Templatetypesdata,thunkAPI) => {  
    try {
        const token = thunkAPI.getState().auth.user.token
        return await TemplatetypeService.AddTemplatetype(Templatetypesdata,  token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()    
        return thunkAPI.rejectWithValue(message)
    }
})

export const DeleteTemplateType = createAsyncThunk("Templatetype/delet", async (id , thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await TemplatetypeService.DeleteTemplatetype( id,token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const updateTemplatetype = createAsyncThunk("Templatetype/update", async (Templatetypesdata,thunkAPI) => { 
    try {
        const token = thunkAPI.getState().auth.user.token
        return await TemplatetypeService.updateTemplatetype(Templatetypesdata,token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()    
        return thunkAPI.rejectWithValue(message)
    }
})

export const { reset } = TemplateTypeSlice.actions


export default TemplateTypeSlice.reducer;