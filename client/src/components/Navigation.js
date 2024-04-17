import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const breadcrumbStyle = {
    background: '#40E0D0',
    padding: '25px',
    
  };

  return (
    <div style={breadcrumbStyle}>
      <ul class="nav nav-tabs">
      <li class="nav-item">
        <Link to="/">
          <a class="nav-link text-dark" href='/'>Buildings</a>
          </Link>
        </li>
        <Link to="/room"><a class="nav-link text-dark" href='/room'>Rooms</a></Link>
        <li class="nav-item">
          <Link to="/registration"><a class="nav-link text-dark" href='/registration'>Registration</a></Link>
          </li>
          <li class="nav-item">
          <Link to="/login"><a class="nav-link text-dark " href='/login'>Login</a></Link>
          </li>
      </ul>
    </div>
  );
}

export default Navigation;