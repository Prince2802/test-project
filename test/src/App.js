import { useState } from 'react';
import Form from './Form';
import Table from './Table';
import './App.css';
import PropTypes from 'prop-types';

const App = () => {
  // store the list of data
  const [data, setData] = useState([]);
  // store the current data being edited
  const [currentData, setCurrentData] = useState({
    id: null,
    name: '',
    email: '',
  });
  // check if editing mode is on or not
  const [isEditing, setIsEditing] = useState(false);

  // Function to add new data
  const addData = (newData) => {
    //id
    newData.id = data.length + 1;
    setData([...data, newData]);
  };

  // Function to delete data by id
  const deleteData = (id) => {
    //delete data according to id
    setData(data.filter((item) => item.id !== id));
  };

  // Function to set data for editing
  const editData = (dataToEdit) => {
    //edit the data
    setIsEditing(true); // Set editing mode to true
    setCurrentData(dataToEdit); // Set the current data to the data to be edited
  };

  // Function to update existing data
  const updateData = (id, updatedData) => {
    //update data
    setIsEditing(false); // Set editing mode to false
    setData(data.map((items) => (items.id === id ? updatedData : items))); // Update the data in the state
  };

  return (
    <div className="container">
      <h1>Form</h1>
      <Form
        addData={addData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        currentData={currentData}
        updateData={updateData}
      />
      {/* this is form ceated to input the values needed it takes name and email as parameter */}
      <Table data={data} editData={editData} deleteData={deleteData} />
      {/* this table shows the data which is being inputted through form, this is working as an output.
          also we can modify the data through it by updating or deleteing it.     
      */}
    </div>
  );
};

// here I've created prop types which ensures correct value types

//This is form prop types
Form.propTypes = {
  // To add proptypes we have different requirement according to data types
  // export const func: Requireable<(...args: any[]) => any>;
  addData: PropTypes.func.isRequired,
  //export const bool: Requireable<boolean>;
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  // To modify current data
  //export function shape<P extends ValidationMap<any>>(type: P): Requireable<InferProps<P>>;
  currentData: PropTypes.shape({
    //export const number: Requireable<number>;
    id: PropTypes.number,
    //export const string: Requireable<string>;
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  updateData: PropTypes.func.isRequired,
};

//These are table prop types similar to form prop-types
Table.propTypes = {
  //export function arrayOf<T>(type: Validator<T>): Requireable<T[]>;
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    })
  ).isRequired,
  deleteData: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
};

export default App;
