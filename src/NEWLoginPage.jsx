import React, { useState } from 'react';

const LOGIN_URL = 'http://localhost:3000/api/login';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [status, setStatus] = useState({ message: '', isSuccess: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setStatus({ 
        message: 'Please fill in all fields.', 
        isSuccess: false 
      });
      return;
    }

    setIsLoading(true);
    setStatus({ message: '', isSuccess: false });

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userFirstname', data.firstname);
        
        setStatus({ 
          message: `Welcome back, ${data.firstname}! 🎉`, 
          isSuccess: true 
        });
        
        setTimeout(() => {
          window.location.href = '/feed';
        }, 1500);
      } else {
        setStatus({ 
          message: data.message || 'Login failed. Please check your credentials.', 
          isSuccess: false 
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus({ 
        message: 'Could not connect to server. Please check your connection.', 
        isSuccess: false 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      
      <div 
        className="w-full h-full max-w-sm bg-green-800 flex flex-col justify-center items-center px-8 py-12 shadow-lg rounded-lg gap-8" // Changed pr-16 to px-8 to re-balance padding
      >
        
        {/* Header - Already centered by parent items-center */}
        <div className="text-center"> {/* Added text-center for text alignment */}
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-lime-300 text-sm">Sign in to continue swapping</p>
        </div>

        {/* Status Message - Already centered by parent items-center */}
        {status.message && (
          <div className={`p-3 rounded-lg text-sm font-medium text-center ${ // Added text-center
            status.isSuccess 
              ? 'bg-lime-400 text-gray-900'
              : 'bg-red-600 text-white'     
          }`}>
            {status.message}
          </div>
        )}

        {/* Form - Added w-full to make inputs take full width, but the overall form block can be centered by parent */}
        <div className="space-y-4 w-full"> 
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2 text-center"> {/* Added text-center to label */}
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="thriftlover21@gmail.com"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white border-0 rounded-full focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 text-center" // Added text-center
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2 text-center"> {/* Added text-center to label */}
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••••••••••"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white border-0 rounded-full focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 text-center" // Added text-center
            />
          </div>

          {/* Forgot Password Link - Changed to text-center to align */}
          <div className="flex justify-center"> 
            <a href="/forgot-password" className="text-sm text-gray-300 hover:text-white font-medium transition-colors underline">
              forget your password?
            </a>
          </div>

          {/* Submit Button - Already centered by parent items-center */}
          <button 
            onClick={handleSubmit}
            disabled={isLoading} 
            className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-4 px-6 rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg mt-6"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </div>

        {/* Decorative Image Space - Already centered by parent items-center */}
        <div className="w-full text-center"> {/* Added w-full and text-center */}
          <div className="w-full h-48 flex items-center justify-center">
            {/* Placeholder for decorative illustration */}
            <div className="text-gray-300 text-sm opacity-50">
              Match with clothes you'll love
            </div>
          </div>
        </div>

        {/* Sign Up Link - Already centered by parent items-center */}
        <div className="text-center"> {/* Added text-center for text alignment */}
          <p className="text-sm text-gray-300">
            Don't have an account?{' '}
            <a href="/register" className="text-lime-400 font-bold hover:text-lime-300 transition-colors underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;