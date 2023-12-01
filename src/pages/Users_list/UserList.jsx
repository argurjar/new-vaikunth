import React, { useEffect, useState } from "react";
import "./User.css";
import { getUsers } from "../../features/userlist/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

function UserList() {
  const { isError, isLoading, users, message } = useSelector(
    (state) => state.Users
  );

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="m-auto my-auto w-25 ">
          <Loader />
        </div>
      </div>
    );
  }

  const itemsPerPage = 5;
  const totalPages = Math.ceil(users?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedUsers = users?.slice(startIndex, endIndex);

  const pageNumbers = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 4) {
    pageNumbers.push(1, 2, 3, 4, totalPages);
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
    <div className="container-fluid">
      <div className="users mt-5 px-5">
        <div className="d-flex justify-content-between px-5 mb-3">
          <span className="btn btn-dark text-light">Users</span>{" "}
          <button type="button" className="btn btn-dark text-light btnshadow">
            Export Excel
          </button>
        </div>

        <div className="row g-0 overflow-x-auto mt-5">
          <table className="table table-bordered table-dark text-center table-hover">
            <thead>
              <tr className="table-active py-2">
                <th scope="col-8 usertable">SR NO.</th>
                <th scope="col-1">USer Name</th>
                <th scope="col-1">Email ID</th>
                <th scope="col-1">Mobile Number</th>
                <th scope="col-1">OTP Verified </th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers?.map((user, i) => {
                const { _id, email, name, emailVerified, phone } = user;
                const srNumber = (currentPage - 1) * itemsPerPage + i + 1;
                return (
                  <tr key={_id}>
                    <td>{srNumber}</td>
                    <td>{name}</td>
                    <td>{email}</td>            
                    <td>{phone}</td>
                    <td>{emailVerified + ""}</td>
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
            {pageNumbers.map((n) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={n}
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
    </div>
  );
}

export default UserList;
