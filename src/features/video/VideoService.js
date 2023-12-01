import axios from "axios";
const API_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL + "/api/videos" : "/api/videos";

const GetAllVideos = async (token) => {

  const config = {
    headers: {
      Authorization: token
        
    },
  };

  const response = await axios.get(API_URL+"/getVideos",config);

  return response.data;
};

const AddVideo = async (videodata, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(API_URL + "/addVideo", videodata, config);

  return response.data;
};

const GetsingleVideo = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.get(API_URL + "/getVideo/" + id, config);

  return response.data;
};

const DeleteVideo = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.delete(API_URL + "/deleteVideo/" + id, config);

  return response.data;
};

const UpdateVideo = async (videodata, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(
    API_URL + "/updateVideo/" + videodata.id,
    videodata,
    config
  );

  return response.data;
};

export const VideoService = {
  GetAllVideos,
  AddVideo,
  GetsingleVideo,
  DeleteVideo,
  UpdateVideo,
};
