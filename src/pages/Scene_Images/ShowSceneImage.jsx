import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { reset, GetSingleVideo } from "../../features/video/VideoSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { TiEdit } from "react-icons/ti";

function ShowSceneImage() {
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
      navigate("/SceneImages");
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

 

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container p-4 ">
      {" "}
      <BackButton url={"/SceneImages"} />
      <table className="table table-dark table-striped mt-5 mb-3 text-center">
        <thead>
          <tr className="table-active">
            <th scope="col">Position</th>
            <th scope="col"> Environment Name</th>
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
                  navigate(`/EditSceneImage/${SingleVideo._id}`)
                 
                }
              >
                <TiEdit className="fs-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h5>Image</h5>
       <img src={url} alt={url} width={350} height={250}/>
      </div>
    </div>
  );
}

export default ShowSceneImage;


