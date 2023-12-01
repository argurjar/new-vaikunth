import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const FeatureDetails = () => {
  const { id } = useParams();
  const [fields, setFields] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [featureName, setFeatureName] = useState("");

  useEffect(() => {
    const storedFeatures = localStorage.getItem("features");
    const parsedFeatures = storedFeatures ? JSON.parse(storedFeatures) : [];

    const parsedId = parseInt(id);
    const foundFeature = parsedFeatures.find(
      (feature) => feature.id === parsedId
    );

    if (foundFeature) {
      setFields(foundFeature.fields || []);
      setFeatureName(foundFeature.featureName || "");
    }
  }, [id]);

  const addField = (e) => {
    e.preventDefault();
    if (fieldName && fieldType) {
      const isFieldNameExist = fields.some(
        (field) => field.name.toLowerCase() === fieldName.toLowerCase()
      );
  
      if (isFieldNameExist) {
        // Field name already exists, show an alert or handle it accordingly
        alert('Field name already exists. Please choose a different field name.');
        return;
      }
  
      const storedFeatures = localStorage.getItem('features');
      const parsedFeatures = storedFeatures ? JSON.parse(storedFeatures) : [];
  
      const parsedId = parseInt(id);
      const foundFeature = parsedFeatures.find(
        (feature) => feature.id === parsedId
      );
  
      if (foundFeature) {
        let updatedFields = foundFeature.fields || [];
        if (editIndex > -1) {
          // Update existing field data at editIndex
          updatedFields[editIndex] = { name: fieldName, type: fieldType };
        } else {
          // Add a new field
          updatedFields.push({ name: fieldName, type: fieldType });
        }
  
        foundFeature.fields = updatedFields;
  
        const updatedParsedFeatures = parsedFeatures.map((feature) =>
          feature.id === foundFeature.id ? foundFeature : feature
        );
  
        localStorage.setItem('features', JSON.stringify(updatedParsedFeatures));
        setFields(updatedFields);
        setFieldName('');
        setFieldType('');
        setEditIndex(-1); // Reset editIndex after submission
      }
    }
  };
  

  const deleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    const storedFeatures = localStorage.getItem("features");
    const parsedFeatures = storedFeatures ? JSON.parse(storedFeatures) : [];
    const parsedId = parseInt(id);
    const foundFeature = parsedFeatures.find(
      (feature) => feature.id === parsedId
    );

    if (foundFeature) {
      foundFeature.fields = updatedFields;
      const updatedParsedFeatures = parsedFeatures.map((feature) =>
        feature.id === foundFeature.id ? foundFeature : feature
      );

      localStorage.setItem("features", JSON.stringify(updatedParsedFeatures));
      setFields(updatedFields);
    }
  };

  const editField = (index) => {
    const fieldToEdit = fields[index];
    setFieldName(fieldToEdit.name);
    setFieldType(fieldToEdit.type);
    setEditIndex(index);
  };


console.log(fields)


  return (
    <div className="container p-5">
      <div>
        {" "}
        <BackButton url="/AddFeatures" />
      </div>
      <h2 className="text-center ">Add Fields in {featureName}</h2>

      <form className="px-5" onSubmit={addField}>
        <div className="mb-3">
          <label className="form-label">Field Name:</label>
          <input
            type="text"
            className="form-control"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Field Type:</label>
          <select
            className="form-select"
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value)}
          >
            <option value="">Select Field Type</option>
            <option value="Text">Text</option>
            <option value="URL">URL</option>
            <option value="File">File</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          {editIndex > -1 ? "Update Field" : "Add Field"}
        </button>
      </form>

      <div className="container ">
        <h3 className="text-center"> {featureName} Fields list </h3>
        <div className="row">
          <div className=" col col-12 m-auto">
            <table className=" table text-center mt-4 p-5 ms-5">
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Field Name</th>
                  <th>Field Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{field.name}</td>
                    <td>{field.type}</td>
                    <td>
                      <button
                        onClick={() => editField(index)}
                        className="btn btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteField(index)}
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

export default FeatureDetails;
