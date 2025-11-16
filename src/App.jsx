import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Import necessary components from react-router-dom
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import your page components
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegistrationPage';
import AddListingPage from './AddListingPage';
import ProfilePage from './ProfilePage';
import FeedPage from './FeedPage';
import LikesPage from './LikesPage';
import MatchesPage from './MatchesPage';

// --- The main App Component where routing is defined ---
function App() {
  return (
    <Routes>
      {/* Default route - Landing Page */}
      <Route path="/" element={<LandingPage />} /> 
      
      {/* Login page (explicit route) */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Registration page */}
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Add Listing page */}
      <Route path="/add-listing" element={<AddListingPage />} />
      
      {/* Profile page */}
      <Route path="/profile" element={<ProfilePage />} />
      
      {/* Feed page */}
      <Route path="/feed" element={<FeedPage />} />
      
      {/* Likes page */}
      <Route path="/likes" element={<LikesPage />} />
      
      {/* Matches page */}
      <Route path="/matches" element={<MatchesPage />} />
      
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
            Go back to Login
          </a>
        </div>
      } />
    </Routes>
  );
}

export default App;