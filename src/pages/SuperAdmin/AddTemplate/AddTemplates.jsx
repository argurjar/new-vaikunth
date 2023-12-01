import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AddTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState('');

  useEffect(() => {
    const storedTemplates = localStorage.getItem('templates');
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    }
  }, []);

  const updateLocalStorage = (updatedTemplates) => {
    localStorage.setItem('templates', JSON.stringify(updatedTemplates));
  };

  const addTemplate = (e) => {
    e.preventDefault();
    if (currentTemplate) {
      const newTemplate = { id: Date.now(), templateName: currentTemplate, features: [] };
      const updatedTemplates = [...templates, newTemplate];
      setTemplates(updatedTemplates);
      setCurrentTemplate('');

      updateLocalStorage(updatedTemplates);
    }
  };

  const deleteTemplate = (id) => {
    const updatedTemplates = templates.filter((template) => template.id !== id);
    setTemplates(updatedTemplates);
    updateLocalStorage(updatedTemplates); // Update local storage after deletion
  };

  const toggleEditTemplate = (id) => {
    const updatedTemplates = templates.map((template) => {
      if (template.id === id) {
        return { ...template, isEditing: !template.isEditing };
      }
      return template;
    });
    setTemplates(updatedTemplates);
    updateLocalStorage(updatedTemplates); // Update local storage after editing
  };

  const updateTemplateName = (id, newName) => {
    const updatedTemplates = templates.map((template) => {
      if (template.id === id) {
        return { ...template, templateName: newName, isEditing: false };
      }
      return template;
    });
    setTemplates(updatedTemplates);
    updateLocalStorage(updatedTemplates); // Update local storage after updating name
  };

  const handleEditFormSubmit = (e, id) => {
    e.preventDefault();
    const newName = e.target.newTemplateName.value;
    updateTemplateName(id, newName);
  };

  return (
    <div className="container p-5">
      <h2 className='text-center'>Add Template</h2>
      <form onSubmit={addTemplate}>
        <div className="mb-3">
          <label className="form-label">Template Name:</label>
          <input
            type="text"
            className="form-control"
            value={currentTemplate}
            onChange={(e) => setCurrentTemplate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Template</button>
      </form>
      <h2 className='text-center'>Template List</h2>
      <table className="table mt-4 text-center">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Template Name</th>
            <th>Feature</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template, index) => (
            <tr key={template.id}>
              <td>{index + 1}</td>
              <td>{template.templateName}</td>
              <td><Link to={`/TemplateDetails/${template.id}`} className="btn btn-info me-2">Add & View</Link></td>
              <td>
                {template.isEditing ? (
                  <form onSubmit={(e) => handleEditFormSubmit(e, template.id)}>
                    <input
                      type="text"
                      name="newTemplateName"
                      defaultValue={template.templateName}
                    />
                    <button type="submit" className="btn btn-success mx-2">Update</button>
                  </form>
                ) : (
                  <div>
                    
                    <button onClick={() => toggleEditTemplate(template.id)} className="btn btn-warning me-2">Edit</button>
                    <button onClick={() => deleteTemplate(template.id)} className="btn btn-danger">Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddTemplates;
