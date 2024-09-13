import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import '../styles/forgotpassword.css';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    securityAnswer: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [storedUser, setStoredUser] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      const user = JSON.parse(localStorage.getItem(value));
      if (user) setStoredUser(user);
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasSpecialChar;
  };

  const handleForgotPassword = () => {
    const { firstName, lastName, email, securityAnswer, newPassword, confirmNewPassword } = formData;
    
    if (!firstName || !lastName || !email || !securityAnswer || !newPassword || !confirmNewPassword) {
        toast.warn("All fields are mandatory")
     
      return;
    }

    if (!storedUser) {
      toast.error('No user found with this email.')
      return;
    }

    if (firstName !== storedUser.firstName || lastName !== storedUser.lastName) {
    
      toast.error('First Name and Last Name do not match our records.')
      return;
    }

    if (securityAnswer !== storedUser.securityAnswer) {
      toast.error('Incorrect security answer.')
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match')
      return;
    }

    if (!validatePassword(newPassword)) {
   //   alert('Password must be at least 8 characters long and contain at least one special character.');
      toast.wwarn("Password must be at least 8 characters long and contain at least one special character.")
      return;
    }

    if (bcrypt.compareSync(newPassword, storedUser.password)) {
     // alert('');
      toast.warn("New password cannot be the same as the old password.")
      return;
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    storedUser.password = hashedPassword;
    localStorage.setItem(email, JSON.stringify(storedUser));
    toast.success("Password reset successfully")

    navigate('/');
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <label>First Name</label>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
       <label>Last name</label>
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
      {storedUser && (
        <>
          <p>{storedUser.securityQuestion}</p>
          <input
            type="text"
            name="securityAnswer"
            placeholder="Security Answer"
            value={formData.securityAnswer}
            onChange={handleChange}
            required
          />
        </>
      )}
      <label>New Password</label>
      <input
        type="password"
        name="newPassword"
        placeholder="Enter New Password"
        value={formData.newPassword}
        onChange={handleChange}
        required
      />
       <label>Confirm New Password</label>
      <input
        type="password"
        name="confirmNewPassword"
        placeholder="Confirm New Password"
        value={formData.confirmNewPassword}
        onChange={handleChange}
        required
      />
      <button onClick={handleForgotPassword}>Reset Password</button>
    </div>
  );
};

export default ForgotPassword;
