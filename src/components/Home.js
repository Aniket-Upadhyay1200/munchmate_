//import React , {useState,useEffect} from 'react';
//import Navbar from './Navbar';
//import Amazon from './Amazon';
import  React,{ useState, useEffect } from 'react';
import Navbar from './Navbar';
import Amazon from './Amazon';
import Cart from './Cart';
import '../styles/amazon.css';
import Orders from './Orders';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const [orderView, setOrderView] = useState(false);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
	const isLoggedIn = localStorage.getItem('isLoggedIn');
	if (!isLoggedIn) {
	  navigate('/'); // Redirect to sign-in page if not logged in
	} else {
	  // Retrieve cart and orders from local storage
	  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
	  const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
  
	  setCart(savedCart);
	  setOrders(savedOrders);
	}
  }, [navigate]);

  const handleClick = (item) => {
	let isPresent = false;
	cart.forEach((product) => {
	  if (item.id === product.id) isPresent = true;
	});
	if (isPresent) {
	  setWarning(true);
	  setTimeout(() => {
		setWarning(false);
	  }, 2000);
	  return;
	}
	const updatedCart = [...cart, item];
	setCart(updatedCart);
	localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to local storage
	toast.success("Item added to cart");
  };
  

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id) ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount += d;

    if (tempArr[ind].amount === 0) tempArr[ind].amount = 1;
    setCart([...tempArr]);
  };

  function handleOrder(cart) {
	// Generate a unique order ID (for example purposes, use timestamp)
	const orderId = new Date().getTime();
  
	// Create new order object
	const newOrder = {
	  id: orderId,
	  items: cart,
	  totalPrice: cart.reduce((total, item) => total + (item.price * item.amount), 0),
	};
  
	// Append new order to existing orders
	const updatedOrders = [...orders, newOrder];
	setOrders(updatedOrders);
	localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Save to local storage
  
	// Clear the cart
	setCart([]);
	localStorage.removeItem('cart'); // Clear cart from local storage
	toast.success("Order Placed!!");
  }
  

  return (
    <React.Fragment>
      <Navbar
        size={cart.length}
        setShow={(value) => {
          setShow(value);
          setOrderView(false); // Ensure Orders view is reset when switching back to Amazon/Cart
        }}
        setOrderView={(value) => {
          setShow(false); // Ensure Amazon/Cart view is hidden when switching to Orders
          setOrderView(value);
        }}
      />
      {show ? (
        <Amazon handleClick={handleClick} />
      ) : orderView ? (
        <Orders orders={orders} />
      ) : (
        <Cart cart={cart} setCart={setCart} handleChange={handleChange} handleOrder={handleOrder} />
      )}

      {warning && <div className="warning">Item is already added to your cart</div>}
    </React.Fragment>
  );
};

export default Home;
