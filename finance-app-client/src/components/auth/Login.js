import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password
      });

      if (response.status === 200) {
        console.log('Login Successful:', response.data);
        localStorage.setItem('token', response.data.token);
        console.log('Token set in localStorage:', localStorage.getItem('token'));
        navigate('/dashboard');  // Navigate to the dashboard upon successful login
        console.log('Navigating to dashboard');
      } else {
        setError('Unexpected response status: ' + response.status);
      }
    } catch (err) {
      console.error('Error:', err);
      if (err.response) {
        setError(err.response.data.error || 'Unknown error occurred.');
      } else if (err.request) {
        console.error('Error request:', err.request);
        setError('No response received from the server.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
