import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [formData, setFormData] = useState({});
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Simulating API call (replace with your API fetching logic)
    const fetchedData = [
      { name: 'username', type: 'text' },
      { name: 'profilePic', type: 'File' , msg : "plze use png jpg"},
      { name: 'age', type: 'number' },
      { name: 'instapic', type: 'file' },
      { name: 'status', type: 'Text' },
      {name: 'video', type: 'URL', msg : "plze use mp4 hd"}
    ];

    setApiData(fetchedData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log form data

    // Clear form fields after submission
    setFormData({});
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {apiData.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.name}</label>
            {field.type === 'file' ? (
              <input
                type="file"
                name={field.name}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YourComponent;
