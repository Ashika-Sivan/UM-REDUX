import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUp from "./components/signUp/SignUp";
import Login from "./components/login/Login";
import Home from './pages/userHome/Home';
import UserProfile from './components/userProfile/UserProfile';
import EditProfile from './components/EditProfile/EditProfile';

import AdminLogin from './pages/admin/adminLogin/AdminLogin';
import AdminHome from './pages/admin/adminHome/AdminHome';
import AdminProtect from './secure/AdminProtect';
import { PublicProtect } from './secure/PublicProtect';
import { AuthProtected } from './secure/AuthProtected';
import Dashboard from './pages/admin/adminDash/Dashboard';

import './assets/Styles/Login.css'
import './assets/Styles/Signup.css'
import AddUser from './pages/admin/adminADD/AddUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicProtect>
              <Login />
            </PublicProtect>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicProtect>
              <SignUp />
            </PublicProtect>
          }
        />

        <Route
          path="/home"
          element={
            <AuthProtected>
              <Home />
            </AuthProtected>
          }
        />
    
      <Route
      path='/profile'
      element={
        <AuthProtected>
          <UserProfile/>
        </AuthProtected>
      }
      />
      <Route
      path='/profile/edit'
      element={
        <AuthProtected>
          <EditProfile/>
        </AuthProtected>
      }
      />
      

        <Route
          path="/admin/login"
          element={
           <PublicProtect>
          <AdminLogin />
          </PublicProtect>
        }
        />
      
      
        <Route
          path="/admin/home"
          element={
            <AdminProtect>
              <AdminHome/>
            </AdminProtect>
          }
        />

        <Route
        path='/admin/dashboard'
        element={
          <AdminProtect>
            <Dashboard/>
          </AdminProtect>
        }/>

        <Route
        path="/admin/addUser"
        element={
          <AdminProtect>
            <AddUser/>
          </AdminProtect>
        }/>
        
      </Routes>
    </Router>
  );
}

export default App;
