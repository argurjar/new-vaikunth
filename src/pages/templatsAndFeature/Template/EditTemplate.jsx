import React, { useEffect, useState } from "react";
import BackButton from "../../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { updateShop, SingelShop, reset } from "../../../features/shops/ShopSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";

function EditShop() {
  const {
    msg,
    status,
    isError,
    message,
    isLoading,
    isSuccess,
    Shop,
    Updatestatus,
  } = useSelector((state) => state.Shop);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [ShopType, setShopType] = useState("");

  const params = useParams();

  useEffect(() => {
    dispatch(SingelShop(params.id));
  }, [dispatch, params]);

  useEffect(() => {
    if (isSuccess && Shop) {
      setName(Shop.name);
      setShopType(Shop.shop_type);
    }
    if (status) {
      toast.success(msg);
      dispatch(reset());
      navigate("/ShopList");
    }
    if (status === false) {
      toast.error(msg);
      dispatch(reset());
    }
    if (isError) {
      toast.error(message);
    }
  }, [params, isError, message, isSuccess, , status, Updatestatus, Shop]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Name || !ShopType) {
      toast.error("Please fill all details");
    } else {
      const data = {
        name:Name,
        shop_type:ShopType,
        id: params.id,
      };

      dispatch(updateShop(data));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container ">
      <div className="d-flex justify-content-between border-bottom pb-3 text-light px-5 mt-5">
        <BackButton url={"/ShopList"} />

        <span className="btn btn-top2 text-light  ">New Message</span>
      </div>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <form
          className="text-light  p-4 bg-c-lite-green container mx-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-3 row">
            <label htmlFor="inputtext" className="col-sm-2 text-center col-form-label">
              Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="inputtext"
                name="name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputShopType" className="col-sm-2 text-center col-form-label">
            Shop Type
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="inputShopType"
                name="ShopType"
                value={ShopType}
                onChange={(e) => setShopType(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="text-center">
              {" "}
              <button type="submit" className="btn btn-submit btnshadow ">
                Update Shop Name
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}



export default EditShop