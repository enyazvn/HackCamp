import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const REGISTER_URL = 'http://localhost:3000/api/register';

const AboutPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    birthday: '',
    preferredMeetingLocation: '',
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
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
    // Validation
    if (!formData.firstname || !formData.email || !formData.password) {
      setStatus({ 
        message: 'Please fill in all required fields.', 
        isSuccess: false 
      });
      return;
    }

    if (!termsAccepted) {
      setStatus({ 
        message: 'Please accept the terms and conditions.', 
        isSuccess: false 
      });
      return;
    }

    if (formData.password.length < 8) {
      setStatus({ 
        message: 'Password must be at least 8 characters.', 
        isSuccess: false 
      });
      return;
    }

    setIsLoading(true);
    setStatus({ message: '', isSuccess: false });

    const submissionData = {
      ...formData,
      birthday: formData.birthday || null
    };

    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ 
          message: `Welcome to Renewd, ${formData.firstname}! 🎉`, 
          isSuccess: true 
        });
        setTimeout(() => {
          window.location.href = '/add-listing';
        }, 2000);
      } else {
        setStatus({ 
          message: data.message || data.details || 'Registration failed. Please try again.', 
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Renewd</h1>
          <p className="text-gray-600 text-sm">Swap sustainable, live local</p>
        </div>

        {/* Status Message */}
        {status.message && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${
            status.isSuccess 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {status.message}
          </div>
        )}

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
          
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
              What's your first name? *
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Create a password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
          </div>

          {/* Birthday */}
          <div>
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-2">
              Birthday <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Preferred Meeting Location */}
          <div>
            <label htmlFor="preferredMeetingLocation" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred meeting location
            </label>
            <input
              type="text"
              id="preferredMeetingLocation"
              name="preferredMeetingLocation"
              placeholder="e.g., Downtown Toronto, Queen St W"
              value={formData.preferredMeetingLocation}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500">Where do you prefer to swap items?</p>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <input 
              type="checkbox" 
              id="terms" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              disabled={isLoading}
              className="mt-1 h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
            />
            <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
              I agree to the <span className="text-pink-500 font-medium">Terms of Service</span> and <span className="text-pink-500 font-medium">Privacy Policy</span>
            </label>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit}
            disabled={isLoading} 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating your account...
              </span>
            ) : (
              'Start Swapping'
            )}
          </button>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-pink-500 font-semibold hover:text-pink-600 transition-colors">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;