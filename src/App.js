import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

import Home from './pages/Home'; // Đảm bảo bạn có trang Home

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
