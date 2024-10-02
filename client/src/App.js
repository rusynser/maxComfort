import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuildingsPage from './pages/Buildings';
import RegistrationPage from './pages/Registration';
import LoginPage from './pages/Login';
import Navigation from './components/Navigation';
import { jwtDecode } from 'jwt-decode';
import RoomPage from './pages/Room';

function App() {
  const [user, setUser] = useState(null);

  // Check for token in localStorage on app load to persist user session
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navigation user={user} setUser={setUser} /> 
        <Routes>
          <Route path="/registration" element={<RegistrationPage setUser={setUser} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route 
            path="/" 
            element={user ? <BuildingsPage user={user} /> : <EmptyPage />} // Conditionally render content
          />
          <Route path="/buildings/:buildingId" element={<RoomPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function EmptyPage() {
  return (
    <div>
      <h2>Please log in to see your buildings</h2>
    </div>
  );
}

export default App;
