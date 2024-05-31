import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './Comonent/search';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} />
    </Routes>
  </Router>
);

export default App;
