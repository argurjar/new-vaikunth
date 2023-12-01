import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AddFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [currentFeature, setCurrentFeature] = useState("");

  useEffect(() => {
    const storedFeatures = localStorage.getItem("features");
    if (storedFeatures) {
      setFeatures(JSON.parse(storedFeatures));
    }
  }, []);

  const updateLocalStorage = (updatedFeatures) => {
    localStorage.setItem("features", JSON.stringify(updatedFeatures));
  };
  const addFeature = (e) => {
    e.preventDefault();
    if (currentFeature) {
      const isFeatureExist = features.some(
        (feature) => feature.featureName.toLowerCase() === currentFeature.toLowerCase()
      );
  
      if (isFeatureExist) {
        // Feature already exists, show an alert or handle it accordingly
        alert('Feature already exists. Please choose a different feature name.');
        return;
      }
  
      const newFeature = {
        id: Date.now(),
        featureName: currentFeature,
        fields: [],
      };
      const updatedFeatures = [...features, newFeature];
      setFeatures(updatedFeatures);
      setCurrentFeature("");
      updateLocalStorage(updatedFeatures);
    }
  };

  const deleteFeature = (id) => {
    const updatedFeatures = features.filter((feature) => feature.id !== id);
    setFeatures(updatedFeatures);
    updateLocalStorage(updatedFeatures); // Update local storage after deletion
  };


  const toggleEditFeature = (id) => {

    const updatedFeatures = features.map((feature) => {
      if (feature.id === id) {
        return { ...feature, isEditing: !feature.isEditing };
      }
      return feature;
    });
    setFeatures(updatedFeatures);
  };

  const updateFeatureName = (id, newName) => {
    const updatedFeatures = features.map((feature) => {
      if (feature.id === id) {
        return { ...feature, featureName: newName, isEditing: false };
      }
      return feature;
    });
    setFeatures(updatedFeatures);
  };

  const handleEditFormSubmit = (e, id) => {
    e.preventDefault();
    const newName = e.target.newFeatureName.value;
    updateFeatureName(id, newName);
  };

  return (
    <div className="container p-5">
      <h2 className="text-center">Add Feature</h2>
      <form onSubmit={addFeature}>
        <div className="mb-3">
          <label htmlFor="addFeature" className="form-label">Feature Name:</label>
          <input
            type="text"
            id="addFeature"
            className="form-control"
            value={currentFeature}
            onChange={(e) => setCurrentFeature(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Feature
        </button>
      </form>
      <h2 className="text-center">Feature List</h2>
      <table className="table mt-4 text-center">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Feature Name</th>
            <th>Fields</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={feature.id}>
              <td>{index + 1}</td>
              <td> {feature.featureName}</td>
              <td>
                {" "}
                <Link
                  to={`/FeatureDetails/${feature.id}`}
                  className="btn btn-info me-2"
                >
                  Add & View{" "}
                </Link>
              </td>
              <td>
                {feature.isEditing ? (
                  <form onSubmit={(e) => handleEditFormSubmit(e, feature.id)}>
                    <input
                      type="text"
                      name="newFeatureName"
                      defaultValue={feature.featureName}
                    />
                    <button type="submit" className="btn btn-success mx-2">
                      Update
                    </button>
                  </form>
                ) : (
                  <>
                    <div>
                      <button
                        onClick={() => toggleEditFeature(feature.id)}
                        className="btn btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFeature(feature.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default AddFeatures;
