import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the login credentials
    const loginData = {
      email: email,
      password: password,
    };

    // Send a POST request to the server for authentication
    axios
      .post('http://localhost:5000/api/login', loginData)
      .then((response) => {
        localStorage.setItem('auth',JSON.stringify(response.data));
        console.log(response)
        // Handle successful login response
        console.log('Login successful');
        // Reset the form
        setEmail('');
        setPassword('');
        // Redirect to the home page or any other page
        navigate('/home');
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error.response);
        setError('Invalid email or password');
      });
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
        </div>
        <br />
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
        </div>
        <br />
        {error && <span className="error">{error}</span>}
        <button type="submit" >Login</button>
        <span className="acc">Don't have an account? </span>
        <button type="button" onClick={handleRegisterClick}>
          Register
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
