
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your components here
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashbord/Dashboard";
import Userlist from "./pages/Users_list/UserList";
import Footer from "./components/Footer";
import Sidebar from "./components/sidebar/SideBar";
import Appbar from "./components/Appbar";


import StreamingVideo from "./pages/VideoStreaming/StreamingVideo";
import AddStreamingVideo from "./pages/VideoStreaming/AddStreamingVideo";


import AddFeatures from "./pages/SuperAdmin/AddFeature/AddFeatures";
import FeatureDetails from "./pages/SuperAdmin/AddFeature/FeatureDetails";
import AddTemplates from "./pages/SuperAdmin/AddTemplate/AddTemplates";
import TemplateDetails from "./pages/SuperAdmin/AddTemplate/TemplateDetails";


import SelectTemplate from "./pages/Admin/SelectTemplate/SelectTemplate";
import SelectTemplateDetails from "./pages/Admin/SelectTemplate/SelectTemplateDetails";


function App() {
    // const { user, isLoading } = useSelector((state) => state.auth);

    const user = {
      token: "hjdthyk",
    }
    
      // if (isLoading) {
      //   return <Loder />;
      // }



  return (
    <Router>
      {user && user.token ? (
        <>
          <Sidebar >
          <Appbar />
            <Routes>
              
    <Route path="/StreamingVideo" element={<StreamingVideo />} />
            <Route path="/AddSSceneImage" element={<AddStreamingVideo />} />
        
              <Route path="/" element={<Dashboard />} />
              <Route path="/AddFeatures" element={<AddFeatures />} />
              <Route path="/FeatureDetails/:id" element={<FeatureDetails />} />   
              <Route path="/AddTemplates" element={<AddTemplates />} />
              <Route path="/TemplateDetails/:id" element={<TemplateDetails />} />
              <Route path="/Users" element={<Userlist />} />
              <Route path="/SelectTemplate" element={<SelectTemplate />} />
              <Route path="/SelectTemplateDetails/:id" element={<SelectTemplateDetails />} />
             
            </Routes>
            </Sidebar >
          <Footer />
        </>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </Router>
  );
}

export default App