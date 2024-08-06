import React from 'react';
import './Table.css';

const Table = ({ data, deleteData, editData }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name :</th>
          <th>Email:</th>
          <th>Actions:</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((items) => (
            <tr key={items.id}>
              <td>{items.name}</td>
              <td>{items.email}</td>
              <td>
                <button onClick={() => editData(items)}>Edit</button>
                <button onClick={() => deleteData(items.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No Data Available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
