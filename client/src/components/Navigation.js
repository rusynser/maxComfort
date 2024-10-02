import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ user, setUser }) {
  const navigate = useNavigate();
  
  const breadcrumbStyle = {
    background: '#40E0D0',
    padding: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '18px',
  };

  const handleLogout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem('token'); // Optional: Clear any stored token
    navigate('/login')
  };
  console.log('User in Navigation:', user);


  return (
    <div style={breadcrumbStyle}>
      <div style={{ marginRight: '5px' }}>
        <Link to="/" style={linkStyle}>Buildings</Link>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px' }}>
        {user ? (
          <div>
            <span>Welcome {user.name || user.email || 'Guest'}</span> {/* Fallback to email or Guest */}
            <Link to="/" style={linkStyle} onClick={handleLogout}>Logout</Link>
          </div>
        ) : (
          <>
            <div>
              <Link to="/registration" style={linkStyle}>Registration</Link>
            </div>
            <div>
              <Link to="/login" style={linkStyle}>Login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
