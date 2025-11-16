import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Import necessary components from react-router-dom
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import your new page component
import AboutPage from './AboutPage'; 

// --- The default page content (your Home page) ---
function HomePage() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleGoToAbout = () => {
    // Navigate to the path defined for the AboutPage
    navigate('/about'); 
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React (Home Page)</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
      {/* --- Your Redirection Button --- */}
      <button onClick={handleGoToAbout} style={{ marginTop: '20px' }}>
        Go to About Page
      </button>
      {/* --------------------------------- */}
      <div className="text-1xl font-bold">
        <h1>Hello Tailwind!</h1>
      </div>
    </>
  );
}
// ----------------------------------------------------


// --- The main App Component where routing is defined ---
function App() {
  return (
    <Routes>
      {/* Route for the default path (the Home page) */}
      <Route path="/" element={<HomePage />} />
      
      {/* Route for your new separate page */}
      <Route path="/about" element={<AboutPage />} />
      
      {/* Optionally, you can add a 404 page */}
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}
// ----------------------------------------------------

export default App;