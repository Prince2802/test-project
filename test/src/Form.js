import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Form.css';

const Form = ({ addData, isEditing, currentData, updateData }) => {
  // store form data
  const [formData, setFormData] = useState(currentData);
  // to ensure form is not empty
  const [error, setError] = useState('');
  // Update form data when currentData changes
  useEffect(() => {
    setFormData(currentData);
  }, [currentData]);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes in form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //check if feilds are not empty and empty data doesn't go into table
    if (!formData.name || !formData.email) {
      setError('All fields are required.');
      return;
    }
    setError('');
    if (isEditing) {
      updateData(formData.id, formData); // Call updateData if editing
    } else {
      addData(formData); // Call addData if not editing
    }
    setFormData({ id: null, name: '', email: '' }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <p className="error">{error}</p>}
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {/* if we add new entries it'll show add else for existing entries it'll show update */}
      <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
    </form>
  );
};

//setting our data according to our needs so that there will be type safety
Form.propTypes = {
  addData: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  // .shape maps the data to required data type
  currentData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  updateData: PropTypes.func.isRequired,
};

export default Form;
