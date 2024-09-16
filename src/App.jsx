import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/Homepage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

const App = () => {
  const token = localStorage.getItem('token'); // Check if the user is logged in

  return (
    <Router>
      <Routes>
        {/* If already logged in, navigate to home, otherwise show the signup page */}
        <Route path="/" element={token ? <Navigate to="/home" /> : <SignupPage />} />
        <Route path="/login" element={token ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/signup" element={token ? <Navigate to="/home" /> : <SignupPage />} />
        {/* If not logged in, navigate to login */}
        <Route path="/home" element={token ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
