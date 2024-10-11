import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, onLimitChange, limit }) => {
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    if (newLimit > 10) {
      alert('Max limit is 10');
    } else {
      onLimitChange(newLimit);
    }
  };

  return (
    <div className="pagination-container">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <input
        type="number"
        value={limit}
        onChange={handleLimitChange}
        min={1}
        max={10}
        className="limit-input"
      />
    </div>
  );
};

export default Pagination;
