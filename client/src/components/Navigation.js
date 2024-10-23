import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const breadcrumbStyle = {
    background: '#40E0D0',
    padding: '25px',
    
  };

  return (
    <div style={breadcrumbStyle}>
    <ul className="nav nav-pills">
    <li className='nav-item'>
    <Link to="/">
    <img 
        src="/logo500.png" 
        width="60" 
        height="48" 
        className="d-inline-block align-top" 
        alt="Home" 
        style={{ marginRight: '0px'}}
      />
      </Link>
    </li>
    <li className="ms-auto d-flex"> {/* Flexbox для выравнивания Registration и Login */}
      <li className='nav-item'>
    <Link to="/">
      <img 
        src="/home.png" 
        width="37" 
        height="37" 
        className="d-inline-block align-top" 
        alt="Home" 
        style={{ marginRight: '20px'}}
      />
    </Link>
    </li>
 
    <li className="nav-item">
      <Link to="/registration" className="btn btn-outline-dark"  style={{ marginRight: '10px'}}>Registration</Link>
    </li>
    <li className="nav-item">
      <Link to="/login" className="btn btn-outline-dark">Login</Link>
    </li>
  </li>
</ul>
    </div>
  );
}

export default Navigation;