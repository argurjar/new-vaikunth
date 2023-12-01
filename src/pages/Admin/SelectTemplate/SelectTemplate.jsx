import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SelectTemplate() {


    // these state for show in input type select template
    const [templates, setTemplates] = useState([]);
    
    const [Selecttemplates, setSelectTemplates] = useState([]);

    const [currentTemplate, setCurrentTemplate] = useState('');
  
    const [name, setName] = useState('');

    //these for gel total templates in games
    useEffect(() => {
      const storedTemplates = localStorage.getItem('templates');
      if (storedTemplates) {
        setTemplates(JSON.parse(storedTemplates));
      }
    }, []);



    //these for set total selected  templates we use in games

    useEffect(() => {
        const storedTemplates = localStorage.getItem('Selectedtemplates');
        if (storedTemplates) {
            setSelectTemplates(JSON.parse(storedTemplates));
        }
      }, []);

       const updateLocalStorage = (updatedTemplates) => {
      localStorage.setItem('Selectedtemplates', JSON.stringify(updatedTemplates));
    };
  
    const selectTemplate = (e) => {
      e.preventDefault();
      if (currentTemplate && name) { // Ensure both template and name are selected/entered
        const [selectedId, selectedName] = currentTemplate.split('|');
        const isNameAlreadyAdded = Selecttemplates.some((template) => template.name === name);
  
        if (isNameAlreadyAdded) {
          toast.error(`Template with the name '${name}' is already added.`);
        } else {
          const newTemplate = {
            id : Date.now() ,
            Parentid: selectedId,
            templateName: selectedName,
            features: [],
            name: name // Add the 'name' field to the template object
          };
  
          const updatedTemplates = [...Selecttemplates, newTemplate];
          setSelectTemplates(updatedTemplates);
          setCurrentTemplate('');
          setName(''); // Reset the name field after adding the template
          updateLocalStorage(updatedTemplates);
        }
      } else {
        toast.error('Please select a template and provide a name.');
      }
    };
  
    const deleteTemplate = (id) => {
      const updatedTemplates = Selecttemplates.filter((template) => template.id !== id);
      setSelectTemplates(updatedTemplates);
      updateLocalStorage(updatedTemplates); // Update local storage after deletion
    };
  return (
    <div className="container p-5">
      <h2 className='text-center'>Add Template</h2>
          <form onSubmit={selectTemplate}>
          <div className="mb-3">
          <label className="form-label" htmlFor="nameInput">Shop Name:</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="mb-3">         
     <label className="form-label" htmlFor="templateSelect">Select a Template:</label>
      <select className="form-control" id="templateSelect" value={currentTemplate} onChange={(e) => setCurrentTemplate(e.target.value)}>
        <option value="">Select a Template</option>
        {templates.map((obj) => (
          <option key={obj.id}  value={`${obj.id}|${obj.templateName}`}>
            {obj.templateName}
          </option>
        ))}
      </select>

        </div>
        <button type="submit" className="btn btn-primary">Add Template</button>
      </form>
      <h2 className='text-center'>Template List</h2>
      <table className="table mt-4 text-center">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Shop Name</th>
            <th>Template</th>
            <th>Feature</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Selecttemplates.map((template, index) => (
            <tr key={template.id}>
              <td>{index + 1}</td>
              <td>{template.name}</td>
              <td>{template.templateName}</td>
              <td><Link to={`/SelectTemplateDetails/${template.id}`} className="btn btn-info me-2">Add & View</Link></td>
              <td>
              <button onClick={() => deleteTemplate(template.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SelectTemplate