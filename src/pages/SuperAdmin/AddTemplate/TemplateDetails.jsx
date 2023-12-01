import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';

const TemplateDetails = () => {
  const { id } = useParams();
  const [maxNumOfFeatures, setMaxNumOfFeatures] = useState(0);
  const [features, setFeatures] = useState([]);
  const [featuresDrop, setFeaturesDrop] = useState([]);
  const [currentFeature, setCurrentFeature] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [templateName, setTemplateName] = useState('');


  useEffect(() => {
    const storedFeatures = localStorage.getItem("features");
    const parsedFeatures = storedFeatures ? JSON.parse(storedFeatures) : [];
    setFeaturesDrop(parsedFeatures)
  }, []);


  useEffect(() => {
    const storedTemplates = localStorage.getItem('templates');
    const parsedTemplates = storedTemplates ? JSON.parse(storedTemplates) : [];

    const parsedId = parseInt(id);
    const foundTemplate = parsedTemplates.find(template => template.id === parsedId);

    if (foundTemplate) {
      setMaxNumOfFeatures(foundTemplate.maxNumOfFeatures || 0);
      setFeatures(foundTemplate.features || []);
      setTemplateName(foundTemplate.templateName || '');
    }
  }, [id]);

  const addFeatureName = (e) => {
    e.preventDefault();
    if (currentFeature) {
      const storedTemplates = localStorage.getItem('templates');
      const parsedTemplates = storedTemplates ? JSON.parse(storedTemplates) : [];
  
      const parsedId = parseInt(id);
      const foundTemplate = parsedTemplates.find((template) => template.id === parsedId);
  
      if (foundTemplate) {
        const isFeatureExist = foundTemplate.features.some(
          (feature) => feature.featureName === currentFeature
        );
  
        if (isFeatureExist) {
          // Feature already exists, show an alert or handle it accordingly
          alert('Feature already exists. Please choose a different feature.');
          return;
        }
  
        let updatedFeatures = foundTemplate.features || [];
  
        if (editIndex > -1) {
          // Update existing feature data at editIndex
          updatedFeatures[editIndex] = {
            featureName: currentFeature,
            maxNumOfFeatures,
          };
        } else {
          // Add a new feature
          updatedFeatures.push({
            featureName: currentFeature,
            maxNumOfFeatures,
          });
        }
  
        foundTemplate.features = updatedFeatures;
  
        const updatedParsedTemplates = parsedTemplates.map((template) =>
          template.id === foundTemplate.id ? foundTemplate : template
        );
  
        localStorage.setItem('templates', JSON.stringify(updatedParsedTemplates));
        setFeatures(updatedFeatures);
        setCurrentFeature('');
        setEditIndex(-1);
        setMaxNumOfFeatures(0);
      }
    }
  };
  

  const deleteFeatureName = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);

    const storedTemplates = localStorage.getItem('templates');
    const parsedTemplates = storedTemplates ? JSON.parse(storedTemplates) : [];

    const parsedId = parseInt(id);
    const foundTemplate = parsedTemplates.find(template => template.id === parsedId);

    if (foundTemplate) {
      foundTemplate.features = updatedFeatures;

      const updatedParsedTemplates = parsedTemplates.map(template =>
        template.id === foundTemplate.id ? foundTemplate : template
      );

      localStorage.setItem('templates', JSON.stringify(updatedParsedTemplates));
      setFeatures(updatedFeatures);
    }
  };


    
  const editFeatureName = (index) => {
    const featureToEdit = features[index];
    setCurrentFeature(featureToEdit.featureName);
    setMaxNumOfFeatures(featureToEdit.maxNumOfFeatures);
    setEditIndex(index);
  };
  
    
    
  return (
    <div className="container p-5">
      <div>
        <BackButton url="/AddTemplates" />
      </div>
      <h2 className="text-center"> Add Features in {templateName} </h2>

      <form className="px-5" onSubmit={addFeatureName}>
      <div className="mb-3">
        <label className="form-label">Feature Name:</label>
       
           <select
        id="featuresDropdown"
        className="form-control"
        value={currentFeature}
        onChange={(e) => setCurrentFeature(e.target.value)}
      >
        <option value="">Select a feature</option>
        {featuresDrop.map((feature) => (
          <option key={feature.id} value={feature.featureName}>
            {feature.featureName}
          </option>
        ))}
      </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Max Number of Features:</label>
        <input
          type="number"
          className="form-control"
          value={maxNumOfFeatures}
          onChange={(e) => setMaxNumOfFeatures(parseInt(e.target.value))}
        />
      </div>
      <button type="submit" className="btn btn-success">
        {editIndex > -1 ? 'Update Feature' : 'Add Feature'}
      </button>
    </form>

      <div className="container">
        <h3 className="text-center">{templateName} Features List</h3>
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

export default TemplateDetails;
