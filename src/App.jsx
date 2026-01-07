import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUp from "./components/signUp/SignUp";
import Login from "./components/login/Login";
import Home from './pages/userHome/Home';
import UserProfile from './components/userProfile/UserProfile';
import EditProfile from './components/EditProfile/EditProfile';

import AdminLogin from './pages/admin/adminLogin/AdminLogin';
// import AdminHome from './pages/admin/adminHome/AdminHome';

import { UserLoginProtect, UserProtect } from "./secure/UserProtect";
import { AdminProtect } from './secure/AdminProtect';

import './assets/Styles/Login.css'
import './assets/Styles/Signup.css'

function App() {
  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            <UserLoginProtect>
              <Login />
            </UserLoginProtect>
          }
        />

        <Route
          path="/login"
          element={
            <UserLoginProtect>
              <Login />
            </UserLoginProtect>
          }
        />

        <Route
          path="/signup"
          element={
            <UserLoginProtect>
              <SignUp />
            </UserLoginProtect>
          }
        />

        <Route
          path="/home"
          element={
            <UserProtect>
              <Home />
            </UserProtect>
          }
        />

        <Route path="/profile" element={<UserProfile />}>
          <Route path="edit" element={<EditProfile />} />
        </Route>

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/home"
          element={
            <AdminProtect>
              <h1>Admin Home</h1>
            </AdminProtect>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
