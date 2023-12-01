import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";

import "../auth/auth.css";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && user.status) {
      toast.success(user.message);
    }
    if (isError || user?.status === false) {
      toast.error(user?.message);
      dispatch(reset());
    }
  }, [isError, isSuccess, dispatch, message, user]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("plz fill all details", {
        position: "top-center",
      });
    } else {

      dispatch(login(formData));
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="logohome">
          <img
            src="data:image/png;base64,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"
            alt=""
            width={40}
            height={50}
          />
        </div>
        <div className="text-center mt-4 name">Vaikunth</div>
        <form className="p-3 mt-3" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="email"
              // value={email}
              id="userName"
              placeholder="Username"
              onChange={onChange}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              id="pwd"
              placeholder="Password"
              name="password"
              // value={password}
              onChange={onChange}
            />
          </div>
          <button className=" mt-3 loginbtn">Login</button>
        </form>
        {/* <div className="text-center fs-6">
            <a href="#">Forget password?</a> or <a href="#">Sign up</a>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
