
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TemplateService } from "./AddTemplateService";


const initialState = {
    AllTemplates: [],
    Template: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    msg: "",
    status: null,
    totalTemplates: "",
    item_per_page: "",
  
};

const AddTemplateSlice = createSlice({
    name: "Template",
    initialState,
    reducers : {
        reset: (state) => initialState ,
       
    }, 
       
    extraReducers: (builder) => {
        builder
            .addCase(Templates.pending, (state) => {
                state.isLoading = true
                state.status=null
               
            })
            .addCase(Templates.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError=false
                state.AllTemplates = action.payload.data
                state.totalTemplates = action.payload.totalTemplates
                state.item_per_page=action.payload.item_per_page
            })
            .addCase(Templates.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })

            .addCase(SingelTemplate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(SingelTemplate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.Template = action.payload.data

            })
            .addCase(SingelTemplate.rejected,(state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })


            .addCase(AddTemplate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AddTemplate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true                 
                state.msg = action.payload.msg
                state.status=action.payload.status
            })
            .addCase(AddTemplate.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
        

            .addCase(DeleteTemplate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(DeleteTemplate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.msg = action.payload.msg
                // state.AllTemplates = state.AllTemplates.filter(item => item.id !== action.payload.id)
                state.status=action.payload.status
            })
            .addCase(DeleteTemplate.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
         
            })

            .addCase(updateTemplate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTemplate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.msg = action.payload.msg
                state.status=action.payload.status
            })
            .addCase(updateTemplate.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload

            })

    }

});



export const Templates = createAsyncThunk("Templates/get", async(_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await TemplateService.Templates(_,token)
    } catch (error) {
        const message = (error.msg && error.response.data && error.response.data.message) || error.message || error.toString()     
        return thunkAPI.rejectWithValue(message)
    }
})

export const SingelTemplate = createAsyncThunk("Template/singel", async (id,thunkAPI) => { 
    try {
        const token = thunkAPI.getState().auth.user.token
        return await TemplateService.SingelTemplate( id,token)
    } catch (error) {
        const message = (error.msg && error.response.data && error.response.data.message) || error.message || error.toString()    
        return thunkAPI.rejectWithValue(message)
    }
})



export const AddTemplate = createAsyncThunk("Template/Add", async (Templatesdata,thunkAPI) => {  
    try {
        const token = thunkAPI.getState().auth.user.token
        return await TemplateService.AddTemplate(Templatesdata,  token)
    } catch (error) {
        const message = (error.msg && error.response.data && error.response.data.message) || error.message || error.toString()   
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const DeleteTemplate = createAsyncThunk("Template/delet", async (id , thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await TemplateService.DeleteTemplates( id,token)
    } catch (error) {
        const message = (error.msg && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const updateTemplate = createAsyncThunk("Template/update", async (Templatesdata,thunkAPI) => { 
    try {
        const token = thunkAPI.getState().auth.user.token
        return await TemplateService.updateTemplate(Templatesdata,token)
    } catch (error) {
        const message = (error.msg && error.response.data && error.response.data.message) || error.message || error.toString()    
        return thunkAPI.rejectWithValue(message)
    }
})

export const { reset } = AddTemplateSlice.actions


export default AddTemplateSlice.reducer;