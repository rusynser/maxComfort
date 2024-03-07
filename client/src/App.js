import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuildingsPage from './pages/Buildings';
import RegistrationPage from './pages/Registration';
import LoginPage from './pages/Login';
import RoomPage from './pages/Room';
import Navigation from './components/Navigation';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navigation />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/room"
              element={<RoomPage setLoading={setLoading} />}
            />
            <Route path="/project/:projectId" element={<RoomPage setLoading={setLoading} />} />
            <Route path="/" element={<BuildingsPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;