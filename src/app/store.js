import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import usersReducer from '../features/userlist/usersSlice'
import VideoReducer from "../features/video/VideoSlice";
import AddFeatureReducer from "../features/AddFeature/AddFeatureSlice"
import AddTemplateReducer from "../features/AddTemplate/AddTemplateSlice"
// import NpcReducer from "../features/NPc/NpcSlice"
// import ShortUrlReducer from "../features/ShortUrl/ShortUrlSlice";AddFeature
const store=configureStore({
    reducer: {
        auth : authReducer,
        Users:usersReducer,
        StreamingVideos: VideoReducer,
        AddFeature: AddFeatureReducer,
        AddTemplate : AddTemplateReducer
      
    }
})

export default store