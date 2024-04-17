import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuildingsPage from './pages/Buildings';
import RegistrationPage from './pages/Registration';
import LoginPage from './pages/Login';
import RoomPage from './pages/Room';
import Navigation from './components/Navigation';

function App() {
  const [loading, setLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Показываем уведомление при монтировании компонента
    setIsVisible(true);

    // Скрываем уведомление через некоторое время
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3000 миллисекунд (3 секунды)

    // Очищаем таймер при размонтировании компонента
    return () => clearTimeout(timeout);
  }, []);


  return (
    
    <Router>
      <div className="App">
        <Navigation />
        <div className="notification-container" >
      {isVisible && <div class="alert alert-warning" role="alert" style={{textAlign:"center"}}>The button has been pressed several times in buildings</div>}
    </div>
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
             <Route
              path="/room-detail"
              element={<RoomPage setLoading={setLoading} />}
            />
            <Route path="/building/room/:buildingId" element={<RoomPage setLoading={setLoading} />} />
            <Route path="/" element={<BuildingsPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};


export default App;