import React from "react";
// import ChartGraph from "./ChartGraph";
// import Chart from "chart.js/auto";
// import MyHistogram from "./HistoGram";
// import MyPieChart from "./MyPieChart";

function Dashboard() {
  return (
    <div className="container-fluid   mt-4 " id="#home">
      <div className="container bg-gark d-flex align-items-center justify-content-between pe-5 mb-4 ">
        <div className="d-flex align-items-center justify-content-end w-50">
          {" "}
          <button type="button" className="btn btn-dark  text-light me-4 btnshadow px-3">
            Today
          </button>{" "}
          <span>
            <input
              type="date"
              id="inputPassword6"
              className="htmlForm-control me-2 my-date-input"
              aria-describedby="passwordHelpInline"
            />
            <input
              type="date"
              id="inputPassword6"
              className="htmlForm-control"
              aria-describedby="passwordHelpInline"
            />
          </span>
        </div>
        <div>
          {" "}
          <button type="button" className="btn btn-dark text-light btnshadow ">
            Export Excel
          </button>
        </div>
      </div>

     
        <div className="container-fluid text-center">
          <div className="row mb-3 ">
            <div className="col-12 col-md-4  ">
              <div className="bg-light p-2 ">
                {" "}
                <h5>Current Active Users</h5>
                <hr />
                <div className="text-center text-success fw-2 fs-5">0</div>
              </div>
            </div>
            <div className="col-12 col-md-4 gap">
              <div className="bg-light p-2 ">
                {" "}
                <h5>Total Active Users</h5>
                <hr />
                <div className="text-center fs-5 text-info ">1</div>
              </div>
            </div>
            <div className="col-12 col-md-4 ">
              <div className="bg-light p-2">
                {" "}
                <h5>Total Rgistered Users</h5>
                <hr />
                <div className="text-center text-warning fw-2 fs-5 ">232</div>
              </div>
            </div>
          </div>
        </div>
  

      <div className="container-fluid text-center  ">
        <div className="row mb-3 mt-3">
          <div className="col col-12 col-md-6 text-center gap">
            <div
              className="  bg-light text-dark p-2"
              style={{ height: "200px" }}
            >
              <h5>Total Active Users</h5>
              <hr />
              <div className="d-flex align-items-center justify-content-center  ">
                {" "}
                <div className="chart ">
                  {/* <ChartGraph /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col col-12 col-md-6 text-center">
            <div className="bg-light p-2" style={{ height: "200px" }}>
              {" "}
              <h5>Total Registered Users</h5>
              <hr />  <div className="d-flex align-items-center justify-content-center  ">
                <div className="chart" >
                  {/* <MyHistogram /> */}
                </div>   </div>
            </div>
          </div>
        </div>

        {/* <div className="row ">
          <div className="col col-12 col-md-6 text-center gap">
            {" "}
            <div
              className=" bg-light p-2 "
              style={{ height: "200px" }}
            >
              <h5>Total Active User |Country</h5>
              <hr />
              <div className="d-flex align-items-center justify-content-center  ">
                {" "}
                <div className="chart pb-4">

                  <MyPieChart/>
                </div>
              </div>
            </div>{" "}
          </div>
          <div className="col col-12 col-md-6 text-center ">
            <div
              className=" bg-light p-2"
              style={{ height: "200px" }}
            >
              <h5>Total Rgistered User | Country</h5>
              <hr />
              <div className="d-flex align-items-center justify-content-center  ">
                {" "}
                <div className="chart ">
                  <ChartGraph />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

     
    </div>
  );
}

export default Dashboard;
