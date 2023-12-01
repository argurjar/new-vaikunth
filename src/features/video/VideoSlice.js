import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VideoService } from "./VideoService";

const initialState = {
  AllVideos: [],
  SingleVideo: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
  msg: "",
  status: null,
  item_per_page: null,
  totalvideos: null,
};
const VideoSlice = createSlice({
  name: "Videos",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.AllVideos = action.payload.data?.videos;
        state.item_per_page = action.payload?.item_per_page;
        state.totalvideos = action.payload.data?.totalVideos;
      })
      .addCase(GetAllVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(AddVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.AllVideos.push(action.payload.data);
        state.msg = action.payload.message;
        state.status = action.payload.success;
      })
      .addCase(AddVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetSingleVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetSingleVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.SingleVideo = action.payload.data;
      })
      .addCase(GetSingleVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(DeletVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.msg = action.payload.message;
        // state.AllVideos = state.AllVideos.filter((item) => item._id !== action.payload.data._id);
        state.status = action.payload.success;
      })
      .addCase(updateVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.AllVideos = state.AllVideos.map((item) =>
          item.id === action.payload.data._id ? action.payload.data : item
        );
        state.msg = action.payload.message;
        state.status = action.payload.success;
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const GetAllVideos = createAsyncThunk(
  "get/videos",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await VideoService.GetAllVideos(token);
    } catch (error) {
      const message =
        (error.msg && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const AddVideo = createAsyncThunk(
  "Add/video",
  async (videoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await VideoService.AddVideo(videoData, token);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetSingleVideo = createAsyncThunk(
  "get/video",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await VideoService.GetsingleVideo(id, token);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const DeletVideo = createAsyncThunk(
  "delet/video",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await VideoService.DeleteVideo(id, token);
    } catch (error) {}
  }
);

export const updateVideo = createAsyncThunk(
  "update/video",
  async (imagedata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await VideoService.UpdateVideo(imagedata, token);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = VideoSlice.actions;

export default VideoSlice.reducer;
