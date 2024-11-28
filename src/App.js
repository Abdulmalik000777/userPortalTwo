import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserManagement from './pages/UserManagement';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
