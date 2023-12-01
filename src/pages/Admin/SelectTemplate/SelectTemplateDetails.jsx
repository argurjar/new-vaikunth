import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const SelectTemplateDetails = () => {
  const { id } = useParams();

  // first use effect
  const [parentid, setParentid] = useState("")
  const [features, setFeatures] = useState([]);
  const [templateName, setTemplateName] = useState("");


  // second useEffect
  const [featuresDrop, setFeaturesDrop] = useState([]);

  // from input box select
  const [currentFeature, setCurrentFeature] = useState("");

  const [editIndex, setEditIndex] = useState(-1);
 

    //mene multiple  Selectedtemplate kiye hai jisko Selectedtemplates me add kiya hai jiske andr parent id hai mujhe bo chahiye ki isne kis template ka use kiya or is template ka name kya rkha bo do chiz yha se get kr rha hu or uske andr kitne fetur add kiye hai bo v get kr rha hu 
  useEffect(() => {
    const storedTemplates = localStorage.getItem("Selectedtemplates");
    const parsedTemplates = storedTemplates ? JSON.parse(storedTemplates) : [];

    const parsedId = parseInt(id);
    const foundselectedTemplate = parsedTemplates.find(
      (template) => template.id === parsedId
    );
 
    if (foundselectedTemplate) {
      setTemplateName(foundselectedTemplate.name || "");
      setParentid(foundselectedTemplate.Parentid || "");
      setFeatures(foundselectedTemplate.features)
    }
  }, [id]);
    
   

 // iska use template ke andr kon se featur hai jo hm use kr skte hai jinko selected feature ke andr add krana hai (featuresDrop)
  useEffect(() => {
    const storedFeatures = localStorage.getItem("templates");
    const parsedFeatures = storedFeatures ? JSON.parse(storedFeatures) : [];
    const parsedParentId = parseInt(parentid);
    const targetTemplate = parsedFeatures.find(
      (template) => template.id === parsedParentId
    );
    const featuresArray = targetTemplate ? targetTemplate.features : [];
    setFeaturesDrop(featuresArray);
  }, [parentid]);

  const addFeatureName = (e) => {
    e.preventDefault();
    if (currentFeature) {
      const storedTemplates = localStorage.getItem("Selectedtemplates");
      const parsedTemplates = storedTemplates ? JSON.parse(storedTemplates) : [];
      const parsedId = parseInt(id);
      const foundTemplate = parsedTemplates.find(
        (template) => template.id === parsedId
      );

      if (foundTemplate) {
        const isFeatureExist = foundTemplate.features.some(
          (feature) => feature.featureName === currentFeature
        );
  
        if (isFeatureExist) {
          alert('Feature already exists. Please choose a different feature.');
          return;
        }
  
        let updatedFeatures = foundTemplate.features || [];
  
        const selectedFeatureObject = featuresDrop.find(
          (feature) => feature.featureName === currentFeature
        );
  
        if (editIndex > -1) {
          updatedFeatures[editIndex] = {
            featureName: currentFeature,
            maxNumOfFeatures: selectedFeatureObject ? selectedFeatureObject.maxNumOfFeatures : "",
          };
        } else {
          updatedFeatures.push({
            featureName: currentFeature,
            maxNumOfFeatures: selectedFeatureObject ? selectedFeatureObject.maxNumOfFeatures : "",
          });
        }
  
        foundTemplate.features = updatedFeatures;
        const updatedParsedTemplates = parsedTemplates.map((template) =>
          template.id === foundTemplate.id ? foundTemplate : template
        );
  
        localStorage.setItem(
          "Selectedtemplates",
          JSON.stringify(updatedParsedTemplates)
        );
        setFeatures(updatedFeatures);
        setCurrentFeature("");
        setEditIndex(-1);
      }
    }
  };
  

  const deleteFeatureName = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);

    const storedTemplates = localStorage.getItem("Selectedtemplates");
    const parsedTemplates = storedTemplates ? JSON.parse(storedTemplates) : [];

    const parsedId = parseInt(id);
    const foundTemplate = parsedTemplates.find(
      (template) => template.id === parsedId
    );

    if (foundTemplate) {
      foundTemplate.features = updatedFeatures;

      const updatedParsedTemplates = parsedTemplates.map((template) =>
        template.id === foundTemplate.id ? foundTemplate : template
      );

      localStorage.setItem("Selectedtemplates", JSON.stringify(updatedParsedTemplates));
      setFeatures(updatedFeatures);
    }
  };

  const editFeatureName = (index) => {
    const featureToEdit = features[index];
    setCurrentFeature(featureToEdit.featureName);
    setEditIndex(index);
  
    // Find the selected feature from featuresDrop
    // const selectedFeatureObject = featuresDrop.find(
    //   (feature) => feature.featureName === featureToEdit.featureName
    // );
 
  };

  const handleFeatureChange = (e) => {
    const selectedFeature = e.target.value;
    setCurrentFeature(selectedFeature);
    // const selectedFeatureObject = featuresDrop.find(
    //   (feature) => feature.featureName === selectedFeature
    // );

   
  };

  

    
  return (
    <div className="container p-5">
      <div>
        <BackButton url="/SelectTemplate" />
      </div>
      <h2 className="text-center"> Add Features in <span className="text-info">{templateName}</span></h2>

      <form className="px-5" onSubmit={addFeatureName}>
        <div className="mb-3">
          <label className="form-label">Feature Name:</label>
          <select
            id="featuresDropdown"
            className="form-control"
            value={currentFeature}
            onChange={handleFeatureChange}
          >
            <option value="">Select a feature</option>
            {featuresDrop.map((feature, index) => (
              <option key={index} value={feature.featureName}>
                {feature.featureName}
              </option>
            ))}
          </select>
        </div>
    
        <button type="submit" className="btn btn-success">
          {editIndex > -1 ? "Update Feature" : "Add Feature"}
        </button>
      </form>

      <div className="container">
        <h3 className="text-center"> <span className="text-info">{templateName}</span> Features List</h3>
        <div className="row">
          <div className="col col-12 m-auto">
            <table className="table text-center mt-4 p-5 ms-5">
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Feature Name</th>
                  <th>Max Num of Features</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{feature.featureName}</td>
                    <td>{feature.maxNumOfFeatures}</td>
                    <td>
                      <button
                        onClick={() => editFeatureName(index)}
                        className="btn btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFeatureName(index)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTemplateDetails;
