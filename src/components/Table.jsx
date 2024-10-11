import React from 'react';

const Table = ({ data, loading }) => {
  if (loading) return <div className="spinner">Loading...</div>;
  if (data.length === 0) return <div className="no-results">No results found</div>;
  
  return (
    <table className="places-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map((place, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{place.name}</td>
            <td>
              <img
                src={`https://flagsapi.com/${place.countryCode}/flat/24.png`}
                alt={`${place.country} flag`}
              />
              {place.country}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
