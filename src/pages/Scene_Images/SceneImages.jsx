//same API for videos and images

import { NavLink, useNavigate } from "react-router-dom";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import {
  GetAllVideos,
  reset,
  DeletVideo,
} from "../../features/video/VideoSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { BiShowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";

function SceneImages() {
  const {
    AllVideos,
    isLoading,
    isError,
    message,
    msg,
    status,

    totalvideos,
  } = useSelector((state) => state.StreamingVideos);

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetAllVideos());
    if (isError) {
      toast.error(message);
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
  }, [
    msg,
    status,
    isError,
    currentPage,
    totalvideos,
    dispatch,
    message,
    navigate,
  ]);

  const HandelDelet = (id) => {
    dispatch(DeletVideo(id));
  };

  if (isLoading) {
    return <Loader />;
  }

  const filterData = AllVideos?.filter((item) => item.status === "Image");

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filterData?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedVideos = filterData?.slice(startIndex, endIndex);

  const pageNumbers = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 4) {
    pageNumbers.push(1, 2, 3, totalPages - 1, totalPages);
  } else if (currentPage >= totalPages - 3) {
    pageNumbers.push(
      1,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pageNumbers.push(
      1,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      totalPages
    );
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container ">
      <div className="d-flex justify-content-between border-bottom pb-3 text-light px-5 mt-5">
        <button
          className=" px-4 py-1  bg-dark text-light fs-5 rounded-pill"
          disabled
        >
          Scene Images
          <BsFillArrowDownCircleFill className="ms-2  fs-3" />
        </button>
        <NavLink to={"/AddSSceneImage"}>
          <button className="btn btn-dark text-light btn-add">Add Image</button>
        </NavLink>
      </div>

      <div className="container-fluid overflow-auto ">
        <table className="table table-bordered table-dark table-hover mt-5 text-center ">
          <colgroup>
            <col style={{ width: "150px" }} />
            <col style={{ width: "auto" }} />
            <col style={{ width: "auto" }} />
            <col style={{ width: "auto" }} />
            <col style={{ width: "180px" }} />
          </colgroup>
          <thead>
            <tr className="table-active ">
              <th scope="col">Env. Name </th>
              <th scope="col">Image URL</th>
              <th scope="col">Status</th>
              <th scope="col">Position</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedVideos?.map((item) => {
              const textColor = item.status === "Live" ? "red" : "#fca311";
              return (
                <tr key={item._id}>
                  <td>{item.video_name}</td>
                  <td className="fs text-light">{item.url}</td>
                  <td style={{ color: textColor }}>{item.status}</td>
                  <td>{item.position}</td>
                  <td>
                    <button
                      className="btn btn-edit me-1"
                      onClick={() => navigate(`/EditSceneImage/${item._id}`)}
                    >
                      <TiEdit className="fs-4" />
                    </button>
                    <button
                      className="btn btn-delet"
                      onClick={() => HandelDelet(item._id)}
                    >
                      <RiDeleteBin6Fill className="fs-4" />
                    </button>
                    <button
                      type="button"
                      className="btn  m-1 btn-show"
                      onClick={() => navigate(`/ShowSceneImages/${item._id}`)}
                    >
                      <BiShowAlt className="fs-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="pagination mt-4">
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={prePage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>
          {pageNumbers.map((n, index) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={`${n}-${index}`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => handlePageChange(n)}
              >
                {n}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SceneImages;
