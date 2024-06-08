import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterForm = (props) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  const validateForm = () => {
    let errors = {};

    // Name validation
    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters long';
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsRegistered(true);
    }
  };

  

  // Redirect to login page after successful registration
  useEffect(() => {
    if (isRegistered) {
      const data = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      // console.log('Registration Data:', data);

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      axios.post('http://localhost:5000/api/register', data)
        .then((response) => {
          // Handle successful registration response
          console.log('Registration successful');
          toast.success('Registration successful!');
          navigate('/login');
        })
        .catch((error) => {
          // Handle registration error
          console.error('Registration error:', error);
          
        });
    }
  }, [isRegistered, navigate, name, email, password, confirmPassword]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <button type="submit">Register</button>
        <span className="acc">already you have an account?</span>
        <button type="button" onClick={handleLoginClick}>
          Login
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
