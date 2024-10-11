import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import Table from './components/Table';
import Pagination from './components/Pagination';
import { fetchPlaces } from './API';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchPlaces(searchTerm, limit, currentPage);
      setData(result.data);
      setTotalPages(result.totalPages);
      setLoading(false);
    };

    loadData();
  }, [searchTerm, limit, currentPage]);

  return (
    <div className="app-container">
      <SearchBox onSearch={setSearchTerm} />
      <Table data={data} loading={loading} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onLimitChange={setLimit}
          limit={limit}
        />
      )}
    </div>
  );
};

export default App;
