import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp/Signup';
import Login from './SignUp/Login';
import Home from './Home/Home';
import Profile from './pages/Profile';
import NavigationBar from './navBar/NavigationBar'; 

function App() {
  return (
    <>
      <NavigationBar />
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
