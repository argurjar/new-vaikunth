import React, { useEffect, useState } from "react";
import BackButton from "../../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import {
  updateShoptype,
  SingelShoptype,
  reset,
} from "../../../features/shopType/ShopTypeSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";

function EditShopType() {
  const {
    msg,
    status,
    isError,
    message,
    isLoading,
    isSuccess,
    Shoptype,
    Updatestatus,
  } = useSelector((state) => state.ShopTypeS);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Name, setName] = useState("");

  const params = useParams();

  useEffect(() => {
    dispatch(SingelShoptype(params.id));
  }, [dispatch, params]);

  useEffect(() => {
    // Make sure Shoptype is not undefined before setting the name
    if (isSuccess && Shoptype && Shoptype.name !== undefined) {
      setName(Shoptype.name);
    }

    if (status) {
      toast.success(msg);
      dispatch(reset());
      navigate("/ShopTypeList");
    }
    if (status === false) {
      toast.error(msg);
      dispatch(reset());
    }
    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, status, Shoptype, isError, message, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Name) {
      toast.error("Please fill in all details");
    } else {
      const data = {
        name: Name,
        id: params.id,
      };
      dispatch(updateShoptype(data));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between border-bottom pb-3 text-light px-5 mt-5">
        <BackButton url={"/ShopTypeList"} />
        <span className="btn btn-top2 text-light">New Message</span>
      </div>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <form
          className="text-light p-4 bg-c-lite-green mx-5"
          onSubmit={handleSubmit}
        >
         <div className="mb-3 row">
            <label
              htmlFor="inputtext"
              className="col-sm-2 text-center col-form-label"
            >
              Shop Type Name
            </label>
            <div className="col-sm-9">
              <select
                className="form-control"
                id="inputtext"
                name="name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              >          
                <option value="NPC">NPC</option>
                <option value="KIOSK"> KIOSK</option>
                <option value="Logo/Video/Music">Logo/Video/Music</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-center">
              <button type="submit" className="btn btn-submit btnshadow">
                Update ShopType Name
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditShopType;
