import React , {useState} from 'react';


import Forms from './components/Forms'
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
	
	
	

	


  return (
	<React.Fragment>
	 <ToastContainer />
	<Routes>
	  <Route path="/" element={<Forms />} />
	  <Route path="/forgot-password" element={<ForgotPassword />} />
	  <Route path="/home" element={<Home/>}/>
	</Routes>
  </React.Fragment>
  )
}

export default App