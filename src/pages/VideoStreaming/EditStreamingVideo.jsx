import React, { useEffect, useState } from "react";

import BackButton from "../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  reset,
  updateVideo,
  GetSingleVideo,
} from "../../features/video/VideoSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

function EditStreamingVideo() {
  const { isLoading, isError, isSuccess, message, msg, status, SingleVideo } =
    useSelector((state) => state.StreamingVideos);

  const [url, setUrl] = useState("");
  const [position, setPosition] = useState("");
  const [Name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(GetSingleVideo(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (isSuccess && SingleVideo) {
      setName(SingleVideo.video_name);
      setPosition(SingleVideo.position);
      setUrl(SingleVideo.url);
      setSelectedOption(SingleVideo.status);
    }
    if (status) {
      toast.success(msg);
      dispatch(reset());
      navigate("/StreamingVideo");
    }
    if (status === false) {
      toast.error(msg);
      dispatch(reset());
    }
    if (isError) {
      toast.error(message);
    }
  }, [
    status,
    dispatch,
    isSuccess,
    msg,
    message,
    navigate,
    SingleVideo,
    isError,
  ]);

  const text = SingleVideo.status === "Live" ? "Past" : "Live";

  async function handleChange(e) {
    setSelectedOption(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url || !selectedOption) {
      toast.error("Please fill all details");
    } else {
      const data = {
        video_name: Name,
        url: url,
        status: selectedOption,
        position: position,
        id: params.id,
      };

      dispatch(updateVideo(data));
    }
  };

  const availableEnvironments = [
    "Rajwada Palace",
    "VRLobby",
    "ClassRoom",
    "VR_Metaverse Conference Room",
  ];
  const filteredEnvironments = availableEnvironments.filter(
    (env) => env !== Name
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container ">
      <div className="d-flex justify-content-between border-bottom pb-3 px-5 text-light text-light mt-5">
        <BackButton url={"/StreamingVideo"} />
        <button className=" btn btn-dark ">Editing Environment Video</button>
      </div>

      <div className="container mt-5   ">
        <div className="bg-c-lite-green w-75 mx-auto px-4">
          {" "}
          <form className="text-light  p-4 " onSubmit={handleSubmit}>
            <div className="mb-3 row ">
              <label
                htmlFor="inputPosition"
                className="col-sm-2 col-form-label"
              >
              Environment  Name
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select "
                  type="text"
                  name="Name"
                  id="inputPosition"
                  value={Name || ""}
                  onChange={(e) => setName(e.target.value)}
                >
                  <option key={Name} value={Name}>
                    {Name}
                  </option>
                  {filteredEnvironments.map((env) => (
                    <option key={env} value={env}>
                      {env}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
                Video Status
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select "
                  id="inputStatus"
                  value={selectedOption}
                  onChange={handleChange}
                >
                  <option value={SingleVideo.status}>
                    {" "}
                    {SingleVideo.status}
                  </option>
                  <option value={text || ""}> {text}</option>
                </select>
              </div>
            </div>

            <div className="mb-3 row ">
              <label
                htmlFor="inputPosition"
                className="col-sm-2 col-form-label"
              >
                Video Position
              </label>
              <div className="col-sm-10">
                <input
                  id="inputPosition"
                  type="text"
                  name="position"
                  className="form-control"
                  value={position || ""}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3 row ">
              <label
                htmlFor="inputPosition"
                className="col-sm-2 col-form-label"
              >
                Video URL
              </label>
              <div className="col-sm-10">
                <input
                  id="inputPosition"
                  type="text"
                  name="url"
                  className="form-control"
                  value={url || ""}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-submit btn-dark fw-bold "
                >
                  Update Video
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStreamingVideo


