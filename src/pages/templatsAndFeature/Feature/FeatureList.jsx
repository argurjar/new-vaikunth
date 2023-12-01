import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ShopTypes,
  DeleteShopType,
  reset,
} from "../../../features/shopType/ShopTypeSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Fill } from "react-icons/ri";

function TemplateTypeList({ id, Name }) {
  const { AllShoptypes, isLoading, isError, message, msg, status } =
    useSelector((state) => state.ShopTypeS);
  const Params = useParams();

  const ID = id || Params.id;

  const filterData = AllShoptypes?.filter((item) => item.shopid === ID);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filterData?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
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

  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleItems = filterData?.slice(startIdx, startIdx + itemsPerPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ShopTypes({ currentPage }));

    // if (isError) {
    //   toast.error(message);
    // }
    // if (status) {
    //   toast.success(msg);
    //   dispatch(reset());
    //   navigate(`/TemplateTypeList/${ID}`);
    // }
    // if (status === false) {
    //   toast.error(msg);
    // }
  }, [msg, status, isError, currentPage]);

  const handleDelete = (id) => {
    dispatch(DeleteShopType(id));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between border-bottom pb-3 text-light px-5">
        <span className=" btn-top2 text-light">{Name} Features list</span>
      </div>
      <div className="container">
        <table className="table table-bordered table-dark  text-center table-hover">
          <thead>
            <tr className="table-active">
              <th scope="col">Sr No.</th>
              <th>Feature</th>
              <th>Date Created</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems?.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>
                  {new Date(item.createdAt)
                    .toISOString()
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                </td>

                <td className="w-25">
                  <button
                    type="button"
                    className="btn btn-danger ms-1"
                    onClick={() => handleDelete(item._id)}
                  >
                    <RiDeleteBin6Fill className="fs-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={prePage}>
              Prev
            </button>
          </li>
          {pageNumbers.map((n) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={n}
              onClick={() => handlePageChange(n)}
            >
              <button className="page-link">{n}</button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TemplateTypeList;
