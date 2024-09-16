import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://friendrequestassigbackend-1.onrender.com/api/signup', { username, password });
      alert('Signup successful! You can now log in.');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
