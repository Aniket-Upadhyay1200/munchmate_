import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import '../styles/forms.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import foodLogo from '../assets/food logo.png'; // Import the logo

const Forms = () => {
  const [isRegistering, setIsRegistering] = useState(null); // Use null to indicate no form is selected
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasSpecialChar;
  };

  const handleRegister = () => {
    const { firstName, lastName, email, password, confirmPassword, securityQuestion, securityAnswer } = formData;
    
    if (!firstName || !lastName || !email || !password || !confirmPassword || !securityAnswer) {
      toast.warn("All fields are mandatory")
      return;
    }
    
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match")
      return;
    }
    
    if (!validatePassword(password)) {
      toast.warn('Password must be at least 8 characters long and contain at least one special character.')
      return;
    }

    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      toast.warn('User with this email already exists.')
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      securityQuestion,
      securityAnswer,
    };

    localStorage.setItem(email, JSON.stringify(user));
  
    toast.success("Registration successful")
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      securityQuestion: '',
      securityAnswer: '',
    });
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/home'); 
  };

  const handleLogin = () => {
    const { email, password } = formData;
    
    if (!email || !password) {
      alert('Email and Password are mandatory.');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem(email));
    if (storedUser && bcrypt.compareSync(password, storedUser.password)) {
      alert('Login successful!');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/home'); 
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      {/* Display the logo */}
      <div className="logo-container">
        <img src={foodLogo} alt="Food Logo" className="logo" />
      </div>

      {/* Buttons to toggle between Register and Sign In */}
      <div className="toggle-buttons">
        <button 
          className={isRegistering === 'register' ? 'active' : ''} 
          onClick={() => setIsRegistering('register')}
        >
          Register
        </button>
        <button 
          className={isRegistering === 'login' ? 'active' : ''} 
          onClick={() => setIsRegistering('login')}
        >
          Sign In
        </button>
      </div>
      
      {/* Conditionally render forms based on state */}
      {isRegistering === 'register' && (
        <div>
          <h2>Register</h2>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label>Security Question</label>
          <select name="securityQuestion" value={formData.securityQuestion} onChange={handleChange} required>
            <option value="">Select a Security Question</option>
            <option value="favoriteMovie">Which is your favorite movie?</option>
            <option value="favoriteSport">Favorite sports?</option>
            <option value="schoolName">School name?</option>
            <option value="favoriteSportsPerson">Favorite sports person?</option>
          </select>
          <input
            type="text"
            name="securityAnswer"
            placeholder="Answer"
            value={formData.securityAnswer}
            onChange={handleChange}
            required
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
      {isRegistering === 'login' && (
        <div>
          <h2>Sign In</h2>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button onClick={handleLogin}>Sign In</button>
          <div className="forgot-password" onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </div>
        </div>
      )}
    </div>
  );
};

export default Forms;

