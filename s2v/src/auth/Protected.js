import React from 'react';
import Home from './Home';
import Login from './Login';

const Protected = () => {
  let hasToken = JSON.parse(localStorage.getItem('auth'));
  const isAuthenticated = hasToken !== null; // Replace with your authentication logic

  return (
    <>
      {isAuthenticated ? <Home /> : <Login />}
    </>
  );
};

export default Protected;
