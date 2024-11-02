import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DataFetcher, DataFetcherFilter, Counter } from './components';
import NavBar from './components/NavBar';
import { UserDetail } from './components/UserDetail';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/fetcher" element={<DataFetcher />} />
        <Route path="/filter" element={<DataFetcherFilter />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

export default App;
