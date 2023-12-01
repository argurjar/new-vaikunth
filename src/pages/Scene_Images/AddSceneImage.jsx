import React, { useEffect, useState } from "react";

import BackButton from "../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddVideo, reset } from "../../features/video/VideoSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import uploadToS3AndGenerateUrl from "../../S3bucket/s3Utils";

function AddSceneImage() {
  const { isLoading, isError, isSuccess, message, msg, status } = useSelector(
    (state) => state.StreamingVideos
  );
  const [url, setUrl] = useState("");
  const [position, setPosition] = useState("");
  const [Name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState("Image");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoadinG, setIsLoadinG] = useState(false);

  async function handleImageChange(e) {
    const selectedFile = e.target.files[0];
    setIsLoadinG(true);
    if (selectedFile && selectedFile.size > 1 * 1024 * 1024) {
      toast.error("Please select an image file smaller than 1MB.");
      return;
    }

    try {
      const uploadedUrl = await uploadToS3AndGenerateUrl(selectedFile);
      if (uploadedUrl) {
        setUrl(uploadedUrl);
      }
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
      e.target.value = null;
    } finally {
      setIsLoadinG(false);
    }
  }

  useEffect(() => {
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
  }, [status, dispatch, isSuccess, msg, isError, message, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url || !selectedOption || !position || !Name) {
      toast.error("Please fill all details");
    } else {
      const data = {
        video_name: Name,
        url: url,
        position: position,
        status: selectedOption,
      };

      dispatch(AddVideo(data));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container ">
      <div className="d-flex justify-content-between border-bottom pb-3 px-5 text-light text-light mt-5">
        <BackButton url={"/SceneImages"} />
        <button className=" btn btn-dark ">New Environment Image</button>
      </div>

      <div className="container mt-5   ">
        <div className="bg-c-lite-green  w-75 mx-auto px-4">
          {" "}
          <form className="text-light  p-4 " onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3 row ">
              <label
                htmlFor="inputPosition"
                className="col-sm-2 col-form-label"
              >
                Environment Name
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select "
                  id="inputPosition"
                  aria-label="Default select example"
                  name="url"
                  onChange={(e) => setName(e.target.value)}
                >
                  <option> Select Our Environments Here</option>
                  <option value="Rajwada Palace"> Rajwada Palace</option>
                  <option value="VRLobby">VRLobby</option>
                  <option value="ClassRoom">ClassRoom</option>
                  <option value="VR_Metaverse Conference Room">
                    VR_Metaverse Conference Room
                  </option>
                </select>
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
                Status
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select "
                  id="inputStatus"
                  aria-label="Default select example"
                  name="status"
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="Image"> Image</option>
                </select>
              </div>
            </div>

            <div className="mb-3 row ">
              <label
                htmlFor="inputPosition"
                className="col-sm-2 col-form-label"
              >
                Position
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control "
                  id="inputPosition"
                  name="url"
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3 row ">
              <label
                htmlFor="inputPosition"
                className="col-sm-2 col-form-label"
              >
                Image URL
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control "
                  type="file"
                  id="inputPosition"
                  name="url"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-submit btn-dark btnshadow fw-bold"
                  disabled={isLoadinG}
                >
                  {isLoadinG ? "Processing..." : "Create Image"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSceneImage;
