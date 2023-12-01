import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import BackButton from "../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { reset, GetSingleVideo } from "../../features/video/VideoSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { TiEdit } from "react-icons/ti";

function ShowStreamingVideo() {
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

  const extractVideoId = (url) => {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/|live\/))([^\s&?]+)/;
    const match = url.match(regex);
    return match && match[1];
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container p-4 ">
      {" "}
      <BackButton url={"/StreamingVideo"} />
      <table className="table table-dark table-striped mt-5 mb-3 text-center">
        <thead>
          <tr className="table-active">
            <th scope="col">Position</th>
            <th scope="col">Name</th>
            <th scope="col">status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{position}</td>
            <td>{Name}</td>
            <td>{selectedOption}</td>
            <td>
              {" "}
              <button
                className="btn btn-edit me-1"
                onClick={() =>
                  navigate(`/EditStreamingVideo/${SingleVideo._id}`)
                }
              >
                <TiEdit className="fs-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h5>Video</h5>
        <div className=" mt-3" style={{ width: "8rem" }}>
          {url && (
            <div className=" mt-3" style={{ width: "100%", maxWidth: "800px" }}>
              {url && (
                <YouTube
                  videoId={extractVideoId(url)}
                  className="w-100 bg-light"
                  opts={{ height: "240px" }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowStreamingVideo;


