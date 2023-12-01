import React, { useEffect, useState } from "react";
import BackButton from "../../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
// import { AddShopType, reset } from "../../../features/shopType/ShopTypeSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
// import { Shops } from "../../../features/shops/ShopSlice";
// import TemplateTypeList from "./TemplateTypeList";

function AddShopTypes() {
  // const {AllShoptypes, msg, status, isError, message } = useSelector(
  //   (state) => state.ShopTypeS
  // );
  // const { AllShops } = useSelector((state) => state.Shop);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [MaxNumber, setMaxNumber] = useState("");
  
  // const [ShopType, setShopType] = useState("");

  // const Params = useParams();
  // useEffect(() => {
  //   dispatch(Shops());
  // }, []);

  // useEffect(() => {
  //   setShopType(Params.id);

  //   if (status) {
  //     toast.success(msg);
  //     dispatch(reset());
  //     navigate(`/AddTemplateType/${Params.id}`);
  //   }
  //   if (status === false) {
  //     toast.error(msg);
  //     dispatch(reset());
  //   }
  //   if (isError) {
  //     toast.error(message);
  //   }
  // }, [status, dispatch, message, msg]);

  
  // const singletemplate = AllShops?.filter(template => template.id === Params.id)

  // const filterData = AllShoptypes?.filter(item => item.shopid === singletemplate[0]?.id);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // if (!Name || !ShopType) {
    //   toast.error("Field cannot be empty");
    // } else {
    //   const nameExists = filterData?.some(item => item.name === Name);
  
    //   if (nameExists) {
    //     toast.error("This feature already exists");
    //   } else {
    //     const data = {
    //       name: Name,
    //       shopid: Params.id,
    //     };
  
    //     dispatch(AddShopType(data));
    //   }
    // }
  };
  

  return (
    <div className="container">
      <div className="d-flex justify-content-between border-bottom pb-3 text-light px-5 mt-5">
        <BackButton url="/AddTemplate" />

        <span className="p-2  btn-top2 text-light disable ">
          {/* Add New Feature in {singletemplate[0]?.name} */}
        </span>
      </div>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "30vh" }}
      >
        <form
          className="text-light container p-4 bg-c-lite-green mx-5 me-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-3 row">
            <label
              htmlFor="inputtext"
              className="col-sm-2 text-center col-form-label"
            >
              Feature Name
            </label>
            <div className="col-sm-9">
              <select
                className="form-control"
                id="inputtext"
                name="name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              >
                <option value="">Select Feature</option>
                <option value="NPC">NPC</option>
                <option value="KIOSK"> KIOSK</option>
                <option value="Logo/Video/Music">Logo/Video/Music</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label
              htmlFor="inputnumber"
              className="col-sm-2 text-center col-form-label"
            >
            Max No. of  Feature
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                id="inputnumber"
                name="name"
                type="number"
                value={MaxNumber}
                onChange={(e) => setMaxNumber(e.target.value)}
              >
                
              </input>
            </div>
          </div>

          {/* <div className="mb-3 row">
            <label
              htmlFor="inputShopType"
              className="col-sm-2 text-center col-form-label"
            >
              Shop Name
            </label>
            <div className="col-sm-9">
              <select
                className="form-control"
                id="inputShopType"
                name="ShopType"
                value={ShopType}
                onChange={(e) => setShopType(e.target.value)}
              >
                <option value="">Select Shop </option>
                {AllShops?.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

          <div className="mb-3">
            <div className="text-center">
              <button type="submit" className="btn btn-submit btnshadow">
                Add Feature
              </button>
            </div>
          </div>
        </form>
      </div>
{/* 
      <TemplateTypeList id={Params.id} Name={singletemplate[0]?.name} /> */}
    </div>
  );
}

export default AddShopTypes;
