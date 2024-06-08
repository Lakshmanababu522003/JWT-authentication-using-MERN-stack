import React from 'react';
import Register from './auth/Register';
import Login from './auth/Login';
import Home from './auth/Home';
import { Routes, Route }  from 'react-router-dom';
import Protected from './auth/Protected';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/home"
          element={<Protected component={Home} />}
        />
      </Routes>
      <ToastContainer />
      
    </div>
  );
}

export default App;
