import React, { useEffect, useState } from "react";
import BackButton from "../../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
// import { AddShops, reset } from "../../../features/shops/ShopSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TemplateList from "./TemplateList";

function AddShop() {
  // const { msg, status, isError, message } = useSelector((state) => state.Shop);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [Name, setName] = useState("");
  // const [ShopType, setShopType] = useState("");

  // useEffect(() => {
  //   if (status) {
  //     toast.success(msg);
  //     navigate("/AddTemplate");
  //   }
  //   if (status === false) {
  //     if (msg == "Shop name already exists.") {
  //       toast.error("Template name already exists.");
  //     } else {
  //       toast.error(msg);
  //       dispatch(reset());
  //     }
  //   }
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   if (Name === "Cafe") {
  //     setShopType(2);
  //   } else if (Name === "Office") {
  //     setShopType(1);
  //   } else if (Name === "Retail") {
  //     setShopType(3);
  //   } else {
  //     setShopType(4);
  //   }
  // }, [status, dispatch, message, msg, Name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!Name || !ShopType) {
    //   toast.error("Field cannot be empty");
    // } else {
    //   const data = {
    //     name: Name,
    //     shop_type: ShopType,
    //   };

    //   // dispatch(AddShops(data));
    // }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between border-bottom pb-3 text-light px-5 mt-5">
        <span className="p-2  btn-top2 text-light disable bg-dark ">
          Add New Template
        </span>
      </div>

      <div className="d-flex justify-content-center align-items-center mb-4">
        <form
          className="text-light container  p-4 bg-c-lite-green mx-5 "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-3 row">
            <label
              htmlFor="inputtext"
              className="col-sm-2 text-center  col-form-label"
            >
              Name
            </label>

            <div className="col">
              <select
                className="form-select"
                name="name"
                // value={Name}
                // onChange={(e) => setName(e.target.value)}
              >
                <option value="">Select Template</option>
                <option value="Rajwada Palace">Rajwada Palace</option>
                <option value="VRLobby">VRLobby</option>
                <option value="ClassRoom">ClassRoom</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="inputtext"
              className="col-sm-2 text-center  col-form-label"
            >
              Position
            </label>

            <div className="col">
              <select
                className="form-select"
                name="name"
                // value={Name}
                // onChange={(e) => setName(e.target.value)}
              >
                <option value="">Select Position</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-center">
              {" "}
              <button type="submit" className="btn btn-submit btnshadow bg-light ">
                Create Template
              </button>
            </div>
          </div>
        </form>
      </div>

      <TemplateList />
    </div>
  );
}

export default AddShop;
