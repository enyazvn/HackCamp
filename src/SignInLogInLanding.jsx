import React, { useEffect } from "react";

const WelcomePage = () => {
  // Load Krona One font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Krona+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    // 1. Outer background:
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      
      {/* 2. Main "working container" */}
      <div className="w-full h-full max-w-sm bg-green-800 flex flex-col justify-between items-center py-12 px-8 shadow-lg rounded-lg">
        
        {/* Logo and Title Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1
            className="text-white text-4xl tracking-wider mb-2" // Reduced margin to mb-2
            style={{ fontFamily: "Krona One, sans-serif" }}
          >
            RENEW'D
          </h1>
          
          {/* Slogan added below the title */}
          <p
            className="text-white text-lg font-light text-center mb-10" // Using standard classes for text size and style
          >
            Match with clothes you'll love
          </p>


          {/* Swap Icon */}
          <div className="mb-16">
            <img
              // Note: Changed the src to use a root-relative path for deployment best practice
              src="public\swap-fill-svgrepo-com -green.svg"
              alt="swap icon"
              className="w-48 h-48"
            />
          </div>
        </div>

        {/* Buttons Section */}
        <div className="w-full space-y-4">
          <button
            onClick={() => (window.location.href = "/register")}
            className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-4 px-6 rounded-full transition-colors shadow-lg"
          >
            Sign Up
          </button>

          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-4 px-6 rounded-full transition-colors shadow-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;