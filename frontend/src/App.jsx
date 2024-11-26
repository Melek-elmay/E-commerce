import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp/Signup';
import Login from './SignUp/Login';
import Home from './Home/Home';
import Profile from './pages/Profile';
// import NavigationBar from './navBar/NavigationBar';
import Admino from './Admin/Admino';
import Cart from './pages/Cart';
import './App.css'


function App() {
  return (
    <Router>
      {/* NavigationBar is now inside Router */}
      
      <div className='grand-router-div'>
        <Routes>
          <Route path="user/signup" element={<SignUp />} />
          <Route path="user/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admino />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
