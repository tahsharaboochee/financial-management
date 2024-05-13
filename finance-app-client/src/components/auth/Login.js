import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests to your backend

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle any errors

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Post request to your backend
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password
      });

      // Assume the backend sends back the token and user data
      console.log('Login Successful:', response.data);
      localStorage.setItem('token', response.data.token); // Save the token to local storage (or context/state)
      history.push('/dashboard'); // Redirect to a dashboard on successful login
    } catch (err) {
      // Handle errors if login fails
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.error);
      } else {
        // Something happened in setting up the request that triggered an Error
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
