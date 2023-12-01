import React, { useEffect, useState } from "react";
// import { Shops, DeleteShop, reset } from "../../../features/shops/ShopSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Fill } from "react-icons/ri";

function TemplateList() {
  // const {
  //   AllShops,
  //   isLoading,
  //   isError,
  //   message,
  //   msg,
  //   status,
  //   totalShops,
  //   item_per_page,
  // } = useSelector((state) => state.Shop);

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = item_per_page;

  // const totalPages = Math.ceil(totalShops / itemsPerPage);
  // const pageNumbers = [];

  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const nextPage = () => {
  //   if (currentPage !== totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const prePage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const conditions = {
  //   currentPage,
  // };



  
  // useEffect(() => {
  //   dispatch(Shops(conditions));

  //   // if (isError) {
  //   //   toast.error(message);
  //   // }
  //   // if (status) {
  //   //   toast.success(msg);
  //   //   dispatch(reset());
  //   //   navigate("/TemplateList");
  //   // }
  //   // if (status === false) {
  //   //   toast.error(msg);
  //   // }
  // }, [msg, status, isError, currentPage]);

  const HandelDelet = (id) => {
    // dispatch(DeleteShop(id));
    // dispatch(Shops(conditions));
  };

  // if (isLoading) {
  //   return <Loader />;
  // }
  const AllShops = [{
    name: "Rajwada Palace",
    createdAt: 29 / 9 / 23,
    _id:123
}]
  return (
    <div className="container ">
      <div className="d-flex justify-content-between border-bottom pb-3 text-light px-5">
        <span className=" btn-top2 text-light bg-dark ">All Added Templates</span>
      </div>
      <div className="container">
         <table className="table table-bordered table-dark mt-2 text-center table-hover">
          <thead>
            <tr className="table-active">
              <th scope="cotable-activel">Sr No.</th>
              <th>Name</th>
              <th>Date Created</th>
              <th scope="col">Feture</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {AllShops &&
              AllShops?.map((item, i) => {
                return (
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

                    <td>
                      <button
                        className="btn  btn-danger me-1"
                        onClick={() => navigate(`/AddFeature/${item._id}`)}
                      >
                        ADD & View
                      </button>
                    </td>
                    <td className="w-25">
                      <button
                        type="button"
                        className="btn  btn-top1 text-light"
                        onClick={() => [
                          navigate(`/EditShop/${item._id}`),
                        
                        ]}
                      >
                       <TiEdit className="fs-4" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger ms-1"
                        onClick={() => HandelDelet(item._id)}
                      >
                        <RiDeleteBin6Fill className="fs-4 " />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table> 
      </div>

      {/* <nav>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {pageNumbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
              onClick={() => handlePageChange(n)}
            >
              <a className="page-link">{n}</a>
            </li>
          ))}

          <li className="page-item" onClick={nextPage}>
            <a className="page-link">Next</a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
}

export default TemplateList;
