import React from 'react';
import '../styles/navbar.css';
import logo from '../assets/food logo.png'; // Ensure you use the correct path for the logo

const Navbar = ({ size, setShow, setOrderView }) => {
  return (
    <nav>
      <div className="nav_box">
        <div className="my_shop" onClick={() => setShow(true)}>
          <img src={logo} alt="Food Logo" className="logo" />
        </div>
        <div className="cart" onClick={() => setShow(false)}>
          <span>
            <i className="fas fa-cart-plus"></i>
          </span>
          <span>{size}</span>
        </div>
        <button className="my_orders" onClick={() => setOrderView(true)}>
          My Orders
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
