import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Import necessary components from react-router-dom
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import your page components
// 1. LANDING PAGE (WelcomePage) - Renamed the import alias for clarity
import WelcomePage from './SignInLogInLanding'; 
// 2. LOGIN PAGE (The actual sign-in form) - Update the file path to match your structure
import LoginPage from './NEWLoginPage'; 
import RegisterPage from './NEWRegistrationPage';
import AddListingPage from './AddListingPage';
import ProfilePage from './ProfilePage';

// --- The main App Component where routing is defined ---
function App() {
  return (
    <Routes>
      {/* Default route - WELCOME/LANDING Page */}
      <Route path="/" element={<WelcomePage />} /> 
      
      {/* Login page (explicit route) - Points to the sign-in form */}
      <Route path="/login" element={<LoginPage />} /> 
      
      {/* Registration page */}
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Add Listing page */}
      <Route path="/add-listing" element={<AddListingPage />} />
      
      {/* Profile page */}
      <Route path="/profile" element={<ProfilePage />} />
      
      {/* Placeholder for Feed page */}
      <Route path="/feed" element={
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Feed Page</h1>
          <p style={{ marginBottom: '20px' }}>Coming Soon!</p>
          <a href="/add-listing" style={{ color: '#FF6666', textDecoration: 'none', fontWeight: 'bold' }}>
            Add a Listing
          </a>
        </div>
      } />
      
      {/* 404 page - catch all other routes */}
      <Route path="*" element={
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
          <p style={{ marginBottom: '20px' }}>Page Not Found</p>
          <a href="/" style={{ color: '#FF6666', textDecoration: 'none', fontWeight: 'bold' }}>
            Go back to Home
          </a>
        </div>
      } />
    </Routes>
  );
}

export default App;