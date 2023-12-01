import * as React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { logout, reset } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";

function Appbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(reset());
    dispatch(logout());
    navigate(<Login />);
    window.location.reload();
  };

  return (
    <nav className="navbar bg-body-tertiary bg-dark">
      <div className="container-fluid px-5 py-2 bg-dark">
        <button
          className="btn btn-outline-danger my-2 me-2 ms-auto d-flex"
          type="submit"
          onClick={() => onLogout()}
        >
          <RiLogoutCircleRLine className="fs-3 me-1" />
          <span>LOGOUT</span>
        </button>
      </div>
    </nav>
  );
}

export default Appbar;
